import { Flex, Heading, Input, Button, FormLabel, Stack, 
Box, FormControl, Link, useColorModeValue, Checkbox} from "@chakra-ui/react"
import { useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../AuthProvider';

export function Login() {
    const auth = useAuth();
    const navigate = useNavigate();
    let location = useLocation();

    function signIn() {
        auth.signin("User", () => {
            // Send them back to the page they tried to visit when they were
            // redirected to the login page. Use { replace: true } so we don't create
            // another entry in the history stack for the login page.  This means that
            // when they get to the protected page and click the back button, they
            // won't end up back on the login page, which is also really nice for the
            // user experience.
            navigate('/projects');
          });
    }

    const background = useColorModeValue('gray.50', 'gray.800');
    const loginBackground = useColorModeValue('white', 'gray.700');

    if (auth.user) {
        console.log('test');
        navigate('/projects');
        return null;
    }

    return (
    <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={background}>
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
            <Stack align={'center'}>
            <Heading fontSize={'4xl'}>Testing Platform</Heading>
            </Stack>
            <Box
            rounded={'lg'}
            bg={loginBackground}
            boxShadow={'lg'}
            p={8}>
            <Stack spacing={4}>
                <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input type="email" />
                </FormControl>
                <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input type="password" />
                </FormControl>
                <Stack spacing={10}>
                <Stack
                    direction={{ base: 'column', sm: 'row' }}
                    align={'start'}
                    justify={'space-between'}>
                    <Checkbox>Remember me</Checkbox>
                    <Link color={'blue.400'}>Forgot password?</Link>
                </Stack>
                <Button
                    bg={'blue.400'}
                    color={'white'}
                    _hover={{
                    bg: 'blue.500',
                    }}
                    onClick={signIn}
                >
                    Sign in
                </Button>
                </Stack>
            </Stack>
            </Box>
        </Stack>
    </Flex>
    );
}