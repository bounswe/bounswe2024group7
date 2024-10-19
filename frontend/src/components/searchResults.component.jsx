import React, { useState, useEffect } from 'react';
import {
    Flex,
    Text,
    Spinner,
    Grid,
    GridItem,
    SimpleGrid,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    ButtonGroup,
    useColorModeValue,
    Box,
    VStack
} from '@chakra-ui/react';
import Cookies from 'js-cookie';
import SearchResult from './searchResult.component';
import PostView from './postView.component';

function SearchResults({
    searchResults,
    loading,
    isOpen,
    onClose,
}) {
    const [paintingResults, setPaintingResults] = useState([]);
    const [materialResults, setMaterialResults] = useState([]);
    const [genreResults, setGenreResults] = useState([]);
    const [relatedResults, setRelatedResults] = useState([]);

    const headerBackground = useColorModeValue("gray.100", "gray.700");


    useEffect(() => {
        try {
            if (!searchResults) {
                return;
            }

            const filterResults = (results) => {
                if (!results) {
                    return [];
                }

                return results.filter((result, index, self) =>
                    index === self.findIndex((t) => (
                        t["itemLabel"]["value"] === result["itemLabel"]["value"]
                    ))
                );
            };

            const paintingResultsFiltered = filterResults(searchResults.painting_results);
            const materialResultsFiltered = filterResults(searchResults.material_results);
            const genreResultsFiltered = filterResults(searchResults.genre_results);
            const relatedResultsFiltered = filterResults(searchResults.related_results);

            setPaintingResults(paintingResultsFiltered);
            setMaterialResults(materialResultsFiltered);
            setGenreResults(genreResultsFiltered);
            setRelatedResults(relatedResultsFiltered);

        } catch (error) {
            console.error('Error fetching search results:', error);
        }
    }, [searchResults]);


    return (
        <Modal
            isOpen={isOpen}
            onClose={
                onClose
            }
            size={'6xl'}
        >
            <ModalOverlay />
            <ModalContent
                p={4}
                m={4}
                borderRadius={4}
                overflowY="auto"
                maxH="90vh"
            >
                <ModalHeader
                    position="sticky"
                    top={0}
                    py={4}
                    px={4}
                    borderBottomWidth="1px"
                    borderBottomColor="gray.200"
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    zIndex={1}
                    bg={headerBackground}
                >
                    Search Results
                    <ModalCloseButton />
                </ModalHeader>
                <ModalBody>
                    <Flex
                        gap={6}
                        mt={8}
                        p={4}
                        w="100%"
                        flexWrap="wrap"
                        justifyContent="center"
                        flexDirection={{ base: "column", md: "row" }}
                    >
                        {loading ? (
                            <Spinner
                                thickness="3px"
                                speed="0.65s"
                                emptyColor="gray.200"
                                color="purple.600"
                                size="md"
                            />
                        ) : (
                            <VStack
                                spacing={8}
                                align="start"
                                w="100%"
                            >
                                <Flex
                                    w="100%"
                                    justifyContent="center"
                                    flexDirection="column"
                                    gap={8}>
                                    <Text fontSize="xl" fontWeight="bold" mb={4}>
                                        Paintings
                                    </Text>
                                    {
                                        (paintingResults && paintingResults.length > 0) ? (
                                            paintingResults.map((result, index) => (
                                                <SearchResult
                                                    key={index}
                                                    title={result["itemLabel"]["value"]}
                                                    image={result["image"]["value"]}
                                                    genre={result["genreLabel"]["value"]}
                                                    material={result["materialLabel"]["value"]}
                                                    creator={result["creatorLabel"]["value"]} />
                                            ))
                                        ) :
                                            <Text>No paintings found</Text>
                                    }
                                </Flex>
                                <Flex
                                    w="100%"
                                    justifyContent="center"
                                    flexDirection="column"
                                    gap={8}>
                                    <Text fontSize="xl" fontWeight="bold" mb={4}>
                                        Materials
                                    </Text>
                                    {
                                        (materialResults && materialResults.length > 0) ? (
                                            materialResults.map((result, index) => (
                                                <SearchResult
                                                    key={index}
                                                    title={result["itemLabel"]["value"]}
                                                    image={result["image"]["value"]}
                                                    genre={result["genreLabel"]["value"]}
                                                    material={result["materialLabel"]["value"]}
                                                    creator={result["creatorLabel"]["value"]} />
                                            ))
                                        ) :
                                            <Text>No materials found</Text>
                                    }
                                </Flex>
                                <Flex
                                    w="100%"
                                    justifyContent="center"
                                    flexDirection="column"
                                    gap={8}>
                                    <Text fontSize="xl" fontWeight="bold" mb={4}>
                                        Genres
                                    </Text>
                                    {
                                        (genreResults && genreResults.length > 0) ? (
                                            genreResults.map((result, index) => (
                                                <SearchResult
                                                    key={index}
                                                    title={result["itemLabel"]["value"]}
                                                    image={result["image"]["value"]}
                                                    genre={result["genreLabel"]["value"]}
                                                    material={result["materialLabel"]["value"]}
                                                    creator={result["creatorLabel"]["value"]} />
                                            ))
                                        ) :
                                            <Text>No genres found</Text>
                                    }
                                </Flex>
                                <Flex
                                    w="100%"
                                    justifyContent="center"
                                    flexDirection="column"
                                    gap={8}
                                >
                                    <Text fontSize="xl" fontWeight="bold" mb={4}>
                                        Related Items
                                    </Text>
                                    {
                                        (relatedResults && relatedResults.length > 0) ? (
                                            relatedResults.map((result, index) => (
                                                <SearchResult
                                                    key={index}
                                                    title={result["itemLabel"]["value"]}
                                                    image={result["image"]["value"]}
                                                    genre={result["genreLabel"]["value"]}
                                                    material={result["materialLabel"]["value"]}
                                                    creator={result["creatorLabel"]["value"]} />
                                            ))
                                        ) :
                                            <Text>No related items found</Text>
                                    }
                                </Flex>
                            </VStack>

                        )}

                    </Flex>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}

export default SearchResults;