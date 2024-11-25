import React, { useContext } from 'react';
import {
    Box,
    Flex,
    Heading,
    Stack,
    Text,
    Spinner,
    useBreakpointValue,
} from '@chakra-ui/react';
import { PostContext } from '../context/PostContext';
import PostFeedCard from './PostFeedCard.component';
import ProgramFeedCard from './ProgramFeedCard.component';

function PostFeed() {
    const { posts, isLoadingPosts, programs, isFetchingPrograms } = useContext(PostContext);

    const isLoading = isLoadingPosts || isFetchingPrograms;

    return (
        <Flex
            w="full"
            maxW="7xl"
            mx="auto"
            py={8}
            px={6}
            direction={{ base: 'column', lg: 'row' }} // Column on small screens, row on large screens
            justify="center"
            align="flex-start"
            gap={6} // Space between columns
        >
            {/* Recommended Programs */}
            <Box
                flex={{ base: 'none', lg: '1' }} // Full width on small screens, smaller on large screens
                w={{ base: '100%', lg: '30%' }} // Adjust width for different breakpoints
                borderRadius="md"
                p={4}
            >
                <Heading size="lg" mb={4}>Recommended Programs</Heading>
                {programs.length > 0 ? (
                    programs.map((program) => (
                        <ProgramFeedCard program={program} key={program.id} />
                    ))
                ) : (
                    <Text>No programs to recommend right now.</Text>
                )}
            </Box>

            {/* Main Feed */}
            <Box
                flex={{ base: 'none', lg: '2' }} // Full width on small screens, larger on desktop
                maxW={{ base: '100%', lg: '2xl' }} // Responsive max width
            >
                <Stack spacing={6}>
                    <Heading size="lg">Your Feed</Heading>
                    {isLoading ? (
                        <Flex justify="center" align="center">
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
                </Stack>
            </Box>
        </Flex>
    );
}

export default PostFeed;