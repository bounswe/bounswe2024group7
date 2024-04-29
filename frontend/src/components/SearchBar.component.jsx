import React from 'react'
import { Search2Icon } from "@chakra-ui/icons";
import {
    Flex,
    Button,
    Input,
    InputGroup,
    InputLeftElement,
    InputRightAddon
} from '@chakra-ui/react'
import apiInstance from "../instance/apiInstance.js"
import { useState } from 'react';
import Cookies from "js-cookie"

function SearchBar({
    screen
}) {
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

    const [searchQuery, setSearchQuery] = useState("")
    const [loading, setLoading] = useState(false)

    const handleSearch = async () => {
        setLoading(true)

        try {
            if (!searchQuery)
                return

            const response = await apiInstance().post("search", {
                query: searchQuery
            })

            if (response.status === 200) {

                const data = await response.data

                console.log(data)

                Cookies.set("searchResults", data)

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
                    >
                        Search
                    </Button>
                </InputRightAddon>
            </InputGroup>
        </Flex >
    )
}

export default SearchBar