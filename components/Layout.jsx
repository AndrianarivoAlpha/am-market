import React from 'react'
import Footer from './Footer'
import Header from './Header'
import Navbar from './Navbar'
import Statistic from './Statistic'

const Layout = ( { children } ) =>
{
  return (
    <div>
      <Header />
      <Navbar />
      <Statistic />
      <main className='w-[95vw] flex flex-col m-auto'>
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default Layout