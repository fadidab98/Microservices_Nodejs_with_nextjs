import React from 'react'

function LoadingAboutUs() {
  return (
    <div className='absolute left-0 right-0 top-0 bottom-0 w-full h-full z-20 pt-16 animate-pulse'>
    <h1 className='text-white text-4xl text-center mt-10 bg-slate-200 p-4 mx-auto w-20 rounded-md'></h1>
    <div className='max-sm:w-11/12 sm:w-11/12 md:w-11/12 w-3/4 mx-auto  opacity-90  bg-green-950 rounded-lg   drop-shadow-xl text-white mt-10 p-4' >
    <div className='relative max-sm:w-full  sm:w-full  md:w-full  lg:w-96 h-96 rounded-lg float-right max-sm:mx-auto max-sm:mb-4 sm:mx-auto sm:mb-4 md:mx-auto lg:m-4 '>
            {/* Image */} <div className='w-full h-full bg-slate-200 rounded-md'></div>
        </div>
        <p className='w-4/6 text-lg bg-slate-200 p-2 px-6  m-1 rounded-md mt-28'></p>
        <p className='w-4/6 text-lg bg-slate-200 p-2 px-6  m-1 rounded-md'></p>
        <p className='w-4/6 text-lg bg-slate-200 p-2 px-6  m-1 rounded-md'></p>
        <p className='w-3/6 text-lg bg-slate-200 p-2 px-6  m-1 rounded-md'></p>
        <p className='w-2/6 text-lg bg-slate-200 p-2 px-6  m-1 rounded-md'></p>
        <p className='w-1/6 text-lg bg-slate-200 p-2 px-6  m-1 rounded-md mb-36'></p>

       

    </div>

  </div>
  )
}

export default LoadingAboutUs
