import React, { useContext } from 'react';
import {
    Box,
    Flex,
    Heading,
    Stack,
    Text,
    Spinner,
    useBreakpointValue, VStack,
    Tabs, TabList, TabPanels, Tab, TabPanel
} from '@chakra-ui/react';
import { PostContext } from '../context/PostContext';
import PostFeedCard from './PostFeedCard.component';
import ProgramFeedCard from './ProgramFeedCard.component';
import UserJoinedProgramsCard from './UserJoinedProgramsCard.component'

function PostFeed() {
    const { posts, isLoadingPosts, programs, isFetchingPrograms, recommendedPrograms, explorePrograms, forYouPosts, explorePosts } = useContext(PostContext);

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
                {programs.length > 0 && (
                    <Box>
                        <Heading size="lg" mb={4}>Your Active Programs:</Heading>
                        <UserJoinedProgramsCard />
                    </Box>
                )}
                {/* Recommended Programs */}
                <Box
                    borderRadius="md"
                    p={4}
                    boxShadow="sm"
                    width={'full'} // Full width on small screens, larger on desktop
                >
                    <Heading size="lg" mb={4}>Recommended Programs</Heading>
                    {recommendedPrograms.length > 0 ? (
                        programs.map((program) => (
                            <ProgramFeedCard program={program} key={program.id} />
                        ))
                    ) : (
                        <Text>No programs to recommend right now.</Text>
                    )}
                </Box>

                {/* Explore Programs */}
                <Box
                    borderRadius="md"
                    p={4}
                    boxShadow="sm"
                    width={'full'} // Full width on small screens, larger on desktop
                >
                    <Heading size="lg" mb={4}>Explore Programs</Heading>
                    {explorePrograms.length > 0 ? (
                        programs.map((program) => (
                            <ProgramFeedCard program={program} key={program.id} />
                        ))
                    ) : (
                        <Text>No programs to explore right now.</Text>
                    )}
                </Box>
            </VStack>

            {/* 
                Tabs for different types of posts. Explore and For You
            */}
            {
                isLoading ? (
                    <Spinner size="xl" />
                ) : (
                    <Box
                        flex={{ base: 'none', lg: '1' }} // Full width on small screens, larger on desktop
                        maxW={{ base: '100%', lg: '2xl' }} // Responsive max width
                    >
                        <Tabs isFitted
                            colorScheme='purple'
                        >
                            <TabList mb={4}
                            >
                                <Tab>For You</Tab>
                                <Tab>Explore</Tab>
                            </TabList>
                            <TabPanels>
                                <TabPanel>
                                    {forYouPosts.length > 0 ? (
                                        forYouPosts.map((post) => (
                                            <PostFeedCard post={post} key={post.id} />
                                        ))
                                    ) : (
                                        <Text>No posts for you right now.</Text>
                                    )}
                                </TabPanel>
                                <TabPanel>
                                    {explorePosts.length > 0 ? (
                                        explorePosts.map((post) => (
                                            <PostFeedCard post={post} key={post.id} />
                                        ))
                                    ) : (
                                        <Text>No posts to explore right now.</Text>
                                    )}
                                </TabPanel>
                            </TabPanels>
                        </Tabs>
                    </Box>
                )
            }
        </Flex>
    );
}

export default PostFeed;