import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
} from '@chakra-ui/react';

export function TestModal({ isOpen, onOpen, onClose }) {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Test Case</ModalHeader>
                <ModalCloseButton />
                <ModalBody>View and customize test case:</ModalBody>

                <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={() => {}}>
                        Configure
                    </Button>
                    <Button variant="ghost" onClick={onClose}>
                        Close
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}
