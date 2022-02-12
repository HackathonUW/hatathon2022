import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    useToast, FormControl, FormLabel, Input, Box, HStack
} from '@chakra-ui/react'

import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';

import { v4 as uuidv4 } from 'uuid';

import { useParams } from 'react-router-dom';

import { useState} from "react";
import { CreateTestCase } from "../../api/api";

export function CreateTestCaseModal({ isOpen, onOpen, onClose, updateTests }) {

    const { id } = useParams();
    const toast = useToast();
	const [name, setName] = useState("");
    const [author, setAuthor] = useState("");
    const [command, setCommand] = useState("Command here");
	const [input, setInput] = useState();
	const [output, setOutput] = useState();

    // file name: in-project-testcasename-generateuuid
    // filename: out-project-testcasename-generateuuid

	function handleCreateTC(toast)
	{
        const data = new FormData();
        const uuid = uuidv4();
        if (!input || !output) {
            toast({
                title: "Error",
                description: "Was not able to create " + name,
                status: "fail",
                duration: 2500,
                isClosable: true,
            })
            return;
        }

        data.append(
            "file",
            input,
            `in-${id}-${name}-${uuid}`);
        
        data.append(
            "file",
            output,
            `out-${id}-${name}-${uuid}`);

		CreateTestCase(data, author, name, command, id)
		.then(res => {
			// console.log("SUCCESS:",!res.error)
			if (!res.error)
			{
				toast({
					title: "Submitted Test Case!",
					description: "Successfully submitted " + name + "!",
					status: "success",
					duration: 2500,
					isClosable: true,
				});
                updateTests();
			}
			else
			{
				toast({
					title: "Error",
					description: "Was not able to create " + name,
					status: "fail",
					duration: 2500,
					isClosable: true,
				})
			}
		})
        .catch(error => {
            // console.log("Error: ", error)
            toast({
                title: "Error",
                description: "Was not able to create " + name,
                status: "fail",
                duration: 2500,
                isClosable: true,
            })
        })
	}

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent maxW="56rem">
            <ModalHeader>Create a Test Case</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
            <Box my={4} width={'full'}>
                <HStack>
                    <FormControl my={5}>
                        <FormLabel>
                            Name
                        </FormLabel>
                        <Input onChange={tc => setName(tc.currentTarget.value)} />
                    </FormControl>
                    <FormControl my={5}>
                        <FormLabel>
                            Author
                        </FormLabel>
                        <Input onChange={tc => setAuthor(tc.currentTarget.value)} />
                    </FormControl>
                </HStack>
                <FormControl my={5}>
                <FormControl my={5}>
                    <FormLabel>
                        Command
                    </FormLabel>
                    <Editor
                        value={command}
                        onValueChange={code => setCommand(code)}
                        highlight={code => highlight(code, languages.js)}
                        padding={10}
                        border={1}
                        borderColor={'black'}
                        style={{
                        fontFamily: '"Fira code", "Fira Mono", monospace',
                        fontSize: 14,
                        }}
                    />
                </FormControl> 
                </FormControl>
                <HStack>
                    <FormControl my={5}>
                        <FormLabel>
                            Input
                        </FormLabel>
                        <Input variant="flushed" type='file' onChange={tc => setInput(tc.target.files[0])} />
                    </FormControl>
                    <FormControl my={5}>
                        <FormLabel>
                            Output
                        </FormLabel>
                        <Input variant="flushed" type='file' onChange={tc => setOutput(tc.target.files[0])} />
                    </FormControl>
                </HStack>
                </Box>
            </ModalBody>
            <ModalFooter>
                <Button colorScheme='blue' mr={3} onClick={() => {handleCreateTC(toast)}}>
                    Create
                </Button>
                <Button variant='ghost' onClick={onClose}>Close</Button>
            </ModalFooter>
            </ModalContent>
        </Modal>
    );
}