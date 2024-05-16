import React from 'react';
import { Box, Image, Text, VStack } from "@chakra-ui/react";
import Label from './label.component';


const SearchResult = ({ title, image, creator, genre, material }) => {
  /*return (
    <Box p="2" maxW="md" borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Image src={result.image} alt={result.label} boxSize='100px' />
      <Box p="2">
        <VStack align="stretch" spacing={1}>
          <Box w="5">
          <Label name={result.label}/>
          </Box>
          <Text fontSize="sm" color="gray.500">Creator: {result.creator}</Text>
          <Text fontSize="sm" color="gray.500">Genre: {result.genre}</Text>
          <Text fontSize="sm" color="gray.500">Material: {result.material}</Text>
        </VStack>
      </Box>
    </Box>
  );*/


  return (
    <Box
      display="flex"
      flexDirection="row"
      alignItems="center"
      backgroundColor="#fff"
      borderRadius="md"
      boxShadow="md"
      p={4}
      m={4}
      //whiteSpace="nowrap" // Prevent text wrapping
      overflow="hidden" // Hide overflow text
      textOverflow="ellipsis" // Truncate with ellipsis
    >
      <Image src={image} alt="Search Result Image" boxSize="150px" borderRadius="md" mr={4} />
      <Box flex={1}>
        <Text fontSize="lg" mb={2}>
          {title}
        </Text>
        <Text fontSize="md" fontStyle="italic" mb={1}>
          Creator: {creator}
        </Text>
        <Text fontSize="md" fontStyle="italic">
          Genre: {genre}
        </Text>
        <Text fontSize="md" fontStyle="italic">
          Material: {material}
        </Text>
      </Box>
    </Box>
  );
};


export default SearchResult;
