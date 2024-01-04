import Broad from '@/Components/admin/dashboard/Broad/Broad';
import DashboardLayout from '@/Components/admin/dashboard/layout';
import { getNotIds,getRunningQueriesThunk, getShowNot } from '@/Store/Dashboard/notificationDashApi';
import { usePostUpdateDashMutation } from '@/Store/Dashboard/postDashApi';
import { initializeStore } from '@/Store/store'
import { getCookies } from 'cookies-next';
import Image from 'next/image';
import React from 'react'
import Link from 'next/link'

export const getStaticPaths=async()=>{
    const store=initializeStore();
    await store.dispatch(getNotIds.initiate())
    await Promise.all(store.dispatch(getRunningQueriesThunk()))
    const {data:userIds}=  getNotIds.select()(store.getState())
    const paths = userIds?.data.map((id)=>{
        return {params:{id:id.id?.toString()}}
    })||[];
    return {
        paths:paths,
        fallback:'blocking'
    }


}
export const getStaticProps=async(ctx)=>{
    const {id} = ctx.params;
  
    console.log("id :",id)
    const store=initializeStore();
    await store.dispatch(getShowNot.initiate({id}))
    await Promise.all(store.dispatch(getRunningQueriesThunk()))
    const {data:not}=  getShowNot.select({id})(store.getState());
    console.log("not:",not)
    return{
        props:{data:not?.data?not?.data:'error'},
        revalidate:10
    }
}
function Index(props) {
  const [postUpdateDash,result]= usePostUpdateDashMutation()
    const cookie = getCookies()
    console.log(getCookies())

    const handleAccept = async()=>{
      const data= {status:1}
     await postUpdateDash({patch:data,id:props.data.notification.postid,cookie:cookie}).then(res=>{
      console.log(res)
     })
    }
  
  return (
    <DashboardLayout>
    <Broad/>
    <div className='w-3/4 mx-auto  p-10'>

      <div className="w-full h-96 mx-auto relative rounded-lg shadow-md">
      <Image src={props.data?.notification?.image} fill objectFit='cover' alt="No Image" className='rounded-md' />
      </div>
 

<div className="my-6">
     <h2 className=' text-md ml-2'>User Information</h2>
    <div
      className=" opacity-100 transition-opacity duration-150 ease-linear data-[te-tab-active]:block border-2 p-2 rounded-md">
        <div>User Name : <span>{props.data?.user?.username}</span></div>
        <div>User Email : <span>{props.data?.user?.email}</span></div>
        <div>User Mobile : <span>{props.data?.user?.email}</span></div>


      
    </div>



</div>  
    <div className='w-full flex'>
    <button onClick={handleAccept} className='w-1/2 bg-cyan-700 text-white rounded-md m-2 p-1 text-center'>Accept</button>

      <Link href={`/dashboard/houses/show/${props.data?.notification?.postid}`} className='w-1/2 bg-green-700 text-white rounded-md m-2 p-1 text-center'>Show</Link>

      <a className='w-1/2 bg-red-700 text-white rounded-md m-2 p-1 text-center'>Delete</a>
      </div>
    </div>
  </DashboardLayout>
  )
}

export default Index
