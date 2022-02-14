import {
    Box,
    Flex,
    SimpleGrid,
    Stat,
    StatLabel,
    StatNumber,
    useColorModeValue,
} from '@chakra-ui/react';
import { BsPerson } from 'react-icons/bs';
import { AiFillProject } from 'react-icons/ai';
import { RiTestTubeFill } from 'react-icons/ri';
import Odometer from 'react-odometerjs';
import 'odometer/themes/odometer-theme-default.css';
import { useState, useEffect } from 'react';

function StatsCard(props) {
    const { title, stat, icon } = props;

    return (
        <Stat
            px={{ base: 2, md: 4 }}
            py='5'
            shadow='xl'
            border='1px solid'
            borderColor={useColorModeValue('gray.100', 'gray.700')}
            rounded='lg'
        >
            <Flex justifyContent='space-between'>
                <Box pl={{ base: 2, md: 4 }}>
                    <StatLabel fontSize='2md' fontWeight='600' isTruncated>
                        {title}
                    </StatLabel>
                    <StatNumber fontSize='2xl' fontWeight='600'>
                        <Odometer duration={1000} value={stat} format='d' />
                    </StatNumber>
                </Box>
                <Box
                    my='auto'
                    color={useColorModeValue('gray.800', 'gray.200')}
                    alignContent='center'
                >
                    {icon}
                </Box>
            </Flex>
        </Stat>
    );
}

export default function BasicStatistics() {
    const [users, setUsers] = useState(0);
    const [projects, setProjects] = useState(0);
    const [tests, setTests] = useState(0);

    useEffect(() => {
        setUsers(896);
        setProjects(13);
        setTests(149);
    });

    return (
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }} padding={10}>
            <StatsCard title='Users' stat={users} icon={<BsPerson size='3em' />} />
            <StatsCard title='Projects' stat={projects} icon={<AiFillProject size='3em' />} />
            <StatsCard title='Tests' stat={tests} icon={<RiTestTubeFill size='3em' />} />
        </SimpleGrid>
    );
}
