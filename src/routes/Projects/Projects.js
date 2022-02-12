import { useState, useEffect } from 'react';
import { Box, Center, Text, SimpleGrid, VStack } from '@chakra-ui/react'
import { Project } from '../../components/Project';

export function Projects() {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const projects = [
            {name: "Project 1", id: 1},
            {name: "Project 2", id: 2},
            {name: "Project 3", id: 3},
            {name: "Project 4", id: 4},
            {name: "Project 5", id: 5},
            {name: "Project 6", id: 6},
            {name: "Project 7", id: 7},
        ]
        setProjects(projects);
    }, []);

    return (
        <>
            <Box p="20px">
                <Text
                fontSize={{ base: '24px', md: '48px', lg: '64px' }}
                fontWeight={800}
                p={2}
                px={3}
                rounded={'full'}>
                    Projects
                </Text>  
            </Box>

            <SimpleGrid p={'10px'} columns={{ base: 2, md: 3, lg: 4}} spacing={5}>
                {projects.map((p, i) => (
                    <Project key={i} {...p}/>
                ))}
            </SimpleGrid>
        </>
    )
}