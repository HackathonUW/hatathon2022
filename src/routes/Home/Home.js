import { Link as RouteLink } from 'react-router-dom';
import { Button, Box, Heading, VStack, Text, useColorModeValue } from '@chakra-ui/react';
import Typewriter from 'typewriter-effect';
import { useState, useEffect } from 'react';
import Particles from 'react-tsparticles';
import FadeIn from 'react-fade-in/lib/FadeIn';
import { fetchAllTestCases } from '../../api/api';
import { LoginButton } from '../../components/LoginButton/LoginButton';

export function Home() {
    const [tests, setTests] = useState([]);

    useEffect(() => {
        fetchAllTestCases().then(res => {
            setTests(res.map(t => t.name));
        });
    }, []);

    return (
        <Box w='100vw' h='100vh' display='grid' placeItems='center'>
            <VStack>
                <Heading fontWeight={700} fontSize={{ base: '48px', md: '64px', lg: '96px' }}>
                    Crowd Code
                </Heading>
                <Box
                    fontSize={{ base: '20px', md: '28px', lg: '36px' }}
                    fontFamily={'"Fira code", "Fira Mono", monospace'}
                >
                    <Text display='inline-block'>Testing...&nbsp; </Text>
                    <Box display='inline-block'>
                        <Typewriter
                            options={{
                                strings: tests,
                                autoStart: true,
                                loop: true,
                                cursor: '',
                                delay: 25,
                            }}
                        />
                    </Box>
                </Box>
                <LoginButton width={30} height={8} />
                <Box fontSize={{ base: 20, md: 30, lg: 40 }} maxWidth='50vw' textAlign='center'>
                    <FadeIn>
                        A web app designed to help CS students aggregate and contribute together
                        towards better code via end to end integration testing.
                    </FadeIn>
                </Box>
            </VStack>
            <Particles
                params={{
                    fpsLimit: 60,
                    particles: {
                        color: {
                            value: useColorModeValue('#555', '#eee'),
                        },
                        links: {
                            enable: true,
                            color: useColorModeValue('#555', '#eee'),
                            distance: 100,
                        },
                        move: {
                            enable: true,
                        },
                    },
                }}
            />
        </Box>
    );
}
