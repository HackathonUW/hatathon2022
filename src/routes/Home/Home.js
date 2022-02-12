import {Link as RouteLink} from "react-router-dom";
import {Button, Box, Heading, VStack, Text, useColorModeValue} from "@chakra-ui/react";
import Typewriter from "typewriter-effect";
import { useState, useEffect } from "react";
import { fetchAllTestCases } from "../../api/api";
import Particles from "react-tsparticles";
import { LoginButton } from '../../components/LoginButton/LoginButton';

export function Home() {

    const [tests, setTests] = useState([]);

    useEffect(() => {
        fetchAllTestCases()
        .then(res => {
            setTests(res.map(t => t.name));
        });
    }, [])

    return (
        <Box w='100vw' h='100vh' display='grid' placeItems='center'>
            <VStack>
                <Heading fontWeight={700} fontSize={{base: "30px", md: "64px", lg: "96px"}}>Crowd Code</Heading>
                <Box fontSize={30} fontFamily={'"Fira code", "Fira Mono", monospace'}>
                    <Text display={'inline-block'}>Testing...&nbsp; </Text>
                    <Box display={'inline-block'}>
                        <Typewriter
                            
                            options={{
                                strings: tests,
                                autoStart: true,
                                loop: true,
                                cursor: "",
                                delay: 25,
                            }}
                        />
                    </Box>
                </Box>
                <LoginButton />
            </VStack>
            <Particles
                params={{
                fpsLimit: 60,
                particles: {
                    color: {
                    value: useColorModeValue('#000', '#eee')
                    },
                    links: {
                    enable: true,
                    color: useColorModeValue('#000', '#eee'),
                    distance: 150
                    },
                    move: {
                    enable: true
                    }
                }
                }}
            />
        </Box>
    )
}
