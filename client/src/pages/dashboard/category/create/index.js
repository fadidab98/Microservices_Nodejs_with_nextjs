import React, { useRef, useState ,useEffect} from 'react'

import Taabs from '@/Components/admin/Tabs/Taabs';
import Broad from '@/Components/admin/dashboard/Broad/Broad';
import DashboardLayout from '@/Components/admin/dashboard/layout'
import dynamic from 'next/dynamic';
const Select = dynamic(() => import('react-select'), { ssr: false });
import Image from 'next/image';
import { usePostCategoryMutation } from '@/Store/Dashboard/categoryDashApi';
import { useRouter } from 'next/router';

function Create() {
  const [inputs,setInputs]=useState({title:"", description:"",ar_description:"",ar_title:"",status:"",image:""})
  const[labels,setLabels]= useState({})
  const [selectedImage, setSelectedImage] = useState('');
  const [postCategory,result,error]= usePostCategoryMutation()
  const router = useRouter()

  const options = [
    {value:"",label:"Select Status"},
    {value:"1",label:"Show"},
    {value:"0",label:"Hide"},
  ]
  const [step, setStep] = useState(1);


  const handleNext = () => {
    if(step==1 ){
      setStep((prevStep) => prevStep + 1);

    }else if(step==2){
      setStep((prevStep) => prevStep +1);

    }else if(step==3){
      setStep((prevStep) => prevStep +1);
    }
     
 
 
/*   &&check({input:inputs?.email,title:"email"})&&check({input:inputs?.mobile,title:"mobile"})&&check({input:inputs?.address,title:"address"})
*/  }
const handlePrev = () => {
  setStep((prevStep) => prevStep - 1);
};

const handleInputs =(e)=>{
    setInputs({...inputs,[e.target.name]:e.target.value})

}
const handleSelect=({data})=>{
  setInputs({...inputs,status:data.value})
}
const handleImage=(e)=>{
  setInputs({...inputs,image:e.target.files[0]})
  const file = e.target.files[0]
  if (file) {
    const imageURL = URL.createObjectURL(file);
    setSelectedImage(imageURL);
  }
}

      console.log("inputs :",inputs)
  const handleSubmit =async (e)=>{
    e.preventDefault();
    const newForm = new FormData();
    newForm.append('title',inputs.title)
    newForm.append('ar_title',inputs.ar_title)
    newForm.append('description',inputs.description)
    newForm.append('ar_description',inputs.ar_description)
    newForm.append('status',inputs.status),
    newForm.append('image',inputs.image),
    await postCategory(newForm)

    
  }
  if(result?.status == "fulfilled")
  {
   router.push('/dashboard/category')
  }
  console.log(result)
  return (
    <DashboardLayout>
      <Broad/>
      <form onSubmit={handleSubmit} className='pt-20'>

{step === 1 && <div>
  <div>

        <div className='w-full text-green-700 '>
          <h1 className='mx-auto text-center font-bold text-xl '>{"Category EN"}</h1>
          <div className='border-b-2 border-green-400 w-36 mx-auto mt-2'>
    
          </div>

          <div className='w-3/4 p-5 px-10 mt-3 flex justify-between flex-wrap mx-auto '>
           {/* Data */}
           <div className=" w-full">

           <div class="relative z-0 w-full mb-6 group">
              <input  name='title' value={inputs.title} onChange={handleInputs} type="title"  id="title" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required autocomplete="off" />
              <label  for="title" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Category Title (EN)</label>
          </div>    
  

    <div className="relative mb-6" data-te-input-wrapper-init>
    <Select onChange={(data)=>handleSelect({data})}  className=' w-full rounded-md  outline-offset-0 border-0  focus:bg-white m-1' options={options}/>
    </div>


          <div class="relative z-0 w-full mb-6 group">
              <textarea  name='description' value={inputs.description} onChange={handleInputs}   id="title" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required autocomplete="off"></textarea>
              <label  for="description" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Category Description (EN)</label>
          </div>  



    </div>
          {/* End of Data */}
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
      <h1 className='mx-auto text-center font-bold text-xl '>{"Category AR"}</h1>
      <div className='border-b-2 border-green-400 w-36 mx-auto mt-2'>

      </div>

      <div className='w-3/4 p-5 px-10 mt-3 flex justify-center flex-wrap mx-auto '>
       {/* Data */}
       <div className=" w-full">

       <div class="relative z-0 w-full mb-6 group">
              <input dir='rtl'  name='ar_title' value={inputs.ar_title} onChange={handleInputs} type="title"  id="ar_title" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required autocomplete="off" />
              <label  for="ar_title" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Category Title (EN)</label>
          </div> 



          <div class="relative z-0 w-full mb-6 group">
              <textarea dir='rtl'  name='ar_description' value={inputs.ar_description} onChange={handleInputs}   id="title" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required autocomplete="off"></textarea>
              <label  for="ar_description" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Category Description (EN)</label>
          </div>  
</div>
{/* End of Data */}


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
      <h1 className='mx-auto text-center font-bold text-xl '>{"Image"}</h1>
      <div className='border-b-2 border-green-400 w-36 mx-auto mt-2'>

      </div>

      <div className='w-3/4 p-5 px-10 mt-3 flex justify-between flex-wrap mx-auto '>
          {/* Data */}
          <div class="mb-3 w-full">
      <label
        for="formFileMultiple"
        class="mb-2 inline-block text-neutral-700 dark:text-neutral-200"
        >Image</label>
      <input
        class="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
        type="file"
        name='image'
        onChange={handleImage}
        id="formFileMultiple"
         />
    </div>
    {/* End Data */}
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
      <h1 className='mx-auto text-center font-bold text-xl '>{"Category All Details"}</h1>
      <div className='border-b-2 border-green-400 w-36 mx-auto mt-2'>

      </div>

      <div className='w-3/4 p-5 px-10 mt-3 flex justify-between flex-wrap mx-auto '>
        <div className='w-full h-72 relative'>
        <Image src={selectedImage} fill alt="No Image"/>
        </div>
        <div className='p-2 w-full'>
          <div className='break-words'>
            <span className='text-gray-900 border-b-2 border-gray-200 my-2 py-2'>Category Title (EN) : </span> {inputs.title}
          </div>
          <div className='break-words border-b-2 border-gray-200 my-2 py-2'>
            <span className='text-gray-900'>Category Title (AR) : </span> {inputs.ar_title}
          </div>
          <div className='break-words border-b-2 border-gray-200 my-2 py-2'>
            <span className='text-gray-900'>Category Description (EN) : </span> {inputs.description}
          </div>
          <div className='break-words border-b-2 border-gray-200 my-2 py-2'>
            <span className='text-gray-900'>Category Description (AR) : </span> {inputs.ar_description}
          </div>
          <div className='break-words border-b-2 border-gray-200 my-2 py-2'>
            <span className='text-gray-900'>Category Status : </span> {inputs.status==1? 'Show':'hidden'}
          </div>

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
