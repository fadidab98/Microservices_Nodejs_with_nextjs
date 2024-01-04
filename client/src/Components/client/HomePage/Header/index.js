import Image from 'next/image'
import React, { useState } from 'react'

import dynamic from 'next/dynamic'
import LoadingFilter from '../../Loading/LoadingFilter'
const Filter = dynamic(() => import('../Filter/index'), { ssr: false,loading:()=> <LoadingFilter/> });
function index(props) {

  return (
    <header className='w-full h-screen relative bg-lime-400'>
        <Image src={"https://res.cloudinary.com/demo/image/fetch/f_auto/"+props.image}   fill alt="Image Error" priority   />
        <div className='absolute left-0 right-0 bottom-0 top-0 bg-lime-200 opacity-30 w-full z-20'></div>
        <Filter/>    </header>
  )
}

export default index