import {  useDestroyFavMutation } from '@/Store/User/favApi'
import { getCookies } from 'cookies-next'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'


function Card(props) {
    const {locale} = useRouter()
  const [input,setInput]=useState({})
  const [destroyFav,result]= useDestroyFavMutation()
  const router = useRouter()
  console.log(locale)
   useEffect(()=>{
    const cookie = getCookies();
    setInput({cookie:cookie})
    console.log("card Cookies :",cookie)
  },[]) 

  return (
    <div className='flex justify-center flex-wrap w-full m-2 shadow-sm' >
      <Link rel="preconnect" href={`services/post/${props?.data?.id}`} className='max-sm:w-full sm:w-full md:w-2/5 lg:w-2/5 xl:w-2/5 h-64 relative'>
      <Image src={"https://res.cloudinary.com/demo/image/fetch/f_auto/"+props?.data?.post?.image}  fill  alt="No Image" objectFit='cover' priority={true}   loading="eager" />
      </Link>
      <div className={`max-sm:w-full sm:w-full md:w-3/5 lg:3/5  xl:w-3/5 flex flex-col items-start  shadow-lg ${locale=="ar"?" border-l-2 border-green-500 ":"border-r-2 border-green-500"}`}>
         <span className='text-2xl		 ml-2 p-1'>{props?.data?.post?.title}</span>
         <span className='text-md	 ml-2 p-1'>Price : {props?.data?.post?.price}</span>
         <span className='text-md	 ml-2 p-1'> Type : {props?.data?.post?.type}</span> 

        
      <div className='mx-3'>{props?.data?.post?.description.substr(0, 20)+"..."}</div>
      <div className='flex items-center justify-between  text-white w-full my-4'>
        <button className='bg-green-600 rounded-md p-1 w-1/2 mx-3'>show</button>
        <button onClick={()=>{destroyFav({cookie:props.cook,id:props?.data.id}).then(()=>router.replace(router.asPath))}} className='bg-red-600 rounded-md p-1 w-1/2 mx-3 flex justify-center'>Remove</button>
        
        </div> 
      </div>
   
    </div>
  )
}

export default Card
