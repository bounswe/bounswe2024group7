import React, { useState, useEffect, useContext } from 'react';
import { CircularProgress, CircularProgressLabel, Box, Text, HStack, VStack, Button } from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';
import { UserContext } from '../context/UserContext';
import { useNavigate } from '@tanstack/react-router'

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
function ProgressToday() {
    const { joinedPrograms } = useContext(UserContext);
    const currentProgress = calculateProgress(joinedPrograms);
    const [progress, setProgress] = useState(0); // Initialize progress to 0



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

    const navigate = useNavigate()
    const handleStartPracticing = (program_name) => {
        navigate(
            {
                to: "/program"
            }
        )
    }

    return (
        <Box
            display="flex"
            justifyContent="center"
            // bg="gray.50"
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
                width="380px"
                height="260px"
                bg="white"
                boxShadow="md"
                borderRadius="md"
                p={5}
                mb={0}
            >
                {/* <Text fontSize="lg" fontWeight="bold" mb={2}>
                    Your Progress Today
                </Text> */}
                <Box
                    position="relative"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    mb={4}
                >
                    <CircularProgress
                        value={progress}
                        color='#805AD5'
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
                            {currentProgress}%
                        </Text>
                        {currentProgress === 100 ? (
                            progress === 100 ? (
                                <StarIcon boxSize={12} color='#805AD5' />
                            ) : null
                        ) : (
                            <Button bg="#805AD5" color="white" _hover={{ bg: '#805AD5' }} size="sm" onClick={() => handleStartPracticing(joinedPrograms)}>
                                Nail It !
                            </Button>
                        )}
                    </Box>
                </Box>
            </Box>
        </Box>



    );
}

export default ProgressToday;
