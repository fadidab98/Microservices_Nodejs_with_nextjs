import Layout from '@/Components/client/Layout'
import React from 'react'
import Head from 'next/head'
import { useSelector } from 'react-redux'

function register() {

  return (
    <Layout>
 <Head>


 </Head>
        <div className='w-full h-full relative pt-16 z-10 text-green-900'>
            <div className='absolute left-1/4 w-1/2  z-30   backdrop-blur-3xl bg-white/50 mt-20 mx-auto shadow-xl rounded-lg'>
            <h2 className='text-center mx-auto w-full text-xl mt-2'>Register</h2>
            <div className='w-full p-5 px-4 mt-1 flex justify-between flex-wrap mx-auto '>
          

              <div className=' w-1/2 p-3'>
              <label className='px-1'>Name :</label>
              <input type="text" className=' bg-gray-50 w-full p-2 rounded-md border-2 border-gray-200 focus:outline-offset-1 outline-green-300 focus:bg-white'/>  
              </div> 
              <div className=' w-1/2 p-3'>
              <label className='px-1'>Email :</label>
              <input type="text" className=' bg-gray-50 w-full p-2 rounded-md border-2 border-gray-200 focus:outline-offset-1 outline-green-300 focus:bg-white'/>  
              </div> 
              <div className=' w-1/2 p-3'>
              <label className='px-1'>Mobile :</label>
              <input type="text" className=' bg-gray-50 w-full p-2 rounded-md border-2 border-gray-200 focus:outline-offset-1 outline-green-300 focus:bg-white'/>  
              </div> 
              <div className=' w-1/2 p-3'>
              <label className='px-1'>Password :</label>
              <input type="text" className=' bg-gray-50 w-full p-2 rounded-md border-2 border-gray-200 focus:outline-offset-1 outline-green-300 focus:bg-white'/>  
              </div> 
                <button className='mx-auto border-2 border-green-800 px-2 py-1 rounded-md hover:bg-green-800 hover:text-white'>Register</button>
            </div>
                </div>
            <div className='absolute left-0  bottom-0 top-0 right-1/2 z-20 bg-green-800 min-h-screen'></div>

        </div>
    </Layout>
  )
}

export default register