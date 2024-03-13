import Broad from '@/Components/admin/dashboard/Broad/Broad';
import DashboardLayout from '@/Components/admin/dashboard/layout';
import { getAllPostId, getRunningQueriesThunk, getShowPost } from '@/Store/Dashboard/postDashApi';
import { initializeStore } from '@/Store/store'
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';

export const getStaticPaths=async()=>{
    const store=initializeStore();
    await store.dispatch(getAllPostId.initiate())
    await Promise.all(store.dispatch(getRunningQueriesThunk()))
    const {data:categoryIds}=  getAllPostId.select()(store.getState())
    console.log("paths",categoryIds?.data)
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
    console.log("ids :",id)
    const store=initializeStore();
    await store.dispatch(getShowPost.initiate({id}))
    await Promise.all(store.dispatch(getRunningQueriesThunk()))
    const {data:category}=  getShowPost.select({id})(store.getState());
    console.log("category:",category)
    return{
        props:{data:category?.data?category?.data:'error'},
        revalidate:10
    }
}
function Index(props) {
  const loading =  useSelector(state=>state.setting.setting.loading) 

  useEffect(() => {
    const init = async () => {
      const { Tab,
        initTE,
       } = await import("tw-elements");
      initTE({ Tab });
    };
    init();
  }, [loading]);

    console.log(props.data)
  
  return (
    <DashboardLayout>
      <Broad/>
      <div className='w-3/4 mx-auto  p-10'>
      <div className='p-5 text-lg w-full'><h1>{props.data?.title}</h1></div>

        <div className="w-full h-96 mx-auto relative rounded-lg shadow-md">
        <Image src={props.data.image} fill objectFit='cover' className='rounded-md' alt="No Image" />
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
  <li role="presentation" className="flex-auto text-center">
    <a
      href="#main-Data"
      className="my-2 block border-x-0 border-b-2 border-t-0 border-transparent px-7 pb-3.5 pt-4 text-xs font-medium uppercase leading-tight text-neutral-500 hover:isolate hover:border-transparent hover:bg-neutral-100 focus:isolate focus:border-transparent data-[te-nav-active]:border-primary data-[te-nav-active]:text-primary dark:text-neutral-400 dark:hover:bg-transparent dark:data-[te-nav-active]:border-primary-400 dark:data-[te-nav-active]:text-primary-400"
      data-te-toggle="pill"
      data-te-target="#main-Data"
      role="tab"
      aria-controls="main-Data"
      aria-selected="false"
      >Main Details </a>
  </li>
  <li role="presentation" className="flex-auto text-center">
    <a
      href="#Rooms"
      className="my-2 block border-x-0 border-b-2 border-t-0 border-transparent px-7 pb-3.5 pt-4 text-xs font-medium uppercase leading-tight text-neutral-500 hover:isolate hover:border-transparent hover:bg-neutral-100 focus:isolate focus:border-transparent data-[te-nav-active]:border-primary data-[te-nav-active]:text-primary dark:text-neutral-400 dark:hover:bg-transparent dark:data-[te-nav-active]:border-primary-400 dark:data-[te-nav-active]:text-primary-400"
      data-te-toggle="pill"
      data-te-target="#Rooms"
      role="tab"
      aria-controls="Rooms"
      aria-selected="false"
      >Rooms </a>
  </li>
</ul>

<div className="mb-6">
  {/* En Details */}
  <div
    className="hidden opacity-100 transition-opacity duration-150 ease-linear data-[te-tab-active]:block"
    id="tabs-home01"
    role="tabpanel"
    aria-labelledby="tabs-home-tab01"
    data-te-tab-active>
    <div >
      <span>Title : </span>
      <h2 className="text-lg p-2  pt-1 text-blod">{props.data?.title}</h2>
    </div>
    <div>
      <span>Description : </span>
      <h2 className="text-lg p-2  pt-1">{props.data?.description}</h2>
    </div>
    <div>
      <span>Status : </span>
      <h2 className="text-lg p-2  pt-1">{props.data?.status?<span
  className="inline-block whitespace-nowrap rounded-[0.27rem] bg-primary-100 px-[0.65em] pb-[0.25em] pt-[0.35em] text-center align-baseline text-[0.75em] font-bold leading-none text-primary-700">
  Show
</span>:<span
  className="inline-block whitespace-nowrap rounded-[0.27rem] bg-danger-100 px-[0.65em] pb-[0.25em] pt-[0.35em] text-center align-baseline text-[0.75em] font-bold leading-none text-danger-700">
  Hidden
</span>}</h2>
    </div>
  </div>
  {/* End En Details */}
  {/* Ar Details */}
  <div
    className="hidden opacity-0 transition-opacity duration-150 ease-linear data-[te-tab-active]:block"
    id="tabs-profile01"
    role="tabpanel"
    aria-labelledby="tabs-profile-tab01">
   <div >
      <span>Title : </span>
      <h2 className="text-lg p-2  pt-1 text-blod">{props.data?.ar_title}</h2>
    </div>
    <div>
      <span>Description : </span>
      <h2 className="text-lg p-2  pt-1">{props.data?.ar_description}</h2>
    </div>
  </div>
  {/* End Er Details */}
  {/* Main Details */}
  <div
    className="hidden opacity-0 transition-opacity duration-150 ease-linear data-[te-tab-active]:block w-full "
    id="main-Data"
    role="tabpanel"
    aria-labelledby="tabs-profile-tab01">
      <div className='flex flex-wrap w-full justify-center'>

     
   <div className='w-52'>
      <span className='bg-gray-200 p-1 rounded-md'>Sale Status : </span>
      <h2 className="text-lg p-2  pt-1 text-blod">{props.data?.sale_status}</h2>
    </div>
    <div className='w-52'>
      <span className='bg-gray-200 p-1 rounded-md'>Status : </span>
      <h2 className="text-lg p-2  pt-1">{props.data?.status}</h2>
    </div>
    <div className='w-52'>
      <span className='bg-gray-200 p-1 rounded-md'>Type : </span>
      <h2 className="text-lg p-2  pt-1">{props.data?.type}</h2>
    </div>
    <div className='w-52'>
      <span className='bg-gray-200 p-1 rounded-md'>Category : </span>
      <h2 className="text-lg p-2  pt-1"> {props.data?.category.title} </h2>
    </div>
    <div className='w-52'>
      <span className='bg-gray-200 p-1 rounded-md'>Price : </span>
      <h2 className="text-lg p-2  pt-1">{props.data?.price}</h2>
    </div>
    <div className='w-52'>
      <span className='bg-gray-200 p-1 rounded-md'>User : </span>
      <h2 className="text-lg p-2  pt-1"> {props.data?.user.email} </h2>
    </div>
    <div className='w-52'>
      <span className='bg-gray-200 p-1 rounded-md'>Location  : </span>
      <h2 className="text-lg p-2  pt-1"> {props.data?.location.location} </h2>
    </div>

  </div>
  </div>
  {/* End Main Details */}
  {/* Rooms */}
  <div
    className="hidden opacity-0 transition-opacity duration-150 ease-linear data-[te-tab-active]:block w-full "
    id="Rooms"
    role="tabpanel"
    aria-labelledby="tabs-profile-tab01">
     <div className='flex flex-wrap w-full justify-center'>

     
   <div className='w-52'>
      <span className='bg-gray-200 p-1 rounded-md'>Kitchen : </span>
      <h2 className="text-lg p-2  pt-1 text-blod">{props.data?.detail.kitchen}</h2>
    </div>
    <div className='w-52'>
      <span className='bg-gray-200 p-1 rounded-md'>Salon : </span>
      <h2 className="text-lg p-2  pt-1">{props.data.
      detail.salon}</h2>
    </div>
    <div className='w-52'>
      <span className='bg-gray-200 p-1 rounded-md'>Bedroom : </span>
      <h2 className="text-lg p-2  pt-1">{props.data?.detail.bedroom}</h2>
    </div>
    <div className='w-52'>
      <span className='bg-gray-200 p-1 rounded-md'>bathroom : </span>
      <h2 className="text-lg p-2  pt-1"> {props.data?.detail.bathroom} </h2>
    </div>
    <div className='w-52'>
      <span className='bg-gray-200 p-1 rounded-md'>Garden : </span>
      <h2 className="text-lg p-2  pt-1">{props.data?.detail.garden}</h2>
    </div>
    <div className='w-52'>
      <span className='bg-gray-200 p-1 rounded-md'>Floor : </span>
      <h2 className="text-lg p-2  pt-1"> {props.data?.detail.floor} </h2>
    </div>
   

  </div>
  </div>
  {/* End Rooms */}
</div>
      <div className='w-full flex'>
        <Link href={`/dashboard/houses/edit/${props?.data?.id}`} className='w-1/2 bg-cyan-700 text-white rounded-md m-2 p-1 text-center'>Edit</Link>
        <a className='w-1/2 bg-red-700 text-white rounded-md m-2 p-1 text-center'>Delete</a>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default Index
