import React, { useEffect } from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    FormControl,
    FormLabel,
    Input,
    Textarea,
    useColorModeValue
} from "@chakra-ui/react"
import { useState } from 'react'
import { useSelector } from 'react-redux'
import {
    userProfile,
    userPassword
} from '../context/user'
import Select from 'react-select'
import axios from 'axios'
import apiInstance from '../instance/apiInstance'
import { useToast } from '@chakra-ui/react'
import { useDispatch } from 'react-redux'
import { useContext } from 'react'
import { PostContext } from '../context/PostContext'
import { useMutation, useQueryClient } from '@tanstack/react-query'

function CreatePostModal({
    isOpen,
    onClose
}) {
    const { labels, isFetchingLabels } = useContext(PostContext)
    const profile = useSelector(userProfile)
    const password = useSelector(userPassword)
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [image, setImage] = useState('')
    const [selectedLabels, setSelectedLabels] = useState([])

    const theme = useColorModeValue('light', 'dark')
    const selectComponentStyles = {
        control: (styles) => ({
            ...styles,
            backgroundColor: theme === 'light' ? 'white' : 'gray.700',
            color: theme === 'light' ? 'black' : 'white',
            border: '1px solid',
            borderColor: theme === 'light' ? 'gray.300' : 'gray.600',
            boxShadow: 'none',
            '&:hover': {
                borderColor: theme === 'light' ? 'gray.400' : 'gray.500',
            },
        }),
        option: (styles, { isFocused, isSelected }) => {
            return {
                ...styles,
                backgroundColor: isSelected
                    ? theme === 'light'
                        ? '#805AD5'
                        : '#6B46C1'
                    : isFocused
                        ? theme === 'light'
                            ? '#E9D8FD'
                            : '#4C1D95'
                        : 'transparent',
                color: isSelected
                    ? 'white'
                    : theme === 'light'
                        ? 'black'
                        : 'white',
                '&:active': {
                    backgroundColor: isSelected
                        ? theme === 'light'
                            ? '#805AD5'
                            : '#6B46C1'
                        : theme === 'light'
                            ? '#E9D8FD'
                            : '#4C1D95',
                    color: isSelected
                        ? 'white'
                        : theme === 'light'
                            ? 'black'
                            : 'white',
                },
            }
        },
        multiValue: (styles) => {
            return {
                ...styles,
                backgroundColor: theme === 'light' ? '#E9D8FD' : '#4A1D95',
            }
        },
        multiValueLabel: (styles) => {
            return {
                ...styles,
                color: theme === 'light' ? 'black' : 'white',
            }
        },
        multiValueRemove: (styles) => {
            return {
                ...styles,
                color: theme === 'light' ? 'black' : 'white',
                '&:hover': {
                    backgroundColor: theme === 'light' ? '#805AD5' : '#6B46C1',
                    color: theme === 'light' ? 'black' : 'white',
                },
            }
        },
        menu: (styles) => {
            return {
                ...styles,
                backgroundColor: theme === 'light' ? 'white' : '#1A202C',
                color: theme === 'light' ? 'black' : 'white',
            }
        }
    }

    const toast = useToast()
    const queryClient = useQueryClient()

    const createPostMutation = useMutation(
        {
            mutationFn: async (post) => {
                if (selectedLabels.length === 0) {
                    toast({
                        title: 'No labels selected.',
                        description: 'Please select at least one label.',
                        status: 'error',
                        duration: 9000,
                        isClosable: true,
                    })
                    return
                }

                if (!profile) {
                    toast({
                        title: 'Not logged in.',
                        description: 'Please log in to create a post.',
                        status: 'error',
                        duration: 9000,
                        isClosable: true,
                    })
                    return
                }

                // First create image model and get the image id
                if (post.image) {
                    const imageResponse = await apiInstance(
                        profile.username,
                        password
                    ).post('/images', {
                        url: post.image,
                    })

                    post.image = imageResponse.data.id
                } else {
                    delete post.image
                }

                const response = await apiInstance(
                    profile.username,
                    password
                ).post('/posts', {
                    ...post,
                    username: profile.username,
                })

                toast({
                    title: 'Post created.',
                    description: 'Your post has been created successfully.',
                    status: 'success',
                    duration: 9000,
                    isClosable: true,
                })

                return response.data
            },
            onError: (error) => {
                toast({
                    title: 'An error occurred.',
                    description: error.message,
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                })
            },
            onSuccess: (data) => {
                queryClient.invalidateQueries(
                    {
                        queryKey: ['posts']
                    }
                )
                onClose()
            }

        }
    )

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}

            size="3xl"
        >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Create a new post</ModalHeader>
                <ModalCloseButton />
                <ModalBody
                    display="flex"
                    flexDirection="column"
                    gap={4}
                >
                    <FormControl id="title">
                        <FormLabel>Title</FormLabel>
                        <Input type="text"
                            focusBorderColor='purple.500'
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </FormControl>
                    <FormControl id="content">
                        <FormLabel>Content</FormLabel>
                        <Textarea
                            focusBorderColor='purple.500'
                            rows={5}
                            onChange={(e) => setContent(e.target.value)}
                        />
                    </FormControl>
                    <FormControl id="image">
                        <FormLabel>
                            Image URL
                        </FormLabel>
                        <Input type="text"
                            focusBorderColor='purple.500'
                            onChange={(e) => setImage(e.target.value)}
                        />
                    </FormControl>
                    <FormControl id="labels">
                        <FormLabel>
                            Labels
                        </FormLabel>
                        {
                            isFetchingLabels ?
                                <Select
                                    isLoading
                                    isDisabled
                                />
                                :
                                <Select
                                    styles={selectComponentStyles}
                                    isMulti
                                    options={labels}
                                    onChange={(selected) => setSelectedLabels(selected)}
                                />
                        }

                    </FormControl>
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme="purple" mr={3}
                        onClick={() => {
                            createPostMutation.mutate({
                                title: title,
                                content: content,
                                image: image,
                                labels: selectedLabels.map(label => label.value),
                            })
                        }}

                    >
                        Save
                    </Button>
                    <Button variant="ghost"
                        onClick={() => {
                            setTitle('')
                            setContent('')
                            setImage('')
                            setSelectedLabels([])
                            onClose()
                        }}
                    >Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default CreatePostModal