import React from 'react'
import { Search2Icon } from "@chakra-ui/icons";
import {
    Flex,
    Button,
    Input,
    InputGroup,
    InputLeftElement,
    InputRightAddon,
    Spinner,
    Text,
    useToast
} from '@chakra-ui/react'
import apiInstance from "../instance/apiInstance.js"
import { useState } from 'react';
import Cookies from "js-cookie"
import { titleString } from '../utility/string.js';
import { useDispatch } from "react-redux";
import { userActions } from '../context/user.js'

function SearchBar({
    screen, setSearchResults, setLoading, loading
}) {
    const dispatch = useDispatch()

    const flexStyleObject = screen === "mobile" ? {
        base: "flex",
        md: "none"
    } : {
        base: "none",
        md: "flex"
    }

    const searchBarWidthStyleObject = screen === "mobile" ? {
        base: "100%",
        md: "2xl"
    } : {
        base: "2xl",
        md: "50%"
    }
    const toast = useToast()

    const [searchQuery, setSearchQuery] = useState("")

    const handleSearch = async () => {
        setLoading(true)

        try {
            if (!searchQuery) {
                setLoading(false)
                return
            }

            const response = await apiInstance().post("search", {
                query: titleString(searchQuery)
            })

            if (response.status === 200) {

                const data = await response.data

                setSearchResults(data)

                dispatch(
                    userActions.updateSearchResults({
                        searchResults: data
                    })
                )

                Cookies.set("searchResults", JSON.stringify(data))

                setSearchQuery("")
            }

            setLoading(false)
        } catch (e) {
            console.log(e)
            toast({
                title: "There was an error while searching. Please try again.",
                status: "error",
                isClosable: true,
                duration: 2000,
            });
            setLoading(false)
        }
    }

    return (
        <Flex
            flex={{
                base: 1,
            }}
            display={flexStyleObject}
            padding={4}
            justifyContent={"center"}
        >
            <InputGroup
                borderRadius={5}
                size="sm"
                width={searchBarWidthStyleObject}
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
            >
                <InputLeftElement
                    pointerEvents="none"
                    children={<Search2Icon color="gray.600" />}
                />
                <Input
                    borderLeftRadius={3.3}
                    type="text"
                    placeholder="Search..."
                    focusBorderColor='purple.500'
                    onChange={(e) => {
                        setSearchQuery(e.target.value)
                    }}
                    value={searchQuery}
                />
                <InputRightAddon
                    p={0}
                    border="none"
                >
                    <Button
                        size="sm"
                        borderLeftRadius={0}
                        borderRightRadius={3.3}
                        colorScheme='purple'
                        variant={"solid"}
                        onClick={handleSearch}
                        isDisabled={loading || !searchQuery}
                    >
                        {loading ? (
                            <Spinner
                                thickness="3px"
                                speed="0.65s"
                                emptyColor="gray.200"
                                color="purple.600"
                                size="md"
                            />
                        ) : (<Text>
                            Search
                        </Text>)
                        }
                    </Button>
                </InputRightAddon>
            </InputGroup>
        </Flex >
    )
}

export default SearchBar