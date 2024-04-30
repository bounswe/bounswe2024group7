import React, { useState, useEffect } from 'react';
import { Flex, Text, Spinner } from '@chakra-ui/react';
import Cookies from 'js-cookie';

function SearchResults() {
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSearchResults = async () => {
            try {
                const storedResults = Cookies.get('searchResults');
                if (!storedResults) {
                    setLoading(false);
                    return;
                }
                const parsedResults = JSON.parse(storedResults);
                setSearchResults(parsedResults);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching search results:', error);
                setLoading(false);
            }
        };
        fetchSearchResults();
    }, []);

    return (
        <Flex direction="column" alignItems="center" mt={8}>
            {loading ? (
                <Spinner
                    thickness="3px"
                    speed="0.65s"
                    emptyColor="gray.200"
                    color="purple.600"
                    size="md"
                />
            ) : (
                searchResults.length > 0 ? (
                    searchResults.map((result, index) => (
                        <Flex
                            key={index}
                            border="1px solid"
                            borderRadius="md"
                            borderColor="gray.300"
                            p={4}
                            mt={4}
                            width={{ base: '100%', md: '80%' }}
                            justifyContent="space-between"
                            alignItems="center"
                        >
                            <Text>{result.title}</Text>
                            <Text>{result.description}</Text>
                        </Flex>
                    ))
                ) : (
                    <Text>No results found.</Text>
                )
            )}
        </Flex>
    );
}

export default SearchResults;