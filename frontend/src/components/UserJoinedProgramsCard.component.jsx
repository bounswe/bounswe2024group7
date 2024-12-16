import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { userProfile, userSessionToken } from '../context/user';
import apiInstance from '../instance/apiInstance';
import {
    Box,
    Text,
    Button,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    VStack,
    Heading,
    Spinner,
    useToast
} from '@chakra-ui/react';

import Detailed_Ex_Modal from './Detailed_Ex_Modal.component';
import { useDisclosure } from '@chakra-ui/react';
import { InfoIcon, StarIcon, RepeatIcon, ArrowRightIcon, SettingsIcon } from '@chakra-ui/icons';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';

const UserJoinedProgramsCard = () => {
    const sessionToken = useSelector(userSessionToken);
    const toast = useToast();
    const {
        user
    } = useContext(UserContext);
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [joinedPrograms, setJoinedPrograms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedExerciseId, setSelectedExerciseId] = useState(null);
    const [selectedProgram, setSelectedProgram] = useState(null);

    useEffect(() => {
        const fetchJoinedPrograms = async () => {
            if (!user) {
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                const response = await apiInstance(sessionToken).get(
                    `/api/training-programs/joined/${user.username}`
                );

                // Filter programs to only include those with uncompleted exercises
                const programsWithUncompletedExercises = response.data.filter(program =>
                    program.weeks.some(week =>
                        week.workouts.some(workout =>
                            workout.workoutExercises.some(exercise => !exercise.completedAt)
                        )
                    )
                );

                setJoinedPrograms(programsWithUncompletedExercises);
            } catch (error) {
                console.error('Error fetching joined programs:', error);
                toast({
                    title: 'Failed to fetch joined programs',
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                });
            } finally {
                setLoading(false);
            }
        };

        fetchJoinedPrograms();
    }, [user, sessionToken]);

    const handleStartSession = (program, exerciseId) => {
        setSelectedExerciseId(exerciseId);
        setSelectedProgram(program);
        onOpen();
    };

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <Spinner size="xl" />
            </Box>
        );
    }

    if (!user) {
        return (
            <Box textAlign="center" p={10}>
                <Text color="gray.500" fontSize="xl">
                    Please log in to view your joined programs
                </Text>
            </Box>
        );
    }

    if (joinedPrograms.length === 0) {
        return (
            <Box textAlign="center" p={10}>
                <Text color="gray.500" fontSize="xl">
                    You haven't joined any active programs with uncompleted exercises
                </Text>
            </Box>
        );
    }

    return (
        <VStack spacing={6} width="100%" maxWidth="800px" margin="auto" p={4}>
            {/* <Heading size="lg" color="purple.600">
                Your Active Programs
            </Heading> */}

            {joinedPrograms.map((program) => {
                // Find the first uncompleted exercise to determine week and workout
                let firstUncompletedExercise = null;
                program.weeks.some(week =>
                    week.workouts.some(workout =>
                        workout.workoutExercises.some(exercise => {
                            if (!exercise.completedAt) {
                                firstUncompletedExercise = { week, workout, exercise };
                                return true;
                            }
                            return false;
                        })
                    )
                );

                return (
                    <Box
                        key={program.id}
                        width="100%"
                        borderWidth="1px"
                        borderRadius="lg"
                        overflow="hidden"
                        p={4}
                        boxShadow="md"
                    >
                        <Heading size="md" mb={4} color="gray.700" display="flex" alignItems="center" gap={3}>
                            {program.title}
                            <div className="flex space-x-2">
                                <span className="inline-flex items-center px-2 py-1 text-sm font-medium text-blue-800 bg-blue-100 rounded">
                                    <StarIcon className="w-4 h-4 mr-1" />
                                    Week {firstUncompletedExercise?.week.weekNumber}
                                </span>
                                <span className="inline-flex items-center px-2 py-1 text-sm font-medium text-green-800 bg-green-100 rounded">
                                    <StarIcon className="w-4 h-4 mr-1" />
                                    Workout {firstUncompletedExercise?.workout.workoutNumber}
                                </span>
                            </div>
                        </Heading>

                        <Table variant="simple">
                            <Thead>
                                <Tr>
                                    <Th>Exercise</Th>
                                    <Th>Action</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {program.weeks.map((week) =>
                                    week.workouts.map((workout) =>
                                        workout.workoutExercises
                                            .filter(exercise => !exercise.completedAt)
                                            .map((exercise) => (
                                                <Tr key={exercise.id}>
                                                    <Td>{exercise.exercise.name}</Td>
                                                    <Td>
                                                        <Button
                                                            onClick={() => handleStartSession(program, exercise.id)}
                                                            colorScheme="green"
                                                            size="sm"
                                                        >
                                                            Start Session
                                                        </Button>
                                                    </Td>
                                                </Tr>
                                            ))
                                    )
                                )}
                            </Tbody>
                        </Table>

                        {selectedProgram && selectedExerciseId && (
                            <Detailed_Ex_Modal
                                isOpen={isOpen}
                                onClose={onClose}
                                data={selectedProgram}
                                setData={setSelectedProgram}
                                excersizeID={selectedExerciseId}
                            />
                        )}
                    </Box>
                );
            })}
        </VStack>
    );
};

export default UserJoinedProgramsCard;