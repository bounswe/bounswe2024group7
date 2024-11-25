import React, { useState, useEffect, useContext } from 'react';
import { CircularProgress, CircularProgressLabel, Box, Text, HStack, VStack, Button } from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';
import { UserContext } from '../context/UserContext';

const calculateProgress = (joinedPrograms) => {
    let done = 0;
    let undone = 0;

    // Iterate through each program and its exercises
    joinedPrograms.forEach((program) => {
        program.exercises.forEach((exercise) => {
            if (exercise.completed) {
                done++;
            } else {
                undone++;
            }
        });
    });

    // Calculate the current progress percentage
    const total = done + undone;
    const progress = total > 0 ? (done * 100) / total : 0;  // Prevent division by zero

    return progress.toFixed(2);
};
function ProgressBoard() {
    const { joinedPrograms } = useContext(UserContext);
    const currentProgress = calculateProgress(joinedPrograms);
    const [progress, setProgress] = useState(0); // Initialize progress to 0

    // MockData
    const daysOfWeek = ['Sat', 'Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri'];
    const active = [1, 1, 1, 0, 0, 0, 0]; // Active array
    const progress_days = [50, 100, 70, 0, 0, 0, 0]; // Progress days array

    useEffect(() => {
        // Increment progress by 10% every 80ms until it reaches currentProgress
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev < currentProgress) {
                    return prev + 10;
                } else {
                    clearInterval(interval); // Clear the interval once we reach currentProgress
                    return prev;
                }
            });
        }, 80);

        return () => clearInterval(interval); // Cleanup the interval on component unmount
    }, [currentProgress]);



    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100vh"
            width="100vw"
            bg="gray.50"
        >

            <Box
                position="relative"
                display="flex"
                flexDirection="column"
                alignItems="center"
                width="600px" // Make the box wider
                bg="white"
                boxShadow="lg"
                borderRadius="md"
                p={10} // Add padding for spacing
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
                        color="#9F7AEA" // Updated progress bar color
                        trackColor="gray.200"
                        size="240px"
                        thickness="3px"
                        capIsRound
                        sx={{
                            '& circle': {
                                // transform: 'rotate(180deg)', // Rotate the circle
                                transformOrigin: 'center', // Ensure rotation happens around the center
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

                    </Box>
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
                                <StarIcon boxSize={12} color="gold" />
                            ) : null
                        ) : (
                            <Button bg="#9F7AEA" color="white" _hover={{ bg: '#805AD5' }} size="sm">
                                Nail It !
                            </Button>
                        )}

                    </Box>
                </Box>

                {/* Days of the week and circular progress bars */}
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
                                        color="gold"
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
