import React, { useContext } from 'react';
import {
    Box,
    Button,
    Flex,
    Heading,
    Stack,
    Text,
    useColorModeValue,
    Spinner
} from '@chakra-ui/react';
import { PostContext } from '../context/PostContext';
import PostFeedCard from './PostFeedCard.component';
import ProgramFeedCard from './ProgramFeedCard.component';

function PostFeed() {
    const { posts, isLoadingPosts, isFetchingPosts, programs, isFetchingPrograms, isLoadingPrograms } = useContext(PostContext);

    const isLoading = isLoadingPosts || isFetchingPrograms;

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
                {isLoading ? (
                    <Flex justify="center">
                        <Spinner />
                        <Text>Loading Content...</Text>
                    </Flex>
                ) : posts.length > 0 ? (
                    posts.map((post) => (
                        <PostFeedCard post={post} key={post.id} />
                    ))
                ) : (
                    <Text>Nothing to show here...</Text>
                )}
                {
                    // Recommended Programs
                }
                <Heading size="lg">Recommended Programs</Heading>
                {programs.length > 0 && (
                    programs.map((program) => (
                        <ProgramFeedCard program={program} key={program.id} />
                    ))
                )}
            </Stack>
        </Box>
    );
}

export default PostFeed;