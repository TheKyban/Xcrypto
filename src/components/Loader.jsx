import { Box, Spinner, VStack } from '@chakra-ui/react'
import React from 'react'

function Loader() {
  return (
    <VStack h={'90vh'} justifyContent={'center'}>
        <Box transform={'scale(3'}>
            <Spinner />

        </Box>
    </VStack>
  )
}

export default Loader