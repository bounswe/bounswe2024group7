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
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    UnorderedList,
    ListItem,
} from '@chakra-ui/react';
import { useNavigate } from '@tanstack/react-router';
import { LinkIcon } from '@chakra-ui/icons';

const Detailed_Training_Modal = ({ isOpen, onClose, data }) => {
    const navigate = useNavigate();

    const VisitTraining = (program_id) => {
        navigate({
            to: `/training?trainingId=${program_id}`,
        });
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent maxWidth="90%" width="60%">
                <ModalHeader>{data.title} Detailed Description</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Table variant="striped" width="100%">
                        <Thead>
                            <Tr>
                                <Th>Week</Th>
                                <Th>Workout</Th>
                                <Th>List of Exercises</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {data.weeks.map((week) =>
                                week.workouts.map((workout) => (
                                    <Tr key={workout.id}>
                                        <Td>Week {week.weekNumber}</Td>
                                        <Td>{workout.name}</Td>
                                        <Td>
                                            <UnorderedList>
                                                {workout.workoutExercises.map((exerciseob) => (
                                                    <ListItem key={exerciseob.id} textAlign="left">
                                                        {exerciseob.exercise.name}
                                                    </ListItem>
                                                ))}
                                            </UnorderedList>
                                        </Td>
                                    </Tr>
                                ))
                            )}
                        </Tbody>
                    </Table>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={onClose}>
                        Close
                    </Button>
                    <Button
                        // variant="gohst"
                        colorScheme="green"
                        onClick={() => VisitTraining(data.id)} // Pass a function reference
                    >
                        <LinkIcon className="w-4 h-4 mr-3" />
                        Visit Training Page
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default Detailed_Training_Modal;
