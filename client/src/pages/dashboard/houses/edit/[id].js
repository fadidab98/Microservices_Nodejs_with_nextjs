import Broad from '@/Components/admin/dashboard/Broad/Broad';
import DashboardLayout from '@/Components/admin/dashboard/layout';
import { getAllPostId, getRunningQueriesThunk, getShowPost } from '@/Store/Dashboard/postDashApi';
import { initializeStore } from '@/Store/store'
import Image from 'next/image';
import React, { useEffect,useState } from 'react'
import dynamic from 'next/dynamic';

import { useDispatch, useSelector } from 'react-redux';
import { updateInputState } from '@/Store/houseSlice';
import EnDetails from '@/Components/admin/dashboard/House/EnDetails';
import ArDetails from '@/Components/admin/dashboard/House/ArDetails';
import MainData from '@/Components/admin/dashboard/House/MainData';
import Rooms from '@/Components/admin/dashboard/House/Rooms';

const Select = dynamic(() => import('react-select'), { ssr: false });

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
const Index=(props)=> {
  const dispatch = useDispatch();
  const dynamicStates = useSelector((state) => state.house.house);


  useEffect(() => {
    const init = async () => {
      const { Tab,
        initTE,
       } = await import("tw-elements");
      initTE({ Tab });
    };
    init();
  }, []);

  useEffect(() => {
    
  dispatch(updateInputState({key:"title",value:props.data?.title}))
  dispatch(updateInputState({key:"description",value:props.data?.description}))
  dispatch(updateInputState({key:"ar_title",value:props.data?.ar_title}))
  dispatch(updateInputState({key:"ar_description",value:props.data?.ar_description}))
  dispatch(updateInputState({key:"type",value:props.data?.type}))
  dispatch(updateInputState({key:"status",value:props.data?.status}))
  dispatch(updateInputState({key:"sale_status",value:props.data?.sale_status}))
  dispatch(updateInputState({key:"price",value:props.data?.price}))
  dispatch(updateInputState({key:"email",value:props.data?.user.email}))
  dispatch(updateInputState({key:"userId",value:props.data?.user.id}))
  dispatch(updateInputState({key:"kitchen",value:props.data?.detail.kitchen}))
  dispatch(updateInputState({key:"bedroom",value:props.data?.detail.bedroom}))
  dispatch(updateInputState({key:"bathroom",value:props.data?.detail.bathroom}))
  dispatch(updateInputState({key:"floor",value:props.data?.detail.floor}))
  dispatch(updateInputState({key:"garden",value:props.data?.detail.garden}))
  dispatch(updateInputState({key:"salon",value:props.data?.detail.salon}))
  dispatch(updateInputState({key:"location",value:props.data?.location.id}))


   
      }, [props.data,dispatch]); 
   const submitHandler=async(event)=>{
    event.preventDefault(); // Prevent the default form submission behavior
    // Your form submission logic or other actions here
    const form = new FormData();
  
  /*   form.append(t.add_house.add_house_inputs.name,inputs?.name)
    form.append(t.add_house.add_house_inputs.email,inputs?.email)
    form.append(t.add_house.add_house_inputs.mobile,inputs?.mobile)
    form.append(t.add_house.add_house_inputs.address,inputs?.address)*/
    form.append("location",dynamicStates["location"]) 
    form.append("title",dynamicStates["title"])   
    form.append("ar_title",dynamicStates["ar_title"])
    form.append("description",dynamicStates["description"])
    form.append("ar_description",dynamicStates["ar_description"])
    form.append("type",dynamicStates["type"])                                       
    form.append("price",dynamicStates["price"])                                     
    form.append("image",dynamicStates["image"])                                 
    form.append("floor",dynamicStates["floor"])                                     
    form.append("kitchen",dynamicStates["kitchen"])                                 
    form.append("salon",dynamicStates["salon"])                                     
    form.append("bedroom",dynamicStates["bedroom"])                                 
    form.append("bathroom",dynamicStates["bathroom"])                               
    form.append("garden",dynamicStates["garden"])                                   
    console.log("form",form)
    let plainFormData={}
    for (let [key, value] of form.entries()) {
      plainFormData[key] = value;
    }
    console.log('args',plainFormData)
   }
      console.log("house data : ", dynamicStates)
  return (
    <DashboardLayout>
      <Broad/>
      <div className='w-3/4 mx-auto  p-10'>
      <div className='p-5 text-lg w-full'><h1>{props.data?.title}</h1></div>
      <form>
        <div className="w-full h-96 mx-auto relative rounded-lg shadow-md">
        <Image src={props.data.image} fill objectFit='cover' className='rounded-md' alt="No Image"/>
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
<EnDetails />
  {/* End En Details */}
  {/* Ar Details */}
 <ArDetails />
   {/* End Er Details */}
  {/* Main Details */}
   <MainData />
  {/* End Main Details */}
  {/* Rooms */}
 <Rooms />
 {/* End Rooms */}
</div>
      <div className='w-full flex'>
        <button type='submit' className='w-1/2 bg-cyan-700 text-white rounded-md m-2 p-1 text-center'>Edit</button>
        <a className='w-1/2 bg-red-700 text-white rounded-md m-2 p-1 text-center'>Delete</a>
        </div>
        </form>
      </div>
    </DashboardLayout>
  )
}

export default Index
