import React from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    Box,
    Button,
    Stack,
    Text,
    Flex,
    Heading,
    Badge,
    Divider,
    SimpleGrid,
    List,
    useToast
} from '@chakra-ui/react';

const ProgramModal = ({
    isOpen,
    onClose,
    program,
    user,
    isUserJoined,
    joinProgram,
    handleStartPracticing
}) => {
    const toast = useToast();

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
        <Modal isOpen={isOpen} onClose={onClose} size="4xl">
            <ModalOverlay backdropFilter="blur(4px)" />
            <ModalContent>
                <ModalHeader borderBottom="1px" borderColor="gray.200" py={4}>
                    <Flex justify="space-between" align="center">
                        <Text fontSize="xl" fontWeight="bold">Program Details</Text>
                        <ModalCloseButton position="static" />
                    </Flex>
                </ModalHeader>
                <ModalBody py={6}>
                    <Stack spacing={8}>
                        {/* Program Title and Description */}
                        <Box bg="gray.50" p={4} rounded="md">
                            <Heading size="lg" mb={3} color="gray.800">{program.title}</Heading>
                            <Text color="gray.600">{program.description}</Text>
                        </Box>

                        {/* Program Badges */}
                        <Stack direction="row" spacing={4} wrap="wrap">
                            <Badge 
                                colorScheme={getProgramTypeColor(program.type)} 
                                fontSize="md" 
                                p={2} 
                                rounded="md"
                                display="flex"
                                alignItems="center"
                            >
                                {program.type.replace('_', ' ')}
                            </Badge>
                            <Badge 
                                colorScheme="teal" 
                                fontSize="md" 
                                p={2} 
                                rounded="md"
                            >
                                {program.level}
                            </Badge>
                            <Badge 
                                colorScheme="blue" 
                                fontSize="md" 
                                p={2} 
                                rounded="md"
                            >
                                {program.interval} weeks
                            </Badge>
                        </Stack>

                        {/* Program Information */}
                        <Box bg="gray.50" p={4} rounded="md">
                            <Text fontWeight="bold" mb={3} color="gray.700">Program Information:</Text>
                            <SimpleGrid columns={2} spacing={4}>
                                <Flex align="center" gap={2}>
                                    <Box as="span" w={1} h={4} bg="purple.500" rounded="full" />
                                    <Text>Created by: {program.trainerUsername}</Text>
                                </Flex>
                                <Flex align="center" gap={2}>
                                    <Box as="span" w={1} h={4} bg="blue.500" rounded="full" />
                                    <Text>Created on: {formatDate(program.createdAt)}</Text>
                                </Flex>
                                <Flex align="center" gap={2}>
                                    <Box as="span" w={1} h={4} bg="yellow.500" rounded="full" />
                                    <Text>Rating: {program.rating}/5</Text>
                                </Flex>
                                <Flex align="center" gap={2}>
                                    <Box as="span" w={1} h={4} bg="green.500" rounded="full" />
                                    <Text>Reviews: {program.ratingCount}</Text>
                                </Flex>
                            </SimpleGrid>
                        </Box>

                        <Divider />

                        {/* Program Schedule */}
                        <Box>
                            <Heading size="md" mb={4}>Program Schedule</Heading>
                            <Stack spacing={6}>
                                {program.weeks?.map((week) => (
                                    <Box 
                                        key={week.id} 
                                        bg="gray.50" 
                                        p={4} 
                                        rounded="md"
                                    >
                                        <Heading size="sm" mb={3} color="gray.700">
                                            Week {week.weekNumber}
                                        </Heading>
                                        <Stack spacing={4}>
                                            {week.workouts?.map((workout) => (
                                                <Box 
                                                    key={workout.id} 
                                                    ml={4}
                                                    borderLeft="2px"
                                                    borderColor="purple.200"
                                                    pl={4}
                                                >
                                                    <Text fontWeight="bold" mb={2} color="purple.600">
                                                        {workout.name}
                                                    </Text>
                                                    <List spacing={2}>
                                                        {workout.workoutExercises?.map((exercise) => (
                                                            <Flex 
                                                                key={exercise.id} 
                                                                align="center" 
                                                                gap={2}
                                                            >
                                                                <Box 
                                                                    as="span" 
                                                                    w={2} 
                                                                    h={2} 
                                                                    bg="blue.400" 
                                                                    rounded="full" 
                                                                />
                                                                <Text color="gray.600">
                                                                    {exercise.exercise.name} - {exercise.sets} sets × {exercise.repetitions} reps
                                                                </Text>
                                                            </Flex>
                                                        ))}
                                                    </List>
                                                </Box>
                                            ))}
                                        </Stack>
                                    </Box>
                                ))}
                            </Stack>
                        </Box>

                        <Divider />

                        {/* Action Buttons */}
                        <Box>
                            {isUserJoined && user && program.trainerUsername !== user.username ? (
                                <Button 
                                    colorScheme="green" 
                                    size="lg"
                                    width="full"
                                    onClick={() => {
                                        onClose();
                                        handleStartPracticing(program.id);
                                    }}
                                >
                                    Start Program
                                </Button>
                            ) : (
                                <Button
                                    colorScheme="purple"
                                    size="lg"
                                    width="full"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        if (user) {
                                            if (!isUserJoined) {
                                                joinProgram(program.id);
                                            }
                                        } else {
                                            toast({
                                                title: 'You need to login to join a program',
                                                status: 'error',
                                                duration: 3000,
                                                isClosable: true,
                                            });
                                        }
                                        onClose();
                                    }}
                                    disabled={user && program.trainerUsername === user.username}
                                >
                                    {user && program.trainerUsername === user.username ? 
                                        'You are the trainer' : 'Join Program'}
                                </Button>
                            )}
                        </Box>
                    </Stack>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default ProgramModal;