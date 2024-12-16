import React from 'react';
import {
    Box,
    Button,
    useDisclosure,
    HStack,
} from '@chakra-ui/react';
import { ChatIcon } from '@chakra-ui/icons';
import ProgramFeedCard from './ProgramFeedCard.component';
import TrainerFeedbackModal from './TrainerFeedbackModal.component.jsx';

const TrainerProgramCard = ({ program }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <Box position="relative">
            <ProgramFeedCard program={program} />
            <HStack 
                position="absolute" 
                top="4" 
                right="4" 
                zIndex="1"
            >
                <Button
                    leftIcon={<ChatIcon />}
                    colorScheme="purple"
                    variant="solid"
                    size="sm"
                    onClick={(e) => {
                        e.stopPropagation();
                        onOpen();
                    }}
                >
                    View Feedbacks
                </Button>
            </HStack>
            <TrainerFeedbackModal
                isOpen={isOpen}
                onClose={onClose}
                programId={program.id}
                programTitle={program.title}
            />
        </Box>
    );
};

export default TrainerProgramCard;