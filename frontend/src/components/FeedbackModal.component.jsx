import React, { useState } from 'react';
import Model from 'react-body-highlighter';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Grid,
    GridItem,
    VStack,
    Text,
    Box,
    Textarea,
    useToast,
    Badge,
    Stack,
    IconButton,
    HStack,
} from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import apiInstance from '../instance/apiInstance';
import { useSelector } from 'react-redux';
import { userSessionToken } from '../context/user';
import { DeleteIcon, AddIcon } from '@chakra-ui/icons';
import { FEEDBACK_MUSCLES, formatMuscleName } from '../constants/feedbackMuscles';

// Map for converting model muscle names to backend format
const muscleNameMapping = {
    'trapezius': 'TRAPEZIUS',
    'upper-back': 'UPPER_BACK',
    'lower-back': 'LOWER_BACK',
    'chest': 'CHEST',
    'biceps': 'BICEPS',
    'triceps': 'TRICEPS',
    'forearm': 'FOREARM',
    'back-deltoids': 'BACK_DELTOIDS',
    'front-deltoids': 'FRONT_DELTOIDS',
    'abs': 'ABS',
    'obliques': 'OBLIQUES',
    'adductor': 'ADDUCTOR',
    'hamstring': 'HAMSTRING',
    'quadriceps': 'QUADRICEPS',
    'abductors': 'ABDUCTORS',
    'calves': 'CALVES',
    'gluteal': 'GLUTEAL',
    'head': 'HEAD',
    'neck': 'NECK'
};

