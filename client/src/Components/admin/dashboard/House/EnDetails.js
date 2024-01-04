import { ChangeInput, updateInputState } from '@/Store/houseSlice';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

function EnDetails(props) {
  const dispatch = useDispatch();
    const dynamicStates = useSelector((state) => state.house.house);
    const handleInputs = (e)=>{
      dispatch(updateInputState({key:e.target.name,value:e.target.value}))
    }

  return (
    <div
    className="hidden opacity-100 transition-opacity duration-150 ease-linear data-[te-tab-active]:block"
    id="tabs-home01"
    role="tabpanel"
    aria-labelledby="tabs-home-tab01"
    data-te-tab-active>
    <div >
      <span>Title : </span>
      <input type="text" onChange={handleInputs} name="title"  value={dynamicStates.title} required className=' bg-gray-50 w-full p-2 rounded-md border-2 border-gray-200 focus:outline-offset-1 outline-green-300 focus:bg-white'/>  

    </div>
    <div>
      <span>Description : </span>
      <textarea  name={`description`} defaultValue={dynamicStates["description"]} required className=' bg-gray-50 w-full p-2 rounded-md border-2 border-gray-200 focus:outline-offset-1 outline-green-300 focus:bg-white'></textarea>  
    </div>
    <div>
      <span>Status : </span>
      <h2 className="text-lg p-2  pt-1">{props.data?.status?<span
  className="inline-block whitespace-nowrap rounded-[0.27rem] bg-primary-100 px-[0.65em] pb-[0.25em] pt-[0.35em] text-center align-baseline text-[0.75em] font-bold leading-none text-primary-700">
  Show
</span>:<span
  className="inline-block whitespace-nowrap rounded-[0.27rem] bg-danger-100 px-[0.65em] pb-[0.25em] pt-[0.35em] text-center align-baseline text-[0.75em] font-bold leading-none text-danger-700">
  Hidden
</span>}</h2>
    </div>
  </div>
  )
}

export default EnDetails
