import { useState, useEffect } from 'react';
import { Box, Center, Text, SimpleGrid, VStack } from '@chakra-ui/react'

import { Testcase, Status } from '../../components/Testcase';
import { CopyBlock, dracula } from 'react-code-blocks';

export function Project() {
    const [tests, setTests] = useState([]);

    useEffect(() => {
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
                    <Testcase key={i} {...t}/>
                ))}
            </SimpleGrid>
        </>
    )
}