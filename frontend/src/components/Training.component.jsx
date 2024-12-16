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
import Detailed_Workout_Modal from './Detailed_Workout_Modal.component';
import { userProfile, userSessionToken } from '../context/user';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from '@chakra-ui/react';
import { Table, TableCaption, Thead, Tbody, Tfoot, Tr, Th, Td, UnorderedList, ListItem } from '@chakra-ui/react';
import PlusIcon from '../icons/PlusIcon';
import { ViewIcon } from '@chakra-ui/icons';
import { Progress } from '@chakra-ui/react'
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
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import RestModal from './RestModal.component';

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
    const {
        user,
    } = useContext(UserContext)
    const queryClient = useQueryClient();
    const toast = useToast();

    const { isOpen, onOpen, onClose } = useDisclosure();

    const {
        isOpen: isWorkoutOpen,
        onOpen: onWorkoutOpen,
        onClose: onWorkoutClose
    } = useDisclosure();

    const {
        isOpen: isRestOpen,
        onOpen: onRestOpen,
        onClose: onRestClose
    } = useDisclosure();
    const [weekNumber, setWeekNumber] = useState(null);
    const [workoutNumber, setWorkoutNumber] = useState(null);
    const [selectedExerciseId, setSelectedExerciseId] = useState(null);
    const [progressValue, setprogressValue] = useState(trainingProgram ? parseInt(trainingProgram.completionPercentage) : 0);

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
        if (trainingProgram) {
            setprogressValue(parseInt(trainingProgram.completionPercentage));
        }
    }, [trainingProgram]);

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

                const data = response.data;

                if (!data) {
                    throw new Error('No training program data received');
                }

                if (user) {
                    const joinedProgramsResponse = await apiInstance(sessionToken).get(
                        `/api/training-programs/joined/${user.username}`
                    );
                    // console.log(joinedProgramsResponse);
                    // Get the current program if the user has joined
                    const joinedProgram = joinedProgramsResponse.data.find(
                        (program) => program.id === parseInt(programID)
                    );

                    setIsUserJoined(joinedProgram ? true : false);
                    setError(null);
                    setTrainingProgram(joinedProgram);
                    setprogressValue(parseInt(joinedProgram.completionPercentage));
                    return;
                }

                setTrainingProgram(data);
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

        if (user && user.username) {
            fetchTrainingProgram();
        }
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
    const handleViewWorkout = (week, workout) => {
        setWeekNumber(week); // Set the week number dynamically
        setWorkoutNumber(workout); // Set the workout number dynamically
        onWorkoutOpen();
    };

    const isWorkoutComplete = (workout) => {
        return workout.workoutExercises.every(exercise => exercise.completedAt !== null);
    };

    const isWeekComplete = (week) => {
        return week.workouts.every(workout => isWorkoutComplete(workout));
    };

    const shouldUserRest = (restIntervalOnDays, lastWorkoutDate) => {
        if (!lastWorkoutDate) {
            return false;
        }

        const lastWorkoutDateTime = new Date(lastWorkoutDate).getTime();
        const timeSinceLastWorkout = Date.now() - lastWorkoutDateTime;
        const timeSinceLastWorkoutInDays = timeSinceLastWorkout / (1000 * 60 * 60 * 24);

        return timeSinceLastWorkoutInDays < restIntervalOnDays;
    };

    const remainingRestDays = (restIntervalOnDays, lastWorkoutDate) => {
        if (!lastWorkoutDate) {
            return 0;
        }

        const lastWorkoutDateTime = new Date(lastWorkoutDate).getTime();
        const timeSinceLastWorkout = Date.now() - lastWorkoutDateTime;
        const remainingDays = restIntervalOnDays - (timeSinceLastWorkout / (1000 * 60 * 60 * 24));

        return Math.ceil(remainingDays);
    };

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
            <Box width="100%">
                <Flex align="center" gap={4}>
                    {/* Progress Bar */}
                    <Progress
                        hasStripe
                        colorScheme="green"
                        size="md"
                        value={progressValue}
                        flex="1"
                    />
                    {/* Value */}
                    <Text
                        fontSize="md"
                        fontWeight="bold"
                        color="green.600"
                        minWidth="50px"
                        textAlign="right"
                    >
                        {progressValue}%
                    </Text>
                </Flex>
            </Box>
            <Box bg="white" shadow="md" rounded="lg" overflow="hidden" mb={4}>
                {trainingProgram.weeks.map((week, weekIndex) => {
                    // Check if previous weeks are complete
                    const isPreviousWeekComplete = weekIndex === 0 ||
                        trainingProgram.weeks[weekIndex - 1].workouts.every(prevWorkout =>
                            prevWorkout.workoutExercises.every(exercise => exercise.completedAt !== null)
                        );

                    return (
                        <Box
                            key={weekIndex}
                            p={4}
                            borderBottom="1px solid #e2e8f0"
                            opacity={isPreviousWeekComplete ? 1 : 0.6}
                        >
                            <Text
                                fontSize="xl"
                                fontWeight="bold"
                                mb={2}
                                color={isPreviousWeekComplete ? "black" : "gray.500"}
                            >
                                Week {week.weekNumber}
                                {!isPreviousWeekComplete && " (Locked)"}
                            </Text>

                            {isPreviousWeekComplete ? (
                                <UnorderedList spacing={3} ml={6}>
                                    {week.workouts.map((workout, workoutIndex) => {
                                        // Check if previous workouts in the same week are complete
                                        const isPreviousWorkoutComplete = workoutIndex === 0 ||
                                            week.workouts[workoutIndex - 1].workoutExercises.every(
                                                exercise => exercise.completedAt !== null
                                            );

                                        return (
                                            <ListItem key={workoutIndex}>
                                                <Flex align="center" gap={4}>
                                                    <Text
                                                        fontSize="md"
                                                        fontWeight="semibold"
                                                        color={isPreviousWorkoutComplete ? "gray.700" : "gray.500"}
                                                    >
                                                        Workout {workout.workoutNumber}:
                                                        {workout.name.split(":")[1]?.trim()}
                                                        {!isPreviousWorkoutComplete && " (Locked)"}
                                                    </Text>
                                                    <Button
                                                        onClick={() => handleViewWorkout(week.weekNumber, workout.workoutNumber)}
                                                        colorScheme="gray"
                                                        variant="solid"
                                                        isDisabled={!isPreviousWorkoutComplete}
                                                    >
                                                        <ViewIcon className="w-4 h-4 mr-3" />
                                                        View Description
                                                    </Button>
                                                </Flex>

                                                <Table variant="simple" width="100%" mt={2}>
                                                    <Tbody>
                                                        {workout.workoutExercises.map((exerciseob) => {
                                                            // Determine if the exercise can be started
                                                            const canStartExercise =
                                                                isPreviousWeekComplete &&
                                                                isPreviousWorkoutComplete;

                                                            return (
                                                                <Tr key={exerciseob.id} bgColor="#f7f9fc">
                                                                    <Td>
                                                                        <Text>
                                                                            {exerciseob.exercise.name}
                                                                        </Text>
                                                                    </Td>
                                                                    <Td textAlign="right">
                                                                        {(isUserJoined && user) ? (
                                                                            exerciseob.completedAt && exerciseob.completedSets ? (
                                                                                <Text color="green.500" fontWeight="bold">
                                                                                    ({exerciseob.completedSets.reduce((acc, set) => acc + set, 0)}/{exerciseob.repetitions * exerciseob.sets}) Completed ✓
                                                                                </Text>
                                                                            ) : canStartExercise ? (
                                                                                <Button
                                                                                    onClick={() => {
                                                                                        if (shouldUserRest(trainingProgram.interval, trainingProgram.lastCompletedWorkoutDate)) {
                                                                                            setSelectedExerciseId(exerciseob.id);
                                                                                            onRestOpen();
                                                                                        } else {
                                                                                            handleStartSession(exerciseob.id)
                                                                                        }
                                                                                    }}
                                                                                    colorScheme="green"
                                                                                    size="sm"
                                                                                >
                                                                                    Start Session!
                                                                                </Button>
                                                                            ) : (
                                                                                <Tooltip
                                                                                    label="Complete previous week/workout first"
                                                                                    hasArrow
                                                                                    placement="top"
                                                                                >
                                                                                    <Text color="gray.500">
                                                                                        Locked
                                                                                    </Text>
                                                                                </Tooltip>
                                                                            )
                                                                        ) : (
                                                                            <Text color="gray.500">
                                                                                Not Joined
                                                                            </Text>
                                                                        )}
                                                                    </Td>
                                                                </Tr>
                                                            );
                                                        })}
                                                    </Tbody>
                                                </Table>
                                            </ListItem>
                                        );
                                    })}
                                </UnorderedList>
                            ) : (
                                <Text color="gray.500" textAlign="center">
                                    Complete previous week to unlock
                                </Text>
                            )}
                        </Box>
                    );
                })}
            </Box>

            <Detailed_Ex_Modal
                isOpen={isOpen}
                onClose={onClose}
                data={trainingProgram}
                setData={setTrainingProgram}
                excersizeID={selectedExerciseId}
            />
            <Detailed_Workout_Modal
                isOpen={isWorkoutOpen}
                onClose={onWorkoutClose}
                data={trainingProgram}
                weekNumber={weekNumber}
                workoutNumber={workoutNumber}
            />
            <RestModal
                isOpen={isRestOpen}
                onClose={onRestClose}
                interval={remainingRestDays(trainingProgram.interval, trainingProgram.lastCompletedWorkoutDate)}
                onContinueWorkout={() => {
                    handleStartSession(selectedExerciseId);
                }}
            />
        </div>
    );
};

export default TrainingCard;
