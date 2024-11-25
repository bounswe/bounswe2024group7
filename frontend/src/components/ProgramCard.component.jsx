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
    List
} from '@chakra-ui/react';
import { useQueryClient, useQuery, useMutation } from '@tanstack/react-query'
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

    const { onClose } = useDisclosure();

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
            setProgram({
                title: programData.title,
                steps: programData.exercises
            });
            setSteps(programData.exercises);
            setCompletedSteps(new Array(programData.exercises.length).fill(false));
        }
    }, [programData]);

    // Log the programs
    useEffect(() => {
        console.log(program);
    }, [program]);

    // Handle complete exercise
    const { mutate: completeExercise } = useMutation({
        mutationFn: async (exerciseId) => {
            const response = await apiInstance().post(`/api/training-programs/${programId}/exercises/${exerciseId}/complete`);

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
        console.log(step)
        completeExercise(step.id);
        setCompletedSteps(newCompletedSteps);

        // Move to next step and set active step
        if (index + 1 >= steps.length) { setIsAlertVisible(true); }
        setActiveStep(index + 1);
    };

    // Calculate progress
    useEffect(() => {
        const completedCount = completedSteps.filter(step => step).length;
        const progress = (completedCount / steps.length) * 100;
        setProgressValue(progress);
    }, [completedSteps]);

    // Scroll to the active step
    useEffect(() => {
        const activeStepElement = document.getElementById(`step-${activeStep}`);
        if (activeStepElement) {
            window.scrollTo({
                top: activeStepElement.offsetTop - 50, // Offset to make the step not hidden under the header
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

    return (
        <>
            {
                program && program.steps ? (
                    <Box
                        maxWidth="800px"
                        mx="auto"
                        mt="5%"
                        p={6}
                        border="1px solid"
                        borderColor="gray.300"
                        borderRadius="md"
                    >
                        {/* Program Title and Progress Bar */}
                        <Box position="sticky" top={0} zIndex="1" bg="white" p={4}>
                            {/* Program Title */}
                            <Heading as='h4' size='lg' mb={4}>
                                {program.title}
                            </Heading>

                            {isAlertVisible ? (
                                <Alert status="success" mb={4}>
                                    <AlertIcon />
                                    <Box>
                                        <AlertTitle>You Nailed It !</AlertTitle>
                                        <AlertDescription>
                                            You have completed {program.title} for today. Keep up the good work!
                                        </AlertDescription>
                                    </Box>
                                    <CloseButton
                                        alignSelf="flex-start"
                                        position="relative"
                                        right={-1}
                                        top={-1}
                                        onClick={onClose}
                                    />
                                </Alert>
                            ) : null}

                            {/* Progress Bar */}
                            <Box display="flex" alignItems="center" mb={4}>
                                {/* Progress Value */}
                                <Text mr={2} fontWeight="bold">
                                    {progressValue}%
                                </Text>
                                {/* Progress Bar */}
                                <Progress
                                    hasStripe
                                    value={progressValue}
                                    colorScheme="green"
                                    size="lg"
                                    borderRadius="md"
                                    flex="1" // Ensure the progress bar takes the remaining width
                                />
                            </Box>
                        </Box>

                        {/* Accordion for Steps */}
                        <Accordion allowToggle index={activeStep} onChange={(index) => setActiveStep(activeStep)}>
                            {steps.map((step, index) => (
                                <AccordionItem
                                    key={index}
                                    id={`step-${index}`}
                                    isDisabled={index != activeStep}  // Disable non active steps
                                    border="1px solid"
                                    borderColor={getStepColor(index)}
                                    borderRadius="md"
                                    mb={2}
                                >
                                    <h2>
                                        <AccordionButton
                                            bg={completedSteps[index] ? 'green' : 'white'}
                                            color={completedSteps[index] ? 'white' : 'black'}
                                            _expanded={{
                                                bg: getStepColor(index),
                                                color: 'white',
                                            }}
                                            _hover={{

                                            }}
                                            px={4}
                                            py={2}
                                            isDisabled={index !== activeStep} // Prevent collapsing on non active steps
                                        >
                                            <Box as="span" flex="1" textAlign="left">
                                                {step.exercise.name}
                                            </Box>
                                            <AccordionIcon />
                                        </AccordionButton>
                                    </h2>
                                    <AccordionPanel pb={4}>
                                        {/* Create list of instructions to do the exercise */}
                                        <List>
                                            {step.exercise.instructions.map((instruction, index) => (
                                                <Text key={index}>{index + 1}. {instruction}</Text>
                                            ))}
                                        </List>
                                        <Image
                                            boxSize="256px"
                                            src={step.gifUrl}
                                            alt={step.title}
                                        />
                                        {!completedSteps[index] && (
                                            <Checkbox
                                                size="md"
                                                colorScheme="green"
                                                onChange={() => handleCheckboxChange(index, step)}
                                            >
                                                Done
                                            </Checkbox>
                                        )}
                                    </AccordionPanel>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </Box>
                ) : (
                    <Box
                        p={4}
                        borderRadius="md"
                        boxShadow="sm"
                    >
                        <Heading size="lg" mb={4}>Loading...</Heading>
                    </Box>
                )
            }
        </>
    )
};

export default ProgramCard;
