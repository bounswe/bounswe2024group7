import React, { useState, useEffect } from 'react';
import {
    Box,
    Heading,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionIcon,
    AccordionPanel,
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    CloseButton,
    Progress,
    Checkbox,
    Image,
    useDisclosure,
    Text,
    List,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    Stack,
    Badge,
    Button,
    Divider,
    SimpleGrid
} from '@chakra-ui/react';
import { useQueryClient, useQuery, useMutation } from '@tanstack/react-query';
import apiInstance from '../instance/apiInstance';
import { useRouter } from '@tanstack/react-router';
import { userSessionToken } from '../context/user';
import { useSelector } from 'react-redux';

const ProgramCard = () => {
    const [steps, setSteps] = useState(0);
    const [completedSteps, setCompletedSteps] = useState([]);
    const [activeStep, setActiveStep] = useState(0);
    const [isAlertVisible, setIsAlertVisible] = useState(false);
    const [progressValue, setProgressValue] = useState(0);
    const [program, setProgram] = useState(null);
    const queryClient = useQueryClient();
    const router = useRouter();
    const sessionToken = useSelector(userSessionToken);
    const programId = router.parseLocation().search['programId'];

    const { isOpen, onOpen, onClose } = useDisclosure();

    const {
        data: programData,
        isFetching: programIsFetching,
        isLoading: programIsLoading,
    } = useQuery({
        queryKey: ['programs', programId],
        queryFn: async () => {
            const response = await apiInstance(sessionToken).get(`/api/training-programs/${programId}`);
            return response.data;
        },
        refetchOnWindowFocus: false,
    });

    // Set program data
    useEffect(() => {
        if (programData && !programIsFetching) {
            setProgram(programData);
            setSteps(programData.weeks.flatMap(week => 
                week.workouts.flatMap(workout => 
                    workout.workoutExercises
                )
            ));
            const totalExercises = programData.weeks.reduce((total, week) => 
                total + week.workouts.reduce((weekTotal, workout) => 
                    weekTotal + workout.workoutExercises.length, 0
                ), 0
            );
            setCompletedSteps(new Array(totalExercises).fill(false));
        }
    }, [programData]);

    // Handle complete exercise
    const { mutate: completeExercise } = useMutation({
        mutationFn: async (exerciseId) => {
            const response = await apiInstance(sessionToken).post(`/api/training-programs/${programId}/exercises/${exerciseId}/complete`);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries('programs');
        },
    });

    // Handle checkbox change
    const handleCheckboxChange = (index, step) => {
        const newCompletedSteps = [...completedSteps];
        newCompletedSteps[index] = true;
        completeExercise(step.id);
        setCompletedSteps(newCompletedSteps);

        if (index + 1 >= steps.length) {
            setIsAlertVisible(true);
        }
        setActiveStep(index + 1);
    };

    // Calculate progress
    useEffect(() => {
        const completedCount = completedSteps.filter(step => step).length;
        const progress = (completedCount / steps.length) * 100;
        setProgressValue(progress);
    }, [completedSteps]);

    // Scroll to active step
    useEffect(() => {
        const activeStepElement = document.getElementById(`step-${activeStep}`);
        if (activeStepElement) {
            window.scrollTo({
                top: activeStepElement.offsetTop - 50,
                behavior: 'smooth',
            });
        }
    }, [activeStep]);

    // Get step color
    const getStepColor = (index) => {
        if (completedSteps[index]) return 'green';
        if (index === activeStep) return 'orange';
        if (index < activeStep) return 'green';
        return 'gray';
    };

    const getProgramTypeColor = (type) => {
        const typeColors = {
            CARDIO: 'red',
            BODY_BUILDING: 'purple',
            FLEXIBILITY: 'blue',
            BALANCE: 'green'
        };
        return typeColors[type] || 'gray';
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <>
            <Box
                onClick={onOpen}
                cursor="pointer"
                _hover={{ shadow: 'lg' }}
                transition="all 0.2s"
                maxWidth="800px"
                mx="auto"
                mt="5%"
                p={6}
                border="1px solid"
                borderColor="gray.300"
                borderRadius="md"
            >
                {program && (
                    <>
                        <Stack spacing={4}>
                            <Heading as='h4' size='lg'>
                                {program.title}
                            </Heading>
                            <Text noOfLines={2}>{program.description}</Text>
                            <Stack direction="row" spacing={2}>
                                <Badge colorScheme={getProgramTypeColor(program.type)}>
                                    {program.type.replace('_', ' ')}
                                </Badge>
                                <Badge colorScheme="teal">{program.level}</Badge>
                                <Badge colorScheme="blue">{program.interval} weeks</Badge>
                            </Stack>
                            {program.rating > 0 && (
                                <Text>Rating: {program.rating} ({program.ratingCount} reviews)</Text>
                            )}
                        </Stack>
                    </>
                )}
            </Box>

            <Modal isOpen={isOpen} onClose={onClose} size="4xl">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Program Details</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        {program && (
                            <Stack spacing={6}>
                                <Box>
                                    <Heading size="lg" mb={2}>{program.title}</Heading>
                                    <Text>{program.description}</Text>
                                </Box>

                                <Stack direction="row" spacing={4}>
                                    <Badge colorScheme={getProgramTypeColor(program.type)} fontSize="md" p={2}>
                                        {program.type.replace('_', ' ')}
                                    </Badge>
                                    <Badge colorScheme="teal" fontSize="md" p={2}>
                                        {program.level}
                                    </Badge>
                                    <Badge colorScheme="blue" fontSize="md" p={2}>
                                        {program.interval} weeks
                                    </Badge>
                                </Stack>

                                <Box>
                                    <Text fontWeight="bold" mb={2}>Program Information:</Text>
                                    <SimpleGrid columns={2} spacing={4}>
                                        <Text>Created by: {program.trainer}</Text>
                                        <Text>Created on: {formatDate(program.createdAt)}</Text>
                                        <Text>Rating: {program.rating}/5</Text>
                                        <Text>Reviews: {program.ratingCount}</Text>
                                    </SimpleGrid>
                                </Box>

                                <Divider />

                                <Box>
                                    <Heading size="md" mb={4}>Program Schedule</Heading>
                                    {program.weeks.map((week, weekIndex) => (
                                        <Box key={weekIndex} mb={4}>
                                            <Heading size="sm" mb={2}>Week {week.weekNumber}</Heading>
                                            {week.workouts.map((workout, workoutIndex) => (
                                                <Box key={workoutIndex} ml={4} mb={2}>
                                                    <Text fontWeight="bold">{workout.name}</Text>
                                                    <List ml={4}>
                                                        {workout.workoutExercises.map((exercise, exerciseIndex) => (
                                                            <Text key={exerciseIndex}>
                                                                • {exercise.exercise.name} - {exercise.sets} sets × {exercise.repetitions} reps
                                                            </Text>
                                                        ))}
                                                    </List>
                                                </Box>
                                            ))}
                                        </Box>
                                    ))}
                                </Box>

                                <Divider />

                                <Button colorScheme="blue" onClick={() => {
                                    onClose();
                                    router.navigate({ 
                                        to: '/program',
                                        search: { programId: program.id }
                                    });
                                }}>
                                    Start Program
                                </Button>
                            </Stack>
                        )}
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
};

export default ProgramCard;