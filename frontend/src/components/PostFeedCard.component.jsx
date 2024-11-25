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

    return (
        <>
            <Card maxW='lg'>
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
                        {/* <IconButton
                            variant='ghost'
                            colorScheme='gray'
                            aria-label='See menu'
                            icon={<ThreeDotsIcon />}
                        /> */}
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
                            post.tags.map((tag, index) => (
                                <Badge
                                    key={index}
                                    colorScheme='purple'
                                    padding={"4px 6px"}
                                    borderRadius={6}
                                >
                                    {tag.value}
                                </Badge>
                            ))
                        }
                    </Flex>
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
                    {/* <Button flex='1' variant='ghost' leftIcon={
                        <HeartIcon
                            fill={
                                post.likes?.some(like => like.profile === profile.id) ?
                                    likeButtonColor : 'none'
                            }
                        />
                    }
                        colorScheme='purple'
                        onClick={() => {
                            if (post.likes?.some(like => like.profile === profile.id)) {
                                unlikePost(post.id)
                                return
                            }

                            likePost(post.id)
                        }}
                    >
                        {post.likes.length > 0 ? post.likes.length : 'Like'}
                    </Button>
                    <Button flex='1' variant='ghost' leftIcon={<BookmarkAddIcon />}>
                        Save
                    </Button> */}
                </CardFooter>
            </Card>
        </>

    )
}

export default PostFeedCard