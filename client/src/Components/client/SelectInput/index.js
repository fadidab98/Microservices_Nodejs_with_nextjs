import React from 'react'
import { RiArrowDownSLine } from 'react-icons/ri'
function index({select}) {
  return (
    <div className='relative  w-full rounded-md p-3 bg-white flex justify-between items-center '>
        <p>{select}</p>
        <RiArrowDownSLine/>

        
    </div>
  )
}

export default index