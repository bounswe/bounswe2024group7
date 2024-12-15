import React, { useEffect } from 'react'
import { useState } from 'react'
import {
    Avatar,
    Box,
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Flex,
    Heading,
    Text,
    useToast,
    Tooltip,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    Stack,
    Badge,
    Divider,
    SimpleGrid,
    List,
    useDisclosure
} from '@chakra-ui/react'
import { useNavigate } from '@tanstack/react-router'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useContext } from 'react'
import { useSelector } from 'react-redux'
import { userProfile, userPassword, userSessionToken } from '../context/user'
import apiInstance from '../instance/apiInstance'
import PlusIcon from '../icons/PlusIcon'
import { UserContext } from '../context/UserContext'

function ProgramFeedCard({ program }) {
    const password = useSelector(userPassword)
    const sessionToken = useSelector(userSessionToken)
    const toast = useToast()
    const queryClient = useQueryClient()
    const { isOpen, onOpen, onClose } = useDisclosure()

    const {
        followers,
        following,
        user,
    } = useContext(UserContext)

    const [isProgramOwnerFollowed, setIsProgramOwnerFollowed] = useState(
        user && following && following.includes(program.trainerUsername)
    )
    const [isUserJoined, setIsUserJoined] = useState(
        user && user.joinedPrograms && user.joinedPrograms
            .filter(
                (joinedProgram) => joinedProgram.status !== 'LEFT'
            )
            .map((joinedProgram) => joinedProgram.id).includes(program.id)
    )

    // ... (keep existing useEffect hooks)

    // ... (keep existing mutations)

    const navigate = useNavigate()
    const handleStartPracticing = (program_id) => {
        navigate({
            to: `/program?programId=${program_id}`,
        })
    }

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
        <>
            <Card maxW='lg' onClick={onOpen} cursor="pointer" _hover={{ shadow: 'lg' }}>
                <CardHeader>
                    <Flex spacing='4'>
                        <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                            <Avatar size='sm' name={program.trainerUsername} />
                            <Box>
                                <Heading size='sm'>{program.trainerUsername}</Heading>
                            </Box>
                        </Flex>
                        <Button
                            variant='ghost'
                            size={"sm"}
                            colorScheme={isProgramOwnerFollowed ? 'gray' : 'purple'}
                            leftIcon={!isProgramOwnerFollowed ? <PlusIcon /> : null}
                            display={user && program.trainerUsername === user.username ? 'none' : 'flex'}
                            alignItems='center'
                            onClick={(e) => {
                                e.stopPropagation(); // Prevent card click
                                if (user) {
                                    isProgramOwnerFollowed ? 
                                        unfollowUser(program.trainerUsername) : 
                                        followUser(program.trainerUsername)
                                }
                            }}
                        >
                            {isProgramOwnerFollowed ? 'Unfollow' : 'Follow'}
                        </Button>
                    </Flex>
                </CardHeader>

                <CardBody>
                    <Text fontSize="xl" fontWeight="bold">{program.title}</Text>
                    <Text noOfLines={2}>{program.description}</Text>
                    <Stack direction="row" mt={2} spacing={2}>
                        <Badge colorScheme={getProgramTypeColor(program.type)}>
                            {program.type.replace('_', ' ')}
                        </Badge>
                        <Badge colorScheme="teal">{program.level}</Badge>
                        <Badge colorScheme="blue">{program.interval} weeks</Badge>
                    </Stack>
                </CardBody>

                <CardFooter>
                    <Flex gap={2} width="full">
                        <Tooltip label={
                            user && program.trainerUsername === user.username ? null : 
                            (isUserJoined ? 'Leave the program' : 'Join the program')
                        }>
                            <Button
                                flex='1'
                                variant='ghost'
                                leftIcon={isUserJoined ? null : <PlusIcon />}
                                colorScheme='purple'
                                onClick={(e) => {
                                    e.stopPropagation(); // Prevent card click
                                    if (user) {
                                        if (!isUserJoined) {
                                            joinProgram(program.id)
                                        } else {
                                            unjoinProgram(program.id)
                                        }
                                    } else {
                                        toast({
                                            title: 'You need to login to join a program',
                                            status: 'error',
                                            duration: 3000,
                                            isClosable: true,
                                        })
                                    }
                                }}
                                disabled={
                                    user && program.trainerUsername === user.username
                                }
                            >
                                {user && program.trainerUsername === user.username ? 
                                    'You are the trainer' : 
                                    (isUserJoined ? 'Joined' : 'Join')}
                            </Button>
                        </Tooltip>

                        {isUserJoined && user && program.trainerUsername !== user.username && (
                            <Button
                                flex='1'
                                variant='solid'
                                colorScheme='green'
                                onClick={(e) => {
                                    e.stopPropagation(); // Prevent card click
                                    handleStartPracticing(program.id)
                                }}
                            >
                                Start Practicing
                            </Button>
                        )}
                    </Flex>
                </CardFooter>
            </Card>

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
        </>
    )
}

export default ProgramFeedCard