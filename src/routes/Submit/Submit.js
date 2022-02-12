import {Select, useToast, FormControl, FormLabel, Input, Box, Button, Heading, Center, VStack} from "@chakra-ui/react"
import {useState} from "react";
import { CreateTestCase } from "../../api/api";

export function Submit()
{
	const toast = useToast();
	const [name, setName] = useState();
	const [email, setEmail] = useState();
	const [author, setAuthor] = useState();
	const [command, setCommand] = useState();
	const [proj, setProj] = useState();
	const type = "Testcase";
	const projlist = [];

	const handleChange = (event) => {
		setProj(event.target.value);
	}

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
		<Center>
            <VStack m='20px'>
                <Heading>
                    Submit Test Case
                </Heading>
                <Box my={4} width={500} alignContent="center">
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
                        Name of Test Case
                    </FormLabel>
                    <Input onChange={tc => setName(tc.currentTarget.value)} />
                </FormControl>
                <FormControl my={5}>
                    <FormLabel>
                        Command
                    </FormLabel>
                    <Input onChange={tc => setCommand(tc.currentTarget.value)} />
                </FormControl>
                <FormControl my={5}>
                    <FormLabel>
                        Project
                    </FormLabel>
                    <Select onChange={handleChange}>
                    {projlist.map(prj => (
                            <option value={prj}>{prj.Name}</option>
                    ))}
                    </Select>
                </FormControl>

                </Box>
                <Button width={500} mb={5} mt={4} type="submit" onClick={() => {handleCreateTC(toast)}}>
                    Submit
                </Button>
            </VStack>
		</Center>
		

	);
}