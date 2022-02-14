import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    IconButton,
    HStack,
    Box,
} from '@chakra-ui/react';

import { DownloadIcon } from '@chakra-ui/icons';

export function DownloadModal({ isOpen, onClose }) {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalCloseButton />
                <ModalHeader>Download Runner</ModalHeader>
                <ModalBody>
                    <Box>
                        You'll need python 3 to run this file.
                        <br />
                        This python script <b>should be done in a sandboxed envrionment.</b>
                        <br />
                        Currently, the tests <b>do not prevent arbitrary code execution.</b>
                        <br />
                        This means that any code written in these test cases, if not disabled, will
                        run.
                    </Box>
                </ModalBody>

                <ModalFooter>
                    <IconButton
                        colorScheme="blue"
                        icon={
                            <HStack p={4} spacing={2}>
                                {' '}
                                <Box>Download Runner</Box> <DownloadIcon />
                            </HStack>
                        }
                        onClick={() => {
                            window.location.href = '/runner.py';
                        }}
                    />
                    <Button mx={2} variant="ghost" onClick={onClose}>
                        Close
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}
