import Layout from '@/Components/client/Layout'
import Head from 'next/head'
import React from 'react'
import AboutUs from "@/Components/client/AboutUs"
function Index() {
  return (
    <Layout>
    <Head>
      <title>Al Wadi House</title>

    </Head>
    <AboutUs/>
</Layout>
  )
}

export default Index