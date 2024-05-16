import React, { useState, useEffect } from 'react';
import { Flex, Text, Spinner, Grid, GridItem } from '@chakra-ui/react';
import Cookies from 'js-cookie';
import SearchResult from './searchResult.component';
import PostView from './postView.component';

function SearchResults({searchResults,loading}) {
    //Cookies.set('searchResults','{}');
    const [paintingResults, setPaintingResults] = useState([]);
    const [materialResults, setMaterialResults] = useState([]);
    const [genreResults, setGenreResults] = useState([]);
   // const [relatedResults, setRelatedResults] = useState([]);



    useEffect(() => {
            try {
               // console.log(searchResults);
                if (!searchResults) {
                    //setLoading(false);
                    console.log("This is null");
                    return;
                }
                setPaintingResults(searchResults.painting_results);
                setMaterialResults(searchResults.material_results);
                setGenreResults(searchResults.genre_results);
               // setRelatedResults(searchResults.related_results);
               // setLoading(false);
            } catch (error) {
                console.error('Error fetching search results:', error);
               // setLoading(false);
            }
        
    },[searchResults]); 

    /*var result = {
        image: "https://upload.wikimedia.org/wikipedia/commons/6/6a/Mona_Lisa.jpg",
        title: "Mona Lisa",
        creator: "Leonardo Da Vinci",
        genre: "portrait",
        material: "oil"
};*/
    return (
       /* <Flex direction="column" alignItems="center" mt={8}>
            {loading ? (
                <Spinner
                    thickness="3px"
                    speed="0.65s"
                    emptyColor="gray.200"
                    color="purple.600"
                    size="md"
                />
            ) : (
                (paintingResults && paintingResults.length > 0 ) ? (
                    paintingResults.map((result, index) => (
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
                            <SearchResult title={result["itemLabel"]["value"]} image={result["image"]["value"]}
                            genre={result["genreLabel"]["value"]} material={result["materialLabel"]["value"]}/>
                        </Flex>
                    ))
                    
                ) : (
                    <Text>No results found by painting name.</Text>
                )
                
            )}
        </Flex> */
       /* <Grid templateColumns='repeat(3, 1fr)' gap={6} mt={8}> 
            <GridItem colStart={2} colEnd = {3}>
            <PostView title={"Mona Lisa"} description = {"Certain description"} likes = {"8"} imageUri = {"https://upload.wikimedia.org/wikipedia/commons/6/6a/Mona_Lisa.jpg"} />

            </GridItem>
            <GridItem colStart={3} colEnd = {4}>
            <PostView title={"Mona Lisa"} description = {"Certain description"} likes = {"8"} imageUri = {"https://upload.wikimedia.org/wikipedia/commons/6/6a/Mona_Lisa.jpg"} />

            </GridItem>
            <GridItem colStart={2} colEnd = {3}>
            <SearchResult
                result={result}
/>
            </GridItem>
            <GridItem colStart={3} colEnd = {4}>
            <SearchResult
                result={result}
/>
            </GridItem> 

        </Grid> */
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
                (paintingResults && paintingResults.length > 0 ) ? (
                    paintingResults.map((result, index) => (
                        <GridItem>
                            <SearchResult title={result["itemLabel"]["value"]} image={result["image"]["value"]}
                            genre={result["genreLabel"]["value"]} material={result["materialLabel"]["value"]} creator = {result["creatorLabel"]["value"]}/>
                        </GridItem>
                    ))
                    
                ) : (
                    <Text>No results found by painting name.</Text>
                )
                
            )}

        </Grid>
        
    );
}

export default SearchResults;