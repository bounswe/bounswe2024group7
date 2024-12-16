import React, { useEffect, useContext, useState } from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    FormControl,
    FormLabel,
    Input,
    Textarea,
    useColorModeValue,
    useDisclosure,
    useToast,
    VStack,
    HStack,
    Box,
    Text,
    IconButton,
    NumberInput,
    NumberInputField,
} from "@chakra-ui/react";
import { AddIcon, DeleteIcon } from '@chakra-ui/icons';
import { useSelector } from 'react-redux';
import Select from 'react-select';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UserContext } from '../context/UserContext';
import { AppContext } from '../context/AppContext';
import apiInstance from '../instance/apiInstance';

const programLevelOptions = [
    { value: 'BEGINNER', label: 'Beginner' },
    { value: 'INTERMEDIATE', label: 'Intermediate' },
    { value: 'ADVANCED', label: 'Advanced' }
];

const programTypeOptions = [
    { value: 'CARDIO', label: 'Cardio' },
    { value: 'BODY_BUILDING', label: 'Body Building' },
    { value: 'FLEXIBILITY', label: 'Flexibility' },
    { value: 'BALANCE', label: 'Balance' }
];

// Exercise Modal Component
function ExerciseModal({ isOpen, onClose, onAdd, exercises }) {
    const [selectedExercise, setSelectedExercise] = useState(null);
    const [sets, setSets] = useState('');
    const [reps, setReps] = useState('');

    const theme = useColorModeValue('light', 'dark');
    const selectComponentStyles = {
        control: (styles) => ({
            ...styles,
            backgroundColor: theme === 'light' ? 'white' : 'gray.700',
            color: theme === 'light' ? 'black' : 'white',
        }),
    };

    const handleAdd = () => {
        if (selectedExercise && sets && reps) {
            const exercise = exercises.find(ex => ex.id === selectedExercise.value);
            onAdd({
                exerciseId: exercise.id,
                name: exercise.name,
                sets: parseInt(sets),
                repetitions: parseInt(reps)
            });
            handleClose();
        }
    };

    const handleClose = () => {
        setSelectedExercise(null);
        setSets('');
        setReps('');
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={handleClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Add Exercise</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <FormControl mb={4}>
                        <FormLabel>Exercise</FormLabel>
                        <Select
                            options={exercises.map(exercise => ({
                                value: exercise.id,
                                label: exercise.name
                            }))}
                            value={selectedExercise}
                            onChange={setSelectedExercise}
                            styles={selectComponentStyles}
                        />
                    </FormControl>

                    <FormControl mb={4}>
                        <FormLabel>Sets</FormLabel>
                        <NumberInput min={1} value={sets} onChange={(value) => setSets(value)}>
                            <NumberInputField />
                        </NumberInput>
                    </FormControl>

                    <FormControl mb={4}>
                        <FormLabel>Repetitions</FormLabel>
                        <NumberInput min={1} value={reps} onChange={(value) => setReps(value)}>
                            <NumberInputField />
                        </NumberInput>
                    </FormControl>
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={handleAdd}>
                        Add Exercise
                    </Button>
                    <Button onClick={handleClose}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}

// Main CreateProgramModal Component
function CreateProgramModal({ isOpen, onClose }) {
    const sessionToken = useSelector((state) => state.user.sessionToken);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [programLevel, setProgramLevel] = useState(null);
    const [programType, setProgramType] = useState(null);
    const [interval, setInterval] = useState(1);
    const [weeks, setWeeks] = useState([{ workouts: [] }]);
    
    // State for exercise modal
    const [isExerciseModalOpen, setIsExerciseModalOpen] = useState(false);
    const [currentWeekIndex, setCurrentWeekIndex] = useState(null);
    const [currentWorkoutIndex, setCurrentWorkoutIndex] = useState(null);

    const { user } = useContext(UserContext);
    const { exercises: exerciseOptions, isLoadingExercises } = useContext(AppContext);
    const theme = useColorModeValue('light', 'dark');
    const toast = useToast();
    const queryClient = useQueryClient();

    const selectComponentStyles = {
        control: (styles) => ({
            ...styles,
            backgroundColor: theme === 'light' ? 'white' : 'gray.700',
            color: theme === 'light' ? 'black' : 'white',
        }),
    };

    const resetAllFields = () => {
        setTitle('');
        setDescription('');
        setProgramLevel(null);
        setProgramType(null);
        setInterval(1);
        setWeeks([{ workouts: [] }]);
    };

    const addWeek = () => {
        setWeeks([...weeks, { workouts: [] }]);
    };

    const addWorkout = (weekIndex) => {
        const newWeeks = [...weeks];
        const workoutNumber = newWeeks[weekIndex].workouts.length + 1;
        newWeeks[weekIndex].workouts.push({
            name: `Workout ${workoutNumber}`,
            exercises: []
        });
        setWeeks(newWeeks);
    };

    const openExerciseModal = (weekIndex, workoutIndex) => {
        setCurrentWeekIndex(weekIndex);
        setCurrentWorkoutIndex(workoutIndex);
        setIsExerciseModalOpen(true);
    };

    const handleAddExercise = (exercise) => {
        const newWeeks = [...weeks];
        newWeeks[currentWeekIndex].workouts[currentWorkoutIndex].exercises.push(exercise);
        setWeeks(newWeeks);
    };

    const removeWeek = (weekIndex) => {
        const newWeeks = weeks.filter((_, index) => index !== weekIndex);
        setWeeks(newWeeks);
    };

    const removeWorkout = (weekIndex, workoutIndex) => {
        const newWeeks = [...weeks];
        newWeeks[weekIndex].workouts.splice(workoutIndex, 1);
        setWeeks(newWeeks);
    };

    const removeExercise = (weekIndex, workoutIndex, exerciseIndex) => {
        const newWeeks = [...weeks];
        newWeeks[weekIndex].workouts[workoutIndex].exercises.splice(exerciseIndex, 1);
        setWeeks(newWeeks);
    };

    const createProgramMutation = useMutation({
        mutationFn: async () => {
            if (!user) {
                toast({
                    title: 'Not logged in.',
                    description: 'Please log in to create a program.',
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                });
                return;
            }

            if (!title || !description || !programLevel || !programType || weeks.length === 0) {
                toast({
                    title: 'Invalid program.',
                    description: 'Please fill in all required fields.',
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                });
                return;
            }

            // Transform the data to match the API structure
            const requestData = {
                title,
                description,
                type: programType.value,
                level: programLevel.value,
                interval,
                weeks: weeks.map(week => ({
                    workouts: week.workouts.map(workout => ({
                        name: workout.name,
                        exercises: workout.exercises.map(exercise => ({
                            exerciseId: exercise.exerciseId,
                            repetitions: exercise.repetitions,
                            sets: exercise.sets
                        }))
                    }))
                }))
            };

            const response = await apiInstance(sessionToken).post('api/training-programs', requestData);

            toast({
                title: 'Program created.',
                description: 'Your program has been created successfully.',
                status: 'success',
                duration: 9000,
                isClosable: true,
            });

            return response.data;
        },
        onError: (error) => {
            toast({
                title: 'An error occurred.',
                description: error.message,
                status: 'error',
                duration: 9000,
                isClosable: true,
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['training-programs']);
            resetAllFields();
            onClose();
        },
    });

    const handleClose = () => {
        resetAllFields();
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={handleClose} size="4xl">
            <ModalOverlay />
            <ModalContent maxH="90vh" overflowY="auto">
                <ModalHeader>Create Training Program</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <VStack spacing={4}>
                        <FormControl isRequired>
                            <FormLabel>Title</FormLabel>
                            <Input
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Program Title"
                            />
                        </FormControl>

                        <FormControl isRequired>
                            <FormLabel>Description</FormLabel>
                            <Textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Program Description"
                            />
                        </FormControl>

                        <HStack width="100%" spacing={4}>
                            <FormControl isRequired>
                                <FormLabel>Level</FormLabel>
                                <Select
                                    options={programLevelOptions}
                                    value={programLevel}
                                    onChange={setProgramLevel}
                                    styles={selectComponentStyles}
                                    placeholder="Select Level"
                                />
                            </FormControl>

                            <FormControl isRequired>
                                <FormLabel>Type</FormLabel>
                                <Select
                                    options={programTypeOptions}
                                    value={programType}
                                    onChange={setProgramType}
                                    styles={selectComponentStyles}
                                    placeholder="Select Type"
                                />
                            </FormControl>

                            <FormControl isRequired>
                                <FormLabel>
                                    Rest Interval (days)
                                </FormLabel>
                                <NumberInput min={1} value={interval} onChange={(value) => setInterval(parseInt(value))}>
                                    <NumberInputField />
                                </NumberInput>
                            </FormControl>
                        </HStack>

                        {weeks.map((week, weekIndex) => (
                            <Box key={weekIndex} w="100%" p={4} borderWidth="1px" borderRadius="lg">
                                <HStack justifyContent="space-between" mb={4}>
                                    <Text fontSize="lg" fontWeight="bold">Week {weekIndex + 1}</Text>
                                    <HStack>
                                        <Button size="sm" leftIcon={<AddIcon />} onClick={() => addWorkout(weekIndex)}>
                                            Add Workout
                                        </Button>
                                        <IconButton
                                            size="sm"
                                            icon={<DeleteIcon />}
                                            onClick={() => removeWeek(weekIndex)}
                                            aria-label="Remove week"
                                        />
                                    </HStack>
                                </HStack>

                                <VStack spacing={4} align="stretch">
                                    {week.workouts.map((workout, workoutIndex) => (
                                        <Box key={workoutIndex} p={3} borderWidth="1px" borderRadius="md">
                                            <HStack justifyContent="space-between" mb={2}>
                                                <Text fontSize="md" fontWeight="semibold">
                                                    Workout {workoutIndex + 1}
                                                </Text>
                                                <HStack>
                                                    <Button 
                                                        size="sm" 
                                                        onClick={() => openExerciseModal(weekIndex, workoutIndex)}
                                                    >
                                                        Add Exercise
                                                    </Button>
                                                    <IconButton
                                                        size="sm"
                                                        icon={<DeleteIcon />}
                                                        onClick={() => removeWorkout(weekIndex, workoutIndex)}
                                                        aria-label="Remove workout"
                                                    />
                                                </HStack>
                                            </HStack>

                                            {workout.exercises.map((exercise, exerciseIndex) => (
                                                <HStack key={exerciseIndex} mt={2}>
                                                    <Text flex={1}>{exercise.name}</Text>
                                                    <Text>{exercise.sets} sets x {exercise.repetitions} reps</Text>
                                                    <IconButton
                                                        size="sm"
                                                        icon={<DeleteIcon />}
                                                        onClick={() => removeExercise(weekIndex, workoutIndex, exerciseIndex)}
                                                        aria-label="Remove exercise"
                                                    />
                                                </HStack>
                                            ))}
                                        </Box>
                                    ))}
                                </VStack>
                            </Box>
                        ))}

                        <Button leftIcon={<AddIcon />} onClick={addWeek} width="100%">
                            Add Week
                        </Button>
                    </VStack>
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={() => createProgramMutation.mutate()}>
                        Create Program
                    </Button>
                    <Button onClick={handleClose}>Cancel</Button>
                </ModalFooter>
            </ModalContent>

            <ExerciseModal
                isOpen={isExerciseModalOpen}
                onClose={() => setIsExerciseModalOpen(false)}
                onAdd={handleAddExercise}
                exercises={exerciseOptions || []}
            />
        </Modal>
    );
}

export default CreateProgramModal;