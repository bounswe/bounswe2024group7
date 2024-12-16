import React from 'react'
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
    Image,
    Text,
    Badge,
    useToast,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionIcon,
    AccordionPanel,
} from '@chakra-ui/react'
import HeartIcon from '../icons/HeartIcon'
import BookmarkAddIcon from '../icons/BookmarkAddIcon'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useSelector } from 'react-redux'
import { userSessionToken } from '../context/user'
import apiInstance from '../instance/apiInstance'
import { useColorModeValue } from '@chakra-ui/react'
import Detailed_Training_Modal from './Detailed_Training_Modal.component';
import { forwardRef } from 'react'

const PostFeedCard = forwardRef(({ post }, ref) => {
    const sessionToken = useSelector(userSessionToken)
    const toast = useToast()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const queryClient = useQueryClient()
    const likeButtonColor = useColorModeValue('#6b46c1', '#d6bcfa')

    const { mutate: likePost } = useMutation(
        {
            mutationFn: async (postId) => {
                const response = await apiInstance(
                    sessionToken
                ).post(`/api/posts/${postId}/like`)

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
                    sessionToken
                ).delete(`/api/posts/${postId}/like`)

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

    const { mutate: savePost } = useMutation(
        {
            mutationFn: async (postId) => {
                const response = await apiInstance(
                    sessionToken
                ).post(`/api/posts/${postId}/bookmark`)

                toast({
                    title: 'Post Saved',
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

    const { mutate: unsavePost } = useMutation(
        {
            mutationFn: async (postId) => {
                const response = await apiInstance(
                    sessionToken
                ).delete(`/api/posts/${postId}/bookmark`)

                toast({
                    title: 'Post Unsaved',
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

    return (
        <Card maxW='lg'
            ref={ref}
        >
            <Detailed_Training_Modal
                isOpen={isOpen}
                onClose={onClose}
                data={post.trainingProgram}
            />
            <CardHeader>
                <Flex spacing='4'>
                    <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                        <Avatar
                            size='sm'
                            name={post.username}
                        />

                        <Box>
                            <Heading size='sm'>
                                {post.username}
                            </Heading>
                            <Text
                                fontSize='sm'
                                color='gray.500'
                            >
                                {
                                    new Date(post.createdAt).toLocaleDateString(
                                        'tr-TR',
                                        {
                                            month: 'long',
                                            day: 'numeric',
                                            year: 'numeric',
                                        }
                                    ) + ' at ' + new Date(post.createdAt).toLocaleTimeString(
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
                <Flex flexWrap='wrap' gap='2'>
                    {
                        post.tags.map((tag, index) => (
                            <Badge
                                key={index}
                                colorScheme='purple'
                                padding={"4px 6px"}
                                borderRadius={6}
                            >
                                {tag}
                            </Badge>
                        ))
                    }
                </Flex>
                {post.trainingProgram && (
                    <Button colorScheme="purple" variant="outline" onClick={onOpen}>
                        View Training Program
                    </Button>
                )}
            </CardBody>
            {
                post.imageUrl && (
                    <Image
                        objectFit='contain'
                        src={post.imageUrl}
                        alt={post.content}
                        maxHeight='400px'
                    />
                )
            }

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
                            post.isLiked ?
                                likeButtonColor : 'none'
                        }
                    />
                }
                    colorScheme='purple'
                    onClick={() => {
                        if (post.isLiked) {
                            unlikePost(post.id)
                            return
                        }

                        likePost(post.id)
                    }}
                >
                    {post.likeCount > 0 ? post.likeCount : 'Like'}
                </Button>
                <Button
                    flex='1'
                    variant='ghost'
                    leftIcon={<BookmarkAddIcon />}
                    onClick={() => {
                        if (post.isSaved) {
                            unsavePost(post.id)
                            return
                        }

                        savePost(post.id)
                    }}
                >
                    {
                        post.bookmarked ?
                            'Unsave' : 'Save'
                    }
                </Button>
            </CardFooter>
        </Card>
    )
})

export default PostFeedCard