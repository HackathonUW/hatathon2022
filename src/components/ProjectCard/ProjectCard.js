import {
    Box,
    LinkBox,
    LinkOverlay,
    useColorModeValue,
    Heading,
    Text,
    Stack,
    Image,
} from '@chakra-ui/react';

import { Link as RouterLink } from 'react-router-dom';

const IMAGE =
    'https://www.computersciencedegreehub.com/wp-content/uploads/2019/04/university-of-wisconsin.jpg';
// const IMAGE =
//     'https://images.unsplash.com/photo-1518051870910-a46e30d9db16?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80';

export function ProjectCard({ course, id, name, prof }) {
    return (
        <LinkBox py={12}>
            <Box
                role="group"
                p={6}
                maxW="330px"
                w="full"
                bg={useColorModeValue('white', 'gray.800')}
                boxShadow="2xl"
                rounded="lg"
                pos="relative"
                zIndex={1}
            >
                <Box
                    rounded="lg"
                    mt={-12}
                    pos="relative"
                    height="230px"
                    _after={{
                        transition: 'all .3s ease',
                        content: '""',
                        w: 'full',
                        h: 'full',
                        pos: 'absolute',
                        top: 5,
                        left: 0,
                        backgroundImage: `url(${IMAGE})`,
                        filter: 'blur(25px)',
                        zIndex: -1,
                    }}
                    _groupHover={{
                        _after: {
                            filter: 'blur(20px)',
                        },
                    }}
                >
                    <Image rounded="lg" height={230} width={282} objectFit="cover" src={IMAGE} />
                </Box>
                <Stack pt={10} align="center">
                    <Text color="gray.500" fontSize="sm" textTransform="uppercase">
                        {course}
                    </Text>
                    <Text color="gray.500" fontSize="med">
                        Professor: {prof}
                    </Text>
                    <Heading fontSize="2xl" fontFamily="body" fontWeight={500} textAlign="center">
                        <LinkOverlay as={RouterLink} to={`/project/${id}`}>
                            {name}
                        </LinkOverlay>
                    </Heading>
                </Stack>
            </Box>
        </LinkBox>
    );
}
