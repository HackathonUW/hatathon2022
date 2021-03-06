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
    useToast,
    FormControl,
    FormLabel,
    Input,
    Box,
    Heading,
    HStack,
    Text,
} from '@chakra-ui/react';

import { CopyBlock, dracula } from 'react-code-blocks';

import { v4 as uuidv4 } from 'uuid';

import { useParams } from 'react-router-dom';

import { useEffect, useState } from 'react';
import { fetchFile, disableTestCase, enableTestCase, fetchTestCase } from '../../api/api';

export function ViewTestCaseModal({ isOpen, onOpen, onClose, disabled, setDisabled, ...p }) {
    const toast = useToast();

    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [testcase, setTestcase] = useState(p.props);
    const [fetching, setFetching] = useState(false);

    useEffect(() => {
        setTestcase(testcase);
    }, [isOpen]);

    useEffect(() => {
        if (fetching) return;

        setFetching(true);
        // console.warn("VIEW TEST TRIGGERED");
        async function retrieveFiles() {
            const input = await fetchFile(testcase.input);
            const output = await fetchFile(testcase.output);
            return { input, output };
        }

        retrieveFiles()
            .then(({ input, output }) => {
                input = input
                    .split('\n')
                    .slice(0, Math.min(10, input.split('\n').length))
                    .join('\n');
                output = output
                    .split('\n')
                    .slice(0, Math.min(10, output.split('\n').length))
                    .join('\n');
                setInput(input);
                setOutput(output);
            })
            .finally(() => {
                setFetching(false);
            });
    }, [testcase]);

    function disableTC() {
        // console.warn("disabled tc");
        disableTestCase(testcase.pid).then(res => {
            if (!res.error) {
                toast({
                    title: 'Disabled Test Case',
                    description: `Successfully disabled ${testcase.name}!`,
                    status: 'warning',
                    duration: 2500,
                    isClosable: true,
                });
                setDisabled(true);
            } else {
                toast({
                    title: 'Error',
                    description: `Was unable to disable ${testcase.name}`,
                    status: 'fail',
                    duration: 2500,
                    isClosable: true,
                });
            }
        });
    }

    function enableTC() {
        // console.warn("enabled tc");
        enableTestCase(testcase.pid).then(res => {
            if (!res.error) {
                toast({
                    title: 'Enabled Test Case!',
                    description: `Successfully enabled ${testcase.name}!`,
                    status: 'success',
                    duration: 2500,
                    isClosable: true,
                });
                setDisabled(false);
            } else {
                toast({
                    title: 'Error',
                    description: `Was not able to enable ${testcase.name}`,
                    status: 'fail',
                    duration: 2500,
                    isClosable: true,
                });
            }
        });
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent maxW='56rem'>
                <ModalHeader>Test Case {testcase.name}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Box width='full'>
                        {disabled ? (
                            <Text fontWeight={600} display='inline-block' color='red.500'>
                                Disabled
                            </Text>
                        ) : null}
                        <FormControl my={5}>
                            <FormLabel>Last Updated</FormLabel>
                            <Input value={testcase.lastupdated} disabled />
                        </FormControl>
                        <FormControl my={5}>
                            <FormLabel>Name</FormLabel>
                            <Input value={testcase.name} disabled />
                        </FormControl>
                        <FormControl my={5}>
                            <FormLabel>Author</FormLabel>
                            <Input value={testcase.author} disabled />
                        </FormControl>
                        <FormControl my={5}>
                            <FormLabel>Command</FormLabel>
                            <CopyBlock
                                language='shell'
                                text={`$${testcase.command}          # usr/bin/bash`}
                                codeBlock
                                theme={dracula}
                                showLineNumbers={false}
                            />
                        </FormControl>
                        <Box>
                            <HStack>
                                <FormControl my={5}>
                                    <FormLabel>Input</FormLabel>
                                    <CopyBlock
                                        language='shell'
                                        text={input}
                                        codeBlock
                                        theme={dracula}
                                        showLineNumbers
                                    />
                                </FormControl>
                                <FormControl my={5}>
                                    <FormLabel>Output</FormLabel>
                                    <CopyBlock
                                        language='shell'
                                        text={output}
                                        codeBlock
                                        theme={dracula}
                                        showLineNumbers
                                    />
                                </FormControl>
                            </HStack>
                        </Box>
                    </Box>
                </ModalBody>
                <ModalFooter>
                    {disabled ? (
                        <Button
                            colorScheme='green'
                            mr={3}
                            onClick={() => {
                                enableTC(toast);
                            }}
                        >
                            Enable
                        </Button>
                    ) : (
                        <Button
                            colorScheme='red'
                            mr={3}
                            onClick={() => {
                                disableTC(toast);
                            }}
                        >
                            Disable
                        </Button>
                    )}
                    <Button variant='ghost' onClick={onClose}>
                        Close
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}
