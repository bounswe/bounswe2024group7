import React from 'react'
import {
    Box,
    Button,
    Flex,
    Heading,
    Input,
    Stack,
    Text,
    useColorModeValue,
    Spinner
} from '@chakra-ui/react'
import { useContext } from 'react'
import { PostContext } from '../context/PostContext'
import PostFeedCard from './PostFeedCard.component'

function PostFeed() {
    const { posts, isLoadingPosts, isFetchingPosts, programs, isFetchingPrograms, isLoadingPrograms } = useContext(PostContext)

    return (
        <Box
            w="full"
            maxW="xl"
            mx="auto"
            py={8}
            px={6}
        >
            <Stack spacing={6}>
                <Flex
                    direction="row"
                    justify="space-between"
                    align="center"
                >
                    <Heading size="lg">Your Feed</Heading>
                </Flex>
                {isLoadingPosts && isFetchingPrograms && (
                    <Flex justify="center">
                        <Spinner />
                        <Text>
                            Loading Content...
                        </Text>
                    </Flex>
                )}
                {posts.length > 0 ? (
                    posts.map((post) => (
                        <PostFeedCard post={post} key={post.id} />
                    ))
                ) : (
                    <Text>
                        Nothing to show here...
                    </Text>
                )}
                {
                    programs.length > 0 && (
                        <Stack>
                            <Heading size="md">Recommended Programs</Heading>
                            {programs.map((program) => (
                                <Box
                                    key={program.id}
                                    p={4}
                                    borderWidth={1}
                                    borderRadius={8}
                                    borderColor={useColorModeValue('gray.200', 'gray.700')}
                                >
                                    <Heading size="sm">{program.name}</Heading>
                                    <Text>{program.description}</Text>
                                    <Button
                                        colorScheme="purple"
                                        mt={4}
                                    >
                                        View Program
                                    </Button>
                                </Box>
                            ))}
                        </Stack>
                    )
                }
            </Stack>
        </Box>
    )
}

export default PostFeed