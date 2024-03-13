import DashboardLayout from '@/Components/admin/dashboard/layout'
import { usePostUserMutation } from '@/Store/Dashboard/userDashApi';
import { copyWithStructuralSharing } from '@reduxjs/toolkit/dist/query';
import dynamic from 'next/dynamic';
import React, { useState } from 'react'
const Select = dynamic(() => import('react-select'), { ssr: false });

function Index() {
  const  [inputs,setInputs]= useState({username:'',email:'',password:'',re_password:'',role:'',mobile:''})
  const [postUser,result]=usePostUserMutation()
  const[labels,setLabels]= useState({})
  const options = [
    {value:"",label:"Select Role"},
    {value:"1",label:"User"},
    {value:"2",label:"Moderetor"},
    {value:"3",label:"Admin"},
  ]


  const handleInputs =(e)=>{
    setInputs({...inputs,[e.target.name]:e.target.value})

}
const handleSelect=({data})=>{
  setInputs({...inputs,role:data.value})
}
const submitHandler =(e)=>{
  e.preventDefault(); // Prevent the default form submission behavior

  const newForm = new FormData();

  const {re_password,...mainData} = inputs
  postUser({patch:mainData})

}
console.log(inputs)
  return (
    <DashboardLayout>
  <div className='mt-5 px-2'>

  <form onSubmit={submitHandler}>
    
  <div class="relative z-0 w-full mb-6 group">
        <input type="text" name="username" onChange={handleInputs} value={inputs.username} id="username" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required autocomplete="off" />
        <label for="username" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Username</label>
    </div>
  <div className="relative z-0 w-full mb-6 group">
      <input type="email" name="email" onChange={handleInputs} value={inputs.email} id="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required autocomplete="off" />
      <label for="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
  </div>
  <div className="relative z-0 w-full mb-6 group">
      <input type="password" name="password" onChange={handleInputs} value={inputs.password} id="floating_password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required autocomplete="off" />
      <label for="floating_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
  </div>
  <div className="relative z-0 w-full mb-6 group">
      <input type="password" name="re_password" onChange={handleInputs} value={inputs.re_password} id="floating_repeat_password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required autocomplete="off" />
      <label for="floating_repeat_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Confirm password</label>
  </div>
    
 


    <div className="relative z-0 w-full mb-6 group">
        <input type="tel"  name="mobile" onChange={handleInputs} value={inputs.mobile} id="floating_phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required autocomplete="off" />
        <label for="floating_phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone number (123-456-7890)</label>
    </div>
    <div className="relative z-0 w-full mb-6 group">
  <Select id="location" placeholder={"User Role"} aria-label="role" options={options} value={inputs.role} onChange={(data)=>handleSelect({data})}/>

  </div>

  <button type="submit" className="text-white bg-green-900 p-2 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm max-lg:w-full max-md:w-full max-sm:w-full  px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
</form>
  </div>


    </DashboardLayout>
  )
}

export default Index
