import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { server } from '../index'
import { Container, HStack, VStack, Image, Heading, Text, Button, RadioGroup, Radio } from '@chakra-ui/react'
import Loader from './Loader'
import ErrorComponent from './ErrorComponent'
import { Link } from 'react-router-dom'
function Coin() {

  const [coins, setCoins] = useState([])
  const [loading, setLoading] = useState(true);
  const [error, setErr] = useState(false);
  const [page, setPage] = useState(1);
  const [currency, setCurrency] = useState('inr');
  let currencySymbol = currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";

  const changePage = (page) => {
    setLoading(true)
    setPage(page);
  }


  const btns = new Array(110).fill(1);

  useEffect(() => {
    const fetchCoin = async () => {
      try {
        const { data } = await axios.get(`${server}/coins/markets?vs_currency=${currency}&per_page=100&page=${page}`)
        console.log(data)
        setCoins(data)
        setLoading(false)



      } catch (error) {
        setErr(true);
        setLoading(false)
      }
    }

    fetchCoin()
  }, [currency, page])
  if (error) return (
    <div>
      <ErrorComponent message={'Error While fetching Coins'} />
    </div>
  );
  return (
    <Container maxW={'container.xl'} >
      {loading ? <Loader /> : (
        <>

          <RadioGroup value={currency} onChange={setCurrency} p={'8'}>
            <HStack spacing={'4'}>
              <Radio value='inr'>INR</Radio>
              <Radio value='eur'>EURO</Radio>
              <Radio value='usd'>USD</Radio>
            </HStack>
          </RadioGroup>

          <HStack
            wrap={'wrap'}
            justifyContent={'space-evenly'}
          >
            {
              coins.map(i => (
                <CoinChard
                  currencySymbol={currencySymbol}
                  name={i.name}
                  symbol={i.symbol}
                  price={i.current_price}
                  image={i.image}
                  id={i.id}
                  key={i.id} />
              ))
            }
          </HStack>

          <HStack w={'full'} overflowX={'auto'}>

            {
              btns.map((item, index) => (
                <Button key={index} bgColor={'blackAlpha.900'} color={'white'} onClick={() => changePage(index + 1)}>{index + 1}</Button>
              ))
            }
          </HStack>

        </>
      )}
    </Container>
  )
}


const CoinChard = ({ name, id, image, currencySymbol, symbol, price }) => {
  return (
    <Link to={`/coin/${id}`}>
      <VStack
        w={'52'}
        h={'52'}
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

        <Heading size={'md'} textTransform={'uppercase'} noOfLines={'1'}>{symbol}</Heading>

        <Text noOfLines={"1"}>{name}</Text>
        <Text noOfLines={"1"}>{price ? `${currencySymbol}${price}` : `NA`}</Text>

      </VStack>
    </Link>
  )
}

export default Coin