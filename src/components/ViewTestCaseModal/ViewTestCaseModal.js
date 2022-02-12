import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    useDisclosure,
    useToast, FormControl, FormLabel, Input, Box, Heading, HStack
} from '@chakra-ui/react'

import { CopyBlock, dracula } from 'react-code-blocks';

import { v4 as uuidv4 } from 'uuid';

import { Filedrop } from '../Filedrop/Filedrop';

import { useParams } from 'react-router-dom';

import {useEffect, useState} from "react";
import { CreateTestCase } from "../../api/api";

export function ViewTestCaseModal({ isOpen, onOpen, onClose }) {

    const name = "test";
    const description = "sample description";
    const command = "test";

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent maxW="56rem">
            <ModalHeader>View Test Case</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
            <Box my={4} width={'full'}>
                <FormControl my={5}>
                    <FormLabel>
                        Name
                    </FormLabel>
                    <Input value={name} disabled />
                </FormControl>
                <FormControl my={5}>
                    <FormLabel>
                        Description
                    </FormLabel>
                    <Input value={description} disabled />
                </FormControl>
                <FormControl my={5}>
                    <FormLabel>
                        Command
                    </FormLabel>
                    <CopyBlock
                        language="shell"
                        text={`$${command}          # usr/bin/bash`}
                        codeBlock
                        theme={dracula}
                        showLineNumbers={false}
                        />
                </FormControl>
                <HStack>
                    <FormControl my={5}>
                        <FormLabel>
                            Input
                        </FormLabel>
                    </FormControl>
                    <FormControl my={5}>
                        <FormLabel>
                            Output
                        </FormLabel>
                    </FormControl>
                </HStack>
                </Box>
            </ModalBody>
            <ModalFooter>
                <Button variant='ghost' onClick={onClose}>Close</Button>
            </ModalFooter>
            </ModalContent>
        </Modal>
    );
}