import { useState, useEffect } from 'react';
import { Box, Center, Text, SimpleGrid, IconButton, useDisclosure } from '@chakra-ui/react'
import { ProjectCard } from '../../components/ProjectCard';
import { SubmitProjectModal } from '../../components/SubmitProjectModal/SubmitProjectModal';
import { PlusSquareIcon } from '@chakra-ui/icons'

import { fetchProjects } from'../../api/api';

export function Projects() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [projects, setProjects] = useState([]);
    const [fetching, setFetching] = useState(false);

    useEffect(() => {
        setFetching(true);
        fetchProjects()
            .then(data => {
                setProjects(data);
                setFetching(false);
            });
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
                    <ProjectCard key={i} {...p}/>
                ))}
                {!fetching ? (
                <Box w={'full'} h={'full'} display='grid' placeItems='center'>
                    <IconButton
                        background='transparent'
                        w={64} h={64}
                        icon={<PlusSquareIcon  w={32} h={32}/>}
                        aria-label={'Add Project'}
                        onClick={onOpen}
                    />
                </Box>
                ) : null}
            </SimpleGrid>
            <SubmitProjectModal {...{ isOpen, onOpen, onClose }} />
        </>
    )
}