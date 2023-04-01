import { Box, Image, Container, HStack, Radio, RadioGroup, Text, VStack, Stat, StatLabel, StatNumber, StatHelpText, StatArrow, Badge, Progress, Button } from '@chakra-ui/react'
import React, { useState, useEffect } from 'react'
import Loader from './Loader';
import { server } from '../index';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import ErrorComponent from './ErrorComponent';
import Chart from './Chart';

function CoinDetails() {

  const params = useParams()
  const [coins, setCoins] = useState({})
  const [loading, setLoading] = useState(true);
  const [error, setErr] = useState(false);
 
  const [currency, setCurrency] = useState('inr');
  const [days, setDays] = useState('24h');
  const [chartArray, setChartArray] = useState([]);
  let currencySymbol = currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";


const btns = ['24h','7d','14d','30d','60d','200d','365d','max']
const switchChartStat = (key) => {
  switch (key) {
    case '7d':
      setDays('7d')
      setLoading(true)
      break;
    case '14d':
      setDays('14d')
      setLoading(true)
      break;
    case '30d':
      setDays('30d')
      setLoading(true)
      break;
    case '60d':
      setDays('60d')
      setLoading(true)
      break;
    case '200d':
      setDays('200d')
      setLoading(true)
      break;
    case '365d':
      setDays('365d')
      setLoading(true)
      break;
    case 'max':
      setDays('max')
      setLoading(true)
      break;
  
    default:
      setDays('24h')
      setLoading(true)
      break;
  }
}

  useEffect(() => {
    const fetchCoin = async () => {
      try {
        const { data } = await axios.get(`${server}/coins/${params.id}`)
        const {data:chartData} = await axios.get(`${server}/coins/${params.id}/market_chart?vs_currency=${currency}&days=${days}`)
        // console.log(data)
        setCoins(data)
        setLoading(false)

        setChartArray(chartData.prices)
        // console.log(chartData)

      } catch (error) {
        setErr(true);
        setLoading(false)
      }
    }

    fetchCoin()
  }, [params.id,currency,days])

  if (error) return (<div><ErrorComponent message={'Error While fetching Coin details'} /></div>);

  return (

    <Container maxW={'container.xl'}>
      {
        loading ? <Loader /> : (

          <>

            <Box width={'full'} borderWidth={1}>
              <Chart currency={currencySymbol}
              arr={chartArray}
              days={days}
              />
            </Box>

            {/* Button */}
            <HStack p={'4'} overflowX={'auto'}>
            {
              btns.map(i=>(
                <Button key={i} onClick={()=>switchChartStat(i)}>{i}</Button>
              ))
            }
            </HStack>

            <RadioGroup value={currency} onChange={setCurrency} p={'8'}>
              <HStack spacing={'4'}>
                <Radio value='inr'>INR</Radio>
                <Radio value='eur'>EURO</Radio>
                <Radio value='usd'>USD</Radio>
              </HStack>
            </RadioGroup>

            <VStack spacing={'4'} p={'16'} alignItems={'flex-start'}>

              <Text fontSize={'small'} alignSelf={'center'}>
                Last Updated on {Date(coins.last_updated).split('G')[0]}
              </Text>

              <Image src={coins.image.large} w={'16'} h={'16'} objectFit={'contain'} />

              <Stat>
                <StatLabel>{coins.name}</StatLabel>
                <StatNumber>{currencySymbol}{coins.market_data.current_price[currency]}</StatNumber>
                <StatHelpText>
                  <StatArrow type={coins.market_data.price_change_percentage_24h > 0 ? 'increase' : 'decrease'} />
                  {coins.market_data.price_change_percentage_24h}%
                </StatHelpText>
              </Stat>


              <Badge fontSize={'2xl'} bgColor={'blackAlpha.800'} color={'white'}>{`#${coins.market_cap_rank}`}</Badge>

              <CustomBar high={`${currencySymbol}${coins.market_data.high_24h[currency]}`} low={`${currencySymbol}${coins.market_data.low_24h[currency]}`} />

              <Box w={'full'} p={'4'}>
                <Item title={'Max Supply'} value={coins.market_data.max_supply}/>
                <Item title={'Circulating Supply'} value={coins.market_data.circulating_supply}/>
                <Item title={'market Cap'} value={`${currencySymbol}${coins.market_data.market_cap[currency]}`}/>
                <Item title={'All Time Low'} value={`${currencySymbol}${coins.market_data.market_cap[currency]}`}/>
                <Item title={'All Time Low'} value={`${currencySymbol}${coins.market_data.atl[currency]}`}/>
                <Item title={'All Time High'} value={`${currencySymbol}${coins.market_data.ath[currency]}`}/>
              </Box>
            </VStack>
          </>
        )
      }
    </Container>
  )
}

const Item = ({title,value}) => {
  return (

    <HStack justifyContent={'space-between'} w={'full'} my={'4'}>
    <Text fontFamily={'Bebas Neue'} letterSpacing={'widest'}>{title}</Text>
    <Text>{value}</Text>
  </HStack>
    )
}

const CustomBar = ({ low, high }) => {
  return (
    <VStack w={'full'}>
      <Progress value={50} colorScheme='teal' w={'full'} />
      <HStack justifyContent={'space-between'} w={'full'}>

        <Badge children={low} colorScheme={'red'} />
        <Text fontSize={'sm'}>24H Range</Text>
        <Badge children={high} colorScheme={'green'} />
      </HStack>
    </VStack>
  )
}

export default CoinDetails