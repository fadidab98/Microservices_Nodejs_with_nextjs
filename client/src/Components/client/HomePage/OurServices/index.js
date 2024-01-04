import React from 'react'
import  { BsFillHouseCheckFill, BsFillHouseDashFill} from "react-icons/bs"
import { FaLayerGroup } from 'react-icons/fa'
function Index(props) {
  return (
    <section className='w-12/12  min-h-96 pb-10 mx-auto'>
        <h1 className='w-full text-2xl  text-center py-14 mt-24 '>The <span className='text-lime-600'>Services</span>  You Get From <span className='text-lime-600'>Al-Wadi</span>  </h1>
        <div className='w-full min-h-96 flex justify-center items-center flex-wrap text-center my-16'>
        <div className="xl:w-3/12 lg:w-3/12 md:w-6/12 sm:w-12/12 xs:w-12/12 flex flex-col h-auto m-10 bg-lime-800 text-white rounded-lg shadow-2xl shadow-lime-800/50 hover:opacity-90">
            <div className='flex flex-col items-center justify-center mt-4  '><BsFillHouseCheckFill size={70} className=' rounded-full bg-lime-900 m-2 p-4'/><h2 className='text-xl'>{props.data.service_one_title}</h2></div>
            <div className='p-2 break-words	text-lg w-8/12 mx-auto'>sdsdsssssssssssssssssssssssssssssd sdsds dsd sdsdsdsd sd sdsdsdsd sdsdsds</div>
        </div>
        <div className="xl:w-3/12 lg:w-3/12 md:w-6/12 sm:w-12/12 xs:w-12/12 flex flex-col h-auto m-10 bg-lime-800 text-white rounded-lg shadow-2xl shadow-lime-800/50 hover:opacity-90">
            <div className='flex flex-col items-center justify-center mt-4'><BsFillHouseDashFill size={70} className=' rounded-full bg-lime-900 m-2 p-4'/><h2 className='text-xl'>{props.data.service_two_title}</h2></div>
            <div className='p-2 break-words	text-lg w-8/12 mx-auto'>sdsdsssssssssssssssssssssssssssssd sdsds dsd sdsdsdsd sd sdsdsdsd sdsdsds</div>
        </div>
        <div className="xl:w-3/12 lg:w-3/12 md:w-6/12 sm:w-12/12 xs:w-12/12 flex flex-col h-auto m-10 bg-lime-800 text-white rounded-lg shadow-2xl shadow-lime-800/50 hover:opacity-90">
            <div className='flex flex-col items-center justify-center mt-4'><FaLayerGroup size={70} className=' rounded-full bg-lime-900 m-2 p-4'/><h2 className='text-xl'>{props.data.service_three_title}</h2></div>
            <div className='p-2 break-words	text-lg w-8/12 mx-auto'>sdsdsssssssssssssssssssssssssssssd sdsds dsd sdsdsdsd sd sdsdsdsd sdsdsds</div>

        </div>
        </div>
    </section>
  )
}

export default Index 