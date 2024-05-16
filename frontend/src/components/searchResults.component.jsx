import React, { useState, useEffect } from 'react';
import { Flex, Text, Spinner, Grid, GridItem } from '@chakra-ui/react';
import Cookies from 'js-cookie';
import SearchResult from './searchResult.component';
import PostView from './postView.component';

function SearchResults({ searchResults, loading }) {
    const [paintingResults, setPaintingResults] = useState([]);
    const [materialResults, setMaterialResults] = useState([]);
    const [genreResults, setGenreResults] = useState([]);



    useEffect(() => {
        try {
            if (!searchResults) {
                console.log("This is null");
                return;
            }
            setPaintingResults(searchResults.painting_results);
            setMaterialResults(searchResults.material_results);
            setGenreResults(searchResults.genre_results);
        } catch (error) {
            console.error('Error fetching search results:', error);
        }

    }, [searchResults]);

    return (
        <Grid templateColumns='repeat(3, 1fr)' gap={6} mt={8}>
            {loading ? (
                <Spinner
                    thickness="3px"
                    speed="0.65s"
                    emptyColor="gray.200"
                    color="purple.600"
                    size="md"
                />
            ) : (
                (paintingResults && paintingResults.length > 0) ? (
                    paintingResults.map((result, index) => (
                        <GridItem>
                            <SearchResult title={result["itemLabel"]["value"]} image={result["image"]["value"]}
                                genre={result["genreLabel"]["value"]} material={result["materialLabel"]["value"]} creator={result["creatorLabel"]["value"]} />
                        </GridItem>
                    ))

                ) : null

            )}

        </Grid>

    );
}

export default SearchResults;