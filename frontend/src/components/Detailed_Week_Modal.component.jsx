import React from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button } from '@chakra-ui/react';
import { Table, TableCaption, Thead, Tbody, Tfoot, Tr, Th, Td, UnorderedList, ListItem } from '@chakra-ui/react';

const Detailed_Week_Modal = ({ isOpen, onClose, data, weekNumber }) => {
    const getWeekByNumber = (weekNumber) => {
        return data.weeks.find(week => week.weekNumber === weekNumber);
    };
    const current_week = getWeekByNumber(weekNumber)
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent maxWidth="90%" width="60%">
                <ModalHeader>{data.title} | Week {weekNumber} Detailed Description</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Table variant='striped' width="100%">

                        <Thead>
                            <Tr>

                                <Th>Workout</Th>
                                <Th>List of Exercises</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {current_week.workouts.map((workout) => (
                                <Tr key={workout.id}>
                                    <Td>{workout.name}</Td>
                                    <Td>
                                        <UnorderedList key={workout.id}>
                                            {workout.workoutExercises.map((exerciseob) => (
                                                <ListItem key={exerciseob.id} textAlign="left">{exerciseob.exercise.name}</ListItem>
                                            ))}
                                        </UnorderedList></Td>
                                </Tr>

                            ))}


                        </Tbody>
                        <Tfoot>

                        </Tfoot>
                    </Table>
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme='blue' mr={3} onClick={onClose}>
                        Close
                    </Button>
                    {/* <Button variant='ghost'>Secondary Action</Button> */}
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default Detailed_Week_Modal;
