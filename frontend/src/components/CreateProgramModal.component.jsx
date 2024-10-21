import React, { useEffect } from 'react'
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
    useDisclosure
} from "@chakra-ui/react"
import { useState } from 'react'
import { useSelector } from 'react-redux'
import {
    userProfile,
    userPassword,
    userSessionToken
} from '../context/user'
import Select from 'react-select'
import axios from 'axios'
import apiInstance from '../instance/apiInstance'
import { useToast } from '@chakra-ui/react'
import { useDispatch } from 'react-redux'
import { useContext } from 'react'
import { PostContext } from '../context/PostContext'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const programTypes = [
    { value: 'GROUP', label: 'Group' },
    { value: 'INDIVIDUAL', label: 'Individual' },
]

const muscleGroups = [
    { value: 'CHEST', label: 'Chest' },
    { value: 'BACK', label: 'Back' },
    { value: 'SHOULDERS', label: 'Shoulders' },
    { value: 'LEGS', label: 'Legs' },
    { value: 'ARMS', label: 'Arms' },
    { value: 'CORE', label: 'Core' },
]

const locationType = [
    { value: 'HOME', label: 'Home' },
    { value: 'GYM', label: 'Gym' },
    { value: 'OUTDOOR', label: 'Outdoors' },
]

function CreateProgramModal({
    isOpen,
    onClose
}) {
    const profile = useSelector(userProfile)
    const password = useSelector(userPassword)
    const sessionToken = useSelector(userSessionToken)

    const [title, setTitle] = useState('')
    const [programType, setProgramType] = useState('')
    const [exercises, setExercises] = useState([])
    const [location, setLocation] = useState('')
    const [description, setDescription] = useState('')

    const [exerciseName, setExerciseName] = useState('')
    const [exerciseSets, setExerciseSets] = useState('')
    const [exerciseReps, setExerciseReps] = useState('')
    const [exerciseMuscleGroup, setExerciseMuscleGroup] = useState('')

    const {
        isOpen: isExerciseModalOpen,
        onOpen: onExerciseModalOpen,
        onClose: onExerciseModalClose
    } = useDisclosure()

    const theme = useColorModeValue('light', 'dark')
    const selectComponentStyles = {
        control: (styles) => ({
            ...styles,
            backgroundColor: theme === 'light' ? 'white' : 'gray.700',
            color: theme === 'light' ? 'black' : 'white',
            border: '1px solid',
            borderColor: theme === 'light' ? 'gray.300' : 'gray.600',
            boxShadow: 'none',
            '&:hover': {
                borderColor: theme === 'light' ? 'gray.400' : 'gray.500',
            },
        }),
        option: (styles, { isFocused, isSelected }) => {
            return {
                ...styles,
                backgroundColor: isSelected
                    ? theme === 'light'
                        ? '#805AD5'
                        : '#6B46C1'
                    : isFocused
                        ? theme === 'light'
                            ? '#E9D8FD'
                            : '#4C1D95'
                        : 'transparent',
                color: isSelected
                    ? 'white'
                    : theme === 'light'
                        ? 'black'
                        : 'white',
                '&:active': {
                    backgroundColor: isSelected
                        ? theme === 'light'
                            ? '#805AD5'
                            : '#6B46C1'
                        : theme === 'light'
                            ? '#E9D8FD'
                            : '#4C1D95',
                    color: isSelected
                        ? 'white'
                        : theme === 'light'
                            ? 'black'
                            : 'white',
                },
            }
        },
        multiValue: (styles) => {
            return {
                ...styles,
                backgroundColor: theme === 'light' ? '#E9D8FD' : '#4A1D95',
            }
        },
        multiValueLabel: (styles) => {
            return {
                ...styles,
                color: theme === 'light' ? 'black' : 'white',
            }
        },
        multiValueRemove: (styles) => {
            return {
                ...styles,
                color: theme === 'light' ? 'black' : 'white',
                '&:hover': {
                    backgroundColor: theme === 'light' ? '#805AD5' : '#6B46C1',
                    color: theme === 'light' ? 'black' : 'white',
                },
            }
        },
        menu: (styles) => {
            return {
                ...styles,
                backgroundColor: theme === 'light' ? 'white' : '#1A202C',
                color: theme === 'light' ? 'black' : 'white',
            }
        }
    }

    const toast = useToast()
    const queryClient = useQueryClient()

    const createProgramMutation = useMutation(
        {
            mutationFn: async () => {
                if (!profile) {
                    toast({
                        title: 'Not logged in.',
                        description: 'Please log in to create a post.',
                        status: 'error',
                        duration: 9000,
                        isClosable: true,
                    })
                    return
                }

                if (!title || !description || !location || !programType) {
                    toast({
                        title: 'Invalid program.',
                        description: 'Please fill in all fields.',
                        status: 'error',
                        duration: 9000,
                        isClosable: true,
                    })
                    return
                }

                const response = await apiInstance(sessionToken).post('api/training-programs', {
                    title: title,
                    description: description,
                    locationType: location,
                    programType: programType,
                    exercises: exercises
                })

                toast({
                    title: 'Program created.',
                    description: 'Your program has been created successfully.',
                    status: 'success',
                    duration: 9000,
                    isClosable: true,
                })

                return response.data
            },
            onError: (error) => {
                toast({
                    title: 'An error occurred.',
                    description: error.message,
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                })
            },
            onSuccess: (data) => {
                queryClient.invalidateQueries(
                    {
                        queryKey: ['posts', 'training-programs', 'profile']
                    }
                )
                onClose()
            }

        }
    )

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}

            size="3xl"
        >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Create a new post</ModalHeader>
                <ModalCloseButton />
                <ModalBody
                    display="flex"
                    flexDirection="column"
                    gap={4}
                >
                    <FormControl id="title">
                        <FormLabel>Title</FormLabel>
                        <Input type="text"
                            focusBorderColor='purple.500'
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </FormControl>
                    <FormControl id="content">
                        <FormLabel>Description</FormLabel>
                        <Textarea
                            focusBorderColor='purple.500'
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </FormControl>
                    <FormControl id="location">
                        <FormLabel>Location</FormLabel>
                        <Select
                            options={locationType}
                            styles={selectComponentStyles}
                            onChange={(selected) => setLocation(selected.value)}
                        />
                    </FormControl>
                    <FormControl id="programType">
                        <FormLabel>Program Type</FormLabel>
                        <Select
                            options={programTypes}
                            styles={selectComponentStyles}
                            onChange={(selected) => setProgramType(selected.value)}
                        />
                    </FormControl>
                    <FormControl id="exercises">
                        <FormLabel>Exercises</FormLabel>
                        <ul>
                            {
                                exercises.map((exercise, index) => {
                                    return (
                                        <li key={index}>
                                            {exercise.name} - {exercise.sets} sets of {exercise.repetitions} reps for {exercise.muscleGroup}
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </FormControl>
                    <Button
                        colorScheme="purple"
                        onClick={() => {
                            onExerciseModalOpen()
                        }}
                    >
                        Add Exercises
                    </Button>
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme="purple" mr={3}
                        onClick={() => {
                            createProgramMutation.mutate()
                        }}
                    >
                        Save
                    </Button>
                    <Button variant="ghost"
                        onClick={() => {
                            setTitle('')
                            setDescription('')
                            setLocation('')
                            setProgramType('')
                            setExercises([])
                            onClose()
                        }}
                    >Cancel</Button>
                </ModalFooter>
            </ModalContent>
            <Modal
                isOpen={isExerciseModalOpen}
                onClose={onExerciseModalClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Add Exercises</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl id="exerciseName">
                            <FormLabel>Exercise Name</FormLabel>
                            <Input type="text"
                                focusBorderColor='purple.500'
                                onChange={(e) => setExerciseName(e.target.value)}
                            />
                        </FormControl>
                        <FormControl id="exerciseSets">
                            <FormLabel>Sets</FormLabel>
                            <Input type="number"
                                focusBorderColor='purple.500'
                                onChange={(e) => setExerciseSets(e.target.value)}
                            />
                        </FormControl>
                        <FormControl id="exerciseReps">
                            <FormLabel>Reps</FormLabel>
                            <Input type="number"
                                focusBorderColor='purple.500'
                                onChange={(e) => setExerciseReps(e.target.value)}
                            />
                        </FormControl>
                        <FormControl id="exerciseMuscleGroup">
                            <FormLabel>Muscle Group</FormLabel>
                            <Select
                                options={muscleGroups}
                                styles={selectComponentStyles}
                                onChange={(selected) => setExerciseMuscleGroup(selected.value)}
                            />
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="purple" mr={3}
                            onClick={() => {
                                if (!exerciseName || !exerciseSets || !exerciseReps || !exerciseMuscleGroup) {
                                    toast({
                                        title: 'Invalid exercise.',
                                        description: 'Please fill in all fields.',
                                        status: 'error',
                                        duration: 9000,
                                        isClosable: true,
                                    })
                                    return
                                }

                                setExercises([
                                    ...exercises,
                                    {
                                        name: exerciseName,
                                        sets: exerciseSets,
                                        repetitions: exerciseReps,
                                        muscleGroup: exerciseMuscleGroup
                                    }
                                ])
                                setExerciseName('')
                                setExerciseSets('')
                                setExerciseReps('')
                                setExerciseMuscleGroup('')
                                onExerciseModalClose()
                            }}
                        >
                            Add
                        </Button>
                        <Button variant="ghost"
                            onClick={onExerciseModalClose}
                        >Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Modal>
    )
}

export default CreateProgramModal