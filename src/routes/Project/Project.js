import { useState, useEffect } from 'react';
import useInterval from '../../hooks/useInterval';
import { Box, Center, Text, SimpleGrid, VStack, IconButton,  FormLabel, useDisclosure, useToast, HStack, useColorModeValue, background } from '@chakra-ui/react'
import { SmallAddIcon } from '@chakra-ui/icons';
import { CreateTestCaseModal } from '../../components/CreateTestCaseModal/CreateTestCaseModal';
import { useParams } from 'react-router-dom';
import FadeIn from 'react-fade-in';
import { getUUID, queryResults, fetchProject, fetchTestCases } from '../../api/api';

import {Testcase, Status } from '../../components/Testcase';
import { CopyBlock, dracula } from 'react-code-blocks';


import Cookies from 'universal-cookie';

export function Project() {
    const cookies = new Cookies();

    let uuid = null;

    const toast = useToast();
    const { id } = useParams();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [project, setProject] = useState({});
    const [tests, setTests] = useState([]);
    const [fetching, setFetching] = useState(false);

    const background = useColorModeValue('green.50', 'green.900');
    const [running, setRunning] = useState(false);
    const [finished, setFinished] = useState(false);

    useEffect(() => {
        uuid = cookies.get('uuid');
    
        if (!uuid) {
            getUUID()
            .then(res => res.uuid)
            .then(id => {
                console.warn("UUID OBTAINED", id);
                uuid = id;
                cookies.set('uuid', uuid, { path: '/' });
            });
        }
        else {
            cookies.set('uuid', uuid, { path: '/' });
        }
    });

    useInterval(() => {
        if (!uuid || tests.length == 0) return;
        if (finished) {
            setRunning(false);
            return;
        }
        queryResults(uuid)
        .then(testsUpdated => {
            if (testsUpdated.length != 0) {
                setRunning(true);
            }

            for (const test in testsUpdated) {
                let t = tests.find( t => t.pid === test.pid );
                if (t) {
                    t.status = test.status;
                }
            }

            if (tests.every( t => t.status === Status.passed || t.status === Status.failed)) {
                setFinished(true);
            }

            console.warn("ID", uuid);
            console.warn("QUERY", testsUpdated);
        });
    }, 1000);

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
            tests.map(t => {
                t.status = Status.waiting;
            });

            console.log(tests);

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

    function renderLabel() {
        if (finished) {
            return (
                <Text
                fontSize={'sm'}
                fontWeight={500}
                bg={'gray.800'}
                p={2}
                px={3}
                color={'gray.500'}
                roundedTop={'md'}
                >
                    Finished.
                </Text>
            );
        }
        else if (running) {
            return (
                <Text
                fontSize={'sm'}
                fontWeight={500}
                bg={background}
                p={2}
                px={3}
                color={'green.500'}
                roundedTop={'md'}
                >
                    Running...
                </Text>
            );
        }
        else {
            return (
                <FormLabel>
                    Run All Tests
                </FormLabel>
            )
        }
    }

    return (
        <>
            <Center>
                <VStack width="100%">
                <Box>
                    <VStack>
                        <HStack justifyContent={'space-between'}>
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
                        <IconButton 
                            icon={<HStack p={4} spacing={2}> <Box>Add Test Case</Box> <SmallAddIcon /></HStack>}
                            onClick={onOpen} 
                            disabled={fetching} />
                    </VStack>
                </Box>
                <Box w="50%">
                    {renderLabel()}
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
                    <FadeIn key={i} delay={i * 100}>
                        <Testcase {...t} id={id}/>
                    </FadeIn>
                ))}
            </SimpleGrid>
            <CreateTestCaseModal {...{ isOpen, onOpen, onClose, updateTests}}/>
        </>
    )
}