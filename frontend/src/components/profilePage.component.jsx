import React, { useState } from "react";
import { useSelector } from 'react-redux';
import { userName, userProfile } from '../context/user.js';
import {
    Box,
    Flex,
    Text,
    Avatar,
    useColorMode,
    Stack,
    Divider,
    Button,
} from '@chakra-ui/react';
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import PostFeedCard from "./PostFeedCard.component.jsx";
import ProgramFeedCard from "./ProgramFeedCard.component.jsx";
import ProgressBoard from "./ProgressBoard.component.jsx";

export default function ProfilePage() {
    const username = useSelector(userName);
    const profile = useSelector(userProfile);
    const { colorMode, toggleColorMode } = useColorMode();
    const { user, followers, following, posts, programs } = useContext(UserContext);
    const [view, setView] = useState('posts'); // Toggle between 'posts', 'joinedPrograms', and 'createdPrograms', 'MyProgress"

    return (
        <Box p={6} maxW="1200px" mx="auto" bg={colorMode === "light" ? "gray.50" : "gray.800"} borderRadius="md">
            <Flex direction="column" align="center">
                <Avatar
                    size="2xl"
                    name={username}
                    src={profile?.avatarUrl || ""}
                    mb={4}
                />
                <Text fontSize="2xl" fontWeight="bold">
                    {username}
                </Text>
                <Text color="gray.500" mt={2}>
                    {user.role || "Add a bio to tell people about yourself."}
                </Text>
                <Flex mt={4} justify="center" gap={8}>
                    <Stack textAlign="center">
                        <Text fontSize="sm" color="gray.600">Followers</Text>
                        <Text fontSize="xl" color="teal.500">{followers.length || 0}</Text>
                    </Stack>
                    <Stack textAlign="center">
                        <Text fontSize="sm" color="gray.600">Following</Text>
                        <Text fontSize="xl" color="teal.500">{following.length || 0}</Text>
                    </Stack>
                    <Stack textAlign="center">
                        <Text fontSize="sm" color="gray.600">Posts</Text>
                        <Text fontSize="xl" color="teal.500">{posts.length || 0}</Text>
                    </Stack>
                </Flex>
            </Flex>

            <Divider mt={8} borderColor="gray.400" />

            <Flex justify="center" mt={6} gap={4}>
                <Button
                    colorScheme={view === 'posts' ? 'teal' : 'gray'}
                    onClick={() => setView('posts')}
                >
                    Posts
                </Button>
                {user.role === 'TRAINEE' && (
                    <Button
                        colorScheme={view === 'joinedPrograms' ? 'teal' : 'gray'}
                        onClick={() => setView('joinedPrograms')}
                    >
                        Joined Programs
                    </Button>

                )}
                {user.role === 'TRAINEE' && (
                    <Button
                        colorScheme={view === 'MyProgress' ? 'teal' : 'gray'}
                        onClick={() => setView('MyProgress')}
                    >
                        My Progress
                    </Button>

                )}
                {user.role === 'TRAINER' && (
                    <Button
                        colorScheme={view === 'createdPrograms' ? 'teal' : 'gray'}
                        onClick={() => setView('createdPrograms')}
                    >
                        Created Programs
                    </Button>
                )}
            </Flex>

            <Box mt={8}>
                {view === 'posts' && (
                    <Stack spacing={4}>
                        {posts.length > 0 ? (
                            posts.map((post) => <PostFeedCard key={post.id} post={post} />)
                        ) : (
                            <Text color="gray.500" textAlign="center">No posts yet</Text>
                        )}
                    </Stack>
                )}
                {view === 'joinedPrograms' && user.role === 'TRAINEE' && (
                    <Stack spacing={4}>
                        {user.joinedPrograms && user.joinedPrograms.length > 0 ? (
                            user.joinedPrograms.map((program) => (
                                <ProgramFeedCard key={program.id} program={program} />
                            ))
                        ) : (
                            <Text color="gray.500" textAlign="center">No joined programs</Text>
                        )}
                    </Stack>
                )}
                {view === 'MyProgress' && user.role === 'TRAINEE' && (
                    user.joinedPrograms && user.joinedPrograms.length >= 0 ? (
                        <ProgressBoard />
                    ) : (
                        <Text color="gray.500" textAlign="center">No joined programs</Text>
                    )
                )}

                {view === 'createdPrograms' && user.role === 'TRAINER' && (
                    <Stack spacing={4}>
                        {programs?.length > 0 ? (
                            programs.map((program) => (
                                <ProgramFeedCard key={program.id} program={program} />
                            ))
                        ) : (
                            <Text color="gray.500" textAlign="center">No created programs yet</Text>
                        )}
                    </Stack>
                )}
            </Box>
        </Box>
    );
}
