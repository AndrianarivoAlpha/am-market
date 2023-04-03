import React, { useState } from 'react'
import Image from 'next/image';
import Link from 'next/link';
import Hamburger from 'hamburger-react'

import Logo from "../public/logo.png"
import Statistic from './Statistic';

const Navbar = () => {

  const [isOpen, setOpen] = useState(false)

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900 flex items-center justify-between p-5">
      <div className="lg:hidden flex">
        <Hamburger toggled={isOpen} toggle={setOpen} />
      </div>
      <Link href="/" className="flex items-center">
        <p className="self-center text-2xl font-bold dark:text-white flex items-center">A&M<span className='bg-red-500 uppercase text-sm text-white px-1 -mt-5'>Market</span></p>
      </Link>
      <div className="lg:flex hidden gap-5 items-center">
        <h1 className='capitalize font-bold '>cryptocurrencies</h1>
        <h1 className='capitalize font-bold'>Markets</h1>
      </div>
      <div className='lg:flex hidden items-center gap-5'>
        <h1 className='p-1 bg-slate-200 font-semibold rounded-lg'>USD</h1>
        <Link href={"/register"}>
          REGISTER
        </Link>
      </div>

    </nav>
  )
}

export default Navbar