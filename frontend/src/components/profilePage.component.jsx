import React from "react";
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
    Heading
} from '@chakra-ui/react'
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import PostFeedCard from "./PostFeedCard.component.jsx";
import ProgramFeedCard from "./ProgramFeedCard.component.jsx";

export default function ProfilePage() {

    const username = useSelector(userName);
    const profile = useSelector(userProfile);
    const { colorMode, toggleColorMode } = useColorMode();
    const { user, followers, following, posts, programs } = useContext(UserContext);

    console.log("User: ", user);

    return (
        <Box p={4}>
            <Flex direction="column" align="center" justify="center">
                <Avatar
                    size="xl"
                    name={username}
                    src={profile?.avatarUrl || ""} // Will fallback to initials if no avatarUrl
                    mb={4}
                />
                <Text fontSize="2xl" fontWeight="bold">
                    {username}
                </Text>
                <Flex mt={2} justify="center" w="100%">
                    <Stack align="center" mx={4}>
                        <Text fontSize="md" fontWeight="medium">Followers</Text>
                        <Text color="gray.500">
                            {followers.length || 0} {/* Assuming profile contains followers count */}
                        </Text>
                    </Stack>
                    <Stack align="center" mx={4}>
                        <Text fontSize="md" fontWeight="medium">Following</Text>
                        <Text color="gray.500">
                            {following.length || 0} {/* Assuming profile contains following count */}
                        </Text>
                    </Stack>
                </Flex>
            </Flex>
            <Divider mt={8} borderColor="gray.600" />

            {/* Section for Posts, Liked, and Programs */}
            <Flex direction="row" justify="space-between" mt={8} w="100%">
                <Stack align="center" w="100%">
                    <Text fontSize="lg" fontWeight="medium">
                        Posts
                    </Text>
                    <Text color="gray.500">
                        {posts.length || 0} {/* Assuming profile contains posts count */}
                    </Text>
                </Stack>
                <Stack align="center" w="100%">
                    <Text fontSize="lg" fontWeight="medium">
                        Created Programs
                    </Text>
                    <Text color="gray.500">
                        {programs.length || 0} {/* Assuming profile contains programs count */}
                    </Text>
                </Stack>
                <Stack align="center" w="100%">
                    <Text fontSize="lg" fontWeight="medium">
                        Joined Programs
                    </Text>
                    <Text color="gray.500">
                        {user.joinedPrograms && (user.joinedPrograms.length || 0)} {/* Assuming user contains joinedPrograms array */}
                    </Text>
                </Stack>
            </Flex>
            <Divider mt={8} borderColor="gray.600" />

            {/* Section for Posts */}
            <Stack mt={8}>
                <Heading size="lg">
                    Posts
                </Heading>
                <Stack>
                    {
                        posts.length > 0 ?
                            posts.map((post) => (
                                <PostFeedCard key={post.id} post={post} />
                            )) :
                            <Text>No posts found</Text>
                    }
                </Stack>
            </Stack>

            {/* Section for Programs if the user role is TRAINER */}
            {
                user.role === 'TRAINER' && (<Stack mt={8}>
                    <Heading size="lg">
                        Created Programs
                    </Heading>
                    <Stack>
                        {
                            programs.length > 0 ?
                                programs.map((program) => (
                                    <ProgramFeedCard key={program.id} program={program} />
                                )) :
                                <Text>No programs found</Text>
                        }
                    </Stack>
                </Stack>)
            }

            {/* 
            // Section for Joined Programs
            */}
            <Stack mt={8}>
                <Heading size="lg">
                    Joined Programs
                </Heading>
                <Stack>
                    {
                        user.joinedPrograms && user.joinedPrograms.length > 0 ?
                            user.joinedPrograms.map((program) => (
                                <ProgramFeedCard key={program.id} program={program} />
                            )) :
                            <Text>No programs found</Text>
                    }
                </Stack>
            </Stack>
        </Box>

    );
}
