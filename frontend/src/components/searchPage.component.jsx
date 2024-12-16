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

// Mapping between exercise muscles and body highlighter muscles
const muscleMapping = {
    // Mapping to 'trapezius'
    'TRAPEZIUS': 'trapezius',
    'TRAPS': 'trapezius',
    
    // Mapping to 'upper-back'
    'UPPER_BACK': 'upper-back',
    'LATISSIMUS_DORSI': 'upper-back',
    'LATS': 'upper-back',
    'RHOMBOIDS': 'upper-back',
    
    // Mapping to 'lower-back'
    'LOWER_BACK': 'lower-back',
    'BACK': 'lower-back',
    
    // Mapping to 'chest'
    'CHEST': 'chest',
    'PECTORALS': 'chest',
    'UPPER_CHEST': 'chest',
    
    // Mapping to 'biceps'
    'BICEPS': 'biceps',
    'BRACHIALIS': 'biceps',
    
    // Mapping to 'triceps'
    'TRICEPS': 'triceps',
    
    // Mapping to 'forearm'
    'FOREARMS': 'forearm',
    'GRIP_MUSCLES': 'forearm',
    'WRISTS': 'forearm',
    'WRIST_EXTENSORS': 'forearm',
    'WRIST_FLEXORS': 'forearm',
    
    // Mapping to deltoids
    'DELTOIDS': 'front-deltoids',
    'DELTS': 'front-deltoids',
    'SHOULDERS': 'front-deltoids',
    'REAR_DELTOIDS': 'back-deltoids',
    
    // Mapping to 'abs'
    'ABDOMINALS': 'abs',
    'ABS': 'abs',
    'CORE': 'abs',
    'LOWER_ABS': 'abs',
    
    // Mapping to 'obliques'
    'OBLIQUES': 'obliques',
    
    // Mapping to leg muscles
    'ADDUCTORS': 'adductor',
    'INNER_THIGHS': 'adductor',
    'GROIN': 'adductor',
    'HAMSTRINGS': 'hamstring',
    'QUADRICEPS': 'quadriceps',
    'QUADS': 'quadriceps',
    'ABDUCTORS': 'abductors',
    'CALVES': 'calves',
    'SOLEUS': 'calves',
    'GLUTES': 'gluteal',
    
    // Mapping to head/neck
    'STERNOCLEIDOMASTOID': 'neck',
    
    // Additional muscles that don't have direct mappings will use their closest group
    'SERRATUS_ANTERIOR': 'chest',
    'ROTATOR_CUFF': 'front-deltoids',
    'LEVATOR_SCAPULAE': 'neck',
    'HIP_FLEXORS': 'gluteal',
    'SPINE': 'lower-back',
    'CARDIOVASCULAR_SYSTEM': null, // No direct mapping for cardio
    'ANKLE_STABILIZERS': 'calves',
    'ANKLES': 'calves',
    'FEET': 'calves',
    'HANDS': 'forearm',
    'SHINS': 'calves'
};

// Create reverse mapping for filtering
const reverseMapping = {};
Object.entries(muscleMapping).forEach(([exerciseMuscle, highlighterMuscle]) => {
    if (highlighterMuscle) {
        if (!reverseMapping[highlighterMuscle]) {
            reverseMapping[highlighterMuscle] = [];
        }
        reverseMapping[highlighterMuscle].push(exerciseMuscle);
    }
});

const SearchPage = () => {
    const { colorMode } = useColorMode();
    const { exercises, isLoadingExercises } = useContext(AppContext);
    const [selectedMuscle, setSelectedMuscle] = useState(null);

    // Data for highlighting muscles
    const highlightData = selectedMuscle ? [
        {
            name: "Selected Muscle",
            muscles: [selectedMuscle]
        }
    ] : [];

    // Handle muscle click from the body highlighter
    const handleMuscleClick = (data) => {
        if (data && data.muscle) {
            setSelectedMuscle(prevMuscle => 
                prevMuscle === data.muscle ? null : data.muscle
            );
        }
    };

    // Filter exercises based on selected muscle
    const filteredExercises = selectedMuscle ? exercises.filter(exercise => {
        const matchingMuscles = reverseMapping[selectedMuscle] || [];
        return matchingMuscles.some(muscle => 
            exercise.targetMuscle === muscle ||
            exercise.secondaryMuscles.includes(muscle)
        );
    }) : [];

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
                                Exercises for {selectedMuscle.split('-').map(word => 
                                    word.charAt(0).toUpperCase() + word.slice(1)
                                ).join(' ')}
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