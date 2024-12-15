import React, { useState, useEffect } from 'react';
import { StarIcon, AtSignIcon } from '@chakra-ui/icons';
import { Icon } from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/react';
import { useNavigate, useLocation } from '@tanstack/react-router';
import { useRouter } from '@tanstack/react-router';
import Detailed_Ex_Modal from './Detailed_Ex_Modal.component';
import {
    Box,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Flex,
    Heading,
    Text,
    useToast,
    Tooltip
} from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
// import { useSelector } from 'react-redux';
import { userSessionToken } from '../context/user';
import apiInstance from '../instance/apiInstance';


import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button } from '@chakra-ui/react';
import { Table, TableCaption, Thead, Tbody, Tfoot, Tr, Th, Td, UnorderedList, ListItem } from '@chakra-ui/react';
const TrainingCard = () => {
    const location = useLocation();
    const { program } = location.state || {};
    console.log(program);
    // const sessionToken = useSelector(userSessionToken);
    const toast = useToast();
    const queryClient = useQueryClient();
    const [isUserJoined, setIsUserJoined] = useState(false);

    useEffect(() => {
        if (program?.joinedStatus) {
            setIsUserJoined(program.joinedStatus !== 'LEFT');
        }
    }, [program]);

    // Join a program Mutation
    const { mutate: joinProgram } = useMutation(
        {
            mutationFn: async (programId) => {
                const response = await apiInstance(sessionToken).post(`api/training-programs/${programId}/join`);
                toast({
                    title: 'Joined the program',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                });
                return response.data;
            },
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['training-programs'] });
            },
            onError: () => {
                toast({
                    title: 'An error occurred.',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                });
            },
        }
    );
    // Unjoin a program Mutation
    const { mutate: unjoinProgram } = useMutation(
        {
            mutationFn: async (programId) => {
                const response = await apiInstance(sessionToken).delete(`api/training-programs/${programId}/leave`);
                toast({
                    title: 'Left the program',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                });
                return response.data;
            },
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['training-programs'] });
            },
            onError: () => {
                toast({
                    title: 'An error occurred.',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                });
            },
        }
    );






    const weekColors = ['#f7f9fc', '#e3f2fd', '#e8f5e9', '#fff3e0', '#ede7f6'];
    const { isOpen, onOpen, onClose } = useDisclosure();
    const navigate = useNavigate();
    const router = useRouter();
    // State to track the selected exercise ID
    const [selectedExerciseId, setSelectedExerciseId] = useState(null);

    const handleStartSession = (exerciseId) => {
        // Set the selected exercise ID
        setSelectedExerciseId(exerciseId);
        // Open the modal
        onOpen();
    };



    const renderRatingStars = (rating) => {
        return (
            <div className="flex items-center justify-center space-x-4">
                <div className="flex items-center">
                    {Array.from({ length: 5 }, (_, i) => (
                        <StarIcon
                            key={i}
                            className={`h-4 w-4 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
                            fill={i < rating ? 'currentColor' : 'none'}
                        />
                    ))}
                    <span className="ml-2 text-sm text-gray-600">({rating}/5)</span>
                </div>
                <span className="text-sm text-gray-500">
                    {program.ratingCount} ratings
                </span>
            </div>
        );
    };

    const renderLevelTag = (level) => {
        const colorSchemes = {
            "BEGINNER": "bg-green-50 text-green-600",
            "INTERMEDIATE": "bg-orange-50 text-orange-600",
            "ADVANCED": "bg-red-50 text-red-600"
        };
        return (
            <span className={`
                px-2 py-1 
                rounded-full 
                text-xs 
                font-semibold 
                inline-flex 
                items-center 
                ${colorSchemes[level.toUpperCase()] || 'bg-gray-100 text-gray-600'}
            `}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Level: {level}
            </span>
        );
    };


    return (

        <div className="w-full max-w-[60%] mx-auto p-4 bg-white shadow-lg rounded-lg text-sm">

            < h1 className="
            text-2xl
            font-extrabold
            text-center
            mb-6
            text-gray-800
            tracking-tight
            text-[#805AD5]
            ">
                {program.title}
            </h1>

            {/* Line Under Title */}
            <hr className="mb-4 border-gray-300" />


            <div className=" flex-wrap items-center space-x-2 space-y-2 mb-3">
                {renderLevelTag(program.level)}

                <span className="
                    px-2 py-1 
                    bg-blue-50 
                    text-blue-600 
                    rounded-full 
                    text-xs 
                    font-semibold 
                    inline-flex 
                    items-center
                ">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                    Type: {program.type}
                </span>

                <span className="
                    px-2 py-1 
                    bg-gray-50 
                    text-gray-600 
                    rounded-full 
                    text-xs 
                    font-semibold 
                    inline-flex 
                    items-center
                ">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                    Created @ {program.createdAt.split('T')[0]}
                </span>

                <span className="
                    inline-flex 
                    items-center 
                    px-2 
                    py-1
                    bg-red-50 
                    text-red-600 
                    rounded-full 
                    text-xs 
                    font-semibold
                ">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Trainer: {program.trainer}
                </span>


            </div>

            {/* Description */}
            <p className="
                text-center 
                text-xs 
                text-gray-600 
                mb-6 
                max-w-2xl 
                mx-auto 
                leading-relaxed
            ">
                {program.description}
            </p>

            {/* Rating */}
            <div className="flex justify-center mb-6">
                {renderRatingStars(program.rating)}
            </div>

            {/* Weeks Table and Commit Button - Unchanged */}
            <div className="bg-white shadow-md rounded-lg overflow-hidden mb-4">
                <Table variant="simple" width="100%">
                    <Thead>
                        <Tr>
                            <Th>Week</Th>
                            <Th>Workout</Th>
                            <Th>Exercise</Th>
                            <Th></Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {program.weeks.map((week, weekIndex) => {
                            let displayedWeek = false; // Track if the week label has been displayed
                            return week.workouts.map((workout) => {
                                let displayedWorkout = false; // Track if the workout label has been displayed
                                return workout.workoutExercises.map((exerciseob, index) => (
                                    <Tr key={exerciseob.id} bgColor={weekColors[weekIndex % weekColors.length]}>
                                        <Td>
                                            {!displayedWeek && `Week ${week.weekNumber}`}
                                            {displayedWeek = true}
                                        </Td>
                                        <Td>
                                            {!displayedWorkout && workout.name}
                                            {displayedWorkout = true}
                                        </Td>
                                        <Td>{exerciseob.exercise.name} : {exerciseob.completedSets}</Td>
                                        <Td>
                                            <Button onClick={() => handleStartSession(exerciseob.id)} colorScheme="green" variant="solid">
                                                Start Session!
                                            </Button>
                                        </Td>
                                    </Tr>
                                ));
                            });
                        })}
                    </Tbody>
                    <Tfoot></Tfoot>
                </Table>
            </div>

            {/* 
    <Button colorScheme="purple" variant="solid"
                mb="20px"
                width="500px"
                m="auto"
                display="block">
                Commit to Program
            </Button>
             */}

            <Tooltip
                label={
                    isUserJoined ? 'Leave the program' : 'Join the program'
                }
            >
                <Button
                    flex='1'
                    variant='ghost'
                    colorScheme='purple'
                    onClick={() => {
                        if (!isUserJoined) {
                            joinProgram(program.id);
                        } else {
                            unjoinProgram(program.id);
                        }
                    }}
                >
                    {isUserJoined ? 'Leave' : 'Join'}
                </Button>
            </Tooltip>
            <Detailed_Ex_Modal
                isOpen={isOpen}
                onClose={onClose}
                data={program}
                excersizeID={selectedExerciseId}
            />
        </div >

    );
};

export default TrainingCard;
