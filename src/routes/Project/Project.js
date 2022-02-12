import { useState, useEffect } from 'react';
import { Box, Center, Text, SimpleGrid, VStack, IconButton, useDisclosure } from '@chakra-ui/react'
import { PlusSquareIcon } from '@chakra-ui/icons';
import { CreateTestCaseModal } from '../../components/CreateTestCaseModal/CreateTestCaseModal';

import { fetchTestCases } from '../../api/api';

import { TestCase, Status } from '../../components/TestCase';
import { CopyBlock, dracula } from 'react-code-blocks';

export function Project() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [tests, setTests] = useState([]);
    const [fetching, setFetching] = useState(false);

    useEffect(() => {
        setFetching(true);
        fetchTestCases(1)
            .then(data => {
                console.log(data);
                setFetching(false);
                // setTests(tests);
            });

        const tests = [
            {name: "Test Case 1", status: Status.waiting},
            {name: "Test Case 2", status: Status.passed},
            {name: "Test Case 3", status: Status.waiting},
            {name: "Test Case 4", status: Status.failed},
            {name: "Test Case 5", status: Status.waiting},
            {name: "Test Case 6", status: Status.passed},
        ]
        setTests(tests);
    }, []);

    return (
        <>
            <Center>
                <VStack width="100%">
                <Box>
                    <Text
                    fontSize={{ base: '24px', md: '48px', lg: '64px' }}
                    fontWeight={800}
                    p={2}
                    px={3}
                    rounded={'full'}>
                        Project 1
                    </Text>  
                </Box>
                <Box w="50%">
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

            <SimpleGrid p={'10px'} columns={{ base: 2, md: 3, lg: 4}} spacing={5}>
                {tests.map((t, i) => (
                    <TestCase key={i} {...t}/>
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
            <CreateTestCaseModal {...{ isOpen, onOpen, onClose }}/>
        </>
    )
}