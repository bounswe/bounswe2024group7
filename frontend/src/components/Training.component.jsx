import React, { useState, useEffect } from 'react';
import { StarIcon, AtSignIcon } from '@chakra-ui/icons';
import { Icon } from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/react';
import { useNavigate, useLocation } from '@tanstack/react-router';
import { useRouter } from '@tanstack/react-router';
import apiInstance from '../instance/apiInstance';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import Detailed_Ex_Modal from './Detailed_Ex_Modal.component';
import { userProfile, userSessionToken } from '../context/user';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from '@chakra-ui/react';
import { Table, TableCaption, Thead, Tbody, Tfoot, Tr, Th, Td, UnorderedList, ListItem } from '@chakra-ui/react';
import PlusIcon from '../icons/PlusIcon';
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
    Tooltip,
    Spinner,
    Button
} from '@chakra-ui/react';

const renderRatingStars = (rating, ratingCount) => {
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
                {ratingCount} ratings
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


const TrainingCard = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const programID = queryParams.get("trainingId");

    const [trainingProgram, setTrainingProgram] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isUserJoined, setIsUserJoined] = useState(false);

    const sessionToken = useSelector(userSessionToken);
    const user = useSelector(userProfile);
    console.log(user);
    const queryClient = useQueryClient();
    const toast = useToast();

    const weekColors = ['#f7f9fc', '#e3f2fd', '#e8f5e9', '#fff3e0', '#ede7f6'];
    const { isOpen, onOpen, onClose } = useDisclosure();
    const navigate = useNavigate();
    const [selectedExerciseId, setSelectedExerciseId] = useState(null);

    // Join to a program Mutation
    const { mutate: joinProgram } = useMutation({
        mutationFn: async (postId) => {
            const response = await apiInstance(sessionToken).post(`api/training-programs/${postId}/join`)

            toast({
                title: 'Joined the program',
                status: 'success',
                duration: 3000,
                isClosable: true,
            })

            return response.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['training-programs'] })
            queryClient.invalidateQueries({ queryKey: ['user'] })
            setIsUserJoined(true)
        },
        onError: (error) => {
            console.log(error)
            toast({
                title: 'An error occurred.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
        },
    })

    // Unjoin to a program Mutation
    const { mutate: unjoinProgram } = useMutation({
        mutationFn: async (postId) => {
            const response = await apiInstance(sessionToken).delete(`api/training-programs/${postId}/leave`)

            toast({
                title: 'Unjoined the program',
                status: 'success',
                duration: 3000,
                isClosable: true,
            })

            return response.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['training-programs'] })
            queryClient.invalidateQueries({ queryKey: ['user'] })
            setIsUserJoined(false)
        },
        onError: (error) => {
            console.log(error)
            toast({
                title: 'An error occurred.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
        },
    })

    useEffect(() => {
        const fetchTrainingProgram = async () => {
            if (!programID) {
                setError(new Error('No program ID provided'));
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                // Fetch the training program details
                const response = await apiInstance(sessionToken).get(
                    `/api/training-programs/${programID}`,
                    {
                        headers: { 'Content-Type': 'application/json' },
                    }
                );
                // console.log(user.profile.username);
                // Check if user has joined programs
                if (user) {
                    const joinedProgramsResponse = await apiInstance(sessionToken).get(
                        `/api/training-programs/joined/${user.profile.username}`
                    );
                    // console.log(joinedProgramsResponse);
                    // Check if the current program is in the user's joined programs
                    const isJoined = joinedProgramsResponse.data.some(
                        program => program.id === parseInt(programID)
                    );
                    setIsUserJoined(isJoined);
                }

                if (!response.data) {
                    throw new Error('No training program data received');
                }

                setTrainingProgram(response.data);
                setError(null);
            } catch (error) {
                console.error('Error fetching training program:', error);
                toast({
                    title: 'Failed to fetch training program details',
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                });
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchTrainingProgram();
    }, [programID, sessionToken, user]);

    // Loading state
    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <Spinner size="xl" />
            </Box>
        );
    }

    // Error state
    if (error || !trainingProgram) {
        return (
            <Box textAlign="center" p={10}>
                <Text color="red.500" fontSize="xl">
                    {error?.message || 'Unable to load training program'}
                </Text>
            </Box>
        );
    }

    const handleStartSession = (exerciseId) => {
        setSelectedExerciseId(exerciseId);
        onOpen();
    };


    console.log(isUserJoined);

    return (
        <div className="w-full max-w-[60%] mx-auto p-4 bg-white shadow-lg rounded-lg text-sm">

            <h1 className="
            text-2xl
            font-extrabold
            text-center
            mb-6
            text-gray-800
            tracking-tight
            text-[#805AD5]">
                {trainingProgram.title}
            </h1>

            {/* Line Under Title */}
            <hr className="mb-4 border-gray-300" />


            <div className=" flex-wrap items-center space-x-2 space-y-2 mb-3">
                {renderLevelTag(trainingProgram.level)}

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
                    Type: {trainingProgram.type}
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
                    Created @ {trainingProgram.createdAt.split('T')[0]}
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
                    Trainer: {trainingProgram.trainer}
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
                {trainingProgram.description}
            </p>

            {/* Rating */}
            <div className="flex justify-center mb-6">
                {renderRatingStars(trainingProgram.rating, trainingProgram.ratingCount)}
            </div>

            {/* Join/Unjoin Button Section */}
            <div className="flex justify-center mb-4">
                <Tooltip
                    label={
                        user && trainingProgram.trainer === user.username ? null : (
                            isUserJoined ? 'Leave the program' : 'Join the program'
                        )
                    }
                >
                    <Button
                        variant='ghost'
                        leftIcon={isUserJoined ? null : <PlusIcon />}
                        colorScheme='purple'
                        onClick={() => {
                            if (user) {
                                if (!isUserJoined) {
                                    joinProgram(programID)
                                } else {
                                    unjoinProgram(programID)
                                }
                            } else {
                                toast({
                                    title: 'You need to login to join a program',
                                    status: 'error',
                                    duration: 3000,
                                    isClosable: true,
                                })
                            }
                        }}
                        disabled={
                            user && trainingProgram.trainer === user.username
                            || joinProgram.isLoading
                            || unjoinProgram.isLoading
                        }
                    >
                        {
                            user && trainingProgram.trainer === user.username ? 'You are the trainer' : (
                                isUserJoined ? 'Joined' : 'Join'
                            )
                        }
                    </Button>
                </Tooltip>
            </div>

            {/* Weeks Table */}
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
                        {trainingProgram.weeks.map((week, weekIndex) => {
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

                                            {isUserJoined && user && (
                                                <Button
                                                    onClick={() => handleStartSession(exerciseob.id)}
                                                    colorScheme="green"
                                                    variant="solid"
                                                >
                                                    Start Session!
                                                </Button>
                                            )}
                                        </Td>
                                    </Tr>
                                ));
                            });
                        })}
                    </Tbody>
                    <Tfoot></Tfoot>
                </Table>
            </div>

            <Detailed_Ex_Modal
                isOpen={isOpen}
                onClose={onClose}
                data={trainingProgram}
                excersizeID={selectedExerciseId}
            />
        </div>
    );
};

export default TrainingCard;
