import React, { useState, useEffect, useContext } from 'react';
import { CircularProgress, CircularProgressLabel, Box, Text, HStack, VStack, Button } from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';
import { UserContext } from '../context/UserContext';
import { useNavigate } from '@tanstack/react-router'
const calculateProgress = (joinedPrograms) => {
    let done = 0;
    let undone = 0;

    joinedPrograms.forEach((program) => {
        program.exercises.forEach((exercise) => {
            if (exercise.completed) {
                done++;
            } else {
                undone++;
            }
        });
    });

    const total = done + undone;
    const progress = total > 0 ? (done * 100) / total : 0;

    return progress.toFixed(2);
};

const calculateWeeklyProgress = (joinedPrograms) => {

    const daysOfWeek = ['Sat', 'Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri'];
    const today = new Date();
    const active = [];
    const progress_days = [];

    daysOfWeek.forEach((day, index) => {
        const currentDay = new Date(today);
        currentDay.setDate(today.getDate() - today.getDay() + index);

        // Check if the day is in the past or today
        if (currentDay <= today) {
            active.push(1);

            // Calculate progress for this specific day
            const dayProgress = joinedPrograms.reduce((totalProgress, program) => {
                const dayExercises = program.exercises.filter(exercise =>
                    exercise.completedAt &&
                    new Date(exercise.completedAt).toDateString() === currentDay.toDateString()
                );

                const totalExercises = program.exercises.length;
                const completedExercises = dayExercises.length;

                return (completedExercises / totalExercises) * 100;
            }, 0);

            progress_days.push(Math.round(dayProgress));
        } else {
            active.push(0);
            progress_days.push(0);
        }
    });

    return { active, progress_days };
};

function ProgressBoard() {
    const navigate = useNavigate()
    const handleStartPracticing = (program_name) => {
        navigate(
            {
                to: "/program"
            }
        )
    }
    const { joinedPrograms } = useContext(UserContext);
    const currentProgress = calculateProgress(joinedPrograms);
    const [progress, setProgress] = useState(0);

    const { active, progress_days } = calculateWeeklyProgress(joinedPrograms);
    const daysOfWeek = ['Sat', 'Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri'];

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev < currentProgress) {
                    return prev + 10;
                } else {
                    clearInterval(interval);
                    return prev;
                }
            });
        }, 80);

        return () => clearInterval(interval);
    }, [currentProgress]);

    return (
        <Box
            display="flex"
            justifyContent="center"
            bg="gray.50"
            sx={{
                boxSizing: 'border-box',
                marginTop: 0,
            }}
        >
            <Box
                position="relative"
                display="flex"
                flexDirection="column"
                alignItems="center"
                maxWidth="600px"
                width="100%"
                bg="white"
                boxShadow="lg"
                borderRadius="md"
                p={10}
                mb={0}
            >
                <Text fontSize="lg" fontWeight="bold" color="gray.900" mb={4}>
                    Your Fitness Story: Chapter This Week
                </Text>
                <Box
                    position="relative"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    mb={4}
                >
                    <CircularProgress
                        value={progress}
                        color="teal"
                        trackColor="gray.200"
                        size="240px"
                        thickness="3px"
                        capIsRound
                        sx={{
                            '& circle': {
                                transformOrigin: 'center',
                            },
                        }}
                    />
                    <Box
                        position="absolute"
                        top="50%"
                        left="50%"
                        transform="translate(-50%, -50%)"
                        textAlign="center"
                    >
                        <Text fontSize="lg" fontWeight="bold" color="gray.700" mb={4}>
                            Today: {currentProgress}%
                        </Text>
                        {currentProgress === 100 ? (
                            progress === 100 ? (
                                <StarIcon boxSize={12} color="teal" />
                            ) : null
                        ) : (
                            <Button bg="teal" color="white" _hover={{ bg: 'teal' }} size="sm" onClick={() => handleStartPracticing(joinedPrograms)}>
                                Nail It !
                            </Button>
                        )}
                    </Box>
                </Box>

                <Box textAlign="center">
                    <HStack spacing={6} justifyContent="center" mb={2}>
                        {daysOfWeek.map((day, i) => (
                            <VStack key={day} spacing={2} alignItems="center">
                                <Text
                                    fontSize="sm"
                                    fontWeight="medium"
                                    color={active[i] === 0 ? 'gray.400' : 'gray.600'}
                                >
                                    {day}
                                </Text>
                                {active[i] === 0 ? (
                                    <CircularProgress
                                        value={0}
                                        trackColor="gray.200"
                                        size="50px"
                                        thickness="6px"
                                    />
                                ) : (
                                    <CircularProgress
                                        value={progress_days[i]}
                                        color="teal"
                                        trackColor="gray.200"
                                        size="50px"
                                        thickness="7px"
                                    >
                                        <CircularProgressLabel fontSize="xs" color="gray.700">
                                            {progress_days[i]}%
                                        </CircularProgressLabel>
                                    </CircularProgress>
                                )}
                            </VStack>
                        ))}
                    </HStack>
                </Box>
            </Box>
        </Box>
    );
}

export default ProgressBoard;