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
    Tooltip
} from '@chakra-ui/react'
import { ChatIcon } from '@chakra-ui/icons';
import FeedbackModal from './FeedbackModal.component';
import { ViewIcon } from '@chakra-ui/icons';
// import { useNavigate } from 'react-router-dom';
import { useNavigate } from '@tanstack/react-router'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useContext } from 'react'
import { useSelector } from 'react-redux'
import { userProfile, userPassword, userSessionToken } from '../context/user'
import apiInstance from '../instance/apiInstance'
import PlusIcon from '../icons/PlusIcon'
import { UserContext } from '../context/UserContext'
// import { router } from '../main.jsx';
import Detailed_Training_Modal from './Detailed_Training_Modal.component';
import { useDisclosure } from '@chakra-ui/react';


function ProgramFeedCard({
    program
}) {

    const { isOpen, onOpen, onClose } = useDisclosure();
    const {
        isOpen: isFeedbackOpen,
        onOpen: onFeedbackOpen,
        onClose: onFeedbackClose
    } = useDisclosure();
    const password = useSelector(userPassword)
    const sessionToken = useSelector(userSessionToken)
    const toast = useToast()
    const queryClient = useQueryClient()

    const {
        followers,
        following,
        user,
    } = useContext(UserContext)

    const [isProgramOwnerFollowed, setIsProgramOwnerFollowed] = useState(
        user && following && following.includes(program.trainer)
    )
    const [isUserJoined, setIsUserJoined] = useState(
        user && user.joinedPrograms && user.joinedPrograms
            .filter(
                (joinedProgram) => joinedProgram.status !== 'LEFT'
            )
            .map((joinedProgram) => joinedProgram.id).includes(program.id)
    )

    useEffect(() => {
        if (user && following) {
            setIsProgramOwnerFollowed(following.includes(program.trainer))
        }
    }, [user, following])

    useEffect(() => {
        if (user && user.joinedPrograms) {
            setIsUserJoined(user.joinedPrograms
                .filter(
                    (joinedProgram) => joinedProgram.status !== 'LEFT'
                )
                .map((joinedProgram) => joinedProgram.id).includes(program.id))
        }
    }, [user])

    // Follow a user Mutation
    const { mutate: followUser } = useMutation(
        {
            mutationFn: async (username) => {
                const response = await apiInstance(sessionToken).post(`api/user/${username}/follow`)

                toast({
                    title: 'Followed the user',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                })

                return response.data
            },
            onSuccess: (data) => {
                queryClient.invalidateQueries({
                    queryKey: ['user']
                })
                queryClient.invalidateQueries({
                    queryKey: ['training-programs']
                })
                queryClient.invalidateQueries({
                    queryKey: ['followers']
                })
                queryClient.invalidateQueries({
                    queryKey: ['following']
                })
            },
            onError: (error) => {
                console.log(error)
                toast({
                    title: 'An error occurred.',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                })
            },
        }
    )

    // Unfollow a user Mutation
    const { mutate: unfollowUser } = useMutation(
        {
            mutationFn: async (username) => {
                const response = await apiInstance(sessionToken).delete(`api/user/${username}/follow`)

                toast({
                    title: 'Unfollowed the user',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                })

                return response.data
            },
            onSuccess: (data) => {
                queryClient.invalidateQueries({
                    queryKey: ['user']
                })
                queryClient.invalidateQueries({
                    queryKey: ['training-programs']
                })
                queryClient.invalidateQueries({
                    queryKey: ['followers']
                })
                queryClient.invalidateQueries({
                    queryKey: ['following']
                })
            },
            onError: (error) => {
                console.log(error)
                toast({
                    title: 'An error occurred.',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                })
            },
        }
    )

    // Join to a program Mutation
    const { mutate: joinProgram } = useMutation(
        {
            mutationFn: async (postId) => {
                const response = await apiInstance(sessionToken).post(`api/training-programs/${postId}/join`)

                toast({
                    title: 'Joined to the program',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                })

                return response.data
            },
            onSuccess: (data) => {
                queryClient.invalidateQueries({
                    queryKey: ['training-programs']
                })
                queryClient.invalidateQueries({
                    queryKey: ['user']
                })
            },
            onError: (error) => {
                console.log(error)
                // If error status is 400, it means the user is already joined to a program with same interest area
                if (error.response.status === 400) {
                    toast({
                        title: error.response.data.message,
                        status: 'error',
                        duration: 3000,
                        isClosable: true,
                    })
                    return
                }

                toast({
                    title: 'An error occurred.',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                })
            },
        }
    )

    // Unjoin to a program Mutation
    const { mutate: unjoinProgram } = useMutation(
        {
            mutationFn: async (postId) => {
                const response = await apiInstance(sessionToken).delete(`api/training-programs/${postId}/leave`)

                toast({
                    title: 'Unjoined to the program',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                })

                return response.data
            },
            onSuccess: (data) => {
                queryClient.invalidateQueries({
                    queryKey: ['training-programs']
                })
                queryClient.invalidateQueries({
                    queryKey: ['user']
                })
            },
            onError: (error) => {
                console.log(error)
                toast({
                    title: 'An error occurred.',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                })
            },
        }
    )

    const navigate = useNavigate()
    const handleStartPracticing = (program_id) => {
        navigate(
            {
                to: `/training?trainingId=${program_id}`,
            }
        )
    }
    return (
        <>
            <Card maxW='lg' marginY={3}>
                <CardHeader>
                    <Flex spacing='4'>
                        <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                            <Avatar
                                size='sm'
                                name={program.trainer}
                            />

                            <Box>
                                <Heading size='sm'>
                                    {program.trainer}
                                </Heading>
                            </Box>
                        </Flex>
                        {/* 
                            Add follow button here
                        */}
                        {
                            !isProgramOwnerFollowed ? (
                                <Button
                                    variant='ghost'
                                    size={"sm"}
                                    colorScheme='purple'
                                    leftIcon={<PlusIcon />}
                                    display={user && program.trainer === user.username ? 'none' : 'flex'}
                                    alignItems='center'
                                    onClick={() => {
                                        if (user) {
                                            followUser(program.trainer)
                                        }
                                    }}
                                    disabled={followUser.isLoading}
                                >
                                    Follow
                                </Button>
                            ) : (
                                <Button
                                    variant='ghost'
                                    size={"sm"}
                                    colorScheme='gray'
                                    display={user && program.trainer === user.username ? 'none' : 'block'}
                                    onClick={() => {
                                        if (user) {
                                            unfollowUser(program.trainer)
                                        }
                                    }}
                                    disabled={unfollowUser.isLoading}
                                >
                                    Unfollow
                                </Button>
                            )
                        }
                    </Flex>
                </CardHeader>
                <CardBody
                    sx={{
                        '& > img': {
                            borderRadius: 'md',
                        },
                    }}
                    display='flex'
                    flexDirection='column'
                    gap='4'
                >
                    <Text
                        fontSize={"xl"}
                        fontWeight={"bold"}
                    >
                        {program.title}
                    </Text>

                    <Text>
                        {program.description}
                    </Text>

                    {/* <Text>
                        {program.exercises.map((exercise) => (
                            <li key={exercise.id}>
                                {exercise.name} - {exercise.exerciseDetail.sets} sets of {exercise.exerciseDetail.repetitions} reps for {exercise.muscleGroup.toLowerCase()}
                            </li>
                        ))}
                    </Text> */}
                    <Button
                        onClick={onOpen}
                        colorScheme="gray"
                        variant="solid"
                    >
                        <ViewIcon className="w-4 h-4 mr-3" />
                        View Description
                    </Button>
                </CardBody>


                <CardFooter
                    justify='space-between'
                    flexWrap='wrap'
                    sx={{
                        '& > button': {
                            minW: '136px',
                        },
                    }}
                >
                    <Flex gap={2} width="full"
                        marginBottom={2}
                    >
                        <Tooltip
                            label={
                                user && program.trainer === user.username ? null : (
                                    isUserJoined ? 'Leave the program' : 'Join the program'
                                )
                            }
                        >
                            <Button
                                flex='1'
                                variant='ghost'
                                leftIcon={isUserJoined ? null : <PlusIcon />}
                                colorScheme='purple'
                                onClick={() => {
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
                                    user && program.trainer === user.username
                                    || joinProgram.isLoading
                                    || unjoinProgram.isLoading
                                }
                            >
                                {
                                    user && program.trainer === user.username ? 'You are the trainer' : (
                                        isUserJoined ? 'Joined' : 'Join'
                                    )
                                }
                            </Button>
                        </Tooltip>

                        {isUserJoined && user && program.trainer !== user.username && (
                            <Flex gap={2} flex="1">
                                <Button
                                    flex='1'
                                    variant='solid'
                                    colorScheme='green'
                                    onClick={() => handleStartPracticing(program.id)}
                                >
                                    Start Practicing
                                </Button>
                            </Flex>
                        )}
                    </Flex>
                    {
                        isUserJoined && user && program.trainer !== user.username && (
                    <Button
                        variant='outline'
                        colorScheme='purple'
                        leftIcon={<ChatIcon />}
                        onClick={() => onFeedbackOpen()}
                        width={"full"}
                    >
                         Give Feedback
                    </Button>
                    )
                    }
                </CardFooter>
            </Card>
            <FeedbackModal
                isOpen={isFeedbackOpen}
                onClose={onFeedbackClose}
                programId={program.id}
                programTitle={program.title}
            />
            <Detailed_Training_Modal
                isOpen={isOpen}
                onClose={onClose}
                data={program}
            />
        </>

    )
}

export default ProgramFeedCard