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
    userSessionToken,
} from '../context/user'
import Select from 'react-select'
import axios from 'axios'
import apiInstance from '../instance/apiInstance'
import { useToast } from '@chakra-ui/react'
import { useDispatch } from 'react-redux'
import { useContext } from 'react'
import { PostContext } from '../context/PostContext'
import { UserContext } from '../context/UserContext'
import { useMutation, useQueryClient } from '@tanstack/react-query'

function CreatePostModal({
    isOpen,
    onClose
}) {
    const sessionToken = useSelector(userSessionToken)
    const [content, setContent] = useState('')
    const [imageURL, setImageURL] = useState('')
    const [selectedTags, setSelectedTags] = useState([])
    const [selectedProgram, setSelectedProgram] = useState(null)
    const { programs, isLoadingPrograms, tags, isLoadingTags } = useContext(PostContext)
    const { user } = useContext(UserContext)

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
                if (selectedTags.length === 0) {
                    toast({
                        title: 'No tags selected.',
                        description: 'Please select at least one tag.',
                        status: 'error',
                        duration: 9000,
                        isClosable: true,
                    })
                    return
                }

                if (!user) {
                    toast({
                        title: 'Not logged in.',
                        description: 'Please log in to create a post.',
                        status: 'error',
                        duration: 9000,
                        isClosable: true,
                    })
                    return
                }

                const response = await apiInstance(sessionToken).post('/api/posts', {
                    content: post.content,
                    tags: post.tags.map((tag) => tag.value),
                    trainingProgramId: post.trainingProgramId,
                    imageUrl: post.imageUrl,
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
                console.error('Error creating post:', error)
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
                queryClient.invalidateQueries(
                    {
                        queryKey: ['userPosts']
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
                    <FormControl id="trainingProgram">
                        <FormLabel>
                            Attach a training program
                        </FormLabel>
                        {
                            isLoadingPrograms ?
                                <Select
                                    isLoading
                                    isDisabled
                                />
                                :
                                <Select
                                    styles={selectComponentStyles}
                                    options={programs.map((program) => ({
                                        value: program.id,
                                        label: program.title
                                    }))
                                    }
                                    onChange={(selected) => setSelectedProgram(selected)}
                                />
                        }
                    </FormControl>
                    <FormControl id="tags">
                        <FormLabel>
                            Tags
                        </FormLabel>
                        {
                            isLoadingTags ?
                                <Select
                                    isLoading
                                    isDisabled
                                />
                                :
                                <Select
                                    styles={selectComponentStyles}
                                    isMulti
                                    options={tags.map((tag) => ({
                                        value: tag,
                                        label: tag
                                    }))
                                    }
                                    onChange={(selected) => setSelectedTags(selected)}
                                />
                        }
                    </FormControl>
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme="purple" mr={3}
                        onClick={() => {
                            createPostMutation.mutate({
                                content: content,
                                tags: selectedTags,
                                imageUrl: imageURL,
                                trainingProgramId: selectedProgram.value
                            })
                        }}

                    >
                        Save
                    </Button>
                    <Button variant="ghost"
                        onClick={() => {
                            setContent('')
                            setImage('')
                            setSelectedTags([])
                            setSelectedProgram(null)
                            onClose()
                        }}
                    >Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default CreatePostModal