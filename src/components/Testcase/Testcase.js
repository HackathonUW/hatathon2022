import {
    Box,
    Center,
    Text,
    Stack,
    useColorModeValue,
    useDisclosure,
    HStack,
    IconButton
  } from '@chakra-ui/react';
import { CheckIcon, SmallCloseIcon, InfoIcon } from '@chakra-ui/icons';
import {useState} from 'react';  
import { Status } from './Status';

import { ViewTestCaseModal } from '../ViewTestCaseModal/ViewTestCaseModal';


export function Testcase({name, status, id}) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [mode, setMode] = useState(status);

    function getState(mode) {
        switch (mode) {
            case Status.waiting:
                return {
                    color1: "gray.50",
                    color2: "gray.900",
                    color3: "gray.500",
                    text: "Waiting"
                }
            
            case Status.testing:
                return {
                    color1: "yellow.50",
                    color2: "yellow.900",
                    color3: "yellow.500",
                    text: "Testing"
                }
            
            case Status.passed:
                return {
                    color1: "green.50",
                    color2: "green.900",
                    color3: "green.500",
                    text: "Passed"
                }
            
            case Status.failed:
                return {
                    color1: "red.50",
                    color2: "red.900",
                    color3: "red.500",
                    text: "Failed"
                }
        }
    }

    return (
        <Box
        border='1px' 
        borderColor={useColorModeValue('gray.50', 'gray.600')}
        maxW={'330px'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.800')}
        boxShadow={'2xl'}
        rounded={'2xl'}
        overflow={'hidden'}
        >
        <Stack
            textAlign={'center'}
            p={6}
            color={useColorModeValue('gray.800', 'white')}
            align={'center'}
        >
            <HStack justifyContext={'space-between'}>
                <Text
                    fontSize={'sm'}
                    fontWeight={500}
                    bg={useColorModeValue(getState(mode).color1, getState(mode).color2)}
                    p={2}
                    px={3}
                    color={getState(mode).color3}
                    rounded={'full'}
                >
                    {getState(mode).text}
                    {mode == Status.passed ? <CheckIcon marginLeft={'10px'}/> : null}
                    {mode == Status.failed ? <SmallCloseIcon marginLeft={'10px'}/> : null}
                </Text>
                <IconButton
                    size={'md'}
                    icon={<InfoIcon />}
                    aria-label={'Open Info'}
                    background={'none'}
                    onClick={onOpen}
                />
            </HStack>
            <Stack direction={'row'} align={'center'} justify={'center'}>
                <Text fontSize={{ base: '24px', md: '36px', lg: '46px' }} fontWeight={800}>
                    {name}
                </Text>
            </Stack>
        </Stack>
        <ViewTestCaseModal {...{ isOpen, onOpen, onClose }}/>
        </Box>
    );
  }