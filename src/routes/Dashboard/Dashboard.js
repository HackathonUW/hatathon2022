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
                p={1}
                px={3}
                rounded={'full'}>
                    Dashboard
            </Text>
            <BasicStatistics/>
            <Bar options={options} data={data} />
        </Box>
    );
}


  
  export const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };
  
  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  
  export const data = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: labels.map(() => Math.random() * 1000),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Dataset 2',
        data: labels.map(() => Math.random() * 1000),
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };