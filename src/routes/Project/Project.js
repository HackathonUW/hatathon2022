import { useState, useEffect } from 'react';
import { Box, Center, Text, SimpleGrid, VStack, IconButton,  FormLabel, useDisclosure, useToast, HStack, useColorModeValue, background } from '@chakra-ui/react'
import { PlusSquareIcon } from '@chakra-ui/icons';
import { CreateTestCaseModal } from '../../components/CreateTestCaseModal/CreateTestCaseModal';
import { useParams } from 'react-router-dom';

import { fetchProject, fetchTestCases } from '../../api/api';

import {Testcase, Status } from '../../components/Testcase';
import { CopyBlock, dracula } from 'react-code-blocks';

export function Project() {
    const toast = useToast();
    const { id } = useParams();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [project, setProject] = useState({});
    const [tests, setTests] = useState([]);
    const [fetching, setFetching] = useState(false);

    const background = useColorModeValue('green.50', 'green.900');
    const [running, setRunning] = useState(true);

    useEffect(() => {
        setFetching(true);
        async function fetchData() {
            let project = await fetchProject(id);
            let tests = await fetchTestCases(id);
            return {project, tests};
        }

        fetchData()
        .then(({project, tests}) => {
            console.warn("PROJECT", project);
            setProject(project);
            console.warn("TESTS", tests);
            setTests(tests);
            setFetching(false);
        })
        .catch(err => {
            toast({
                title: "Error",
                description: "Was unable to fetch data",
                status: "fail",
                duration: 2500,
                isClosable: true,
            });
            console.log(err);
        });
    }, []);

    function updateTests() {
        fetchTestCases(id)
        .then(tests => {
            console.warn("TESTS", tests);
            setTests(tests);
        })
        .catch(err => {
            toast({
                title: "Error",
                description: "Was unable to fetch data",
                status: "fail",
                duration: 2500,
                isClosable: true,
            });
            console.log(err);
        });
    }

    return (
        <>
            <Center>
                <VStack width="100%">
                <Box>
                    <VStack>
                        <HStack justifyContenxt={'space-between'}>
                            <Text paddingTop={5} color={'gray.500'} fontSize={'sm'} textTransform={'uppercase'}>
                                {project.course}
                            </Text>
                            <Text paddingTop={5} color={'gray.500'} fontSize={'sm'} textTransform={'uppercase'}>
                                {project.prof}
                            </Text>
                        </HStack>

                        <Text
                        fontSize={{ base: '24px', md: '48px', lg: '64px' }}
                        fontWeight={800}
                        p={1}
                        px={3}
                        rounded={'full'}>
                            {project.name}
                        </Text>  
                    </VStack>
                </Box>
                <Box w="50%">
                    {running ? (
                    <Text
                        fontSize={'sm'}
                        fontWeight={500}
                        bg={background}
                        p={2}
                        px={3}
                        color={'green.500'}
                        rounded={'full'}
                    >
                        Running...
                    </Text>
                    ) : (
                        <FormLabel>
                            Run All Tests
                        </FormLabel>
                    )}

                    <CopyBlock
                    language="shell"
                    text={`runner text.exe output`}
                    codeBlock
                    theme={dracula}
                    showLineNumbers={false}
                    />
                </Box>
                </VStack>
            </Center>

            <SimpleGrid p={'25px'} columns={{ base: 2, md: 3, lg: 4}} spacing={5}>
                {tests.map((t, i) => (
                    <Testcase key={i} {...t} id={id}/>
                ))}
                {!fetching ? (
                <Box w={'full'} h={'full'} display='grid' placeItems='center'>
                    <IconButton
                        background='transparent'
                        w={'full'} h={'full'}
                        icon={<PlusSquareIcon w={32} h={32}/>}
                        aria-label={'Add Project'}
                        onClick={onOpen}
                    />
                </Box>
                ) : null}
            </SimpleGrid>
            <CreateTestCaseModal {...{ isOpen, onOpen, onClose, updateTests}}/>
        </>
    )
}