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
    const { posts, isLoadingPosts, isFetchingPosts } = useContext(PostContext)

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
                    <Heading size="lg">Posts</Heading>
                </Flex>
                {/* <Input
                    placeholder="Search posts..."
                    variant="filled"
                /> */}
                {isLoadingPosts && (
                    <Flex justify="center">
                        <Spinner />
                        <Text>Loading posts...</Text>
                    </Flex>
                )}

                {posts.map(post => (
                    <PostFeedCard
                        key={post.id}
                        post={post}
                    />
                ))}
            </Stack>
        </Box>
    )
}

export default PostFeed