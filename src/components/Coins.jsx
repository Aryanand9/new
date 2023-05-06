import React, { useEffect, useState } from "react";
import axios from "axios";
import { server } from "../index";
import {
  Button,
  Container,
  HStack,
  Heading,
  Image,
  Radio,
  RadioGroup,
  Text,
  VStack,
  
} from "@chakra-ui/react";
import Loader from "./Loader";
import ErrorComponent from "./ErrorComponent";
import CoinCard from "./CoinCard";

const Coins = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const[error,setError] = useState(false)
  const [page,setPage] = useState(1)
  const[currency,setCurrency] = useState('inr')

  const CurrencySymbol = 
  currency === 'inr'? '₹' : currency === 'eur' ? '€' : '$'

  const changePage=(page)=>{
    setPage(page)
    setLoading(true)
  }
  const btns= new Array(132).fill(1)
  useEffect(() => {
    const fetchCoin = async () => {
      try {
        const { data } = await axios.get(`${server}/coins/markets?vs_currency=${currency}&page=${page}`);
        setCoins(data);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchCoin();
    console.log(coins)
    console.log('Runned')
  }, [currency,page]);
  if (error)
  return <ErrorComponent message={"Error While Fetching Coin"} />;

  return (
    <Container maxW={"container.xl"} >
      {loading ? 
        <Loader />
       : 
        <>
        <RadioGroup value={currency} onChange={setCurrency}>
          <HStack spacing={'4'}>
            <Radio value={"inr"}>₹</Radio>
            <Radio value={"eur"}>€</Radio>
            <Radio value={"usd"}>$</Radio>
          </HStack>
        </RadioGroup>
          <HStack wrap={"wrap"} justifyContent={'space-evenly'} >
            {coins.map((i) => 
               (
                <CoinCard
                  name={i.name}
                  image={i.image}
                  url={i.url}
                  key={i.id}
                  symbol={i.symbol}
                  id={i.id}
                  price={i.current_price}
                  currencySymbol={CurrencySymbol}
                />
              )
            )}
          </HStack>
          <HStack w={'full'} overflowX={'auto'} p={'8'} justifyContent={'space-evenly'}>
            {btns.map((item,index)=>(
              <Button
              key={index}
              bgColor={'blackAlpha.900'}
              color={'whiteAlpha.900'}
              onClick={()=>{changePage(index+1)}}
            >

            {index+1}
            </Button>))}

          </HStack>
        </>
      }
    </Container>
  );
};





export default Coins