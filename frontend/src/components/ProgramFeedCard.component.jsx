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
    useDisclosure
} from '@chakra-ui/react'
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
import ProgramModal from './ProgramModal.component'


function ProgramFeedCard({
    program
}) {

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

    useEffect(() => {
        if (user && following) {
            setIsProgramOwnerFollowed(following.includes(program.trainerUsername))
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
    const handleStartPracticing = (programId) => {
        navigate({
            to: `/program?programId=${programId}`,
        })
    }
    return (
        <>
            <Card maxW='lg' onClick={onOpen} cursor="pointer" _hover={{ shadow: 'lg' }}>  // Remove extra Card and combine props here
                    <CardHeader>
                    <Flex spacing='4'>
                        <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                            <Avatar
                                size='sm'
                                name={program.trainerUsername}
                            />

                            <Box>
                                <Heading size='sm'>
                                    {program.trainerUsername}
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
                                    display={user && program.trainerUsername === user.username ? 'none' : 'flex'}
                                    alignItems='center'
                                    onClick={(e) => {
                                        e.stopPropagation(); 
                                        if (user) {
                                            followUser(program.trainerUsername)
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
                                    display={user && program.trainerUsername === user.username ? 'none' : 'block'}
                                    onClick={(e) => {
                                        e.stopPropagation(); 
                                        if (user) {
                                            unfollowUser(program.trainerUsername)
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
                    <Flex gap={2} width="full">
                        <Tooltip
                            label={
                                user && program.trainerUsername === user.username ? null : (
                                    isUserJoined ? 'Leave the program' : 'Join the program'
                                )
                            }
                        >
                            <Button
                                flex='1'
                                variant='ghost'
                                leftIcon={isUserJoined ? null : <PlusIcon />}
                                colorScheme='purple'
                                onClick={(e) => {
                                    e.stopPropagation(); 
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
                                    || joinProgram.isLoading
                                    || unjoinProgram.isLoading
                                }
                            >
                                {
                                    user && program.trainerUsername === user.username ? 'You are the trainer' : (
                                        isUserJoined ? 'Joined' : 'Join'
                                    )
                                }
                            </Button>
                        </Tooltip>

                        {isUserJoined && user && program.trainerUsername !== user.username && (
                            <Button
                                flex='1'
                                variant='solid'
                                colorScheme='green'
                                onClick={(e) => {
                                    e.stopPropagation(); 
                                    handleStartPracticing(program.id)
                                }
                            }
                            >
                                Start Practicing
                            </Button>
                        )}
                    </Flex>
                </CardFooter>
            </Card>
            <ProgramModal
                isOpen={isOpen}
                onClose={onClose}
                program={program}
                user={user}
                isUserJoined={isUserJoined}
                joinProgram={joinProgram}
                handleStartPracticing={handleStartPracticing}
            />
        </>

    )
}

export default ProgramFeedCard