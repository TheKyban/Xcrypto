import { Avatar, Box, Stack, Text, VStack } from '@chakra-ui/react'
import React from 'react'

function Footer() {
  return (
    <Box bg={'blackAlpha.900'} color={'whiteAlpha.700'} minH={'48'}
    py={['16','8']}
    >
        
        <Stack  direction={['column','row']} h={'full'} alignItems={'center'}>
            <VStack w={'full'} alignItems={['center','flex-start']}>
                <Text fontWeight={'bold'}>About Us</Text>
                <Text fontSize={'sm'} letterSpacing={'widest'} textAlign={['center',"left"]}>We are the best crypoto trading app in India, We Pro our guidance at a very regionable price</Text>

            </VStack>

            <VStack>
                <Avatar boxSize={'28'} mt={['4',0]}/>
                <Text>Our Founder</Text>
            </VStack>

        </Stack>
    </Box>
  )
}

export default Footer