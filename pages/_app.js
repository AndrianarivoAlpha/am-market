import '../styles/globals.css'
import 'tailwindcss/tailwind.css'
import Layout from '../components/Layout'
import { useState } from 'react'

const MyApp = ( { Component, pageProps } ) =>
{
  return (
    <Layout text = "caca" currency={"USD"}>
      <Component { ...pageProps } />
    </Layout>
  )
}

export default MyApp