import Taabs from '@/Components/admin/Tabs/Taabs';
import Broad from '@/Components/admin/dashboard/Broad/Broad';
import DashboardLayout from '@/Components/admin/dashboard/layout'
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React, { useRef, useState } from 'react'
import { useEffect } from 'react';
import en from '../../../../../locales/en';
import ar from '../../../../../locales/ar';
import { useGetLocationQuery } from '@/Store/User/postApi';
import { usePostPostDashMutation } from '@/Store/Dashboard/postDashApi';
const Select = dynamic(() => import('react-select'), { ssr: false });

function Create() {
  const [inputs,setInputs]=useState({})
  const {locale}= useRouter()
  const stepsRef=useRef({one:false,2:false,3:false,4:false})
  const [error,setError]=useState({name:false,email:false,mobile:false,address:false})
  const {data:location}=useGetLocationQuery()
  const [postPostDash,result] = usePostPostDashMutation()

  const t = locale=='en'?en:ar;
  const[labels,setLabels]= useState({})
  const options = [
    {value:"",label:"Select Role"},
    {value:"1",label:"Show"},
    {value:"0",label:"Hide"},

  ]
  const [step, setStep] = useState(1);
  const locationOption= location?.data.map(loc=>{return {value:loc.id,label:loc.location}})

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
   const kitchenOption = [
    {value:"1",label:"1"},
    {value:"2",label:"2"},
    {value:"3",label:"3"},
    {value:"4",label:"4"},
    {value:"5",label:"5"},
    {value:"6",label:"6"},
    {value:"7",label:"7"},
   ]
   const SalonOption = [
    {value:"1",label:"1"},
    {value:"2",label:"2"},
    {value:"3",label:"3"},
    {value:"4",label:"4"},
    {value:"5",label:"5"},
    {value:"6",label:"6"},
    {value:"7",label:"7"},
   ]
   const BedroomOption = [
    {value:"1",label:"1"},
    {value:"2",label:"2"},
    {value:"3",label:"3"},
    {value:"4",label:"4"},
    {value:"5",label:"5"},
    {value:"6",label:"6"},
    {value:"7",label:"7"},
   ]
   const BathroomOption = [
    {value:"1",label:"1"},
    {value:"2",label:"2"},
    {value:"3",label:"3"},
    {value:"4",label:"4"},
    {value:"5",label:"5"},
    {value:"6",label:"6"},
    {value:"7",label:"7"},
   ]
   const GardenOption = [
    {value:"1",label:"1"},
    {value:"2",label:"2"},
    {value:"3",label:"3"},
    {value:"4",label:"4"},
    {value:"5",label:"5"},
    {value:"6",label:"6"},
    {value:"7",label:"7"},
   ]
   const typeOption = [
    {value:"0",label:"For Sale"},
    {value:"1",label:"For Rent"},
  
   ]

  


  const handleNext = () => {
    if(step==1){
      setStep((prevStep) => prevStep + 1);

    }else if(step==2){
      setStep((prevStep) => prevStep +1);

    }else if(step==3){
      setStep((prevStep) => prevStep +1);
    }
     
 
 
 }
const handleSelect=({data,select})=>{
  setInputs({...inputs,[select]:data.value})
}
const submitImageHandler =(e)=>{
  setInputs({...inputs,image: e.target.files[0]})
 
}
const handelInput =(e)=>{

  setInputs({...inputs,[e.target.name]:e.target.value})
 }
const handlePrev = () => {
  setStep((prevStep) => prevStep - 1);
};
      
const handleSubmit = (event) => {
  event.preventDefault(); // Prevent the default form submission behavior
  // Your form submission logic or other actions here
  const form = new FormData();

/*   form.append(t.add_house.add_house_inputs.name,inputs?.name)
  form.append(t.add_house.add_house_inputs.email,inputs?.email)
  form.append(t.add_house.add_house_inputs.mobile,inputs?.mobile)
  form.append(t.add_house.add_house_inputs.address,inputs?.address)*/
  form.append(t.add_house.add_house_inputs.location,inputs?.location)                               
  form.append(t.add_house.add_house_inputs.title,inputs?.title||inputs?.ar_title)                   
  form.append(t.add_house.add_house_inputs.description,inputs?.description||inputs?.ar_description)
  form.append(t.add_house.add_house_inputs.type,inputs?.type)                                       
  form.append(t.add_house.add_house_inputs.price,inputs?.price)                                     
  form.append(t.add_house.add_house_inputs.mainImage,inputs?.image)                                 
  form.append(t.add_house.add_house_inputs.floor,inputs?.floor)                                     
  form.append(t.add_house.add_house_inputs.kitchen,inputs?.kitchen)                                 
  form.append(t.add_house.add_house_inputs.salon,inputs?.salon)                                     
  form.append(t.add_house.add_house_inputs.bedroom,inputs?.bedroom)                                 
  form.append(t.add_house.add_house_inputs.bathroom,inputs?.bathroom)                               
  form.append(t.add_house.add_house_inputs.garden,inputs?.garden)                                   
  console.log("form",form)
  let plainFormData={}
  for (let [key, value] of form.entries()) {
    plainFormData[key] = value;
  }
  console.log('args',plainFormData)
   postPostDash({patch:form }) 
};
console.log(inputs)
  const handleRole = ()=>{}
  return (
    <DashboardLayout>
      <Broad/>
      <form onSubmit={handleSubmit} className='pt-20'>

{step === 1 && <div>
  <div>

        <div className='w-full text-green-700 '>
          <h1 className='mx-auto text-center font-bold text-xl '>{"Conatct"}</h1>
          <div className='border-b-2 border-green-400 w-36 mx-auto mt-2'>
    
          </div>

          <div className='w-3/4 p-5 px-10 mt-3 flex justify-between flex-wrap mx-auto '>
            <div className=' w-1/2 p-10'>
            <label className='px-1'>Name :</label>
            <input type="text" onChange={handelInput} name={`${t.add_house.add_house_inputs.name}`} value={inputs?.name} required className={` bg-gray-50 w-full p-2 rounded-md border-2 border-gray-200 focus:outline-offset-1 ${error.name?'border-red-300 outline-red-300':'outline-green-300'} focus:bg-white`}/>  
            </div> 
            <div className=' w-1/2 p-10'>
            <label className='px-1'>Email :</label>
            <input type="text" onChange={handelInput} name={`${t.add_house.add_house_inputs.email}`} value={inputs?.email} required className={` bg-gray-50 w-full p-2 rounded-md border-2 border-gray-200 focus:outline-offset-1 ${error.email?'border-red-300 outline-red-300':'outline-green-300'} focus:bg-white`}/>  
            </div> 
            <div className=' w-1/2 p-10'>
            <label className='px-1'>Mobile :</label>
            <input type="text" onChange={handelInput} name={`${t.add_house.add_house_inputs.mobile}`} value={inputs?.mobile} required className={` bg-gray-50 w-full p-2 rounded-md border-2 border-gray-200 focus:outline-offset-1 ${error.mobile?'border-red-300 outline-red-300':'outline-green-300'} focus:bg-white`}/>  
            </div> 
            <div className=' w-1/2 p-10'>
            <label className='px-1'>Address :</label>
            <input type="text" onChange={handelInput} name={`${t.add_house.add_house_inputs.address}`} value={inputs?.address} required className={` bg-gray-50 w-full p-2 rounded-md border-2 border-gray-200 focus:outline-offset-1 ${error.address?'border-red-300 outline-red-300':'outline-green-300'} focus:bg-white`}/>  
            </div> 

          </div>
          </div> 

      </div> 
      <div className='w-3/4 mx-auto px-5 flex justify-between flex-row-reverse'>
            <button type="button" onClick={handleNext} className="py-2 px-4 bg-green-800 text-white rounded-md">Naxt </button>
          </div>
    </div>}
{step === 2 &&   <div>
  <div  >
    
    <div className='w-full text-green-700 '>
      <h1 className='mx-auto text-center font-bold text-xl '>{"House Location"}</h1>
      <div className='border-b-2 border-green-400 w-36 mx-auto mt-2'>

      </div>

      <div className='w-3/4 p-5 px-10 mt-3 flex justify-center flex-wrap mx-auto '>
        <div className=' w-1/2 p-10'>
        <label className='px-1'>Location :</label>
        <Select onChange={(data)=>handleSelect({data:data,select:"location"})} className=' w-full rounded-md border-2 border-gray-200 focus:outline-offset-1 outline-green-300 focus:bg-white' options={locationOption}/>
      </div> 
       

      </div>
      </div> 

  </div> 
  <div className='w-3/4 mx-auto px-5 flex justify-between flex-row-reverse'>
        <button onClick={handleNext} className="py-2 px-4 bg-green-800 text-white rounded-md">Naxt </button>
        <button onClick={handlePrev} className="border-2 border-green-800 rounded-md px-4 py-2">Previous </button>
      </div>

</div>} 

{step === 3 &&   <div>
  <div  >
    
    <div className='w-full text-green-700 '>
      <h1 className='mx-auto text-center font-bold text-xl '>{"House Main Data"}</h1>
      <div className='border-b-2 border-green-400 w-36 mx-auto mt-2'>

      </div>

      <div className='w-3/4 p-5 px-10 mt-3 flex justify-between flex-wrap mx-auto '>
        <div className=' w-1/2 p-10'>
        <label className='px-1'>Title :</label>
        <input type="text" name={`${t.add_house.add_house_inputs.title}`} onChange={handelInput} required className=' bg-gray-50 w-full p-2 rounded-md border-2 border-gray-200 focus:outline-offset-1 outline-green-300 focus:bg-white'/>  
          </div> 
         
      <div className=' w-1/2 p-10'>
        <label className='px-1'>Type :</label>
        <Select onChange={(data)=>handleSelect({data:data,select:"type"})} className=' w-full rounded-md border-2 border-gray-200 focus:outline-offset-1 outline-green-300 focus:bg-white' options={typeOption}/>
      </div>
      <div className=' w-1/2 p-10'>
        <label className='px-1'>Price :</label>
        <input type="text"  onChange={handelInput} name={`${t.add_house.add_house_inputs.price}`} required className=' bg-gray-50 w-full p-2 rounded-md border-2 border-gray-200 focus:outline-offset-1 outline-green-300 focus:bg-white'/>  
      </div>
      <div className=' w-1/2 p-10'>
        <label className='px-1'>Main Image :</label>
        <input type="file" onChange={submitImageHandler} name={`${t.add_house.add_house_inputs.mainImage}`} required className=' bg-gray-50 w-full p-2 rounded-md border-2 border-gray-200 focus:outline-offset-1 outline-green-300 focus:bg-white'/>  
      </div>

      <div className=' w-full p-10'>
        <label className='px-1'>Description :</label>
        <input type="text"  onChange={handelInput} name={`${t.add_house.add_house_inputs.description}`} required className=' bg-gray-50 w-full p-2 rounded-md border-2 border-gray-200 focus:outline-offset-1 outline-green-300 focus:bg-white'/>  
          </div> 

      </div>
      </div> 

  </div> 
  <div className='w-3/4 mx-auto px-5 flex justify-between flex-row-reverse'>
        <button onClick={handleNext} className="py-2 px-4 bg-green-800 text-white rounded-md">Naxt </button>
        <button onClick={handlePrev} className="border-2 border-green-800 rounded-md px-4 py-2">Previous </button>
      </div>

</div>} 

{step === 4 &&   <div>
  <div  >
    
    <div className='w-full text-green-700 '>
      <h1 className='mx-auto text-center font-bold text-xl '>{"House Details"}</h1>
      <div className='border-b-2 border-green-400 w-36 mx-auto mt-2'>

      </div>

      <div className='w-3/4 p-5 px-10 mt-3 flex justify-between flex-wrap mx-auto '>
        <div className=' w-1/2 p-10'>
        <label className='px-1'>Floor :</label>
        <Select onChange={(data)=>handleSelect({data:data,select:"floor"})} className=' w-full rounded-md border-2 border-gray-200 focus:outline-offset-1 outline-green-300 focus:bg-white' options={floorOption}/>
          </div> 
         
      <div className=' w-1/2 p-10'>
        <label className='px-1'>Kitchen :</label>
        <Select onChange={(data)=>handleSelect({data:data,select:"kitchen"})} className=' w-full rounded-md border-2 border-gray-200 focus:outline-offset-1 outline-green-300 focus:bg-white' options={kitchenOption}/>
      </div>
      <div className=' w-1/2 p-10'>
        <label className='px-1'>Salon :</label>
        <Select onChange={(data)=>handleSelect({data:data,select:"salon"})} className=' w-full rounded-md border-2 border-gray-200 focus:outline-offset-1 outline-green-300 focus:bg-white' options={SalonOption}/>
      </div>
      <div className=' w-1/2 p-10'>
        <label className='px-1'>Bedroom :</label>
        <Select onChange={(data)=>handleSelect({data:data,select:"bedroom"})} className=' w-full rounded-md border-2 border-gray-200 focus:outline-offset-1 outline-green-300 focus:bg-white' options={BedroomOption}/>
      </div>

      <div className=' w-1/2 p-10'>
        <label className='px-1'>Bathroom :</label>
        <Select onChange={(data)=>handleSelect({data:data,select:"bathroom"})} className=' w-full rounded-md border-2 border-gray-200 focus:outline-offset-1 outline-green-300 focus:bg-white' options={BathroomOption}/>
          </div> 
          <div className=' w-1/2 p-10'>
        <label className='px-1'>Garden :</label>
        <Select onChange={(data)=>handleSelect({data:data,select:"garden"})} className=' w-full rounded-md border-2 border-gray-200 focus:outline-offset-1 outline-green-300 focus:bg-white' options={GardenOption}/>
          </div> 
      </div>
      </div> 

  </div> 
  <div className='w-3/4 mx-auto px-5 flex justify-between flex-row-reverse'>
        <button type='submit'  className="py-2 px-4 bg-green-800 text-white rounded-md">Submit </button>
        <button onClick={handlePrev} className="border-2 border-green-800 rounded-md px-4 py-2">Previous </button>
      </div>

</div>} 

  </form>
      
    </DashboardLayout>
  )
}

export default Create
