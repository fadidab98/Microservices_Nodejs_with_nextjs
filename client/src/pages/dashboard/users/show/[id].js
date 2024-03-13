import Broad from '@/Components/admin/dashboard/Broad/Broad';
import DashboardLayout from '@/Components/admin/dashboard/layout';
import { getAllUserId, getRunningQueriesThunk, getShowUser } from '@/Store/Dashboard/userDashApi';
import { initializeStore } from '@/Store/store'
import Image from 'next/image';
import React from 'react'

export const getStaticPaths=async()=>{
    const store=initializeStore();
    await store.dispatch(getAllUserId.initiate())
    await Promise.all(store.dispatch(getRunningQueriesThunk()))
    const {data:userIds}=  getAllUserId.select()(store.getState())
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
    await store.dispatch(getShowUser.initiate({id}))
    await Promise.all(store.dispatch(getRunningQueriesThunk()))
    const {data:user}=  getShowUser.select({id})(store.getState());
    console.log("user:",user)
    return{
        props:{data:user?.data?user?.data:'error'},
        revalidate:10
    }
}
function Index(props) {

    console.log("user :",props.data.username)
  
  return (
    <DashboardLayout>
        <Broad/>
      <div className='w-3/4 mx-auto  p-10'>

        <div className="w-1/2 h-96 mx-auto relative rounded-lg shadow-md">
          <Image src="" alt='No Image' />
        </div>
   


    <div className="mb-6">
      <div
        className="p-4">
        <div >
          <span>Username : </span>
          <h2 className="text-lg p-2  pt-1 text-blod">{props.data.username}</h2>
        </div>
        <div >
          <span>Email : </span>
          <h2 className="text-lg p-2  pt-1 text-blod">{props.data.email}</h2>
        </div>
        <div>
          <span>Mobile : </span>
          <h2 className="text-lg p-2  pt-1">{props.data.mobile}</h2>
        </div>
        <div>
              <span>Role : </span>
              <h2 className="text-lg p-2  pt-1">{props.data.role ==1?<span
          className="inline-block whitespace-nowrap rounded-[0.27rem] bg-primary-100 px-[0.65em] pb-[0.25em] pt-[0.35em] text-center align-baseline text-[0.75em] font-bold leading-none text-primary-700">
          Admin
        </span>:<span
          className="inline-block whitespace-nowrap rounded-[0.27rem] bg-danger-100 px-[0.65em] pb-[0.25em] pt-[0.35em] text-center align-baseline text-[0.75em] font-bold leading-none text-danger-700">
          User
        </span>}</h2>
        </div>
      </div>

    
    
    </div>
      <div className='w-full flex'>
        <a className='w-full bg-red-700 text-white rounded-md m-2 p-1 text-center'>Delete</a>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default Index
