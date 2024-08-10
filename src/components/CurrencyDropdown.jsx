import React from 'react'
import {HiOutlineStar, HiStar} from "react-icons/hi2";

const CurrencyDropdown = ({
  currencies,
  currency,
  setCurrency,
  favourites,
  handleFavourites,
  title = ""
}) => {
  const isFavourite = curr => favourites.includes(curr)
  
  return (
    <div className='mt-1 relative'>
      <label className='block text-sm font-medium text-gray-700 mb-3' htmlFor={title}>{title}</label>
      <div className='relative'>
        <select
        value={currency}
        onChange={(e) => setCurrency(e.target.value)}
         className='w-full bg-gray-300 p-2 pr-10 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500'>
          {favourites.map((currency) => {
            return (
              <option className="bg-gray-200" value={currency} key={currency}>
                {currency}
              </option>
            );
          })}

          <hr />

        {currencies 
         .filter((c) => !favourites.includes(c))
         .map((currency) => {
          return(
          <option value={currency} key={currency}>
            {currency}
          </option>
          );
       
        })}
        </select>
        <button 
        onClick={() => {handleFavourites(currency)}}
        className="absolute inset-y-0 right-4 flex items-center px-3 ${isFavourite(currency) ? 'text-blue-500' : 'text-gray-500'}`}">  {isFavourite(currency) ? <HiStar /> : <HiOutlineStar />}</button>
        </div>
    </div>
  )
}

export default CurrencyDropdown