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
import { CheckIcon, SmallCloseIcon, InfoIcon, Icon } from '@chakra-ui/icons';
import {useEffect, useState} from 'react';  
import { Status } from './Status';

import { ViewTestCaseModal } from '../ViewTestCaseModal/ViewTestCaseModal';

const CircleIcon = (props) => (
    <Icon viewBox='0 0 200 200' {...props}>
      <path
        fill='currentColor'
        d='M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0'
      />
    </Icon>
  )


export function Testcase(props) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [mode, setMode] = useState(props.status);

    function getState(mode) {
        switch (mode) {
           
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

            case Status.waiting:
            default:
                return {
                    color1: "gray.50",
                    color2: "gray.900",
                    color3: "gray.500",
                    text: "Waiting"
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
            p={4}
            color={useColorModeValue('gray.800', 'white')}
            align={'center'}
        >
            <HStack display={'flex'} w={'full'} justifyContent={'space-between'}>
                <Text
                    fontSize={'sm'}
                    fontWeight={500}
                    bg={useColorModeValue(getState(mode).color1, getState(mode).color2)}
                    p={2}
                    color={getState(mode).color3}
                    rounded={'full'}
                >
                    {getState(mode).text}
                    {mode == Status.passed ? <CheckIcon marginLeft={'10px'}/> : null}
                    {mode == Status.failed ? <SmallCloseIcon marginLeft={'10px'}/> : null}
                </Text>
                <HStack>
                    {props.disabled ? <CircleIcon boxSize={4} p={0} color='red.500' /> : null}
                    <IconButton
                        size={'md'}
                        icon={<InfoIcon marginLeft={-10} m={0}/>}
                        aria-label={'Open Info'}
                        background={'none'}
                        onClick={onOpen}
                    />
                </HStack>

            </HStack>
            <Stack direction={'row'} align={'center'} justify={'center'}>
                <Text fontSize={{ base: '24px', md: '36px', lg: '42px' }} fontWeight={800}>
                    {props.name}
                </Text>
            </Stack>
        </Stack>
        <ViewTestCaseModal {...{ isOpen, onOpen, onClose, ...{props}}}/>
        </Box>
    );
  }