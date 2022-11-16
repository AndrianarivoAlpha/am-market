import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { fetchData, options } from '../utils/fetchData';
import { formatCurrency, formatNumber } from '../utils/utilsFunctions';


const Statistic = () =>
{
  const [ statsData, setStatsData ] = useState( {} );
  const [ isFetched, setIsFetched ] = useState( false );

  const fetchStats = async () =>
  {
    const statUrl = 'https://coinranking1.p.rapidapi.com/stats?referenceCurrencyUuid=yhjMzLPhuIDl'
    const { data } = await fetchData( statUrl, options );

    if ( data )
    {
      setStatsData( data )
      setIsFetched( true )
    }
  }

  useEffect( () =>
  {
    fetchStats();
    const interval = setInterval( () =>
    {
      fetchStats();
    }, 1000 * 60 )
  }, [] )

  const { total24hVolume, totalExchanges, totalCoins, totalMarketCap, totalMarkets, btcDominance } = statsData;
  const formatTotal24hVolume = formatCurrency( total24hVolume, 'USD' );
  const formatTotalExchanges = formatNumber( totalExchanges );
  const formatTotalCoins = formatNumber( totalCoins );
  const formatTotalMarketCap = formatCurrency( totalMarketCap, 'USD' );
  const formatTotalMarkets = formatNumber( totalMarkets );
  const formatBtcDominance = formatNumber( btcDominance );

  return (
    <div>
      <div className='text-gray-500 bg-white flex sm:flex-wrap items-center xs:hidden gap-2 justify-between border-gray-200 '>
        { isFetched &&
          <div className="flex text-xs font-semibold gap-2">
            <div className="flex gap-2">
              <p>New</p>
              {
                statsData.newestCoins.map( ( coin ) => (
                  <div key={ coin.uuid } className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <Link
                      href={ `/coin/${ coin.uuid }` }
                      className="flex gap-2"
                    >
                      <Image
                        priority
                        height={ 15 }
                        width={ 15 }
                        alt=''
                        src={ coin.iconUrl }
                        className='rounded'
                      />
                    </Link>
                  </div>
                ) )
              }
              <p>Best :</p>
              {
                statsData.bestCoins.map( ( coin ) => (
                  <Link
                    key={ coin.uuid }
                    className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600"
                    href={ `/coin/${ coin.uuid }` }
                  >
                    <Image
                      priority
                      height={ 15 }
                      width={ 15 }
                      alt=''
                      src={ coin.iconUrl }
                      className='rounded'
                    />
                  </Link>
                ) )
              }
            </div>
            <p className='flex' >
              Coins: <span className='font-[500] text-blue-600 mx-1'> { formatTotalCoins }</span>
            </p>
            <p className='flex'>
              24H: <span className='font-[500] text-blue-600 mx-1'> { formatTotal24hVolume }</span>
            </p>
            <p className='flex'>
              Cap: <span className='font-[500] text-blue-600 mx-1'> { formatTotalMarketCap }</span>
            </p>
            <p className='flex'>
              <span className='font-[500] text-blue-600 mx-1'> BTC: { formatBtcDominance }%</span>
            </p>
          </div>
        }
      </div>
    </div>

  )
}

export default Statistic