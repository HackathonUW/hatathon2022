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
import { fetchFile, disableTestCase, enableTestCase, fetchTestCase } from "../../api/api";

export function ViewTestCaseModal({ isOpen, onOpen, onClose, ...p }) {

    const toast = useToast();

    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [testcase, setTestcase] = useState(p.props);

    console.warn("VIEW MODAL DATA", p.props);

    useEffect(() => {
        async function retrieveFiles() {
            let input = await fetchFile(testcase.input);
            let output = await fetchFile(testcase.output);
            return { input, output };
        }
        if (isOpen) {
            retrieveFiles()
            .then(({input, output}) => {
                setInput(input);
                setOutput(output);
            });
        }
    }, [testcase, isOpen])

    function fetchTC() {
        console.warn("FETCH TC");
        fetchTestCase(testcase.pid)
            .then(data => {
                setTestcase(data);
            });
    }

    function disableTC() {
        console.warn("disabled tc");
        disableTestCase(testcase.pid)
        .then(res => {
            if (!res.error)
			{
				toast({
					title: "Disabled Test Case",
					description: "Successfully disabled " + testcase.name + "!",
					status: "warning",
					duration: 2500,
					isClosable: true,
				});
                fetchTC();
			}
			else
			{
				toast({
					title: "Error",
					description: "Was unable to disable " + testcase.name,
					status: "fail",
					duration: 2500,
					isClosable: true,
				})
			}
        })
    }

    function enableTC() {
        console.warn("enabled tc");
        enableTestCase(testcase.pid)
        .then(res => {
            if (!res.error)
			{
				toast({
					title: "Enabled Test Case!",
					description: "Successfully enabled " + testcase.name + "!",
					status: "success",
					duration: 2500,
					isClosable: true,
				});
                fetchTC();
			}
			else
			{
				toast({
					title: "Error",
					description: "Was not able to enable " + testcase.name,
					status: "fail",
					duration: 2500,
					isClosable: true,
				})
			}
        })
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
                    <Input value={testcase.lastupdated} disabled />
                </FormControl>
                <FormControl my={5}>
                    <FormLabel>
                        Name
                    </FormLabel>
                    <Input value={testcase.name} disabled />
                </FormControl>
                <FormControl my={5}>
                    <FormLabel>
                        Author
                    </FormLabel>
                    <Input value={testcase.author} disabled />
                </FormControl>
                <FormControl my={5}>
                    <FormLabel>
                        Command
                    </FormLabel>
                    <CopyBlock
                        language="shell"
                        text={`$${testcase.command}          # usr/bin/bash`}
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
                {p.props.disabled ? (
                    <Button colorScheme='green' mr={3} onClick={() => {enableTC(toast)}}>
                        Enable
                    </Button>
                ) : (
                    <Button colorScheme='red' mr={3} onClick={() => {disableTC(toast)}}>
                        Disable
                    </Button>
                )}
                <Button variant='ghost' onClick={onClose}>Close</Button>
            </ModalFooter>
            </ModalContent>
        </Modal>
    );
}