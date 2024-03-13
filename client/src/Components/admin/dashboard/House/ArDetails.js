import React from 'react'
import { useSelector } from 'react-redux';

function ArDetails(props) {
    const dynamicStates = useSelector((state) => state.house.house);

  return (
    <div
    className="hidden opacity-0 transition-opacity duration-150 ease-linear data-[te-tab-active]:block"
    id="tabs-profile01"
    role="tabpanel"
    aria-labelledby="tabs-profile-tab01">
   <div >
      <span>Title : </span>
      <input type="text" name={`title`}  value={dynamicStates['ar_title']} required className=' bg-gray-50 w-full p-2 rounded-md border-2 border-gray-200 focus:outline-offset-1 outline-green-300 focus:bg-white'/>  
    </div>
    <div>
      <span>Description : </span>
      <textarea  name={`ar_description`} defaultValue={dynamicStates['ar_description']}  required className=' bg-gray-50 w-full p-2 rounded-md border-2 border-gray-200 focus:outline-offset-1 outline-green-300 focus:bg-white'></textarea>  
    </div>
  </div>
  )
}

export default ArDetails
