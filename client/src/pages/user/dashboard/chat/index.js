import Layout from '@/Components/client/Layout'
import UserNav from '@/Components/client/UserNav/UserNav'
import React from 'react'

function index() {
  return (
    <Layout>
    <div className='pt-16'>
        <UserNav/>
        <div className='p-4 relative w-11/12 mx-auto m-2'>
          <h1 className='text-lg text-green-900'>Chat</h1>
          <span className='absolute left-0 top-0 bottom-0 w-1 bg-green-700 h-14 rounded-md'></span>
        </div>
    </div>
    </Layout>
  )
}

export default index
