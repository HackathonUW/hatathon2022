import { useState, useEffect } from 'react';
import {
    Box,
    Center,
    Text,
    SimpleGrid,
    IconButton,
    useDisclosure,
    VStack,
    HStack,
} from '@chakra-ui/react';
import { SmallAddIcon } from '@chakra-ui/icons';
import FadeIn from 'react-fade-in';
import { ProjectCard } from '../../components/ProjectCard';
import { SubmitProjectModal } from '../../components/SubmitProjectModal/SubmitProjectModal';
import { fetchProjects } from '../../api/api';

export function Projects() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [projects, setProjects] = useState([]);
    const [fetching, setFetching] = useState(false);

    useEffect(() => {
        setFetching(true);
        fetchProjects()
            .then(data => {
                setProjects(data);
            })
            .finally(() => {
                setFetching(false);
            });
    }, []);

    return (
        <>
            <Box p="20px">
                <VStack justify="center">
                    <Text
                        fontSize={{ base: '24px', md: '48px', lg: '64px' }}
                        fontWeight={800}
                        p={2}
                        px={3}
                        rounded="full"
                    >
                        Projects
                    </Text>
                    <IconButton
                        icon={
                            <HStack p={4} spacing={2}>
                                {' '}
                                <Box>Add Project</Box> <SmallAddIcon />
                            </HStack>
                        }
                        onClick={onOpen}
                        disabled={fetching}
                    />
                </VStack>
            </Box>
            <Center>
                <SimpleGrid
                    p="10px"
                    columns={{ base: 1, sm: 2, md: 3, lg: 4 }}
                    spacing={5}
                    alignItems="center"
                >
                    {projects.map((p, i) => (
                        <FadeIn delay={i * 100}>
                            <ProjectCard key={p} {...p} />
                        </FadeIn>
                    ))}
                </SimpleGrid>
            </Center>

            <SubmitProjectModal {...{ isOpen, onOpen, onClose }} />
        </>
    );
}
