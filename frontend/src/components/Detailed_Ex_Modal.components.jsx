import React from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button } from '@chakra-ui/react';
import { Table, TableCaption, Thead, Tbody, Tfoot, Tr, Th, Td, UnorderedList, ListItem } from '@chakra-ui/react';
import { current } from '@reduxjs/toolkit';
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
const Detailed_Ex_Modal = ({ isOpen, onClose, data, weekID, workoutID, excersizeID }) => {
    const getWeekByID = (weekID, workoutID, excersizeID) => {
        return (data.weeks.find(week => week.id === weekID));

    };
    const getWorkoutByID = (weekID, workoutID, excersizeID) => {
        return (data.weeks.find(week => week.id === weekID)).workouts.find(workout => workout.id === workoutID);
    };
    const getExByID = (weekID, workoutID, excersizeID) => {
        return (data.weeks.find(week => week.id === weekID)).workouts.find(workout => workout.id === workoutID).workoutExercises.find(ex => ex.id === excersizeID);

    };
    // const getExByID = (weekID, workoutID, excersizeID) => {
    //     current_week = (data.weeks.find(week => week.id === weekID));
    //     current_workout = current_week.workouts.find(workout => workout.id === workoutID);
    //     current_ex = current_workout.workoutExercises.find(ex => ex.id === excersizeID);
    //     return (current_week, current_workout, current_ex);
    // };
    const current_week = getWeekByID(weekID, workoutID, excersizeID);
    const current_workout = getWorkoutByID(weekID, workoutID, excersizeID);
    const current_ex = getExByID(weekID, workoutID, excersizeID);
    // (current_week, current_workout, current_ex) = getExByID(weekID, workoutID, excersizeID);
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent maxWidth="90%" width="60%">
                <ModalHeader>
                    {current_ex.name}

                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <p>{data.title} | Week {current_week.weekNumber} |  Workout {current_workout.workoutNumber} | Exercise{current_ex.exerciseNumber}</p>
                    <Image
                        boxSize="256px"
                        src={current_ex.gifUrl}
                        alt={current_ex.name}
                    />


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

export default Detailed_Ex_Modal;
