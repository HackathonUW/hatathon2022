import { Box, Center, Text, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export function NoMatch() {
    return (
        <Box p='10px' display='grid' placeItems='center' height='100%'>
            <Text
                fontSize={{ base: '24px', md: '48px', lg: '64px' }}
                fontWeight={800}
                p={2}
                px={3}
                rounded='full'
            >
                Nothing to see here!
            </Text>
            <Button>
                <Link to='/'>Go to the home page</Link>
            </Button>
        </Box>
    );
}
