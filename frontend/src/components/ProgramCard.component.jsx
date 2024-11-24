

const programData = {
    title: 'Heavy Gym Instruments Fitness Program',
    steps: [
        {
            title: 'Step 1: Deadlift',
            description: 'Use the barbell for deadlifting. Ensure your feet are shoulder-width apart, grip the bar just outside your knees, and lift the bar while keeping your back straight.',
            gif: 'https://v2.exercisedb.io/image/ogjzsJ3u4sUljM',
        },
        {
            title: 'Step 2: Squat',
            description: 'Set the barbell on your upper back. Lower your body by bending your knees and hips, keeping your chest up, until your thighs are parallel to the ground. Push back up to standing position.',
            gif: 'https://v2.exercisedb.io/image/ogjzsJ3u4sUljM',
        },
        {
            title: 'Step 3: Bench Press',
            description: 'Lie flat on the bench, grip the barbell with both hands slightly wider than shoulder-width, and press the bar up and down, ensuring control and a full range of motion.',
            gif: 'https://v2.exercisedb.io/image/ogjzsJ3u4sUljM',
        },
        {
            title: 'Step 4: Overhead Press',
            description: 'Stand with your feet shoulder-width apart, grip the barbell just outside your shoulders, and press the bar above your head while keeping your core tight.',
            gif: 'https://v2.exercisedb.io/image/ogjzsJ3u4sUljM',
        },
        {
            title: 'Step 5: Pull-ups',
            description: 'Hang from a pull-up bar with your palms facing away from you. Pull your body upwards until your chin is above the bar, then slowly lower yourself back down.',
            gif: 'https://v2.exercisedb.io/image/ogjzsJ3u4sUljM',
        },
    ],
};

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
    Text
} from '@chakra-ui/react';

const ProgramCard = () => {
    const steps = programData.steps;
    const [completedSteps, setCompletedSteps] = useState(new Array(steps.length).fill(false));
    const [activeStep, setActiveStep] = useState(0);
    const [isAlertVisible, setIsAlertVisible] = useState(false);
    const [progressValue, setProgressValue] = useState(0);

    const { onClose } = useDisclosure();

    // Handle checkbox change
    const handleCheckboxChange = (index) => {
        const newCompletedSteps = [...completedSteps];
        newCompletedSteps[index] = true;
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
                    {programData.title}
                </Heading>

                {isAlertVisible ? (
                    <Alert status="success" mb={4}>
                        <AlertIcon />
                        <Box>
                            <AlertTitle>You Nailed It !</AlertTitle>
                            <AlertDescription>
                                You have completed {programData.title} for today. Keep up the good work!
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
                                    {step.title}
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4}>
                            <p>{step.description}</p>
                            <Image
                                boxSize="256px"
                                src={step.gif}
                                alt={step.title}
                            />
                            {!completedSteps[index] && (
                                <Checkbox
                                    size="md"
                                    colorScheme="green"
                                    onChange={() => handleCheckboxChange(index)}
                                >
                                    Done
                                </Checkbox>
                            )}
                        </AccordionPanel>
                    </AccordionItem>
                ))}
            </Accordion>
        </Box>
    );
};

export default ProgramCard;
