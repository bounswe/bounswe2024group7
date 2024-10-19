import {
    Box,
    Flex,
    Text,
    IconButton,
    Button,
    Stack,
    Collapse,
    Icon,
    Popover,
    PopoverTrigger,
    PopoverContent,
    useColorModeValue,
    useBreakpointValue,
    useDisclosure,
    useColorMode,
    Link,
    useToast,
    Avatar,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    Center,
} from '@chakra-ui/react'
import {
    HamburgerIcon,
    CloseIcon,
    ChevronDownIcon,
    ChevronRightIcon,
    MoonIcon,
    SunIcon
} from '@chakra-ui/icons'
import {
    loginPath,
    registerPath,
    indexPath
} from "../constants/paths.js"
import { useDispatch, useSelector } from "react-redux";
import { userName, userProfile } from '../context/user.js';
import apiInstance from "../instance/apiInstance.js"
import { useNavigate } from "@tanstack/react-router"
import { userActions } from '../context/user.js'
import Cookies from "js-cookie"
import SearchBar from './searchBar.component.jsx'
import SearchResults from './searchResults.component.jsx'
import { useEffect, useState } from 'react'
import PlusIcon from '../icons/PlusIcon.jsx';
import CreatePostModal from './CreatePostModal.component.jsx';

export default function NavigationResponsive() {
    const [searchResults, setSearchResults] = useState(
        null
    );
    const [loading, setLoading] = useState(false);

    const { isOpen, onToggle } = useDisclosure()
    const { colorMode, toggleColorMode } = useColorMode()
    const username = useSelector(userName)
    const profile = useSelector(userProfile)
    const navigate = useNavigate()
    const toast = useToast()
    const dispatch = useDispatch();

    const {
        isOpen: isSearchResultsOpen,
        onClose: onSearchResultsClose,
        onOpen: onSearchResultsOpen
    } = useDisclosure()

    const {
        isOpen: isCreatePostModalOpen,
        onClose: onCreatePostModalClose,
        onOpen: onCreatePostModalOpen
    } = useDisclosure()

    useEffect(() => {
        if (searchResults) {
            onSearchResultsOpen()
        }
    }, [searchResults])

    const handleLogOut = async () => {
        try {
            const response = await apiInstance().post("logout")

            if (response.status === 200) {

                dispatch(userActions.logout());

                Cookies.set("username", "")

                navigate(
                    {
                        to: "/"
                    },
                )
            }
        } catch (e) {
            console.log(e)
            toast({
                title: "There was an error while logging out. Please try again.",
                status: "error",
                isClosable: true,
                duration: 2000,
            });
        }
    }

    return (
        <Box>
            <CreatePostModal isOpen={isCreatePostModalOpen} onClose={onCreatePostModalClose} />
            <Flex
                bg={useColorModeValue('white', 'gray.800')}
                color={useColorModeValue('gray.600', 'white')}
                minH={'60px'}
                py={{ base: 2 }}
                px={{ base: 4 }}
                borderBottom={1}
                borderStyle={'solid'}
                borderColor={useColorModeValue('gray.200', 'gray.900')}
                align={'center'}
                justifyContent={"space-between"}
            >
                <Flex
                    flex={{ base: 1, md: 'auto' }}
                    ml={{ base: -2 }}
                    display={{ base: 'flex', md: 'none' }}>
                    <IconButton
                        onClick={onToggle}
                        icon={isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />}
                        variant={'ghost'}
                        aria-label={'Toggle Navigation'}
                    />
                </Flex>
                <Flex flex={{ base: 1, md: 0 }} justify={{ base: 'center', md: 'start' }}>
                    <Text
                        textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
                        fontFamily={'heading'}
                        color={useColorModeValue('gray.800', 'white')}
                        fontWeight={"700"}
                    >
                        <Link
                            href={indexPath}
                            textDecoration={"none"}
                        >
                            Fitness Fact
                        </Link>
                    </Text>

                    <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
                        <DesktopNav />
                    </Flex>
                </Flex>
                <SearchBar screen="desktop" setSearchResults={setSearchResults} setLoading={setLoading} loading={loading} />
                <Stack
                    flex={{ base: 1, md: 0 }}
                    justify={'flex-end'}
                    direction={'row'}
                    spacing={6}>
                    <Button onClick={toggleColorMode}>
                        {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                    </Button>
                    {
                        username ? (<Menu>
                            <MenuButton
                                as={Button}
                                rounded={'full'}
                                variant={'link'}
                                cursor={'pointer'}
                                minW={0}>
                                {
                                    profile && profile.profile_picture ? (
                                        <Avatar
                                            size={'sm'}
                                            src={profile.profile_picture.url}
                                        />
                                    ) : (
                                        <Avatar
                                            size={'sm'}
                                            name={username}
                                        />
                                    )
                                }
                            </MenuButton>
                            <MenuList alignItems={'center'}>
                                <br />
                                <Center>
                                    {
                                        profile && profile.profile_picture ? (
                                            <Avatar
                                                size={'2xl'}
                                                src={profile.profile_picture.url}
                                            />
                                        ) : <Avatar
                                            size={'2xl'}
                                            name={username}
                                        />
                                    }
                                </Center>
                                <br />
                                <Center>
                                    <p>{username}</p>
                                </Center>
                                <br />
                                <MenuDivider />
                                {/* <MenuItem>Account Settings</MenuItem> */}
                                <MenuItem
                                    onClick={handleLogOut}
                                >Logout</MenuItem>
                            </MenuList>
                        </Menu>) : (
                            <>
                                <Button as={'a'} fontSize={'sm'} fontWeight={400} variant={'link'} href={loginPath}>
                                    Sign In
                                </Button>
                                <Button
                                    as={'a'}
                                    display={{ base: 'none', md: 'inline-flex' }}
                                    fontSize={'sm'}
                                    fontWeight={600}
                                    color={'white'}
                                    bg={'purple.400'}
                                    href={registerPath}
                                    _hover={{
                                        bg: 'purple.300',
                                    }}>
                                    Sign Up
                                </Button>
                            </>
                        )
                    }
                </Stack>
            </Flex>
            <SearchResults
                isOpen={isSearchResultsOpen}
                onClose={onSearchResultsClose}
                searchResults={searchResults}
                loading={loading}
            />
            {/* 
                Button to create a new artifact
            */}
            <Button
                position={"fixed"}
                bottom={4}
                right={4}
                colorScheme='purple'
                onClick={() => {
                    if (username) {
                        onCreatePostModalOpen()
                    } else {
                        toast({
                            title: "You need to be logged in to create a new program.",
                            status: "error",
                            isClosable: true,
                            duration: 2000,
                        })
                        navigate({
                            to: loginPath
                        })
                    }
                }}
                gap={2}
                w={"auto"}
            >
                <PlusIcon />
                Create New Program
            </Button>
            {
                searchResults && !isSearchResultsOpen && (
                    <Button
                        onClick={onSearchResultsOpen}
                        position={"fixed"}
                        bottom={4}
                        left={4}
                        colorScheme='gray'
                    >
                        Show Search Results
                    </Button>
                )
            }
            <Collapse in={isOpen} animateOpacity>
                <MobileNav />
            </Collapse>
        </Box>
    )
}

const DesktopNav = () => {
    const linkColor = useColorModeValue('gray.600', 'gray.200')
    const linkHoverColor = useColorModeValue('gray.800', 'white')
    const popoverContentBgColor = useColorModeValue('white', 'gray.800')

    return (
        <Stack direction={'row'} spacing={4}>
            {NAV_ITEMS.map((navItem) => (
                <Box key={navItem.label}>
                    <Popover trigger={'hover'} placement={'bottom-start'}>
                        <PopoverTrigger>
                            <Box
                                as="a"
                                p={2}
                                href={navItem.href ?? indexPath}
                                fontSize={'sm'}
                                fontWeight={500}
                                color={linkColor}
                                _hover={{
                                    textDecoration: 'none',
                                    color: linkHoverColor,
                                }}>
                                {navItem.label}
                            </Box>
                        </PopoverTrigger>

                        {navItem.children && (
                            <PopoverContent
                                border={0}
                                boxShadow={'xl'}
                                bg={popoverContentBgColor}
                                p={4}
                                rounded={'xl'}
                                minW={'sm'}>
                                <Stack>
                                    {navItem.children.map((child) => (
                                        <DesktopSubNav key={child.label} {...child} />
                                    ))}
                                </Stack>
                            </PopoverContent>
                        )}
                    </Popover>
                </Box>
            ))}
        </Stack>
    )
}

const DesktopSubNav = ({ label, href, subLabel }) => {
    return (
        <Box
            as="a"
            href={href}
            role={'group'}
            display={'block'}
            p={2}
            rounded={'md'}
            _hover={{ bg: useColorModeValue('purple.50', 'gray.900') }}>
            <Stack direction={'row'} align={'center'}>
                <Box>
                    <Text
                        transition={'all .3s ease'}
                        _groupHover={{ color: 'purple.400' }}
                        fontWeight={500}>
                        {label}
                    </Text>
                    <Text fontSize={'sm'}>{subLabel}</Text>
                </Box>
                <Flex
                    transition={'all .3s ease'}
                    transform={'translateX(-10px)'}
                    opacity={0}
                    _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
                    justify={'flex-end'}
                    align={'center'}
                    flex={1}>
                    <Icon color={'purple.400'} w={5} h={5} as={ChevronRightIcon} />
                </Flex>
            </Stack>
        </Box>
    )
}

const MobileNav = () => {
    return (
        <>
            <Stack bg={useColorModeValue('white', 'gray.800')} p={4} display={{ md: 'none' }}>
                {NAV_ITEMS.map((navItem) => (
                    <MobileNavItem key={navItem.label} {...navItem} />
                ))}
            </Stack>
            <SearchBar screen={"mobile"} />
        </>

    )
}

const MobileNavItem = ({ label, children, href }) => {
    const { isOpen, onToggle } = useDisclosure()

    return (
        <Stack spacing={4} onClick={children && onToggle}>
            <Box
                py={2}
                as="a"
                href={href ?? indexPath}
                justifyContent="space-between"
                alignItems="center"
                _hover={{
                    textDecoration: 'none',
                }}>
                <Text fontWeight={600} color={useColorModeValue('gray.600', 'gray.200')}>
                    {label}
                </Text>
                {children && (
                    <Icon
                        as={ChevronDownIcon}
                        transition={'all .25s ease-in-out'}
                        transform={isOpen ? 'rotate(180deg)' : ''}
                        w={6}
                        h={6}
                    />
                )}
            </Box>

            <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
                <Stack
                    mt={2}
                    pl={4}
                    borderLeft={1}
                    borderStyle={'solid'}
                    borderColor={useColorModeValue('gray.200', 'gray.700')}
                    align={'start'}>
                    {children &&
                        children.map((child) => (
                            <Box as="a" key={child.label} py={2} href={child.href}>
                                {child.label}
                            </Box>
                        ))}
                </Stack>
            </Collapse>
        </Stack>
    )
}

const NAV_ITEMS = [
    {
        label: 'Home',
        href: indexPath
    },
]