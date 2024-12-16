import React from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    UnorderedList,
    ListItem,
    VStack,
    HStack,
    Tag,
    TagLabel
} from '@chakra-ui/react';

const Detailed_Workout_Modal = ({ isOpen, onClose, data, weekNumber, workoutNumber }) => {
    // Fetch the workout details for the specified week and workout number
    const getWorkoutByNumber = (weekNumber, workoutNumber) => {
        const week = data?.weeks?.find(week => week.weekNumber === weekNumber);
        return week?.workouts?.find(workout => workout.workoutNumber === workoutNumber);
    };

    const current_workout = getWorkoutByNumber(weekNumber, workoutNumber);

    if (!current_workout) {
        return (
            <Modal isOpen={isOpen} onClose={onClose} size="full">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Workout Details Not Found</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <p>No data available for the selected workout.</p>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" onClick={onClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        );
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="full">
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{data.title} | Week {weekNumber} | Workout {workoutNumber} Detailed Description</ModalHeader>
                <ModalCloseButton />
                <ModalBody overflowX="auto">
                    <Table variant="striped" size="lg" width="100%">
                        <Thead>
                            <Tr>
                                <Th>Exercise Name</Th>
                                <Th>Exercise Gif</Th>
                                <Th>Instructions</Th>
                                <Th>Exercise Tags</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {current_workout.workoutExercises.map((ex) => {
                                const exerciseDetails = ex.exercise;

                                return (
                                    <Tr key={ex.exerciseNumber}>
                                        {/* Exercise Name */}
                                        <Td>
                                            <VStack align="start">
                                                <strong>{exerciseDetails?.name || 'N/A'}</strong>
                                                <span>Sets: {ex.sets}</span>
                                                <span>Reps: {ex.repetitions}</span>
                                            </VStack>
                                        </Td>

                                        {/* Exercise Gif */}
                                        <Td>
                                            {exerciseDetails?.gifUrl ? (
                                                <img
                                                    src={exerciseDetails.gifUrl}
                                                    alt={exerciseDetails.name || 'Exercise Gif'}
                                                    style={{
                                                        width: '200px',
                                                        height: '200px',
                                                        objectFit: 'cover'
                                                    }}
                                                />
                                            ) : (
                                                'No Image Available'
                                            )}
                                        </Td>

                                        {/* Instructions */}
                                        <Td>
                                            <UnorderedList spacing={2}>
                                                {exerciseDetails?.instructions?.length ? (
                                                    exerciseDetails.instructions.map((instruction, index) => (
                                                        <ListItem key={index}>{instruction}</ListItem>
                                                    ))
                                                ) : (
                                                    <ListItem>No Instructions Available</ListItem>
                                                )}
                                            </UnorderedList>
                                        </Td>

                                        {/* Exercise Tags */}
                                        <Td>
                                            <VStack align="start" spacing={2}>
                                                {exerciseDetails?.bodyPart && (
                                                    <HStack>
                                                        <Tag colorScheme="blue">
                                                            <TagLabel>Body Part: {exerciseDetails.bodyPart}</TagLabel>
                                                        </Tag>
                                                    </HStack>
                                                )}
                                                {exerciseDetails?.targetMuscle && (
                                                    <HStack>
                                                        <Tag colorScheme="green">
                                                            <TagLabel>Target Muscle: {exerciseDetails.targetMuscle}</TagLabel>
                                                        </Tag>
                                                    </HStack>
                                                )}
                                                {exerciseDetails?.equipment && (
                                                    <HStack>
                                                        <Tag colorScheme="purple">
                                                            <TagLabel>Equipment: {exerciseDetails.equipment}</TagLabel>
                                                        </Tag>
                                                    </HStack>
                                                )}
                                                {exerciseDetails?.secondaryMuscles?.length > 0 && (
                                                    <HStack>
                                                        <Tag colorScheme="orange">
                                                            <TagLabel>
                                                                Secondary Muscles: {exerciseDetails.secondaryMuscles.join(', ')}
                                                            </TagLabel>
                                                        </Tag>
                                                    </HStack>
                                                )}
                                            </VStack>
                                        </Td>
                                    </Tr>
                                );
                            })}
                        </Tbody>
                    </Table>
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={onClose}>
                        Close
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default Detailed_Workout_Modal;
