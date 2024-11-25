import React from 'react';
import {
    Card,
    CardHeader,
    CardBody,
    Text,
    VStack,
    Image,
    Badge,
    Flex,
    Avatar,
    IconButton,
    useToast
} from '@chakra-ui/react';
import PostFeedCard from './PostFeedCard.component';

function SearchResult(props) {
    if ('content' in props) {
        return <PostFeedCard post={props} />;
    }

    if ('gifUrl' in props) {
        return (
            <Card p={4}>
                <CardBody>
                    <Flex gap={6} alignItems="center" flexWrap={{base: "wrap", md: "nowrap"}}>
                        <Image
                            src={props.gifUrl}
                            maxW="200px"
                            borderRadius="md"
                            alt={props.name}
                        />
                        <VStack align="start" spacing={3}>
                            <Text fontSize="xl" fontWeight="bold">{props.name}</Text>
                            <Flex gap={2} flexWrap="wrap">
                                <Badge colorScheme="blue">{props.bodyPart}</Badge>
                                <Badge colorScheme="green">{props.targetMuscle}</Badge>
                                <Badge colorScheme="purple">{props.equipment}</Badge>
                            </Flex>
                            <Text color="gray.600">{props.instructions}</Text>
                        </VStack>
                    </Flex>
                </CardBody>
            </Card>
        );
    }

    if ('programName' in props) {
        return (
            <Card p={4}>
                <CardHeader>
                    <Flex justify="space-between" align="center">
                        <Text fontSize="xl" fontWeight="bold">{props.programName}</Text>
                        <Badge colorScheme="purple">Duration: {props.duration} weeks</Badge>
                    </Flex>
                </CardHeader>
                <CardBody>
                    <VStack align="start" spacing={3}>
                        <Flex alignItems="center" gap={2}>
                            <Avatar size="sm" name={props.trainerName} />
                            <Text fontWeight="semibold">Trainer: {props.trainerName}</Text>
                        </Flex>
                        <Text>{props.description}</Text>
                    </VStack>
                </CardBody>
            </Card>
        );
    }
    return null;
}

export default SearchResult;