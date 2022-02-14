import { useState, useEffect, useDebugValue } from 'react';
import {
    Box,
    Center,
    Text,
    SimpleGrid,
    VStack,
    IconButton,
    FormLabel,
    useDisclosure,
    useToast,
    HStack,
    useColorModeValue,
} from '@chakra-ui/react';
import { DownloadIcon, SmallAddIcon } from '@chakra-ui/icons';
import { useParams } from 'react-router-dom';
import FadeIn from 'react-fade-in';

import { CopyBlock, dracula } from 'react-code-blocks';

import { v4 as uuidv4 } from 'uuid';

import { Testcase, Status } from '../../components/Testcase';
import { queryResults, fetchProject, fetchTestCases } from '../../api/api';
import { DownloadModal } from '../../components/DownloadModal/DownloadModal';
import { CreateTestCaseModal } from '../../components/CreateTestCaseModal/CreateTestCaseModal';
import useInterval from '../../hooks/useInterval';

export function Project() {
    const toast = useToast();
    const { id } = useParams();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const download = useDisclosure();

    const [project, setProject] = useState({});
    const [tests, setTests] = useState([]);
    const [fetching, setFetching] = useState(false);
    const uuid = uuidv4();

    const background = useColorModeValue('green.50', 'green.900');
    const [running, setRunning] = useState(false);
    const [finished, setFinished] = useState(false);

    useDebugValue(tests);

    useInterval(() => {
        if (!uuid || tests.length === 0) return;
        if (finished) {
            setRunning(false);
            return;
        }
        queryResults(uuid).then(testsUpdated => {
            // console.log(testsUpdated);
            // console.log(tests);
            // console.log("Ran interval updates");
            // // 0 is pass
            // // 1 is fail
            // // 2 is in progress
            // // 3 is waiting

            const testsCopy = [];
            for (const test of tests) {
                testsCopy.push(test);
            }

            // console.log(testsCopy);

            testsCopy.forEach(t => {
                const updated = testsUpdated.find(test => test.pid == t.pid);
                console.log(updated);
                if (updated) {
                    t.status = updated.status;
                    console.log('updated status: ', t.status);
                }
            });

            // console.log(testsCopy);

            if (testsCopy.some(t => t.status !== Status.waiting)) {
                setRunning(true);
            }

            if (testsCopy.every(t => t.status === Status.passed || t.status === Status.failed)) {
                setFinished(true);
            }

            setTests(testsCopy);
        });
    }, 10000);

    useEffect(() => {
        // let cookieId = cookies.get('uuid');
        // console.warn("Get cookie", cookies.get('uuid') );

        // if (cookieId == null || cookies.get('uuid').length == 0) {
        //     // cookieId = btoa(String(Date.now() + Math.random()).substring(12, 19));
        //     cookieId = "test"
        //     console.log(cookieId);
        // }

        // console.warn(cookieId);
        // cookies.remove('uuid');
        // cookies.set('uuid', cookieId, { path: '/' });
        // setUUID(cookieId);

        setFetching(true);
        async function fetchData() {
            const project = await fetchProject(id);
            const tests = await fetchTestCases(id);
            return { project, tests };
        }

        fetchData()
            .then(({ project, tests }) => {
                // console.warn("PROJECT", project);
                setProject(project);
                // console.warn("TESTS", tests);
                tests.map(t => {
                    t.status = Status.waiting;
                });

                // console.log(tests);

                setTests(tests);
                setFetching(false);
            })
            .catch(() => {
                toast({
                    title: 'Error',
                    description: 'Was unable to fetch data',
                    status: 'fail',
                    duration: 2500,
                    isClosable: true,
                });
                // console.log(err);
            });
    }, []);

    function updateTests() {
        fetchTestCases(id)
            .then(tests => {
                // console.warn("TESTS", tests);
                setTests(tests);
            })
            .catch(() => {
                toast({
                    title: 'Error',
                    description: 'Was unable to fetch data',
                    status: 'fail',
                    duration: 2500,
                    isClosable: true,
                });
                // console.log(err);
            });
    }

    function renderLabel() {
        if (finished) {
            return (
                <Text
                    fontSize='sm'
                    fontWeight={500}
                    bg='gray.800'
                    p={2}
                    px={3}
                    color='gray.500'
                    roundedTop='md'
                >
                    Finished.
                </Text>
            );
        }
        if (running) {
            return (
                <Text
                    fontSize='sm'
                    fontWeight={500}
                    bg={background}
                    p={2}
                    px={3}
                    color='green.500'
                    roundedTop='md'
                >
                    Running...
                </Text>
            );
        }

        return <FormLabel>Run All Tests</FormLabel>;
    }

    return (
        <>
            <Center>
                <VStack width='100%'>
                    <Box>
                        <VStack>
                            <HStack justifyContent='space-between'>
                                <Text
                                    paddingTop={5}
                                    color='gray.500'
                                    fontSize='sm'
                                    textTransform='uppercase'
                                >
                                    {project.course}
                                </Text>
                                <Text
                                    paddingTop={5}
                                    color='gray.500'
                                    fontSize='sm'
                                    textTransform='uppercase'
                                >
                                    {project.prof}
                                </Text>
                            </HStack>

                            <Text
                                fontSize={{ base: '24px', md: '48px', lg: '64px' }}
                                fontWeight={800}
                                p={1}
                                px={3}
                                rounded='full'
                            >
                                {project.name}
                            </Text>
                            <HStack>
                                <IconButton
                                    colorScheme='blue'
                                    icon={
                                        <HStack p={4} spacing={2}>
                                            {' '}
                                            <Box>Download Runner</Box> <DownloadIcon />
                                        </HStack>
                                    }
                                    onClick={download.onOpen}
                                />
                                <IconButton
                                    icon={
                                        <HStack p={4} spacing={2}>
                                            {' '}
                                            <Box>Add Test Case</Box> <SmallAddIcon />
                                        </HStack>
                                    }
                                    onClick={onOpen}
                                    disabled={fetching}
                                />
                            </HStack>
                        </VStack>
                    </Box>
                    <Box w={{ base: '75%', md: '50%' }}>
                        {renderLabel()}
                        <CopyBlock
                            language='shell'
                            text={`python3 runner.py ${id} ${uuid}`}
                            codeBlock
                            theme={dracula}
                            showLineNumbers={false}
                        />
                    </Box>
                </VStack>
            </Center>

            <SimpleGrid p='25px' columns={{ base: 2, md: 3, lg: 4 }} spacing={5}>
                {tests.map((t, i) => (
                    <FadeIn key={t.pid} delay={i * 100}>
                        <Testcase {...t} id={id} />
                    </FadeIn>
                ))}
            </SimpleGrid>
            <CreateTestCaseModal {...{ isOpen, onOpen, onClose, updateTests }} />
            <DownloadModal {...download} />
        </>
    );
}
