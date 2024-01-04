import React from 'react'
import Link from "next/link"
function DashCard({color,count,icon,title,lik}) {
  console.log(lik)
  return (
    <div className={`w-3/12 h-36 rounded-lg mx-2 my-2 shadow-lg flex flex-wrap  ${color}`}>
      <div className='w-1/2 h-3/4 pt-9 text-white'>
        <h2 className='mx-2 	'>{title} :</h2>
        <span className=' font-bold	 mx-6 text-lg'>{count}</span>
      </div>
      <div className='w-1/2 h-3/4 flex items-center justify-center text-white'>{icon}</div>
      <div className='w-full brightness-150	backdrop-brightness-75	rounded-md flex justify-between items-center text-white'>
      
        <div className='text-sm w-full text-right px-1'>
        <Link href={`${lik}`}>Details</Link>
           
        </div>

      </div>
    </div>
  )
}

export default DashCard