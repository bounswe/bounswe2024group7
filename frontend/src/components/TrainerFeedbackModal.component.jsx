import React from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    VStack,
    Text,
    Box,
    Badge,
    Grid,
    GridItem,
    HStack,
} from '@chakra-ui/react';
import Model from 'react-body-highlighter';
import { useQuery } from '@tanstack/react-query';
import apiInstance from '../instance/apiInstance';
import { useSelector } from 'react-redux';
import { userSessionToken } from '../context/user';
import { formatMuscleName } from '../constants/feedbackMuscles';

// Map backend muscle names to model muscle names
const muscleModelMapping = {
    'TRAPEZIUS': 'trapezius',
    'UPPER_BACK': 'upper-back',
    'LOWER_BACK': 'lower-back',
    'CHEST': 'chest',
    'BICEPS': 'biceps',
    'TRICEPS': 'triceps',
    'FOREARM': 'forearm',
    'BACK_DELTOIDS': 'back-deltoids',
    'FRONT_DELTOIDS': 'front-deltoids',
    'ABS': 'abs',
    'OBLIQUES': 'obliques',
    'ADDUCTOR': 'adductor',
    'HAMSTRING': 'hamstring',
    'QUADRICEPS': 'quadriceps',
    'ABDUCTORS': 'abductors',
    'CALVES': 'calves',
    'GLUTEAL': 'gluteal',
    'HEAD': 'head',
    'NECK': 'neck'
};

const TrainerFeedbackModal = ({ isOpen, onClose, programId, programTitle }) => {
    const sessionToken = useSelector(userSessionToken);
    
    // Fetch feedbacks for this program
    const { data: feedbacks = [], isLoading } = useQuery({
        queryKey: ['program-feedbacks', programId],
        queryFn: async () => {
            const response = await apiInstance(sessionToken).get(`/api/feedback/training-program/${programId}`);
            return response.data;
        },
        enabled: isOpen // Only fetch when modal is open
    });

    // Group feedbacks by muscle
    const groupedFeedbacks = React.useMemo(() => {
        if (!feedbacks || !Array.isArray(feedbacks) || feedbacks.length === 0) return {};
        
        return feedbacks.reduce((acc, feedback) => {
            if (!feedback) return acc;
            
            const muscle = feedback.feedbackMuscle || 'Unknown';
            
            if (!acc[muscle]) {
                acc[muscle] = [];
            }
            
            acc[muscle].push({
                feedbackText: feedback.feedbackText || '',
                username: feedback.username || 'Anonymous',
                createdAt: feedback.createdAt || new Date()
            });
            
            return acc;
        }, {});
    }, [feedbacks]);

    // Prepare highlight data for the model
    const highlightData = React.useMemo(() => {
        if (!groupedFeedbacks) return [];
        
        return Object.keys(groupedFeedbacks).map(muscle => {
            const modelMuscleName = muscleModelMapping[muscle] || muscle.toLowerCase();
            return {
                name: formatMuscleName(muscle),
                muscles: [modelMuscleName]
            };
        });
    }, [groupedFeedbacks]);

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="xl">
            <ModalOverlay />
            <ModalContent maxW="900px">
                <ModalHeader>
                    Feedback Overview for {programTitle}
                    <Text fontSize="sm" color="gray.500" mt={1}>
                        Colored muscles have received feedback
                    </Text>
                </ModalHeader>
                <ModalCloseButton />
                
                <ModalBody>
                    {isLoading ? (
                        <Text textAlign="center">Loading feedbacks...</Text>
                    ) : feedbacks.length === 0 ? (
                        <Text textAlign="center">No feedbacks yet for this program</Text>
                    ) : (
                        <VStack spacing={6}>
                            <Grid templateColumns="repeat(2, 1fr)" gap={4} w="full">
                                <GridItem>
                                    <Box height="400px">
                                        <Model
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

                            <Box w="full">
                                {Object.entries(groupedFeedbacks).map(([muscle, muscleFeedbacks]) => (
                                    <Box key={muscle} mb={4} p={4} borderWidth="1px" borderRadius="lg">
                                        <Text fontWeight="bold" mb={2}>
                                            {formatMuscleName(muscle)}
                                            <Badge ml={2} colorScheme="purple">
                                                {muscleFeedbacks.length} {muscleFeedbacks.length === 1 ? 'feedback' : 'feedbacks'}
                                            </Badge>
                                        </Text>
                                        <VStack align="stretch" spacing={2}>
                                            {muscleFeedbacks.map((feedback, index) => (
                                                <Box 
                                                    key={index} 
                                                    p={3} 
                                                    bg="gray.50" 
                                                    borderRadius="md"
                                                    borderLeft="4px solid"
                                                    borderLeftColor="purple.500"
                                                >
                                                    <VStack align="start" spacing={2}>
                                                        <HStack width="100%" justify="space-between">
                                                            <Text fontSize="sm" color="purple.600" fontWeight="medium">
                                                                {feedback.username}
                                                            </Text>
                                                            <Text fontSize="xs" color="gray.500">
                                                                {new Date(feedback.createdAt).toLocaleDateString()}
                                                            </Text>
                                                        </HStack>
                                                        <Text fontSize="sm" color="gray.700">
                                                            {feedback.feedbackText}
                                                        </Text>
                                                    </VStack>
                                                </Box>
                                            ))}
                                        </VStack>
                                    </Box>
                                ))}
                            </Box>
                        </VStack>
                    )}
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme="purple" onClick={onClose}>
                        Close
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default TrainerFeedbackModal;