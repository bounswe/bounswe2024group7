import React, { useState, useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from 'chart.js';
import { Box, Button, Flex, Text, VStack } from '@chakra-ui/react';

// Register ChartJS components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

const ProgressGraph = ({ dates, progressValues, title }) => {
    const data = {
        labels: dates,
        datasets: [
            {
                label: title,
                data: progressValues,
                borderColor: 'rgb(75, 192, 192)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                tension: 0.1,
                fill: true
            }
        ]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: title
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                max: Math.max(...progressValues || [0]) * 1.2 || 200
            },
            x: {
                ticks: {
                    maxRotation: 45,
                    minRotation: 45
                }
            }
        }
    };

    return (
        <Box height="400px" width="100%" position="relative">
            <Line data={data} options={options} />
        </Box>
    );
};

const processExerciseData = (programsList) => {
    // Early return for invalid input
    if (!programsList || !Array.isArray(programsList)) {
        console.warn('Invalid input: Expected an array of programs');
        return {};
    }

    // Create an object to store results across all programs
    const consolidatedResult = {};

    // Process each program in the list
    programsList.forEach(data => {
        // Skip invalid program objects
        if (!data || typeof data !== 'object') {
            console.warn('Skipping invalid program data');
            return;
        }

        // Safely access weeks with optional chaining and default to empty array
        const weeks = data.weeks || [];

        // Iterate through weeks and workouts
        weeks.forEach(week => {
            // Safely access workouts with optional chaining and default to empty array
            const workouts = week.workouts || [];

            workouts.forEach(workout => {
                // Validate workout object
                if (!workout || !workout.completedAt) {
                    console.warn('Skipping invalid workout');
                    return;
                }

                // Convert completed date to desired format
                const completedDate = new Date(workout.completedAt)
                    .toLocaleDateString('en-GB', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric'
                    })
                    .replace(/\//g, '.');

                // Safely access workout exercises
                const workoutExercises = workout.workoutExercises || [];

                // Process each workout exercise
                workoutExercises.forEach(workoutExercise => {
                    // Validate exercise object
                    if (!workoutExercise || !workoutExercise.exercise) {
                        console.warn('Skipping invalid workout exercise');
                        return;
                    }

                    const targetMuscle = workoutExercise.exercise.targetMuscle || 'UNKNOWN';

                    // Calculate sum of completed sets
                    const setsSum = Array.isArray(workoutExercise.completedSets)
                        ? workoutExercise.completedSets.reduce((a, b) => a + b, 0)
                        : 0;

                    // Initialize muscle entry if not exists
                    if (!consolidatedResult[targetMuscle]) {
                        consolidatedResult[targetMuscle] = {
                            Dates: [],
                            Values: []
                        };
                    }

                    // Add date and sets sum
                    consolidatedResult[targetMuscle].Dates.push(completedDate);
                    consolidatedResult[targetMuscle].Values.push(setsSum);
                });
            });
        });
    });

    // Additional processing for filling in dates (same as previous implementation)
    Object.keys(consolidatedResult).forEach(muscle => {
        // Sort dates to find the full date range
        const sortedDates = consolidatedResult[muscle].Dates.sort((a, b) => {
            const [dayA, monthA, yearA] = a.split('.');
            const [dayB, monthB, yearB] = b.split('.');
            return new Date(yearA, monthA - 1, dayA) - new Date(yearB, monthB - 1, dayB);
        });

        // Skip if no dates
        if (sortedDates.length === 0) {
            return;
        }

        const firstDate = new Date(
            parseInt(sortedDates[0].split('.')[2]),
            parseInt(sortedDates[0].split('.')[1]) - 1,
            parseInt(sortedDates[0].split('.')[0])
        );
        const lastDate = new Date(
            parseInt(sortedDates[sortedDates.length - 1].split('.')[2]),
            parseInt(sortedDates[sortedDates.length - 1].split('.')[1]) - 1,
            parseInt(sortedDates[sortedDates.length - 1].split('.')[0])
        );

        // Generate full date range
        const filledDates = [];
        const filledValues = [];

        for (let d = new Date(firstDate); d <= lastDate; d.setDate(d.getDate() + 1)) {
            const currentDate = d.toLocaleDateString('en-GB', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            }).replace(/\//g, '.');

            filledDates.push(currentDate);

            // Calculate total value for this date from all matching original dates
            const matchingIndices = consolidatedResult[muscle].Dates
                .reduce((acc, date, index) => date === currentDate ? [...acc, index] : acc, []);

            const totalValue = matchingIndices.reduce((sum, index) =>
                sum + consolidatedResult[muscle].Values[index], 0);

            filledValues.push(totalValue);
        }

        // Update the muscle entry with filled dates and values
        consolidatedResult[muscle].Dates = filledDates;
        consolidatedResult[muscle].Values = filledValues;
    });

    return consolidatedResult;
};

const ProgressGraphs = ({ programsList }) => {

    const [selectedExercise, setSelectedExercise] = useState(null);

    // Process exercise data with error handling
    const exercisesData = useMemo(() => {
        try {
            return processExerciseData(programsList);
        } catch (error) {
            console.error('Error processing exercise data:', error);
            return {};
        }
    }, [programsList]);

    // Set the first exercise as default if not selected
    useMemo(() => {
        if (!selectedExercise && Object.keys(exercisesData).length > 0) {
            setSelectedExercise(Object.keys(exercisesData)[0]);
        }
    }, [exercisesData, selectedExercise]);

    // Render nothing or error state if no data
    if (Object.keys(exercisesData).length === 0) {
        return (
            <VStack spacing={4} align="center" py={10}>
                <Text>No exercise data available</Text>
            </VStack>
        );
    }

    return (
        <Box>
            <Flex justify="center" mb={6} gap={4} flexWrap="wrap">
                {Object.keys(exercisesData).map((exercise) => (
                    <Button
                        key={exercise}
                        colorScheme={selectedExercise === exercise ? 'teal' : 'gray'}
                        onClick={() => setSelectedExercise(exercise)}
                        m={1}
                    >
                        Target Muscle: {exercise}
                    </Button>
                ))}
            </Flex>

            {selectedExercise && (
                <ProgressGraph
                    dates={exercisesData[selectedExercise].Dates}
                    progressValues={exercisesData[selectedExercise].Values}
                    title={`${selectedExercise} Progress`}
                />
            )}
        </Box>
    );
};

export default ProgressGraphs;