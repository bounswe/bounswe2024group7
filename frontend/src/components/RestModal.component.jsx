import React from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useToast,
    Button,
    Text,
} from '@chakra-ui/react'

function RestModal({
    onClose,
    isOpen,
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
            You need to rest!
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>
            You have completed all the exercises for today. Take a break and rest up!
          </Text>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={() => {}}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default RestModal