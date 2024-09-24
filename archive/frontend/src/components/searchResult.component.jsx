import React from 'react';
import {
  Box,
  Image,
  Text,
  VStack,
  Card, CardHeader, CardBody, CardFooter,
  Link,
  Button
} from "@chakra-ui/react";
import Label from './label.component';
import LazyLoad from 'react-lazy-load';

const SearchResult = ({ title, image, creator, genre, material, }) => {
  console.log(title, image, creator, genre, material);

  return (
    <Card
      overflow="hidden"
      borderColor={"purple.300"}
      borderWidth={2}
      borderRadius={10}
      minW={["100%", "100%", "100%", "100%"]}
    >
      <CardHeader>
        <Text fontSize="lg" fontWeight="bold">{title}</Text>
      </CardHeader>
      <CardBody
        gap={8}
        p={4}
        display="flex"
        flexDirection={
          {
            base: "column",
            md: "row"
          }
        }
        alignItems="start"
      >
        <LazyLoad>
          <Image
            src={image}
            alt={title}
            maxH="350px"
            loading='lazy'
          />
        </LazyLoad>
        <VStack
          align="start"
          spacing={4}
          mt={4}
        >
          <Label title="Creator" value={creator} />
          <Label title="Genre" value={genre} />
          <Label title="Material" value={material} />
        </VStack>
      </CardBody>
      <CardFooter>
        <Button
          colorScheme="purple"
          w="100%"
          as="a"
          href="/"
        >
          View on Wiki
        </Button>
      </CardFooter>
    </Card>
  );
};


export default SearchResult;
