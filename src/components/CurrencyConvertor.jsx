import React, { useEffect } from 'react'
import { useState } from 'react'
import CurrencyDropdown from './CurrencyDropdown';
import {HiArrowsRightLeft} from "react-icons/hi2";

export const CurrencyConvertor = () => {
  const [currencies , setCurrencies] = useState([]);
  const[amount , setAmount] = useState(1);

  const[currencyFrom , setCurrencyFrom] = useState("USD");
  const[currencyTo , setCurrencyTo] = useState("INR");
  const [convertedAmount, setconvertedAmount] = useState(null)
  const [converting, setconverting] = useState(false)
  const [favourites, setFavourites] = useState(JSON.parse(localStorage.getItem("favourites")) || ["INR" , "EUR"])

    // currencies -> 'https://api.frankfurter.app/currencies'
    // Conversion -> 'https://api.frankfurter.app/latest?amount=1&from=USD&to=INR'
  
  const fetchCurrencies = async () => {
    try {
      const res = await fetch('https://api.frankfurter.app/currencies')
      const data = await res.json();

      setCurrencies(Object.keys(data));
    } 
    catch(error){
      console.log("error fetching" , error);
    }
  }
  useEffect(() => {
    fetchCurrencies();
  },[])

  console.log(currencies)

  const currencyConvert = async () => {
    if(!amount){
      return
    }
    setconverting(true);
    try {
      const res = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${currencyFrom}&to=${currencyTo}`)
      const data = await res.json();

     setconvertedAmount(data.rates[currencyTo] + ' ' + currencyTo);
    } 
    catch(error){
      console.log("error fetching" , error);
    }
    finally{
      setconverting(false);
    }
  }

  const handleFavourites = (currency) => {
    let updatedFavourites = [...favourites]
    if(favourites.includes(currency)){
      updatedFavourites = updatedFavourites.filter((fav) => fav !== currency)
    }
    else{
      updatedFavourites.push(currency);
    }
    setFavourites(updatedFavourites)
    localStorage.setItem("favourites" , JSON.stringify(updatedFavourites));

  }

  const swapCurrencies = () => {
    setCurrencyFrom(setCurrencyTo)
    setCurrencyTo(setCurrencyFrom)
  }
  return (
    <div className="min-h-screen flex items-center justify-center" style={{backgroundImage: 'linear-gradient(to top, #1e3c72 0%, #1e3c72 1%, #2a5298 100%)'}}>
      <div className='max-w-xl w-full mx-auto my-10 p-5 bg-white rounded-lg shadow-md'>
        <h2 className='mb-5 text-2xl font-bold text-black-500 text-center'>Currency Convertor</h2>
        <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 items-end'>
          <CurrencyDropdown 
          currencies={currencies} 
          favourites={favourites}
          title="From : " 
          currency={currencyFrom}
          setCurrency={setCurrencyFrom}
          handleFavourites={handleFavourites}/>
          
          <div className='flex justify-center -mb-5 sm:mb-0'>
            <button onClick={swapCurrencies} className='p-2 bg-gray-200 rounded-full cursor-pointer hover:bg-gray-300'><HiArrowsRightLeft className='text-xl text-gray-700'/></button>
          </div>

          <CurrencyDropdown 
          favourites={favourites}
          currencies={currencies} 
          title='To : ' 
          currency={currencyTo}
          setCurrency={setCurrencyTo}
          handleFavourites={handleFavourites}/>

        </div>

        <div>
          <label htmlFor="amount" className='block text-sm font-medium text-gray-700 mt-6 mb-3'>Amount : </label>
          <input type="number" 
          className='w-full p-2 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500'
          value={amount}
          onChange={(e) => setAmount(e.target.value)} />
        </div>
        <div className='flex justify-center mt-6'>
          <button onClick={currencyConvert} 
          className={`px-5 py-2 mt-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${converting ? "animate-pulse" : ""}`}>Convert</button>
        </div>
        {convertedAmount && ( <div className='mt-4 text-lg font-medium text-green-600 text-center'>Converted amount : {convertedAmount}</div>)}
      
      </div>
    </div>

    
    
  )
}
