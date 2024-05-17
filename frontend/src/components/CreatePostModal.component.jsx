import React from 'react'
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
    artifactLabels,
    userProfile
} from '../context/user'
import Select from 'react-select'
import axios from 'axios'
import apiInstance from '../instance/apiInstance'
import { useToast } from '@chakra-ui/react'
import { useDispatch } from 'react-redux'


function CreatePostModal({
    isOpen,
    onClose
}) {
    const labels = useSelector(artifactLabels).map(label => ({
        value: label.id,
        label: label.value
    }))
    const profile = useSelector(userProfile)
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [image, setImage] = useState('')
    const [selectedLabels, setSelectedLabels] = useState([])

    const chooseLabel = (label) => {
        setSelectedLabels([...selectedLabels, label])
    }

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
                        />
                    </FormControl>
                    <FormControl id="content">
                        <FormLabel>Content</FormLabel>
                        <Textarea
                            focusBorderColor='purple.500'
                            rows={5}
                        />
                    </FormControl>
                    <FormControl id="image">
                        <FormLabel>
                            Image URL
                        </FormLabel>
                        <Input type="text"
                            focusBorderColor='purple.500'
                        />
                    </FormControl>
                    <FormControl id="labels">
                        <FormLabel>
                            Labels
                        </FormLabel>
                        <Select
                            styles={selectComponentStyles}
                            isMulti
                            options={labels}
                            onChange={(selected) => chooseLabel(selected)}
                        />
                    </FormControl>
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme="purple" mr={3}>
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