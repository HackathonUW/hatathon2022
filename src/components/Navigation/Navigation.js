import * as React from "react";
import {
    Box,
    Flex,
    Avatar,
    Link,
    Button,
    Menu,
    MenuButton,
    IconButton,
    MenuList,
    MenuItem,
    MenuDivider,
    useDisclosure,
    useColorModeValue,
    Stack,
    useColorMode,
    Center,
    HStack,
    Text,
} from '@chakra-ui/react';

import { MoonIcon, SunIcon, CloseIcon, HamburgerIcon } from '@chakra-ui/icons';
import {
  Link as RouteLink,
  useNavigate,
  useLocation
} from "react-router-dom";

import { useAuth } from '../../AuthProvider';
import { GoogleLogout, useGoogleLogout } from 'react-google-login';

const clientId = '106551035992-i02vrfmr15dne7nepmqbn4k4i361j1s1.apps.googleusercontent.com';

const Links = [
    {name: "Projects", url:"/projects"},
    {name: "Dashboard", url:"/dashboard"},
];

function NavLink({name, url}) {
    return (
        <RouteLink to={url}>
            <Link
                px={2}
                py={1}
                rounded={'md'}
                _hover={{
                textDecoration: 'none',
                bg: useColorModeValue('gray.200', 'gray.700'),
                }}
                href={url}>
                {name}
            </Link>
        </RouteLink>
    );
}


export function Navigation() {
    const { user, signin, signout } = useAuth();
    const { signOut, loaded } = useGoogleLogout({
        clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
      })
    const navigate = useNavigate();
    const location = useLocation();
    const { colorMode, toggleColorMode } = useColorMode();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const background = useColorModeValue('gray.100', 'gray.900');
    const textColor = useColorModeValue('gray.200', 'gray.700')

    function onSuccess(res) {
        // console.log("logout", res);
        signout();
        navigate('/');
    }

    if (location.pathname == '/') return null;

    if (!user) return null;

    return (
        <>
            <Box bg={background} px={4}>
                <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                    <IconButton
                        size={'md'}
                        icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                        aria-label={'Open Menu'}
                        display={{ md: 'none' }}
                        onClick={isOpen ? onClose : onOpen}
                    />
                    <HStack spacing={8} alignItems={'center'}>
                        <Box>
                        <Link
                            px={2}
                            py={1}
                            _hover={{
                                textDecoration: 'none'
                            }}
                            _click={{
                                textDecoration: 'none'
                            }}
                            onClick={() => {
                                signOut();
                                navigate('/');
                            }}>
                            Crowd Code
                        </Link>
                        </Box>
                        <HStack
                            as={'nav'}
                            spacing={4}
                            display={{ base: 'none', md: 'flex' }}>
                            {Links.map((link) => (
                                <NavLink key={link.name} {...link}/>
                            ))}
                        </HStack>
                    </HStack>

                    <HStack spacing={8} alignItems={'center'}>
                        <Stack direction={'row'} spacing={7}>
                        <Button onClick={toggleColorMode}>
                            {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                        </Button>
            
                        <Menu>
                            <MenuButton
                            as={Button}
                            rounded={'full'}
                            variant={'link'}
                            cursor={'pointer'}
                            minW={0}>
                            <Avatar
                                size={'sm'}
                                src={user.imageUrl}
                            />
                            </MenuButton>
                            <MenuList alignItems={'center'} zIndex={10}>
                                <br />
                                <Center>
                                    <Avatar
                                    size={'2xl'}
                                    src={user.imageUrl}
                                    />
                                </Center>
                                <br />
                                <Center>
                                    <Text fontWeight={700}>{user.name}</Text>
                                </Center>
                                <Center>
                                    {user.email}
                                </Center>
                                <br />
                                <MenuDivider />
                                <MenuItem display={'flex'} alignItems={'center'} justifyContent={'center'}>
                                    <div>
                                    <GoogleLogout
                                        clientId={clientId}
                                        buttonText="Logout"
                                        onLogoutSuccess={onSuccess}
                                    />
                                    </div>
                                </MenuItem>
                            </MenuList>
                        </Menu>
                        </Stack>
                    </HStack>
                </Flex>

                {isOpen ? (
                    <Box pb={4} display={{ md: 'none' }}>
                        <Stack as={'nav'} spacing={4}>
                        {Links.map((link) => (
                            <NavLink key={link.name} {...link}/>
                        ))}
                        </Stack>
                    </Box>
                ) : null}
            </Box>
        </>
    );
}

