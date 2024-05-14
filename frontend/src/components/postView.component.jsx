import React from "react";
import { Flex, Box, Image, Text, IconButton, Badge, VStack, HStack, Spacer, Icon } from "@chakra-ui/react";
import {
    SearchIcon
} from '@chakra-ui/icons'
/*const PostView = ({title,description,image,category,likes}) => {
  return (
    <Box w='100%' borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Box p="2">
        <Image boxSize='100px' src={image} alt={title} />
      </Box>
      <Box p="2">
        <Flex align='left' >
          <Badge borderRadius="full" px="2" colorScheme="teal">
            Oil painting
          </Badge>
          <Badge borderRadius="full" px="2" colorScheme="teal">
            Cubism
          </Badge>
          
        </Flex>
        <Box fontWeight="semibold" as="h4" lineHeight="tight" isTruncated>
          {title}
        </Box>
        <Text color="gray.600">
          {description}
        </Text>
        <Flex mt={2} p="2" align="center">
          <Box as="span" color="gray.600" mr="2" fontSize="sm">
            {likes} likes
          </Box>
          <IconButton
            aria-label="Like post"
            icon={<SearchIcon w={5} h={5}/>}
            colorScheme="red"
            size="sm"
            variant="ghost"
          />
        </Flex>
      </Box>
    </Box>
  );
};*/


const PostView = ({ imageUri, title, description, likes }) => {
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
    >
      <Image src={imageUri} alt="Postcard Image" boxSize="150px" borderRadius="md" mr={4} />
      <Box flex={1}>
        <Text fontSize="lg" mb={2}>
          {title}
        </Text>
        <Text fontSize="md" fontStyle="italic" mb={1}>
          Description: {description}
        </Text>
        <Text fontSize="md" fontStyle="italic">
          {likes} likes 
        </Text>
      </Box>
    </Box>
  );
};

export default PostView;

