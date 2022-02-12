import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    useToast, FormControl, FormLabel, Input, Box, Heading, VStack
} from '@chakra-ui/react'

import {useState} from "react";
import { CreateProject } from "../../api/api";

export function SubmitProjectModal({ isOpen, onOpen, onClose }) {

    const toast = useToast();
	const [name, setName] = useState();
	const [email, setEmail] = useState();
	const [author, setAuthor] = useState();
	const [course, setCourse] = useState();
	const [section, setSection] = useState();
	const [prof, setProf] = useState();
	const type = "project";
	

	function handleCreate(toast)
	{
		CreateProject(name, email, author, course, section, prof, type)
		.then(res => {
			console.log("SUCCESS:",!res.error)
			if (!res.error)
			{
				toast({
					title: "Submitted Project!",
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
            <ModalContent>
            <ModalCloseButton />
            <ModalHeader>Create a Project</ModalHeader>
            <ModalBody>
                <VStack>
                    <Box width={'full'}>
                    <FormControl my={5}>
                    <FormLabel>Email</FormLabel>
                            <Input onChange={tc => setEmail(tc.currentTarget.value)}/>
                    </FormControl>
                    <FormControl my={5}>
                        <FormLabel>
                            Author
                        </FormLabel>
                        <Input onChange={tc => setAuthor(tc.currentTarget.value)} />
                    </FormControl>
                    <FormControl my={5}>
                        <FormLabel>
                            Name of Project
                        </FormLabel>
                        <Input onChange={tc => setName(tc.currentTarget.value)} />
                    </FormControl>
                    <FormControl my={5}>
                        <FormLabel>
                            Course
                        </FormLabel>
                        <Input onChange={tc => setCourse(tc.currentTarget.value)} />
                    </FormControl>
                    <FormControl my={5}>
                        <FormLabel>
                            Section
                        </FormLabel>
                        <Input onChange={tc => setSection(tc.currentTarget.value)} />
                    </FormControl>
                    <FormControl my={5}>
                        <FormLabel>
                            Professor
                        </FormLabel>
                        <Input onChange={tc => setProf(tc.currentTarget.value)} />
                    </FormControl>
                    </Box>
                </VStack>
            </ModalBody>

            <ModalFooter>
                <Button colorScheme='blue' mr={3} onClick={() => {handleCreate(toast)}}>
                    Create
                </Button>
                <Button variant='ghost' onClick={onClose}>Close</Button>
            </ModalFooter>
            </ModalContent>
        </Modal>
    );
}