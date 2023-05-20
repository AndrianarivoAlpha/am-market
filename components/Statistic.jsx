import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { fetchData, options } from '../utils/fetchData';
import { formatCurrency, formatNumber } from '../utils/utilsFunctions';


const Statistic = () => {
  const [statsData, setStatsData] = useState({});
  const [isFetched, setIsFetched] = useState(false);

  const fetchStats = async () => {
    const statUrl = 'https://coinranking1.p.rapidapi.com/stats?referenceCurrencyUuid=yhjMzLPhuIDl'
    const { data } = await fetchData(statUrl, options);

    if (data) {
      setStatsData(data)
      setIsFetched(true)
    }
  }

  useEffect(() => {
    fetchStats();
    const interval = setInterval(() => {
      fetchStats();
    }, 1000 * 60)
  }, [])

  const { total24hVolume, totalExchanges, totalCoins, totalMarketCap, totalMarkets, btcDominance } = statsData;
  const formatTotal24hVolume = formatCurrency(total24hVolume, 'USD');
  const formatTotalExchanges = formatNumber(totalExchanges);
  const formatTotalCoins = formatNumber(totalCoins);
  const formatTotalMarketCap = formatCurrency(totalMarketCap, 'USD');
  const formatTotalMarkets = formatNumber(totalMarkets);
  const formatBtcDominance = formatNumber(btcDominance);

  return (
    <>
      <div className='my-1 text-gray-500 py-5 flex xs:hidden gap-2 justify-between border-gray-200 w-[200]'>
        {
          isFetched &&
          <div className="flex lg:flex-nowrap flex-wrap text-xs font-semibold gap-2 justify-center m-auto">
            <div className='flex bg-slate-200 p-2 rounded-xl items-center border'>
              <p>New coin</p>
              <div className='flex items-center'>
                {
                  statsData.newestCoins.map((coin) => (
                    <Link
                      href={`/coin/${coin.uuid}`}
                      key={coin.uuid}
                      className="dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600 p-1"
                    >
                      <Image
                        priority
                        height={30}
                        width={30}
                        alt=''
                        src={coin.iconUrl}
                        className='rounded'
                      />
                    </Link>
                  ))
                }
              </div>
            </div>

            <div className='flex bg-slate-200 p-2 rounded-xl items-center border'>
              <p>Best </p>
              <div className='flex items-center'>
                {
                  statsData.bestCoins.map((coin) => (
                    <Link
                      key={coin.uuid}
                      className="dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600 p-1"
                      href={`/coin/${coin.uuid}`}
                    >
                      <Image
                        priority
                        height={30}
                        width={30}
                        alt=''
                        src={coin.iconUrl}
                        className='rounded'
                      />
                    </Link>
                  ))
                }
              </div>
            </div>

            <p className='flex flex-col bg-slate-200 p-2 rounded-xl items-start border' >
              Coins <span className='text-blue-600 mx-1 font-semibold'> {formatTotalCoins}</span>
            </p>
            <p className='flex flex-col bg-slate-200 p-2 rounded-xl items-start border'>
              24H Trading volume: <span className='text-blue-600 mx-1 font-semibold'> {formatTotal24hVolume}</span>
            </p>
            <p className='flex flex-col bg-slate-200 p-2 rounded-xl items-start border'>
              Market Cap <span className='text-blue-600 mx-1 font-semibold'> {formatTotalMarketCap}</span>
            </p>
            <p className='flex flex-col bg-slate-200 p-2 rounded-xl items-start border'>
              Bitcoin<span className='text-blue-600 mx-1 font-semibold'> {formatBtcDominance}%</span>
            </p>
          </div>
        }
      </div>
    </>
  )
}
export default Statistic