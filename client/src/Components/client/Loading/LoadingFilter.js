import React from 'react'

function LoadingFilter() {
  return (
    <div className='absolute left-1/4 right-1/5   top-1/3 bg-green-800 opacity-80 w-1/2  z-50 p-7 rounded-xl'>

        <div className='flex flex-wrap  w-full justify-center'>
                    <div className='lg:w-48 md:w-60 sm:w-60 xs:w-60   m-2 z-20'>
                    <div className='w-full  h-full  z-20 animate-pulse bg-slate-200 rounded-md p-4'>
                        
                    </div>
                    </div>
                    <div className='lg:w-48 md:w-60 sm:w-60 xs:w-60  m-2'>
                    <div className='w-full  h-full  z-20 animate-pulse bg-slate-200 rounded-md  p-4'>
                    </div>            
                    </div>
                    <div className='lg:w-48 md:w-60 sm:w-60 xs:w-60  m-2'>
                    <div className='w-full  h-full  z-20 animate-pulse bg-slate-200 rounded-md  p-4'>
                    </div>   
                    </div>
                
                
                    <div className='lg:w-48 md:w-60 sm:w-60 xs:w-60 m-2 z-10'>
                    <div className='w-full  h-full  z-20 animate-pulse bg-slate-200 rounded-md  p-4'>
                    </div>
                    </div>
                    <div className='lg:w-48 md:w-60 sm:w-60 xs:w-60 m-2'>
                    <div className='w-full  h-full  z-20 animate-pulse bg-slate-200 rounded-md  p-4'>
                    </div>
                    </div>
                    <div className=' lg:w-48 md:w-60 sm:w-60 xs:w-60 m-2'>
                    <div className='w-full  h-full  z-20 animate-pulse bg-slate-200 rounded-md  p-4'>
                </div>            
                </div>
            
        </div>
    </div>
  )
}

export default LoadingFilter
