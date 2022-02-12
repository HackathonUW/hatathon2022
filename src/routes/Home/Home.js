import {Link as RouteLink} from "react-router-dom";
import {Button, Box, Heading, VStack} from "@chakra-ui/react";

export function Home() {
    return (
        <Box w='100vw' h='100vh' display='grid' placeItems='center'>
            <VStack>
                <Heading fontWeight={700} fontSize={{base: "30px", md: "64px", lg: "96px"}}>Team Test</Heading>
                <RouteLink to="/login">
                    <Button>
                        Login
                    </Button>
                </RouteLink>
            </VStack>
        </Box>
    )
}
