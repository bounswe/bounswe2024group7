import React, { useState } from 'react';
import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Box,
    Checkbox,
    Progress,
    useColorModeValue,
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    CloseButton,
    Button,
    useDisclosure,
    Image,
    Heading,
} from '@chakra-ui/react';

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

const steps = programData.steps;

const ProgramCard = () => {
    const [completedSteps, setCompletedSteps] = useState(
        Array(steps.length).fill(false)
    );
    const { isOpen: isAlertVisible, onClose, onOpen } = useDisclosure();
    const [activeStep, setActiveStep] = useState(0);

    const handleCheckboxChange = (index) => {
        const updatedSteps = [...completedSteps];
        updatedSteps[index] = true;
        setCompletedSteps(updatedSteps);

        if (updatedSteps.every((step) => step)) {
            onOpen();
        } else {
            setActiveStep(index + 1);
        }
    };

    const getStepColor = (index) => {
        if (completedSteps[index]) return 'green.400';
        if (index === completedSteps.findIndex((step) => !step)) return 'orange.400';
        return useColorModeValue('gray.200', 'gray.700');
    };

    const completedCount = completedSteps.filter((step) => step).length;
    const progressValue = (completedCount / steps.length) * 100;

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
                            <AlertTitle>Success!</AlertTitle>
                            <AlertDescription>
                                You have completed {programData.title}. Keep up the good work!
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
                <Progress
                    hasStripe
                    value={progressValue}
                    colorScheme="green"
                    size="lg"
                    borderRadius="md"
                    mb={4}
                />
            </Box>

            {/* Accordion for Steps */}
            <Accordion allowToggle index={activeStep} onChange={(index) => setActiveStep(index[0] || 0)}>
                {steps.map((step, index) => (
                    <AccordionItem
                        key={index}
                        isDisabled={index > 0 && !completedSteps[index - 1]}
                        border="1px solid"
                        borderColor={getStepColor(index)}
                        borderRadius="md"
                        mb={2}
                    >
                        <h2>
                            <AccordionButton
                                _expanded={{ bg: getStepColor(index), color: 'white' }}
                                px={4}
                                py={2}
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
                                boxSize='256px'
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
