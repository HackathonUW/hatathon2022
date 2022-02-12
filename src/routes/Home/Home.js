import {Link as RouteLink} from "react-router-dom";
import {Button, Box} from "@chakra-ui/react";

export function Home() {
    return (
        <Box w='100vw' h='100vh' display='grid' placeItems='center'>
            <RouteLink to="/login">
                <Button>
                    Login
                </Button>
            </RouteLink>
        </Box>
    )
}
