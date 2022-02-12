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

import { useParams } from 'react-router-dom';

import {useEffect, useState} from "react";
import { fetchFile } from "../../api/api";

export function ViewTestCaseModal({ isOpen, onOpen, onClose, ...p }) {

    const toast = useToast();

    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");

    console.warn("VIEW MODAL DATA", p.props);

    useEffect(() => {
        async function retrieveFiles() {
            let input = await fetchFile(p.props.input);
            let output = await fetchFile(p.props.output);
            return { input, output };
        }
        if (isOpen) {
            retrieveFiles()
            .then(({input, output}) => {
                setInput(input);
                setOutput(output);
            });
        }
    }, [isOpen])

    function disableTC() {
        console.warn("disabled tc");
        toast({
            title: "Disabled Test Case",
            description: "Successfully disabled " + p.props.name,
            status: "warning",
            duration: 2500,
            isClosable: true,
        });
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent maxW="56rem">
            <ModalHeader>View Test Case</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
            <Box my={4} width={'full'}>
                <FormControl my={5}>
                    <FormLabel>Last Updated</FormLabel>
                    <Input value={p.props.lastupdated} disabled />
                </FormControl>
                <FormControl my={5}>
                    <FormLabel>
                        Name
                    </FormLabel>
                    <Input value={p.props.name} disabled />
                </FormControl>
                <FormControl my={5}>
                    <FormLabel>
                        Author
                    </FormLabel>
                    <Input value={p.props.author} disabled />
                </FormControl>
                <FormControl my={5}>
                    <FormLabel>
                        Command
                    </FormLabel>
                    <CopyBlock
                        language="shell"
                        text={`$${p.props.command}          # usr/bin/bash`}
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
                        <CopyBlock
                            language="shell"
                            text={input}
                            codeBlock
                            theme={dracula}
                            showLineNumbers={true}
                        />
                    </FormControl>
                    <FormControl my={5}>
                        <FormLabel>
                            Output
                        </FormLabel>
                        <CopyBlock
                            language="shell"
                            text={output}
                            codeBlock
                            theme={dracula}
                            showLineNumbers={true}
                        />
                    </FormControl>
                </HStack>
                </Box>
            </ModalBody>
            <ModalFooter>
                <Button colorScheme='red' mr={3} onClick={() => {disableTC(toast)}}>
                    Disable
                </Button>
                <Button variant='ghost' onClick={onClose}>Close</Button>
            </ModalFooter>
            </ModalContent>
        </Modal>
    );
}