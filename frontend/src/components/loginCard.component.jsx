import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Link,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    useToast
} from '@chakra-ui/react'
import apiInstance from '../instance/apiInstance.js'
import { registerPath } from '../constants/paths.js'
import { useState } from 'react'
import { useNavigate } from "@tanstack/react-router"
import { useDispatch } from "react-redux";
import { userActions } from '../context/user.js'
import Cookies from "js-cookie"

export default function LoginCard() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    const toast = useToast()
    const dispatch = useDispatch();

    const handleUserLogin = async () => {
        try {
            const response = await apiInstance().post(
                "login",
                {
                    username,
                    password
                }
            )

            if (response.status === 200) {

                dispatch(
                    userActions.login({
                        userName: username,
                    })
                )

                Cookies.set("username", username)

                navigate(
                    {
                        to: "/"
                    }
                )
            }
        } catch (e) {
            console.log(e)
            toast({
                title: "There was an error while logging in. Please try again.",
                status: "error",
                isClosable: true,
                duration: 2000,
            });
        }
    }

    return (
        <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            bg={useColorModeValue('white', 'gray.800')}>
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                <Stack align={'center'}>
                    <Heading fontSize={'4xl'}>Sign in to your account</Heading>
                    <Text fontSize={'lg'} color={'gray.600'}>
                        to enjoy all of <Text
                            as={"span"}
                            color={'purple.400'}>Artifacts!</Text>
                    </Text>
                </Stack>
                <Box
                    rounded={'lg'}
                    bg={useColorModeValue('white', 'gray.700')}
                    boxShadow={'lg'}
                    p={8}>
                    <Stack spacing={4}>
                        <FormControl id="email">
                            <FormLabel>Username</FormLabel>
                            <Input type="text"
                                focusBorderColor='purple.500'
                                onChange={
                                    (e) => {
                                        setUsername(e.target.value)
                                    }
                                }
                            />
                        </FormControl>
                        <FormControl id="password">
                            <FormLabel>Password</FormLabel>
                            <Input type="password"
                                focusBorderColor='purple.500'
                                onChange={
                                    (e) => {
                                        setPassword(e.target.value)
                                    }
                                }
                            />
                        </FormControl>
                        <Stack spacing={10}>
                            <Text align={'center'}>
                                Don't have an account? <Link
                                    color={'purple.400'}
                                    href={registerPath}
                                >Sign up</Link>
                            </Text>
                            <Button
                                bg={'purple.400'}
                                color={'white'}
                                _hover={{
                                    bg: 'purple.500',
                                }}
                                onClick={handleUserLogin}
                            >
                                Sign in
                            </Button>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    )
}