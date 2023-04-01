import { Box, Image, Text } from '@chakra-ui/react'
import React from 'react'
import btcSrc from '../assets/btc.png'
import {motion} from 'framer-motion'


function Home() {
  return (
    <Box bg={'blackAlpha.900'} w={'full'} h={'85vh'}>
      <motion.div
      style={{
        height:'80vh',
      }}
      animate={{
        translateY:'20px'
      }}
      transition={{
        duration:2,
        repeat:Infinity,
        repeatType:'reverse'
      }}
      >

      <Image w={'full'} h={'full'} objectFit={'contain'} src={btcSrc} filter={'grayscale(1)'}/>
      <Text mt={'-20'} fontSize={'6xl'} textAlign={'center'} fontWeight={'thin'} color={'whiteAlpha.700'}>Xcrypto</Text>
      </motion.div>
    </Box>
  )
}

export default Home