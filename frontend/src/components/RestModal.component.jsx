import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
} from '@chakra-ui/react';

function RestModal({
  onClose,
  isOpen,
  interval, // Number of days for the recommended rest period
  onContinueWorkout, // Callback to handle when the user wants to continue the workout
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          Recommended Rest Period
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text mb={4}>
            It is recommended to rest for <strong>{interval} day{interval > 1 ? 's' : ''}</strong> before continuing your workouts. This will help you recover and maximize your performance.
          </Text>
          <Text>
            If you'd like, you can choose to continue the workout without waiting.
          </Text>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="gray" mr={3} onClick={onClose}>
            Close
          </Button>
          <Button colorScheme="purple" onClick={() => {
            onContinueWorkout();
            onClose();
          }}>
            Continue Anyway
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default RestModal;