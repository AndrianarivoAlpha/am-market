import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { useState } from 'react'
import { BsFillCaretDownFill, BsFillCaretUpFill } from 'react-icons/bs'
import { formatCurrency, formatNumber } from '../utils/utilsFunctions'
import MiniGraph from './MiniGraph'

const TableCard = ( { coins, offSet, setOffSet, currency, setSearch, fetchCoins } ) =>
{
  const [ showSearch, setShowSearch ] = useState( false );
  const [ searchWord, setSearchWord ] = useState( '' );

  const previousPage = () =>
  {
    setOffSet( offSet - 50 );
    window.scrollTo( {
      top: 250,
      behavior: 'smooth'
    } );
  }
  const nextPage = () =>
  {
    setOffSet( offSet + 50 );
    window.scrollTo( {
      top: 250,
      behavior: 'smooth'
    } );
  }

  return (
    <div>
      <h1 className='text-3xl font-bold dark:text-gray-400 mt-5'>Cryptocurrency price list</h1>
      <p className=''>All cryptocurrencies ranked by market cap.</p>

      <div className='flex w-full justify-between my-5'>
        <div className='flex gap-2 text-xs'>
          <button type='button' className="inline-flex justify-center items-center py-1 px-2 font-[400] text-gray-500 bg-gray-50 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
            <span className="w-full">Favorites</span>
          </button>

          <button onClick={ () => { setSearch( '' ); fetchCoins()  }} type='button' className="inline-flex justify-center items-center py-1 px-2 font-[400] text-gray-500 bg-gray-50 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white">
            <span className="w-full">All cryptos</span>
          </button>

          <button type='button' className="inline-flex justify-center items-center py-1 px-2 font-[400] text-gray-500 bg-gray-50 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white">
            <span className="w-full">Best coins</span>
          </button>

          <button type='button' className="inline-flex justify-center items-center py-1 px-2 font-[400] text-gray-500 bg-gray-50 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white">
            <span className="w-full">New listing</span>
          </button>
        </div>
        {
          showSearch ? (
            <form
              onMouseLeave={ () => setShowSearch( false ) }
              onSubmit={ ( e ) => { e.preventDefault(); setSearch( searchWord ) } }
            >
              <label for="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300">Search</label>
              <div className="relative">
                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                  <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                </div>
                <input onChange={ ( e ) => setSearchWord( e.target.value ) } value={ searchWord } type="search" id="default-search" className="block pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search" required />
              </div>
            </form>
          ) : (
            <button onClick={ () => setShowSearch( true ) } type="button" className="text-gray-500 p-2 hover:text-blue-500  focus:outline-none font-medium dark:text-blue-500 dark:hover:text-white">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
              <span className="sr-only">Icon description</span>
            </button>
          )
        }
      </div>


      <div className='flex flex-col justify-center'>
        <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 capitalize bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="py-3 px-6">
                  #
                </th>
                <th scope="col" className="py-3 px-6">
                  Name
                </th>
                <th scope="col" className="py-3 px-6">
                  Price
                </th>
                <th scope="col" className="py-3 px-6">
                  Change
                </th>
                <th scope="col" className="py-3 px-6">
                  Market Cap
                </th>
                <th scope="col" className="py-3 px-6">
                  Volume(24H)
                </th>
                <th scope="col" className="py-3 px-6">
                  Last 7 days
                </th>
              </tr>
            </thead>
            <tbody>
              {
                coins && (
                  coins.map( ( coin ) =>
                  {
                    const uuid = coin.uuid;
                    const rank = coin.rank;
                    const iconUrl = coin.iconUrl;
                    const name = coin.name;
                    const symbol = coin.symbol;
                    const price = coin.price;
                    const change = coin?.change;
                    const marketCap = coin.marketCap;
                    const volume24h = coin?.[ '24hVolume' ];
                    const sparkline = coin.sparkline;

                    return (
                      <tr key={ uuid } className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          { rank }
                        </th>
                        <td>
                          <Link className="flex gap-2 py-4 px-6" href={ `/coin/${ uuid }` }>
                            <Image
                              src={ iconUrl }
                              height={ 20 }
                              width={ 20 }
                              priority
                              alt={ name }
                            />
                            <span className='font-semibold' >{ name }</span>
                            <span className={ `font-bold text-gray-300` }>{ symbol }</span>
                          </Link>

                        </td>
                        <td className="py-4 px-6">
                          { formatCurrency( price, currency ) }
                        </td>
                        <td className="py-4 px-6">
                          { change ? (
                            change?.includes( "-" ) ? (
                              <p className='flex items-center text-red-600 font-semibold' ><BsFillCaretDownFill />{ change.slice( 1, change.length ) }</p> ) : (
                              <p className='flex items-center text-green-500 font-semibold' ><BsFillCaretUpFill />{ change }</p>
                            ) 
                          ) : (
                            <p className='flex items-center text-red-600 font-semibold' >N/C</p>
                          )
                          }
                        </td>
                        <td className="py-4 px-6">
                          { marketCap ? ( formatCurrency( marketCap, currency ) ) : ( <p className='flex items-center text-red-600 font-semibold' >N/C</p> ) }
                        </td>
                        <td className="py-4 px-6">
                          { volume24h ? formatCurrency( volume24h, currency ) : ( <p className='flex items-center text-red-600 font-semibold' >N/C</p> ) }
                        </td>
                        <td className="h-1 py-4 px-6">
                          { 
                          sparkline ? <MiniGraph sparkline={ sparkline }  /> : <p className='flex items-center text-red-600 font-semibold'>N/C</p>
                          }
                        </td>
                      </tr>
                    )
                  } )
                )
              }
            </tbody>
          </table>
        </div>
        <div className="flex m-auto mt-2">
          { offSet > 0 &&
            (
              <button onClick={ () => previousPage() } type="button" className="inline-flex items-center py-2 px-4 mr-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                <svg aria-hidden="true" className="mr-2 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clip-rule="evenodd"></path></svg>
                Prev
              </button>
            )
          }
          <button onClick={ () => nextPage() } type="button" className="inline-flex items-center py-2 px-4 mr-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
            Next
            <svg aria-hidden="true" className="ml-2 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
          </button>
        </div>
      </div>
    </div>

  )
}

export default TableCard