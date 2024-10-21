import React from 'react'
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
import { PostContext } from '../context/PostContext'
import { useSelector } from 'react-redux'
import { userProfile, userPassword } from '../context/user'
import apiInstance from '../instance/apiInstance'


function PostFeedCard({
    post
}) {
    const profile = useSelector(userProfile)
    const password = useSelector(userPassword)
    const [newComment, setNewComment] = useState('')
    const toast = useToast()

    const queryClient = useQueryClient()
    const likeButtonColor = useColorModeValue('#6b46c1', '#d6bcfa')

    // Like a post Mutation
    const { mutate: likePost } = useMutation(
        {
            mutationFn: async (postId) => {
                const response = await apiInstance(
                    profile.username,
                    password
                ).post(`/posts/${postId}/likes`)

                toast({
                    title: 'Post Liked',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                })

                return response.data
            },
            onSuccess: (data) => {
                queryClient.invalidateQueries({
                    queryKey: ['posts'],
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

    const { mutate: unlikePost } = useMutation(
        {
            mutationFn: async (postId) => {
                const response = await apiInstance(
                    profile.username,
                    password
                ).post(`/posts/${postId}/unlike`)

                toast({
                    title: 'Post Unliked',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                })

                return response.data
            },
            onSuccess: (data) => {
                queryClient.invalidateQueries({
                    queryKey: ['posts'],
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

    // Add comment mutation
    const { mutate: addComment } = useMutation(
        {
            mutationFn: async ({ postId, comment }) => {
                const response = await apiInstance(
                    profile.username,
                    password
                ).post(`/posts/${postId}/comments`, {
                    content: comment,
                })

                toast({
                    title: 'Comment added',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                })

                return response.data
            },
            onSuccess: (data) => {
                queryClient.invalidateQueries({
                    queryKey: ['posts'],
                })
                setNewComment('')
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
    );

    return (
        <>
            <Card maxW='lg'>
                <CardHeader>
                    <Flex spacing='4'>
                        <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                            {
                                post.profile.profile_picture ? (
                                    <Avatar
                                        size='sm'
                                        src={post.profile.image}
                                    />
                                ) : (
                                    <Avatar
                                        size='sm'
                                        name={post.profile.username}
                                    />
                                )
                            }

                            <Box>
                                <Heading size='sm'>
                                    {post.profile.username}
                                </Heading>
                                <Text
                                    fontSize='sm'
                                    color='gray.500'
                                >
                                    {
                                        new Date(post.created_at).toLocaleDateString(
                                            'tr-TR',
                                            {
                                                month: 'long',
                                                day: 'numeric',
                                                year: 'numeric',
                                            }
                                        ) + ' at ' + new Date(post.created_at).toLocaleTimeString(
                                            'tr-TR',
                                            {
                                                hour: 'numeric',
                                                minute: 'numeric',
                                            }
                                        )
                                    }
                                </Text>
                            </Box>
                        </Flex>
                        <IconButton
                            variant='ghost'
                            colorScheme='gray'
                            aria-label='See menu'
                            icon={<ThreeDotsIcon />}
                        />
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
                        {post.content}
                    </Text>
                    {/* 
                    Labels
                */}
                    <Flex flexWrap='wrap' gap='2'>
                        {
                            post.labels.map(label => (
                                <Badge
                                    key={label.id}
                                    colorScheme='purple'
                                    padding={"4px 6px"}
                                    borderRadius={6}
                                >
                                    {label.value}
                                </Badge>
                            ))
                        }
                    </Flex>
                </CardBody>
                <Image
                    objectFit='contain'
                    src={post.image.url}
                    alt={post.title}
                    maxHeight='400px'
                />

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
                        <HeartIcon
                            fill={
                                post.likes.some(like => like.profile === profile.id) ?
                                    likeButtonColor : 'none'
                            }
                        />
                    }
                        colorScheme='purple'
                        onClick={() => {
                            if (post.likes.some(like => like.profile === profile.id)) {
                                unlikePost(post.id)
                                return
                            }

                            likePost(post.id)
                        }}
                    >
                        {post.likes.length > 0 ? post.likes.length : 'Like'}
                    </Button>
                    <Button flex='1' variant='ghost' leftIcon={<ChatIcon />}>
                        Comment
                    </Button>
                    <Button flex='1' variant='ghost' leftIcon={<BookmarkAddIcon />}>
                        Save
                    </Button>
                </CardFooter>
                <Box px="4" py="2">
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
                                        comment.profile.profile_picture ? (
                                            <Avatar
                                                size="xs"
                                                src={comment.profile.profile_picture}
                                            />
                                        ) : (
                                            <Avatar
                                                size="xs"
                                                name={comment.profile.username}
                                            />
                                        )
                                    }
                                    <Text fontWeight="bold" mr="2">{comment.profile.username}</Text>
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
                </Box>
            </Card>
        </>

    )
}

export default PostFeedCard