import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    HStack,
    InputRightElement,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Link,
    useToast,
    Select,
} from '@chakra-ui/react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import {
    loginPath
} from "../constants/paths.js"
import apiInstance from '../instance/apiInstance.js'
import { useState } from 'react'
import { useNavigate } from "@tanstack/react-router"
import { useDispatch } from "react-redux";
import { userActions, userProfile } from '../context/user.js'
import Cookies from "js-cookie"
import { Select as Selector} from 'chakra-react-select';
import { PostContext } from '../context/PostContext.jsx'
import { useContext } from 'react'
import { useSelector } from 'react-redux'

const userRoles = [
    {
        value: "TRAINEE",
        label: "Trainee"
    },
    {
        value: "TRAINER",
        label: "Trainer"
    },
]

const userLevels = [
    {
        value: "BEGINNER",
        label: "Beginner"
    },
    {
        value: "INTERMEDIATE",
        label: "Intermediate"
    },
    {
        value: "ADVANCED",
        label: "Advanced"
    },
]

export default function RegisterComponent() {
    const [showPassword, setShowPassword] = useState(false)

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [role, setRole] = useState("")
    const [level, setLevel] = useState("")
    const [interestAreas, setInterestAreas] = useState([])
    const navigate = useNavigate()
    const toast = useToast()
    const dispatch = useDispatch();
    const { tags } = useContext(PostContext)

    const handleUserRegister = async () => {
        try {
            console.log(username, email, password, role, level, interestAreas)
            const response = await apiInstance().post(
                "auth/register",
                {
                    username,
                    fullName: username,
                    email,
                    password,
                    role
                }
            )

            if (response.status === 201) {

                const token = response.data

                dispatch(
                    userActions.login({
                        userName: username,
                        password: password,
                        sessionToken: token
                    })
                )

                Cookies.set("username", username)

                // Save the level and interest areas
                const fitnessGoals = await apiInstance(token).post(
                    `api/surveys`,
                    {
                        username,
                        fitnessLevel: level,
                        fitnessGoals: interestAreas
                    }
                )

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
            bg={useColorModeValue('gray.50', 'gray.800')}>
            <Stack
                spacing={8}
                mx={'auto'}
                maxW={'xl'}
                w={"lg"}
                py={12}
                px={6}
            >
                <Stack align={'center'}>
                    <Heading fontSize={'4xl'} textAlign={'center'}>
                        Sign up
                    </Heading>
                    <Text fontSize={'lg'} color={'gray.600'}>
                        to enjoy all of <Text
                            as={"span"}
                            color={'purple.400'}>Fitness Facts!</Text>
                    </Text>
                </Stack>
                <Box
                    rounded={'lg'}
                    bg={useColorModeValue('white', 'gray.700')}
                    boxShadow={'lg'}
                    p={8}>
                    <Stack spacing={4}>
                        <FormControl id="username" isRequired>
                            <FormLabel>Username</FormLabel>
                            <Input type="text" focusBorderColor='purple.500'
                                onChange={
                                    (e) => {
                                        setUsername(e.target.value)
                                    }
                                }
                            />
                        </FormControl>
                        <FormControl id="email" isRequired>
                            <FormLabel>Email address</FormLabel>
                            <Input type="email" focusBorderColor='purple.500'
                                onChange={
                                    (e) => {
                                        setEmail(e.target.value)
                                    }
                                }
                            />
                        </FormControl>
                        <FormControl id="password" isRequired>
                            <FormLabel>Password</FormLabel>
                            <InputGroup>
                                <Input type={showPassword ? 'text' : 'password'} focusBorderColor='purple.500'
                                    onChange={
                                        (e) => {
                                            setPassword(e.target.value)
                                        }
                                    }
                                />
                                <InputRightElement h={'full'}>
                                    <Button
                                        variant={'ghost'}
                                        onClick={() => setShowPassword((showPassword) => !showPassword)}>
                                        {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                        </FormControl>
                        <FormControl id="role" isRequired>
                            <FormLabel>Role</FormLabel>
                            <Select
                                placeholder="Select role"
                                focusBorderColor='purple.500'
                                onChange={
                                    (e) => {
                                        setRole(e.target.value)
                                    }
                                }
                            >
                                {
                                    userRoles.map(
                                        (role, index) => {
                                            return (
                                                <option key={index} value={role.value}>{role.label}</option>
                                            )
                                        }
                                    )
                                }
                            </Select>
                        </FormControl>
                        <FormControl id="level" isRequired>
                            <FormLabel>Level</FormLabel>
                            <Select
                                placeholder="Select level"
                                focusBorderColor='purple.500'
                                onChange={
                                    (e) => {
                                        setLevel(e.target.value)
                                    }
                                }
                            >
                                {
                                    userLevels.map(
                                        (level, index) => {
                                            return (
                                                <option key={index} value={level.value}>{level.label}</option>
                                            )
                                        }
                                    )
                                }
                            </Select>
                        </FormControl>
                        <FormControl id="interestAreas" isRequired>
                            <FormLabel>Interest Areas</FormLabel>
                            <Selector
                                placeholder="Select interest areas"
                                focusBorderColor='purple.500'
                                isMulti
                                options={tags.map((tag) => {
                                    return {    
                                        value: tag,
                                        label: tag
                                    }
                                }
                                )}
                                onChange={
                                    (e) => {
                                        setInterestAreas(e.map((item) => item.value))
                                    }
                                }
                            />
                        </FormControl>
                        <Stack spacing={10} pt={2}>
                            <Button
                                loadingText="Submitting"
                                size="lg"
                                bg={'purple.400'}
                                color={'white'}
                                _hover={{
                                    bg: 'purple.500',
                                }}
                                onClick={handleUserRegister}
                            >
                                Sign up
                            </Button>
                        </Stack>
                        <Stack pt={6}>
                            <Text align={'center'}>
                                Already a user? <Link
                                    href={loginPath}
                                    color={'purple.400'}>Login</Link>
                            </Text>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    )
}