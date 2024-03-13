import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import dynamic from 'next/dynamic';
import { updateInputState } from '@/Store/houseSlice';
import { useGetLocationQuery } from '@/Store/User/postApi';

const Select = dynamic(() => import('react-select'), { ssr: false });

function MainData(props) {
  const dispatch =useDispatch()
  const dynamicStates = useSelector((state) => state.house.house);

  const {data:location}=useGetLocationQuery()
  const locationOption= location?.data.map(loc=>{return {value:loc.id,label:loc.location}})
      const foundLocationOption = locationOption?.find(option => option.value === dynamicStates["location"]);

    const typeOption = [
        {value:"0",label:"For Sale"},
        {value:"1",label:"For Rent"},
      
       ]
       const foundTypeOption = typeOption.find(option => option.value ===dynamicStates["type"]);

       const options = [
        {value:"",label:"Select Status"},
        {value:"1",label:"Show"},
        {value:"0",label:"Hide"},
    
      ]
      const foundStatusOption = options.find(option => option.value === dynamicStates["status"]);

      const handleSelect=({data,select})=>{
      const  value= data.value
      console.log(select)
          dispatch(updateInputState({key:select,value:value}))

      }
    

  return (
    <div
    className="hidden opacity-0 transition-opacity duration-150 ease-linear data-[te-tab-active]:block w-full "
    id="main-Data"
    role="tabpanel"
    aria-labelledby="tabs-profile-tab01">
      <div className='flex flex-wrap w-full justify-center'>

     
   <div className='w-60 m-2'>
      <span className=''>Sale Status : </span>
      <Select onChange={(data)=>handleSelect({data:data,select:"type"})} defaultValue={foundTypeOption} className=' w-full rounded-md border-2 border-gray-200 focus:outline-offset-1 outline-green-300 focus:bg-white' options={typeOption}/>
    </div>
    <div className='w-60 m-2'>
      <span >Status : </span>
      <Select onChange={(data)=>handleSelect({data:data,select:"status"})} defaultValue={foundStatusOption} className=' w-full rounded-md border-2 border-gray-200 focus:outline-offset-1 outline-green-300 focus:bg-white' options={options}/>

    </div>
    <div className='w-60 m-2'>
      <span >Type : </span>
      <Select onChange={(data)=>handleSelect({data:data,select:"type"})} defaultValue={foundTypeOption} className=' w-full rounded-md border-2 border-gray-200 focus:outline-offset-1 outline-green-300 focus:bg-white' options={typeOption}/>
    </div>
    <div className='w-60 m-2'>
      <span >Category : </span>
      <Select onChange={(data)=>handleSelect({data:data,select:"type"})} defaultValue={foundTypeOption} className=' w-full rounded-md border-2 border-gray-200 focus:outline-offset-1 outline-green-300 focus:bg-white' options={typeOption}/>
    </div>
    <div className='w-60 m-2'>
      <span >Price : </span>
      <input type="number" name={`price`}  value={dynamicStates["price"]} required className=' bg-gray-50 w-full p-2 rounded-md border-2 border-gray-200 focus:outline-offset-1 outline-green-300 focus:bg-white'/>  
    </div>
   
    <div className='w-60 m-2'>
      <span >Location  : </span>
      <Select onChange={(data)=>handleSelect({data:data,select:"location"})} defaultValue={foundLocationOption} className=' w-full rounded-md border-2 border-gray-200 focus:outline-offset-1 outline-green-300 focus:bg-white' options={locationOption}/>
      </div>
    <div className='w-60 m-2'>
      <span >User : </span>
      <h2 className="text-lg p-2  pt-1"> {dynamicStates["email"]} </h2>
    </div>
  </div>
  </div>
  )
}

export default MainData
