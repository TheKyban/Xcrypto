import { Button, HStack } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <HStack p={4} shadow={'base'} bgColor={'blackAlpha.900'}>
        <Button variant={'unstyled'} color={'white'}>
            <Link to={'/'}>Home</Link>
        </Button>
        <Button variant={'unstyled'} color={'white'}>
            <Link to={'/exchange'}>Exchange</Link>
        </Button>
        <Button variant={'unstyled'} color={'white'}>
            <Link to={'/coin'}>Coins</Link>
        </Button>
    </HStack>
  )
}

export default Header