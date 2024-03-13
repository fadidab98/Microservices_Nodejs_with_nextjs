import { useRouter } from 'next/router'
import React from 'react'

function LoadingCard() {
    const {locale} = useRouter()

  return (
    <>
      <div className='flex justify-center flex-wrap w-full m-2 shadow-sm animate-pulse' >
      <div className='max-sm:w-full sm:w-full md:w-2/5 lg:w-2/5 xl:w-2/5 h-64 relative '>
      {/* image */}
      <span className='absolute left-0 top-0 right-0 bottom-0 w-full h-full bg-slate-200'></span>
      </div>
      <div className={`max-sm:w-full sm:w-full md:w-3/5 lg:3/5  xl:w-3/5 flex flex-col items-start  shadow-lg ${locale=="ar"?" border-l-2 border-green-500 ":"border-r-2 border-green-500"}`}>
        <span className='text-2xl	font-semibold	 ml-2 p-1 bg-slate-200 w-20  py-3 m-2 rounded-md'>{/* price */}</span>
        <div className='flex m-2'>
         <span className='p-2 flex items-center'><span className='mx-2 p-3  bg-slate-200 rounded-md'></span> <span className='p-2  bg-slate-200 rounded-md'></span></span> 
         <span className='p-2 flex items-center'><span className='mx-2 p-3 bg-slate-200 rounded-md'></span> <span className='p-2  bg-slate-200 rounded-md'></span></span>
         <span className='p-2 flex items-center'><span className='mx-2 p-3 bg-slate-200 rounded-md'></span><span className='p-2  bg-slate-200 rounded-md'></span></span>  
         <span className='p-2 flex items-center'><span className='mx-2 p-3 bg-slate-200 rounded-md'></span><span className='p-2  bg-slate-200 rounded-md'></span></span>  


        </div>
        <span className='p-2  flex items-center'><span className='mx-2 p-3 px-6 bg-slate-200 rounded-md '></span> {/* salon */}</span>  
      <div className='mx-3 w-10/12 p-1 bg-slate-200'>{/* description */}</div>
      <div className='mx-3 my-1 w-9/12 p-1 bg-slate-200'>{/* description */}</div>
      <div className='mx-3 my-1 w-3/12 p-1 bg-slate-200'>{/* description */}</div>

      <div className=' flex items-center justify-between  text-white w-full my-4'>
        <button className='bg-green-600 rounded-md p-1 w-1/2 mx-3 bg-slate-200 p-3'>{/* Contact */}</button>
        <button className='bg-emerald-600 rounded-md p-1 w-1/2 mx-3 flex justify-center bg-slate-200 p-3'>{/* Add to Favoite */}</button>
        
        </div>
      </div>
   
    </div>
    
    </>
  
  )
}

export default LoadingCard
