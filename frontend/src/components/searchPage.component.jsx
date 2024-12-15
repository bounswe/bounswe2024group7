import React, { useContext, useState } from 'react';
import Model from 'react-body-highlighter';
import {
    Box,
    Text,
    useColorMode,
    Grid,
    GridItem,
    VStack,
    Container,
    Heading,
    List,
    ListItem,
    Stack,
    Badge,
} from '@chakra-ui/react';
import { AppContext } from '../context/AppContext';

const SearchPage = () => {
    const { colorMode } = useColorMode();
    const { exercises, isLoadingExercises } = useContext(AppContext);
    const [selectedMuscle, setSelectedMuscle] = useState(null);
    console.log(exercises);

    // Data for highlighting muscles
    const highlightData = selectedMuscle ? [
        {
            name: "Selected Muscle",
            muscles: [selectedMuscle.toLowerCase().replace(/\s+/g, '')]
        }
    ] : [];

    // Function to convert muscle name format
    const formatMuscleNameForComparison = (muscleName) => {
        return muscleName.toUpperCase().replace(/\s+/g, '_');
    };

    // Handle muscle click
    const handleMuscleClick = (data) => {
        if (data && data.muscle) {
            // Format muscle name
            const muscleName = data.muscle
                .replace(/([A-Z])/g, ' $1')
                .replace(/^./, str => str.toUpperCase())
                .trim();
            
            // Toggle selection if clicking the same muscle
            setSelectedMuscle(prevMuscle => 
                prevMuscle === muscleName ? null : muscleName
            );
        }
    };

    // Filter exercises based on selected muscle
    const filteredExercises = selectedMuscle ? exercises.filter(exercise => 
        exercise.targetMuscle === formatMuscleNameForComparison(selectedMuscle) ||
        exercise.secondaryMuscles.includes(formatMuscleNameForComparison(selectedMuscle))
    ) : [];

    return (
        <Box 
            p={4}
            maxW="1200px" 
            mx="auto" 
            bg={colorMode === "light" ? "gray.50" : "gray.800"} 
            borderRadius="md"
            minH="calc(100vh - 100px)"
            display="flex"
            flexDirection="column"
        >
            <Container maxW="container.xl" flex="1" display="flex" flexDirection="column">
                <VStack spacing={4} flex="1">
                    <Heading size="lg" textAlign="center" mb={2}>
                        Exercise Search
                    </Heading>

                    <Grid 
                        templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
                        gap={4}
                        w="full"
                        alignItems="start"
                    >
                        <GridItem>
                            <VStack spacing={2}>
                                <Text fontSize="md" fontWeight="semibold">
                                    Front View
                                </Text>
                                <Box 
                                    width="100%" 
                                    display="flex" 
                                    justifyContent="center"
                                    height={{ base: "300px", md: "400px" }}
                                >
                                    <Model 
                                        onClick={handleMuscleClick}
                                        data={highlightData}
                                        highlightedColors={["#805AD5", "#6B46C1"]}
                                        style={{ 
                                            maxWidth: '100%',
                                            height: '100%',
                                            maxHeight: '100%'
                                        }}
                                    />
                                </Box>
                            </VStack>
                        </GridItem>

                        <GridItem>
                            <VStack spacing={2}>
                                <Text fontSize="md" fontWeight="semibold">
                                    Back View
                                </Text>
                                <Box 
                                    width="100%" 
                                    display="flex" 
                                    justifyContent="center"
                                    height={{ base: "300px", md: "400px" }}
                                >
                                    <Model 
                                        type="posterior"
                                        onClick={handleMuscleClick}
                                        data={highlightData}
                                        highlightedColors={["#805AD5", "#6B46C1"]}
                                        style={{ 
                                            maxWidth: '100%',
                                            height: '100%',
                                            maxHeight: '100%'
                                        }}
                                    />
                                </Box>
                            </VStack>
                        </GridItem>
                    </Grid>

                    {selectedMuscle && (
                        <Box 
                            w="full"
                            bg={colorMode === "light" ? "white" : "gray.700"}
                            borderRadius="md"
                            shadow="md"
                            p={4}
                            mt={4}
                        >
                            <Text 
                                fontSize="xl" 
                                fontWeight="bold" 
                                mb={4}
                                color="purple.500"
                            >
                                Exercises for {selectedMuscle}
                            </Text>
                            
                            {isLoadingExercises ? (
                                <Text textAlign="center">Loading exercises...</Text>
                            ) : filteredExercises.length > 0 ? (
                                <List spacing={3}>
                                    {filteredExercises.map((exercise) => (
                                        <ListItem 
                                            key={exercise.id}
                                            p={3}
                                            borderWidth="1px"
                                            borderRadius="md"
                                        >
                                            <Stack>
                                                <Text fontWeight="bold">
                                                    {exercise.name.charAt(0).toUpperCase() + exercise.name.slice(1)}
                                                </Text>
                                                <Stack direction="row" spacing={2}>
                                                    <Badge colorScheme="purple">
                                                        {exercise.equipment.replace(/_/g, ' ')}
                                                    </Badge>
                                                    <Badge colorScheme="purple" variant="outline">
                                                        {exercise.bodyPart.replace(/_/g, ' ')}
                                                    </Badge>
                                                </Stack>
                                                <List styleType="disc" pl={4}>
                                                    {exercise.instructions.map((instruction, idx) => (
                                                        <ListItem key={idx} fontSize="sm">
                                                            {instruction}
                                                        </ListItem>
                                                    ))}
                                                </List>
                                            </Stack>
                                        </ListItem>
                                    ))}
                                </List>
                            ) : (
                                <Text textAlign="center">No exercises found for {selectedMuscle}</Text>
                            )}
                        </Box>
                    )}

                    {!selectedMuscle && (
                        <Text 
                            color="gray.500" 
                            textAlign="center"
                            mt={2}
                            fontSize="sm"
                        >
                            Click on any muscle to see related exercises
                        </Text>
                    )}
                </VStack>
            </Container>
        </Box>
    );
};

export default SearchPage;