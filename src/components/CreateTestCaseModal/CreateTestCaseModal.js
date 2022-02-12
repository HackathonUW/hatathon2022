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
    useToast, FormControl, FormLabel, Input, Box, Heading, VStack
} from '@chakra-ui/react'

import {useState} from "react";
import { CreateTestCase } from "../../api/api";

export function CreateTestCaseModal({ isOpen, onOpen, onClose }) {

    const toast = useToast();
	const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [author, setAuthor] = useState();
	const [description, setDescription] = useState();
    const [command, setCommand] = useState();
	const [input, setInput] = useState();
	const [output, setOutput] = useState();
	const type = "testcases";
	

	function handleCreateTC(toast)
	{
		CreateTestCase(name, email, author, command, type)
		.then(res => {
			console.log("SUCCESS:",!res.error)
			if (!res.error)
			{
				toast({
					title: "Submitted Test Case!",
					description: "Successfully submitted " + name + "!",
					status: "success",
					duration: 2500,
					isClosable: true,
				});
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
		}).catch(error => console.log("Error: ", error))
	}

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent maxW="56rem">
            <ModalHeader>Create a Test Case</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
            <Box my={4} width={'full'}>
                <FormControl my={5}>
                    <FormLabel>
                        Name
                    </FormLabel>
                    <Input onChange={tc => setName(tc.currentTarget.value)} />
                </FormControl>
                <FormControl my={5}>
                    <FormLabel>
                        Description
                    </FormLabel>
                    <Input onChange={tc => setDescription(tc.currentTarget.value)} />
                </FormControl>
                <FormControl my={5}>
                    <FormLabel>
                        Email
                    </FormLabel>
                    <Input onChange={tc => setEmail(tc.currentTarget.value)} />
                </FormControl>
                <FormControl my={5}>
                    <FormLabel>
                        Author
                    </FormLabel>
                    <Input onChange={tc => setAuthor(tc.currentTarget.value)} />
                </FormControl>
                <FormControl my={5}>
                    <Input onChange={tc => setCommand(tc.currentTarget.value)} />
                </FormControl>
                </Box>
            </ModalBody>

            <ModalFooter>
                <Button colorScheme='blue' mr={3} onClick={() => {handleCreateTC(toast)}}>
                    Create
                </Button>
                <Button variant='ghost' onClick={onClose}>Cancel</Button>
            </ModalFooter>
            </ModalContent>
        </Modal>
    );
}