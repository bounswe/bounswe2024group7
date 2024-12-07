import React, { useEffect, useContext } from 'react';
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
} from "@chakra-ui/react";
import { useState } from 'react';
import { useSelector } from 'react-redux';
import Select from 'react-select';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { muscleGroups, locationType, programTypes } from '../constants/program';
import { UserContext } from '../context/UserContext';
import { AppContext } from '../context/AppContext';
import apiInstance from '../instance/apiInstance';

function CreateProgramModal({ isOpen, onClose }) {
    const sessionToken = useSelector((state) => state.user.sessionToken);

    const [title, setTitle] = useState('');
    const [exercises, setExercises] = useState([]);
    const [description, setDescription] = useState('');
    const [selectedExercise, setSelectedExercise] = useState('');
    const [exerciseSets, setExerciseSets] = useState('');
    const [exerciseReps, setExerciseReps] = useState('');

    const { user } = useContext(UserContext);
    const { exercises: exerciseOptions, isLoadingExercises } = useContext(AppContext);

    const {
        isOpen: isExerciseModalOpen,
        onOpen: onExerciseModalOpen,
        onClose: onExerciseModalClose,
    } = useDisclosure();

    const theme = useColorModeValue('light', 'dark');
    const selectComponentStyles = {
        control: (styles) => ({
            ...styles,
            backgroundColor: theme === 'light' ? 'white' : 'gray.700',
            color: theme === 'light' ? 'black' : 'white',
        }),
    };

    const toast = useToast();
    const queryClient = useQueryClient();

    const resetAllFields = () => {
        setTitle('');
        setDescription('');
        setExercises([]);
        setSelectedExercise('');
        setExerciseSets('');
        setExerciseReps('');
    };

    const createProgramMutation = useMutation({
        mutationFn: async () => {
            if (!user) {
                toast({
                    title: 'Not logged in.',
                    description: 'Please log in to create a post.',
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                });
                return;
            }

            if (!title || !description || exercises.length === 0) {
                toast({
                    title: 'Invalid program.',
                    description: 'Please fill in all fields.',
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                });
                return;
            }

            const response = await apiInstance(sessionToken).post('api/training-programs', {
                title,
                description,
                exercises,
            });

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

    const addExercise = () => {
        if (!selectedExercise || !exerciseSets || !exerciseReps) {
            toast({
                title: 'Invalid exercise.',
                description: 'Please fill in all fields.',
                status: 'error',
                duration: 9000,
                isClosable: true,
            });
            return;
        }

        setExercises([
            ...exercises,
            {
                id: selectedExercise ? selectedExercise.value : '',
                sets: exerciseSets,
                repetitions: exerciseReps,
            },
        ]);

        setExerciseSets('');
        setExerciseReps('');
        setSelectedExercise('');
        onExerciseModalClose();
    };

    const onCloseReset = () => {
        resetAllFields();
        onClose();
    }

    return (
        <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onCloseReset} size="3xl">
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Create a new program</ModalHeader>
                <ModalCloseButton />
                <ModalBody display="flex" flexDirection="column" gap={4}>
                    <FormControl id="title">
                        <FormLabel>Title</FormLabel>
                        <Input
                            type="text"
                            focusBorderColor="purple.500"
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </FormControl>
                    <FormControl id="content">
                        <FormLabel>Description</FormLabel>
                        <Textarea
                            focusBorderColor="purple.500"
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </FormControl>
                    <FormControl id="exercises">
                        <FormLabel>Exercises</FormLabel>
                        <ul>
                            {exercises.map((exercise, index) => (
                                <li key={index}>
                                    {exercise.name} - {exercise.sets} sets of{' '}
                                    {exercise.repetitions} reps for {exercise.muscleGroup}
                                </li>
                            ))}
                        </ul>
                    </FormControl>
                    <Button colorScheme="purple" onClick={onExerciseModalOpen}>
                        Add Exercises
                    </Button>
                </ModalBody>

                <ModalFooter>
                    <Button
                        colorScheme="purple"
                        mr={3}
                        onClick={() => createProgramMutation.mutate()}
                    >
                        Save
                    </Button>
                    <Button
                        variant="ghost"
                        onClick={() => {
                            onCloseReset();
                        }}
                    >
                        Cancel
                    </Button>
                </ModalFooter>
            </ModalContent>

            <Modal blockScrollOnMount={false} isOpen={isExerciseModalOpen} onClose={onExerciseModalClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Add Exercises</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl id="exerciseName">
                            <FormLabel>Exercise Name</FormLabel>
                            <Select
                                options={exerciseOptions.map((exercise) => ({
                                    label: exercise.name,
                                    value: exercise.id,
                                }))}
                                isLoading={isLoadingExercises}
                                styles={selectComponentStyles}
                                onChange={(selected) => setSelectedExercise(selected)}
                            />
                        </FormControl>
                        <FormControl id="exerciseSets">
                            <FormLabel>Sets</FormLabel>
                            <Input
                                type="number"
                                focusBorderColor="purple.500"
                                onChange={(e) => setExerciseSets(e.target.value)}
                            />
                        </FormControl>
                        <FormControl id="exerciseReps">
                            <FormLabel>Reps</FormLabel>
                            <Input
                                type="number"
                                focusBorderColor="purple.500"
                                onChange={(e) => setExerciseReps(e.target.value)}
                            />
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="purple" mr={3} onClick={addExercise}>
                            Add
                        </Button>
                        <Button variant="ghost" onClick={onExerciseModalClose}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Modal>
    );
}

export default CreateProgramModal;
