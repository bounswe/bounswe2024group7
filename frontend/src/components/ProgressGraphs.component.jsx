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
import { Box, Button, Flex, Text } from '@chakra-ui/react';
import zoomPlugin from 'chartjs-plugin-zoom';

// Register ChartJS components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
    zoomPlugin
);

// Function to generate realistic progressive data
const generateRealisticProgressData = (startValue, dates) => {
    const progressValues = [startValue];
    let currentValue = startValue;

    for (let i = 1; i < dates.length; i++) {
        // Add some randomness with an overall progressive trend
        const change = Math.random() < 0.7
            ? Math.random() * 5  // Slight increase most of the time
            : -Math.random() * 3; // Occasional small decrease

        currentValue = Math.max(0, Math.min(100, currentValue + change));
        progressValues.push(Math.round(currentValue));
    }

    return progressValues;
};

const ProgressGraph = ({ dates, progressValues, title }) => {
    // Sample dates to prevent overcrowding
    const sampledData = useMemo(() => {
        if (dates.length <= 30) return { labels: dates, values: progressValues };

        const samplingInterval = Math.floor(dates.length / 30);
        const sampledLabels = [];
        const sampledValues = [];

        for (let i = 0; i < dates.length; i += samplingInterval) {
            sampledLabels.push(dates[i]);
            sampledValues.push(progressValues[i]);
        }

        return { labels: sampledLabels, values: sampledValues };
    }, [dates, progressValues]);

    const data = {
        labels: sampledData.labels,
        datasets: [
            {
                label: title,
                data: sampledData.values,
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
            },
            zoom: {
                zoom: {
                    wheel: {
                        enabled: true,
                    },
                    pinch: {
                        enabled: true
                    },
                    mode: 'x',
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                max: 200
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
            <Text
                fontSize="xs"
                color="gray.500"
                textAlign="center"
                mt={2}
            >
                Scroll/pinch to zoom, click and drag to pan
            </Text>
        </Box>
    );
};

const ProgressGraphs = () => {
    const [selectedExercise, setSelectedExercise] = useState('Push Ups');

    // Generate dates from 1 Nov 2023 to today
    const generateDates = () => {
        const startDate = new Date(2023, 10, 1); // 1 Nov 2023
        const endDate = new Date(); // Today
        const dates = [];

        let currentDate = new Date(startDate);
        while (currentDate <= endDate) {
            dates.push(currentDate.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: '2-digit'
            }));
            currentDate.setDate(currentDate.getDate() + 1);
        }

        return dates;
    };

    const dates = generateDates();

    // Exercises data with realistic progressive tracking
    const exercisesData = {
        'Push Ups': {
            title: 'Number of Push Ups',
            progressValues: generateRealisticProgressData(20, dates)
        },
        'Pull Ups': {
            title: 'Number of Pull Ups',
            progressValues: generateRealisticProgressData(10, dates)
        },
        '45 Side Bend': {
            title: 'Number of 45 Side Bends',
            progressValues: generateRealisticProgressData(15, dates)
        }
    };

    return (
        <Box>
            <Flex justify="center" mb={6} gap={4}>
                {Object.keys(exercisesData).map((exercise) => (
                    <Button
                        key={exercise}
                        colorScheme={selectedExercise === exercise ? 'teal' : 'gray'}
                        onClick={() => setSelectedExercise(exercise)}
                    >
                        {exercise}
                    </Button>
                ))}
            </Flex>

            <ProgressGraph
                dates={dates}
                progressValues={exercisesData[selectedExercise].progressValues}
                title={exercisesData[selectedExercise].title}
            />
        </Box>
    );
};

export default ProgressGraphs;