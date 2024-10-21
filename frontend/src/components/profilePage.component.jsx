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
    Divider
} from '@chakra-ui/react'

export default function ProfilePage() {

    const username = useSelector(userName);
    const profile = useSelector(userProfile);
    const { colorMode, toggleColorMode } = useColorMode();

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
                            {profile?.followers || 0} {/* Assuming profile contains followers count */}
                        </Text>
                    </Stack>
                    <Stack align="center" mx={4}>
                        <Text fontSize="md" fontWeight="medium">Following</Text>
                        <Text color="gray.500">
                            {profile?.following || 0} {/* Assuming profile contains following count */}
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
                        {profile?.posts || 0} {/* Assuming profile contains posts count */}
                    </Text>
                </Stack>
                <Stack align="center" w="100%">
                    <Text fontSize="lg" fontWeight="medium">
                        Liked
                    </Text>
                    <Text color="gray.500">
                        {profile?.liked || 0} {/* Assuming profile contains liked count */}
                    </Text>
                </Stack>
                <Stack align="center" w="100%">
                    <Text fontSize="lg" fontWeight="medium">
                        Programs
                    </Text>
                    <Text color="gray.500">
                        {profile?.programs || 0} {/* Assuming profile contains programs count */}
                    </Text>
                </Stack>
            </Flex>
            <Divider mt={8} borderColor="gray.600" />
        </Box>
        
    );
}
