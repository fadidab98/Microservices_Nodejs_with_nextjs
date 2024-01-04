import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import dynamic from 'next/dynamic';
import { updateInputState } from '@/Store/houseSlice';

const Select = dynamic(() => import('react-select'), { ssr: false });
function Rooms(props) {
  const dispatch=useDispatch()
  const dynamicStates = useSelector((state) => state.house.house);


  const floorOption = [
    {value:"0",label:"Ground Floor"},
    {value:"1",label:"1"},
    {value:"2",label:"2"},
    {value:"3",label:"3"},
    {value:"4",label:"4"},
    {value:"5",label:"5"},
    {value:"6",label:"6"},
    {value:"7",label:"7"},
   ]
   const foundFloorOption = floorOption.find(option => option.value ===dynamicStates["floor"]);

   const kitchenOption = [
    {value:"1",label:"1"},
    {value:"2",label:"2"},
    {value:"3",label:"3"},
    {value:"4",label:"4"},
    {value:"5",label:"5"},
    {value:"6",label:"6"},
    {value:"7",label:"7"},
   ]
   const foundKitchenOption = kitchenOption.find(option => option.value ===dynamicStates["kitchen"]);

   const SalonOption = [
    {value:"1",label:"1"},
    {value:"2",label:"2"},
    {value:"3",label:"3"},
    {value:"4",label:"4"},
    {value:"5",label:"5"},
    {value:"6",label:"6"},
    {value:"7",label:"7"},
   ]
   const foundSalonOption = SalonOption.find(option => option.value ===dynamicStates["salon"]);

   const BedroomOption = [
    {value:"1",label:"1"},
    {value:"2",label:"2"},
    {value:"3",label:"3"},
    {value:"4",label:"4"},
    {value:"5",label:"5"},
    {value:"6",label:"6"},
    {value:"7",label:"7"},
   ]
   const foundBedroomOption = BedroomOption.find(option => option.value ===dynamicStates["bedroom"]);

   const BathroomOption = [
    {value:"1",label:"1"},
    {value:"2",label:"2"},
    {value:"3",label:"3"},
    {value:"4",label:"4"},
    {value:"5",label:"5"},
    {value:"6",label:"6"},
    {value:"7",label:"7"},
   ]
   const foundBathroomOption = BathroomOption.find(option => option.value ===dynamicStates["bathroom"]);

   const GardenOption = [
    {value:"1",label:"1"},
    {value:"2",label:"2"},
    {value:"3",label:"3"},
    {value:"4",label:"4"},
    {value:"5",label:"5"},
    {value:"6",label:"6"},
    {value:"7",label:"7"},
   ]
   const foundGardenOption = GardenOption.find(option => option.value ===dynamicStates["garden"]);


   const handleSelect=({data,select})=>{
    dispatch(updateInputState({key:select,value:data.value}))
  }
  return (
    <div
    className="hidden opacity-0 transition-opacity duration-150 ease-linear data-[te-tab-active]:block w-full "
    id="Rooms"
    role="tabpanel"
    aria-labelledby="tabs-profile-tab01">
     <div className='flex flex-wrap w-full justify-center'>

     
   <div className='w-52'>
      <span className=''>Kitchen : </span>
      <Select onChange={(data)=>handleSelect({data:data,select:"kitchen"})} defaultValue={foundKitchenOption} className=' w-full rounded-md border-2 border-gray-200 focus:outline-offset-1 outline-green-300 focus:bg-white' options={kitchenOption}/>
    </div>
    <div className='w-52'>
      <span className=''>Salon : </span>
      <Select onChange={(data)=>handleSelect({data:data,select:"salon"})} defaultValue={foundSalonOption} className=' w-full rounded-md border-2 border-gray-200 focus:outline-offset-1 outline-green-300 focus:bg-white' options={SalonOption}/>
    </div>
    <div className='w-52'>
      <span className=''>Bedroom : </span>
      <Select onChange={(data)=>handleSelect({data:data,select:"bedroom"})} defaultValue={foundBedroomOption} className=' w-full rounded-md border-2 border-gray-200 focus:outline-offset-1 outline-green-300 focus:bg-white' options={BedroomOption}/>
    </div>
    <div className='w-52'>
      <span className=''>bathroom : </span>
      <Select onChange={(data)=>handleSelect({data:data,select:"bathroom"})} defaultValue={foundBathroomOption} className=' w-full rounded-md border-2 border-gray-200 focus:outline-offset-1 outline-green-300 focus:bg-white' options={BathroomOption}/>
    </div>
    <div className='w-52'>
      <span className=''>Garden : </span>
      <Select onChange={(data)=>handleSelect({data:data,select:"garden"})} defaultValue={foundGardenOption} className=' w-full rounded-md border-2 border-gray-200 focus:outline-offset-1 outline-green-300 focus:bg-white' options={GardenOption}/>
    </div>
    <div className='w-52'>
      <span className=''>Floor : </span>
      <Select onChange={(data)=>handleSelect({data:data,select:"floor"})} defaultValue={foundFloorOption} className=' w-full rounded-md border-2 border-gray-200 focus:outline-offset-1 outline-green-300 focus:bg-white' options={floorOption}/>
    </div>
   

  </div>
  </div>
  )
}

export default Rooms
