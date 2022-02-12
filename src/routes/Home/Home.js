import {Link as RouteLink} from "react-router-dom";
import {Button} from "@chakra-ui/react";

export function Home() {
    return (
        <RouteLink to="/submit">
            <Button>
                Submit a new test case
            </Button>
        </RouteLink>
    )
}
