import React, { useState } from 'react';
import {
   Modal,
   ModalOverlay,
   ModalContent,
   ModalHeader,
   ModalBody,
   ModalCloseButton,
   ButtonGroup,
   Button,
   VStack,
   Text,
   Spinner
} from '@chakra-ui/react';
import SearchResult from './searchResult.component';

function SearchResults({
   searchResults,
   loading,
   isOpen,
   onClose,
}) {
   const [activeTab, setActiveTab] = useState('posts');

   const renderResults = () => {
       if (!searchResults) return null;

       const results = searchResults[activeTab];
       
       if (results?.length === 0) {
           return <Text>No {activeTab} found</Text>
       }

       return results.map((result, index) => (
           <SearchResult
               key={index}
               {...result}
           />
       ));
   };

   return (
       <Modal isOpen={isOpen} onClose={onClose} size="6xl">
           <ModalOverlay />
           <ModalContent p={4} m={4} maxH="90vh" overflowY="auto">
               <ModalHeader display="flex" justifyContent="space-between" alignItems="center">
                   Search Results
                   <ModalCloseButton />
               </ModalHeader>

               <ModalBody>
                   <ButtonGroup variant="outline" spacing={4} mb={6} width="100%">
                       <Button 
                           colorScheme={activeTab === 'posts' ? 'purple' : 'gray'}
                           onClick={() => setActiveTab('posts')}
                           flex={1}
                       >
                           Posts ({searchResults?.posts?.length || 0})
                       </Button>
                       <Button 
                           colorScheme={activeTab === 'exercises' ? 'purple' : 'gray'}
                           onClick={() => setActiveTab('exercises')}
                           flex={1}
                       >
                           Exercises ({searchResults?.exercises?.length || 0})
                       </Button>
                       <Button 
                           colorScheme={activeTab === 'trainingPrograms' ? 'purple' : 'gray'}
                           onClick={() => setActiveTab('trainingPrograms')}
                           flex={1}
                       >
                           Programs ({searchResults?.trainingPrograms?.length || 0})
                       </Button>
                   </ButtonGroup>

                   <VStack spacing={6} align="stretch">
                       {loading ? (
                           <Spinner 
                               thickness="3px"
                               speed="0.65s" 
                               emptyColor="gray.200"
                               color="purple.600"
                               size="md"
                           />
                       ) : renderResults()}
                   </VStack>
               </ModalBody>
           </ModalContent>
       </Modal>
   );
}

export default SearchResults;