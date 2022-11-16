import Image from 'next/image';
import { useRouter } from 'next/router'
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import Graph from '../../components/Graph'
import { fetchData, options } from '../../utils/fetchData';
import { formatCurrency, formatNumber, timeConverter } from '../../utils/utilsFunctions';
import { AiOutlineCaretDown, AiOutlineCaretUp } from 'react-icons/ai';

const url = "https://coinranking1.p.rapidapi.com/coins?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h&tiers%5B0%5D=1&orderBy=marketCap&orderDirection=desc&limit=50&offset=0";

const Detail = ( ) =>
{
  const router = useRouter();
  const id = router.query.detail;

  console.log(id)

  const [ updatedCoin, setUpdatedCoin ] = useState( {} )
  const [isFetched, setIsFetched] = useState(false)

  const getCoinDetail = async () =>
  {
    if ( id )
    {
      const { data } = await fetchData( `https://coinranking1.p.rapidapi.com/coin/${id}?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h`, options )
      console.log( data );

      if ( data )
      {
        setUpdatedCoin( data.coin )
        setIsFetched(true)
      }
    }
  }

  useEffect( () =>
  {
    getCoinDetail()
    const interval = setInterval( () =>
    {
      getCoinDetail();
    }, 1000 * 60 )
  }, [ id ] )

  const { description, sparkline, iconUrl, name, symbol, rank, price, color, change, btcPrice, marketCap, allTimeHigh, links, numberOfMarkets, numberOfExchanges } = updatedCoin;


  return(
    <>
      { isFetched && 
        <div>
          <div className='flex justify-between items-center'>
            <div className='flex items-center gap-2'>
              <div className='flex items-center gap-1'>
                <Image
                  src={ iconUrl }
                  height={ 30 }
                  width={ 30 }
                  alt={ name }
                  priority
                />
                <p className='gap-1 flex font-semibold'>{ name } <span className='text-gray-300'>{ symbol }</span></p>
              </div>
              <p className='bg-gray-200 rounded px-1 font-[200]' >Rank : <span className='font-semibold'>#{ rank }</span></p>
              <p className='flex gap-2 font-semibold pl-5'>
                { formatCurrency( price, 'USD' ) }
                {
                  change.includes( '-' ) ? (
                    <span className='bg-red-600 font-[400] text-sm text-white px-1 rounded flex items-center'>
                      <AiOutlineCaretDown  />
                      { change.slice(1, change.length) }
                    </span>
                  ) : (
                      <span className='bg-blue-600 font-[400] text-sm text-white px-1 rounded flex items-center'>
                        <AiOutlineCaretUp />
                        { change }
                      </span>
                  )
                }
              </p>
            </div>
            <div>
              <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option selected>24h</option>
                <option value="7d">7 days</option>
                <option value="30d">30 days</option>
              </select>
            </div>
          </div>
          <div>
            <Graph sparkline={ sparkline } color={ color } />
          </div>
          <div className='flex flex-row-reverse items-start gap-5 mt-10 xs:flex-col'>
            <div>
              <h1 className='text-3xl text-gray-400 font-bold'>Links</h1>
              <p>
                An overview showing the statistics of Bitcoin, such as the base and quote currency, the rank, and trading volume.
              </p>

              <div className="overflow-x-auto relative shadow-md sm:rounded-lg mt-10">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 bg-slate-600">
                  <tbody>
                    {
                      links.map( ( link ) => (
                        <tr key={link} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                          <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {link.name}
                          </th>
                          <td className="py-4 px-6 font-semibold">
                            <a href={ link.url } target='_blank' rel='noreferrer' className="font-medium text-blue-600 underline dark:text-blue-500 hover:no-underline">{link.url}</a>
                          </td>
                        </tr>
                      ) )
                    }
                    
                  </tbody>
                </table>
              </div>

            </div>
            <div>
              <h1 className='text-3xl text-gray-400 font-bold'>Value statistics</h1>
              <p>
                An overview showing the statistics of Bitcoin, such as the base and quote currency, the rank, and trading volume.
              </p>

              <div className="overflow-x-auto relative shadow-md sm:rounded-lg mt-10">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <tbody>
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        Price to USD
                      </th>
                      <td className="py-4 px-6 font-semibold">
                        { formatCurrency( price, 'USD' ) }
                      </td>
                    </tr>

                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        Price to BTC
                      </th>
                      <td className="py-4 px-6 font-semibold">
                        { formatNumber( btcPrice ) } BTC
                      </td>
                    </tr>

                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        Rank
                      </th>
                      <td className="py-4 px-6 font-semibold">
                        { rank }
                      </td>
                    </tr>

                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        24h Volume
                      </th>
                      <td className="py-4 px-6 font-semibold">
                        { updatedCoin?.[ '24hVolume' ] }
                      </td>
                    </tr>

                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        Market cap
                      </th>
                      <td className="py-4 px-6 font-semibold">
                        { formatCurrency( marketCap, 'USD' ) }
                      </td>
                    </tr>

                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        All-time high
                      </th>
                      <td className="py-4 px-6 font-semibold flex flex-col">
                        { formatCurrency( allTimeHigh.price, 'USD' ) }
                        <span className='font-[200] text-xs'>{ timeConverter( allTimeHigh.timestamp ) }</span>
                      </td>
                    </tr>

                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        Markets
                      </th>
                      <td className="py-4 px-6 font-semibold">
                        { formatNumber( numberOfMarkets ) }
                      </td>
                    </tr>
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        Exchanges
                      </th>
                      <td className="py-4 px-6 font-semibold">
                        { formatNumber( numberOfExchanges ) }
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      }
    </>
    
  )
}

export default Detail