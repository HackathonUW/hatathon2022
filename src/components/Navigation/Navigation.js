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
} from '@chakra-ui/react';

import { MoonIcon, SunIcon, CloseIcon, HamburgerIcon } from '@chakra-ui/icons';
import {
  Link as RouteLink,
  useNavigate,
} from "react-router-dom";

import { useAuth } from '../../AuthProvider';

const Links = [
    {name: "Projects", url:"/projects"},
    {name: "Submit Test Case", url:"/submit"},
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
    const auth = useAuth();
    const navigate = useNavigate();
    const { colorMode, toggleColorMode } = useColorMode();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const background = useColorModeValue('gray.100', 'gray.900');
    const textColor = useColorModeValue('gray.200', 'gray.700')

    if (!auth.user) return null;

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
                            href={'/'}>
                            Team Test
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
                                src={'https://avatars.dicebear.com/api/male/username.svg'}
                            />
                            </MenuButton>
                            <MenuList alignItems={'center'} zIndex={10}>
                                <br />
                                <Center>
                                    <Avatar
                                    size={'2xl'}
                                    src={'https://avatars.dicebear.com/api/male/username.svg'}
                                    />
                                </Center>
                                <br />
                                <Center>
                                    <p>Username</p>
                                </Center>
                                <br />
                                <MenuDivider />
                                <MenuItem>Your Servers</MenuItem>
                                <MenuItem>Account Settings</MenuItem>
                                <MenuItem
                                    onClick={() => {
                                        auth.signout(() => navigate('/'));
                                    }}
                                >Logout</MenuItem>
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

