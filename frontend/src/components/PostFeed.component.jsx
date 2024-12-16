import React, { useContext } from 'react';
import {
    Box,
    Flex,
    Heading,
    Stack,
    Text,
    Spinner,
    useBreakpointValue, VStack
} from '@chakra-ui/react';
import { PostContext } from '../context/PostContext';
import PostFeedCard from './PostFeedCard.component';
import ProgramFeedCard from './ProgramFeedCard.component';
import ProfessToday from './ProgressToday.component';
import ProgressToday from './ProgressToday.component';

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
            <VStack // Use VStack to stack components vertically
                spacing={6} // Add space between the boxes
                align="stretch" // Make children stretch to full width
                w={
                    useBreakpointValue({
                        base: 'full', // Full width on small screens
                        lg: 'md', // Larger width on desktop
                    })
                }
            >
                {/* Today's Programs */}
                {/* {programs.length > 0 && (
                    <Box
                    // borderRadius="md"
                    // p={4}
                    // bg="gray.50"
                    // boxShadow="sm"
                    >
                        <Heading size="lg" mb={4}>Your Progress Today</Heading>
                        <ProgressToday />
                    </Box>
                )} */}

                {/* Recommended Programs */}
                <Box
                    borderRadius="md"
                    p={4}
                    boxShadow="sm"
                    width={'full'} // Full width on small screens, larger on desktop
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
            </VStack>

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