import Broad from '@/Components/admin/dashboard/Broad/Broad';
import DashboardLayout from '@/Components/admin/dashboard/layout';
import { getAllCategoryId, getRunningQueriesThunk, getShowCategory, useGetShowCategoryQuery } from '@/Store/Dashboard/categoryDashApi';
import { initializeStore } from '@/Store/store'
import Image from 'next/image';
import React, { useEffect } from 'react'

export const getStaticPaths=async()=>{
    const store=initializeStore();
    await store.dispatch(getAllCategoryId.initiate())
    await Promise.all(store.dispatch(getRunningQueriesThunk()))
    const {data:categoryIds}=  getAllCategoryId.select()(store.getState())
    const paths = categoryIds?.data.map((id)=>{
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
    await store.dispatch(getShowCategory.initiate({id}))
    await Promise.all(store.dispatch(getRunningQueriesThunk()))
    const {data:category}=  getShowCategory.select({id})(store.getState());
    console.log("category:",category)
    return{
        props:{data:category?.data?category?.data:'error'},
        revalidate:10
    }
}
function Index(props) {
  useEffect(() => {
    const init = async () => {
      const { Tab,
        initTE,
       } = await import("tw-elements");
      initTE({ Tab });
    };
    init();
  }, []);
    console.log(props.data)
  
  return (
    <DashboardLayout>
      <Broad/>
      <div className='w-3/4 mx-auto  p-10'>
      <div className='p-5 text-lg w-full'><h1>{props.data?.title}</h1></div>

        <div className="w-full h-96 mx-auto relative rounded-lg shadow-md">
        <Image src={props.data.image} fill objectFit='cover' alt="No Image" className='rounded-md' />
        </div>
   
<ul
  className="mb-5 flex list-none flex-row flex-wrap border-b-0 pl-0"
  role="tablist"
  data-te-nav-ref>
  <li role="presentation" className="flex-auto text-center">
    <a
      href="#tabs-home01"
      className="my-2 block border-x-0 border-b-2 border-t-0 border-transparent px-7 pb-3.5 pt-4 text-xs font-medium uppercase leading-tight text-neutral-500 hover:isolate hover:border-transparent hover:bg-neutral-100 focus:isolate focus:border-transparent data-[te-nav-active]:border-primary data-[te-nav-active]:text-primary dark:text-neutral-400 dark:hover:bg-transparent dark:data-[te-nav-active]:border-primary-400 dark:data-[te-nav-active]:text-primary-400"
      data-te-toggle="pill"
      data-te-target="#tabs-home01"
      data-te-nav-active
      role="tab"
      aria-controls="tabs-home01"
      aria-selected="true"
      >Details (EN)</a>
  </li>
  <li role="presentation" className="flex-auto text-center">
    <a
      href="#tabs-profile01"
      className="my-2 block border-x-0 border-b-2 border-t-0 border-transparent px-7 pb-3.5 pt-4 text-xs font-medium uppercase leading-tight text-neutral-500 hover:isolate hover:border-transparent hover:bg-neutral-100 focus:isolate focus:border-transparent data-[te-nav-active]:border-primary data-[te-nav-active]:text-primary dark:text-neutral-400 dark:hover:bg-transparent dark:data-[te-nav-active]:border-primary-400 dark:data-[te-nav-active]:text-primary-400"
      data-te-toggle="pill"
      data-te-target="#tabs-profile01"
      role="tab"
      aria-controls="tabs-profile01"
      aria-selected="false"
      >Details (AR)</a>
  </li>


</ul>

<div className="mb-6">
  <div
    className="hidden opacity-100 transition-opacity duration-150 ease-linear data-[te-tab-active]:block"
    id="tabs-home01"
    role="tabpanel"
    aria-labelledby="tabs-home-tab01"
    data-te-tab-active>
    <div >
      <span>Title : </span>
      <h2 className="text-lg p-2  pt-1 text-blod">{props.data.title}</h2>
    </div>
    <div>
      <span>Description : </span>
      <h2 className="text-lg p-2  pt-1">{props.data.description}</h2>
    </div>
    <div>
      <span>Status : </span>
      <h2 className="text-lg p-2  pt-1">{props.data.status?<span
  className="inline-block whitespace-nowrap rounded-[0.27rem] bg-primary-100 px-[0.65em] pb-[0.25em] pt-[0.35em] text-center align-baseline text-[0.75em] font-bold leading-none text-primary-700">
  Show
</span>:<span
  className="inline-block whitespace-nowrap rounded-[0.27rem] bg-danger-100 px-[0.65em] pb-[0.25em] pt-[0.35em] text-center align-baseline text-[0.75em] font-bold leading-none text-danger-700">
  Hidden
</span>}</h2>
    </div>
  </div>
  <div
    className="hidden opacity-0 transition-opacity duration-150 ease-linear data-[te-tab-active]:block"
    id="tabs-profile01"
    role="tabpanel"
    aria-labelledby="tabs-profile-tab01">
   <div >
      <span>Title : </span>
      <h2 className="text-lg p-2  pt-1 text-blod">{props.data.ar_title}</h2>
    </div>
    <div>
      <span>Description : </span>
      <h2 className="text-lg p-2  pt-1">{props.data.ar_description}</h2>
    </div>
  </div>
 
 
</div>
      <div className='w-full flex'>
        <a className='w-1/2 bg-cyan-700 text-white rounded-md m-2 p-1 text-center'>Edit</a>
        <a className='w-1/2 bg-red-700 text-white rounded-md m-2 p-1 text-center'>Delete</a>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default Index
