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
    Image,
    Box,
    VStack,
    HStack,
    Text,
    Divider,
    UnorderedList,
    ListItem,
    Tag,
    TagLabel,
    TagLeftIcon
} from '@chakra-ui/react';
import { InfoIcon, StarIcon, RepeatIcon, ArrowRightIcon, SettingsIcon } from '@chakra-ui/icons';

const Detailed_Ex_Modal = ({ isOpen, onClose, data, weekID, workoutID, excersizeID }) => {
    const getDetailsByID = (weekID, workoutID, exerciseID) => {
        const current_week = data.weeks.find(week => week.id === weekID);
        if (!current_week) return { current_week: null, current_workout: null, current_ex: null };

        const current_workout = current_week.workouts.find(workout => workout.id === workoutID);
        if (!current_workout) return { current_week, current_workout: null, current_ex: null };

        const current_ex = current_workout.workoutExercises.find(ex => ex.id === exerciseID) || null;

        return { current_week, current_workout, current_ex };
    };

    const { current_week, current_workout, current_ex } = getDetailsByID(weekID, workoutID, excersizeID);
    const exercise = current_ex.exercise;

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="xl">
            <ModalOverlay />
            <ModalContent>
                <ModalHeader
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                >
                    <Text fontWeight="bold" fontSize="2xl">{exercise.name}</Text>
                    <HStack>
                        <Tag colorScheme="blue" variant="outline">
                            <TagLeftIcon as={StarIcon} />
                            <TagLabel>Week {current_week.weekNumber}</TagLabel>
                        </Tag>
                        <Tag colorScheme="green" variant="outline">
                            <TagLeftIcon as={StarIcon} />
                            <TagLabel>Workout {current_workout.workoutNumber}</TagLabel>
                        </Tag>
                    </HStack>
                </ModalHeader>
                <ModalCloseButton />

                <ModalBody>
                    <VStack spacing={6} align="stretch">
                        {/* Exercise Image */}
                        <Box
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            borderWidth={2}
                            borderColor="gray.100"
                            borderRadius="lg"
                            p={4}
                        >
                            <Image
                                borderRadius="md"
                                boxSize="250px"
                                src={exercise.gifUrl}
                                alt={exercise.name}
                                objectFit="cover"
                            />
                        </Box>

                        {/* Exercise Details */}
                        <VStack align="stretch" spacing={4}>
                            <HStack spacing={4}>
                                <Tag colorScheme="purple" variant="subtle">
                                    <TagLeftIcon as={InfoIcon} />
                                    <TagLabel>Body Part: {exercise.bodyPart}</TagLabel>
                                </Tag>
                                <Tag colorScheme="red" variant="subtle">
                                    <TagLeftIcon as={ArrowRightIcon} />
                                    <TagLabel>Target Muscle: {exercise.targetMuscle}</TagLabel>
                                </Tag>
                            </HStack>

                            {/* Workout Details and Equipment */}
                            <HStack spacing={4}>
                                <Tag colorScheme="cyan" variant="subtle">
                                    <TagLeftIcon as={RepeatIcon} />
                                    <TagLabel>Sets: {current_ex.sets}</TagLabel>
                                </Tag>
                                <Tag colorScheme="teal" variant="subtle">
                                    <TagLeftIcon as={RepeatIcon} />
                                    <TagLabel>Reps: {current_ex.repetitions}</TagLabel>
                                </Tag>
                                <Tag colorScheme="pink" variant="subtle">
                                    <TagLeftIcon as={SettingsIcon} />
                                    <TagLabel>Equipment: {exercise.equipment}</TagLabel>
                                </Tag>
                            </HStack>

                            <Divider />

                            {/* Instructions */}
                            <Box>
                                <Text fontWeight="bold" mb={2}>Instructions:</Text>
                                <UnorderedList spacing={2}>
                                    {exercise.instructions.map((instruction, index) => (
                                        <ListItem key={index} color="gray.700">
                                            {instruction}
                                        </ListItem>
                                    ))}
                                </UnorderedList>
                            </Box>

                            {/* Secondary Muscles */}
                            {exercise.secondaryMuscles && exercise.secondaryMuscles.length > 0 && (
                                <Box>
                                    <Text fontWeight="bold" mb={2}>Secondary Muscles:</Text>
                                    <HStack>
                                        {exercise.secondaryMuscles.map((muscle, index) => (
                                            <Tag key={index} colorScheme="orange" variant="outline">
                                                <TagLabel>{muscle}</TagLabel>
                                            </Tag>
                                        ))}
                                    </HStack>
                                </Box>
                            )}
                        </VStack>
                    </VStack>
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme='blue' mr={3} onClick={onClose}>
                        Close
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default Detailed_Ex_Modal;