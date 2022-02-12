import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Bar } from 'react-chartjs-2';
  import { Text, Box, SimpleGrid } from '@chakra-ui/react';
import BasicStatistics from '../../components/BasicStatCard/BasicStatCard';
  
ChartJS.register(
CategoryScale,
LinearScale,
BarElement,
Title,
Tooltip,
Legend
);

export function Dashboard()
{
    return (
        <Box display={'flex'} flexDirection={'column'} spacing={10}>
            <Text
                fontSize={{ base: '24px', md: '48px', lg: '64px' }}
                fontWeight={750}
                p={2}
                px={10}
                rounded={'full'}>
                    Dashboard
            </Text>
            <BasicStatistics/>
        </Box>
    );
}
