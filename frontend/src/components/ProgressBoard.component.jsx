import React, { useState, useEffect } from 'react';
import { CircularProgress, Box, Text, Button, HStack, VStack, Icon } from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';

function ProgressBoard({ currentProgress }) {
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

    const daysOfWeek = ['Sat', 'Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri'];
    const active = [1, 1, 1, 0, 0, 0, 0, 0]; // Active array
    const progress_days = [50, 100, 70, 0, 0, 0, 0]; // Progress days array

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
                width="400px" // Make the box wider
                bg="white"
                boxShadow="lg"
                borderRadius="md"
                p={10} // Add padding for spacing
            >
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
                                transform: 'rotate(180deg)', // Rotate the circle
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
                        <Text fontSize="lg" fontWeight="bold" color="gray.700" mb={4}>
                            Progress Today
                        </Text>
                        {currentProgress === 100 ? (
                            <StarIcon boxSize={12} color="#9F7AEA" />
                        ) : (
                            <Button bg="#9F7AEA" color="white" _hover={{ bg: '#805AD5' }} size="sm">
                                Continue!
                            </Button>
                        )}
                    </Box>
                </Box>

                {/* Days of the week and stars */}
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
                                <Icon
                                    as={StarIcon}
                                    // color={active[i] === 0 ? 'gray.300' : `rgba(255,255,${255 - 255 * (progress_days[i] / 100)}, 1)`}
                                    color={active[i] === 0 ? 'gray.300' : `rgba(0,0,${255 * (progress_days[i] / 100)}, ${(progress_days[i] / 100)})`}
                                    boxSize={6}
                                />
                            </VStack>
                        ))}
                    </HStack>
                </Box>
            </Box>
        </Box>
    );
}

export default ProgressBoard;
