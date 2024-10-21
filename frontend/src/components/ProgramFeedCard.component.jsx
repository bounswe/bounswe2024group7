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
    IconButton,
    Icon,
    Image,
    Text,
    Badge,
    useToast,
    Textarea,
    useColorModeValue,
    useColorMode
} from '@chakra-ui/react'
import {
    ChatIcon,
} from '@chakra-ui/icons'
import HeartIcon from '../icons/HeartIcon'
import ThreeDotsIcon from '../icons/ThreeDotsIcon'
import BookmarkAddIcon from '../icons/BookmarkAddIcon'
import BookmarkCheckIcon from '../icons/BookmarkCheckIcon'
import BookmarkRemoveIcon from '../icons/BookmarkRemoveIcon'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useContext } from 'react'
import { useSelector } from 'react-redux'
import { userProfile, userPassword, userSessionToken } from '../context/user'
import apiInstance from '../instance/apiInstance'
import PlusIcon from '../icons/PlusIcon'
import { UserContext } from '../context/UserContext'


function ProgramFeedCard({
    program
}) {
    const password = useSelector(userPassword)
    const sessionToken = useSelector(userSessionToken)
    const toast = useToast()
    const queryClient = useQueryClient()

    const {
        followers,
        following,
        user
    } = useContext(UserContext)

    const [isProgramOwnerFollowed, setIsProgramOwnerFollowed] = useState(
        user && following && following.includes(program.trainerUsername)
    )
    const [isUserJoined, setIsUserJoined] = useState(
        user && user.joinedPrograms && user.joinedPrograms.map((joinedProgram) => joinedProgram.id).includes(program.id)
    )

    useEffect(() => {
        if (user && following) {
            setIsProgramOwnerFollowed(following.includes(program.trainerUsername))
        }
    }, [user, following])

    useEffect(() => {
        if (user && user.joinedPrograms) {
            setIsUserJoined(user.joinedPrograms.map((joinedProgram) => joinedProgram.id).includes(program.id))
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
                const response = await apiInstance(sessionToken).delete(`api/training-programs/leave?programId=${postId}`)

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

    return (
        <>
            <Card maxW='lg'>
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
                                    colorScheme='purple'
                                    leftIcon={<PlusIcon />}
                                    display={user && program.trainerUsername === user.username ? 'none' : 'block'}
                                    onClick={() => {
                                        if (user) {
                                            followUser(program.trainerUsername)
                                        }
                                    }}
                                >
                                    Follow
                                </Button>
                            ) : (
                                <Button
                                    variant='ghost'
                                    colorScheme='gray'
                                    display={user && program.trainerUsername === user.username ? 'none' : 'block'}
                                    onClick={() => {
                                        if (user) {
                                            unfollowUser(program.trainerUsername)
                                        }
                                    }}
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
                    <Text>
                        Title: {program.title}
                    </Text>

                    <Text>
                        Description: {program.description}
                    </Text>

                    <Text>
                        Location Type: {program.locationType.toLowerCase()}
                    </Text>

                    <Text>
                        Program Type: {program.programType.toLowerCase()}
                    </Text>

                    <Text>
                        {program.exercises.map((exercise) => (
                            <li key={exercise.id}>
                                {exercise.name} - {exercise.exerciseDetail.sets} sets of {exercise.exerciseDetail.repetitions} reps for {exercise.muscleGroup.toLowerCase()}
                            </li>
                        ))}
                    </Text>
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
                    <Button flex='1' variant='ghost' leftIcon={
                        isUserJoined ? null : <PlusIcon />
                    }
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
                        }
                        }
                        disabled={
                            user && program.trainerUsername === user.username
                        }
                    >
                        {
                            user && program.trainerUsername === user.username ? 'You are the trainer' : (
                                isUserJoined ? 'Joined' : 'Join'
                            )
                        }
                    </Button>
                </CardFooter>
                {/* <Box px="4" py="2">
                    <Heading size="sm" mb="4">Comments</Heading>
                    {
                        post.comments && post.comments.map((comment) => (
                            <Box key={comment.id} mb="2"
                                p="2"
                            >
                                <Flex alignItems="center" mb="1"
                                    gap={2}
                                >
                                    {
                                        comment.user.user_picture ? (
                                            <Avatar
                                                size="xs"
                                                src={comment.user.user_picture}
                                            />
                                        ) : (
                                            <Avatar
                                                size="xs"
                                                name={comment.user.username}
                                            />
                                        )
                                    }
                                    <Text fontWeight="bold" mr="2">{comment.user.username}</Text>
                                    <Text fontSize="xs" color="gray.500">
                                        {new Date(comment.created_at).toLocaleDateString('tr-TR', {
                                            month: 'long',
                                            day: 'numeric',
                                            year: 'numeric',
                                        }) +
                                            ' at ' +
                                            new Date(comment.created_at).toLocaleTimeString('tr-TR', {
                                                hour: 'numeric',
                                                minute: 'numeric',
                                            })}
                                    </Text>
                                </Flex>
                                <Text>{comment.content}</Text>
                            </Box>
                        ))
                    }

                    <Box mt="4">
                        <Textarea
                            placeholder="Add a comment..."
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            mb="2"
                        />
                        <Button
                            size={"sm"}
                            colorScheme="purple"
                            onClick={() => addComment({ postId: post.id, comment: newComment })}
                            isDisabled={!newComment.trim()}
                        >
                            Post Comment
                        </Button>
                    </Box>
                </Box> */}
            </Card>
        </>

    )
}

export default ProgramFeedCard