const FeedbackModal = ({ isOpen, onClose, programId, programTitle }) => {
    const [selectedMuscle, setSelectedMuscle] = useState(null);
    const [feedbacks, setFeedbacks] = useState([]);
    const [currentFeedback, setCurrentFeedback] = useState({
        muscle: '',
        text: '',
        displayMuscle: '' // For display purposes
    });
    
    const sessionToken = useSelector(userSessionToken);
    const toast = useToast();
    const queryClient = useQueryClient();

    // Data for highlighting muscles
    const highlightData = feedbacks.map(feedback => ({
        name: feedback.displayMuscle,
        muscles: [feedback.muscle.toLowerCase().replace('_', '-')]
    }));

    if (selectedMuscle) {
        highlightData.push({
            name: formatMuscleName(selectedMuscle),
            muscles: [selectedMuscle.toLowerCase().replace('_', '-')]
        });
    }

    // Handle muscle click
    const handleMuscleClick = (data) => {
        if (data && data.muscle) {
            const modelMuscleName = data.muscle.toLowerCase();
            const backendMuscleName = muscleNameMapping[modelMuscleName];
            
            if (backendMuscleName) {
                setSelectedMuscle(modelMuscleName);
                setCurrentFeedback(prev => ({
                    ...prev,
                    muscle: backendMuscleName,
                    displayMuscle: formatMuscleName(backendMuscleName)
                }));
            }
        }
    };

    const addFeedback = () => {
        if (!currentFeedback.muscle || !currentFeedback.text) {
            toast({
                title: 'Please provide feedback text',
                status: 'warning',
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        if (feedbacks.some(f => f.muscle === currentFeedback.muscle)) {
            toast({
                title: 'Feedback for this muscle already exists',
                status: 'warning',
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        setFeedbacks([...feedbacks, {...currentFeedback}]);
        setCurrentFeedback({ muscle: '', text: '', displayMuscle: '' });
        setSelectedMuscle(null);
    };

    const removeFeedback = (muscle) => {
        setFeedbacks(feedbacks.filter(f => f.muscle !== muscle));
    };

    // Submit feedback mutation
    const { mutate: submitFeedback, isLoading: isSubmitting } = useMutation({
        mutationFn: async () => {
            const promises = feedbacks.map(feedback => {
                const feedbackData = {
                    trainingProgramId: programId,
                    feedbackMuscle: feedback.muscle, // Using the backend format
                    feedbackText: feedback.text
                };
                return apiInstance(sessionToken).post('/api/feedback', feedbackData);
            });

            await Promise.all(promises);
            
            toast({
                title: 'Feedbacks submitted successfully',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['feedbacks']);
            queryClient.invalidateQueries(['training-program-feedbacks']);
            setFeedbacks([]);
            setCurrentFeedback({ muscle: '', text: '', displayMuscle: '' });
            setSelectedMuscle(null);
            onClose();
        },
        onError: (error) => {
            console.error(error);
            toast({
                title: 'Error submitting feedback',
                description: 'Please try again later',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
    });

    const handleSubmit = () => {
        if (feedbacks.length === 0) {
            toast({
                title: 'Please add at least one feedback',
                status: 'warning',
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        submitFeedback();
    };

    const handleClose = () => {
        setFeedbacks([]);
        setCurrentFeedback({ muscle: '', text: '', displayMuscle: '' });
        setSelectedMuscle(null);
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={handleClose} size="xl">
            <ModalOverlay />
            <ModalContent maxW="900px">
                <ModalHeader>
                    Give Feedback for {programTitle}
                </ModalHeader>
                <ModalCloseButton />
                
                <ModalBody>
                    <VStack spacing={4}>
                        <Text fontSize="sm" color="gray.500">
                            Click on muscle groups to provide specific feedback for each
                        </Text>
                        
                        <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                            <GridItem>
                                <Box height="400px">
                                    <Model
                                        onClick={handleMuscleClick}
                                        data={highlightData}
                                        highlightedColors={["#805AD5", "#6B46C1"]}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                        }}
                                    />
                                </Box>
                            </GridItem>
                            
                            <GridItem>
                                <Box height="400px">
                                    <Model
                                        type="posterior"
                                        onClick={handleMuscleClick}
                                        data={highlightData}
                                        highlightedColors={["#805AD5", "#6B46C1"]}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                        }}
                                    />
                                </Box>
                            </GridItem>
                        </Grid>

                        {feedbacks.length > 0 && (
                            <Box w="100%" borderWidth="1px" borderRadius="lg" p={4}>
                                <Text fontWeight="bold" mb={3}>Added Feedbacks:</Text>
                                <Stack spacing={2}>
                                    {feedbacks.map((feedback, index) => (
                                        <HStack key={index} justifyContent="space-between" p={2} bg="gray.50" borderRadius="md">
                                            <Box>
                                                <Text fontWeight="bold">{feedback.displayMuscle}</Text>
                                                <Text fontSize="sm" noOfLines={2}>{feedback.text}</Text>
                                            </Box>
                                            <IconButton
                                                icon={<DeleteIcon />}
                                                colorScheme="red"
                                                variant="ghost"
                                                onClick={() => removeFeedback(feedback.muscle)}
                                            />
                                        </HStack>
                                    ))}
                                </Stack>
                            </Box>
                        )}

                        {selectedMuscle && (
                            <Box w="100%" borderWidth="1px" borderRadius="lg" p={4}>
                                <Text fontWeight="bold" mb={3}>
                                    Add New Feedback for {currentFeedback.displayMuscle}
                                </Text>
                                <Textarea
                                    value={currentFeedback.text}
                                    onChange={(e) => setCurrentFeedback(prev => ({...prev, text: e.target.value}))}
                                    placeholder={`Share your experience about ${currentFeedback.displayMuscle} exercises in this program...`}
                                    rows={4}
                                    mb={4}
                                />
                                <Button
                                    leftIcon={<AddIcon />}
                                    colorScheme="purple"
                                    onClick={addFeedback}
                                    alignSelf="flex-end"
                                >
                                    Add Feedback
                                </Button>
                            </Box>
                        )}
                    </VStack>
                </ModalBody>

                <ModalFooter>
                    <Button variant="ghost" mr={3} onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button 
                        colorScheme="purple" 
                        onClick={handleSubmit}
                        isLoading={isSubmitting}
                        isDisabled={feedbacks.length === 0}
                    >
                        Submit All Feedbacks
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default FeedbackModal;