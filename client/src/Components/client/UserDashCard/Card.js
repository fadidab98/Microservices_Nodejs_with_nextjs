import Image from 'next/image'
import React from 'react'
import House from "../../../../public/house1.jpg"
import { useRouter } from 'next/router'
import {MdLocationOn} from "react-icons/md"
import {MdKitchen,MdLiving,MdFavorite} from "react-icons/md"
import {FaBath,FaBed} from "react-icons/fa"
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import { changeBazaarStart, setPostId } from '@/Store/settingSlice'

function Card(props) {
  const {locale} = useRouter()
  console.log(locale)
  console.log("post",props);
  const dispatch = useDispatch()
  const bazaar = useSelector(state=>state.setting.setting.bazaarStart);

  const handleStart=(getData)=>{
    const {id}=getData
      dispatch(changeBazaarStart(bazaar))
      dispatch(setPostId(id))

  }
  return (
    <div className='flex justify-center flex-wrap w-full m-2 shadow-sm ' >
      <Link rel="preconnect" href={`dashboard/posts/${props?.data?.id}`} className='max-sm:w-full  sm:w-full md:w-2/5 lg:w-2/5 xl:w-2/5 h-64 relative'>
      <Image src={"https://res.cloudinary.com/demo/image/fetch/f_auto/"+props?.data?.image}  fill  alt="No Image" objectFit='cover' priority={true}   loading="eager" />
      </Link>
      <div className={`max-sm:w-full sm:w-full md:w-3/5 lg:3/5  xl:w-3/5 flex flex-col items-start  shadow-lg ${locale=="ar"?" border-l-2 border-green-500 ":"border-r-2 border-green-500"}`}>
        <span className='text-2xl	font-semibold	 ml-2 p-1'>{props?.data?.price}sp</span>
        <div className='flex m-2'>
        <span className={`p-1 ${locale=="ar"?' border-l-2':'p-1 border-r-2'}  `}>{locale=="ar"?props?.data?.type:props?.data?.type}</span> 
         <span className='p-1 flex items-center'><MdKitchen className='mx-2'/> {props?.data?.detail.kitchen}</span> 
         <span className='p-1 flex items-center'><FaBath className='mx-2'/> {props?.data?.detail.bathroom}</span>
         <span className='p-1 flex items-center'><FaBed className='mx-2'/>{props?.data?.detail.bedroom}</span>  
         <span className='p-1 flex items-center'><MdLiving className='mx-2'/> {props?.data?.detail.salon}</span>  

         <span className={`p-1 ${locale=="ar"?' border-r-2':' border-l-2'}  `}>Area</span> 
         <span className={`p-1 ${locale=="ar"?' border-r-2':' border-l-2'}  `}> {props?.data?.detail.floor}</span> 

        </div>
        <span className='ml-1  flex items-center'><MdLocationOn className='mx-3'/> {props?.data?.location.location}</span> 
      <div className='mx-3'>{locale=="ar"?props?.data?.ar_description:props?.data?.description}</div>
      <div className=' flex items-center justify-between  text-white w-full my-4'>
        <button onClick={()=>handleStart({id:props?.data?.id})} className='bg-green-600 rounded-md p-1 w-1/2 mx-3'>Start Bazaar</button>
        <button className='bg-red-700 rounded-md p-1 w-1/2 mx-3 flex justify-center'>Delete</button>
        
        </div>
      </div>
   
    </div>
  
  )
}

export default Card