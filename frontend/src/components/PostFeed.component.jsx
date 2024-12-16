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
import { UserContext } from '../context/UserContext';
import PostFeedCard from './PostFeedCard.component';
import ProgramFeedCard from './ProgramFeedCard.component';
import UserJoinedProgramsCard from './UserJoinedProgramsCard.component'
import { useRef } from 'react';
import { useSelector } from 'react-redux';
import { userSessionToken } from '../context/user';

function PostFeed() {
    const { 
        isLoadingPosts, 
        programs, 
        isFetchingPrograms, 
        recommendedPrograms, 
        explorePrograms,
        forYouPosts,
        fetchNextForYouPage,
        hasMoreForYou,
        isLoadingForYou,
        explorePosts,
        fetchNextExplorePage,
        hasMoreExplore,
        isLoadingExplore,
    } = useContext(PostContext);

    const { user } = useContext(UserContext);
    const sessionToken = useSelector(userSessionToken);

    const isLoading = isLoadingPosts || isFetchingPrograms;

    const observerForYou = useRef();
    const observerExplore = useRef();

    // Observer for "For You" posts
    const lastForYouPostRef = (node) => {
        if (isLoadingForYou) return;
        if (observerForYou.current) observerForYou.current.disconnect();
        observerForYou.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && hasMoreForYou) {
                fetchNextForYouPage();
            }
        });
        if (node) observerForYou.current.observe(node);
    };

    // Observer for "Explore" posts
    const lastExplorePostRef = (node) => {
        if (isLoadingExplore) return;
        if (observerExplore.current) observerExplore.current.disconnect();
        observerExplore.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && hasMoreExplore) {
                fetchNextExplorePage();
            }
        });
        if (node) observerExplore.current.observe(node);
    };

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
                    {
                        !user || !sessionToken ?
                            <Text>Please log in to see personalized programs.</Text>
                            : recommendedPrograms.length > 0 ? (
                        recommendedPrograms.map((program) => (
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
                        explorePrograms.map((program) => (
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
                            {/* For You Tab */}
                            <TabPanel>
                                { !user || !sessionToken ? 
                                    <Text>Please log in to see personalized posts.</Text>
                                    : forYouPosts.map((post, index) => {
                                    if (forYouPosts.length === index + 1) {
                                        return (
                                            <PostFeedCard
                                                ref={lastForYouPostRef}
                                                post={post}
                                                key={post.id}
                                            />
                                        );
                                    }
                                    return <PostFeedCard post={post} key={post.id} />;
                                })}
                                {isLoadingForYou && <Spinner size="lg" />}
                            </TabPanel>

                            {/* Explore Tab */}
                            <TabPanel>
                                {explorePosts.map((post, index) => {
                                    if (explorePosts.length === index + 1) {
                                        return (
                                            <PostFeedCard
                                                ref={lastExplorePostRef}
                                                post={post}
                                                key={post.id}
                                            />
                                        );
                                    }
                                    return <PostFeedCard post={post} key={post.id} />;
                                })}
                                {isLoadingExplore && <Spinner size="lg" />}
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