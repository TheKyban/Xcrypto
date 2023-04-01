import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { server } from '../index'
import { Container, HStack, VStack, Image, Heading, Text } from '@chakra-ui/react'
import Loader from './Loader'
import ErrorComponent from './ErrorComponent'


function Exchange() {

  const [exchange, setExchange] = useState([])
  const [loading, setLoading] = useState(true);
  const [error, setErr] = useState(false);


  useEffect(() => {
    const fetchExchange = async () => {
      try {
        const { data } = await axios.get(`${server}/exchanges`)
        console.log(data)
  
        setExchange(data)
        setLoading(false)
        
      } catch (error) {
        setErr(true);
        setLoading(false)
      }
    }

    fetchExchange()
  }, [])
  if (error) return(
    <div>
      <ErrorComponent message={'Error While fetching Exchanges'}/>
    </div>
  );
  return (
    <Container maxW={'container.xl'}>
      {loading ? <Loader /> : (
        <>

          <HStack
            wrap={'wrap'}
            justifyContent={'space-evenly'}
            >
            {
              exchange.map(i => (
                <ExchageChard name={i.name} rank={i.trust_score_rank} url={i.url} image={i.image} key={i.id} />
              ))
            }
          </HStack>

        </>
      )}
    </Container>
  )
}


const ExchageChard = ({ name, image, rank, url }) => {
  return (
    <a href={url} target='blank'>
      <VStack
        w={'52'}
        h={"44"}
        shadow={'lg'}
        borderRadius={'lg'}
        transition={'all 0.3s'}
        m={'4'}
        css={{
          '&:hover': {
            transform: "scale(1.1)"
          }
        }}
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
      >
        <Image src={image} w={"10"} h={"10"} objectFit={'contain'} alt={name} />

        <Heading size={'md'} noOfLines={'1'}>{rank}</Heading>

        <Text noOfLines={"1"}>{name}</Text>
      </VStack>
    </a>
  )
}
export default Exchange