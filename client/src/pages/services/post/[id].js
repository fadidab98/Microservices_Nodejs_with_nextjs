import Layout from '@/Components/client/Layout';
import Gallary from '@/Components/client/Services/post/gallary';
import { getAllPostId, getRunningQueriesThunk, getShowPost } from '@/Store/Dashboard/postDashApi';
import { initializeStore } from '@/Store/store';
import { FaShareSquare } from "react-icons/fa";
import { MdFavoriteBorder } from "react-icons/md";
import { MdKitchen } from "react-icons/md";
import { FaCopy } from "react-icons/fa";
import { io } from 'socket.io-client';
import { IoMdClose } from "react-icons/io";

import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { usePostOfferMutation } from '@/Store/User/BazaarApi';
import { useGetCheckAuthUserQuery } from '@/Store/User/userApi';
import Cookies from 'js-cookie';
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
    console.log(props)
    const [socket,setSocket]=useState(null)
    const [offer,setOffer]=useState({})
    const [bazaar,setBazaar]=useState({})
    const [postOffer,result]=usePostOfferMutation();
    const [modal,setModal]=useState(false);
    const cookie = Cookies.get()
    const {data:user}=useGetCheckAuthUserQuery({cookie:cookie})
    console.log("user",user)
    useEffect(()=>{
        setSocket(io.connect('http://localhost:5001',{query:{postId:props.data?.id||null}}));
       

    },[result])

    useEffect(()=>{
        socket?.on("getBazaar",(data)=>{
            console.log(data)
            setBazaar(data)
        })
        return () => {
            // Close the WebSocket connection when the component is unmounted
            socket?.close();
          };
    
    
      },[socket,result])
      const handleInput=(e)=>{
        setOffer({offer:e.target.value})
      }
      const handleModal =()=>{
        setModal(!modal)
      }
      console.log(bazaar)
      const submitOffer =(e)=>{
        e.preventDefault();
        postOffer({id:props.data?.id,patch:{userid:user?.data?.id,offer:offer.offer}})

      }
  return (
    <Layout>
         <div className='flex flex-col w-10/12 p-2 mx-auto pt-24'>
            <h1 className='text-lg font-blod'>{props.data.title}</h1>
            <div className='flex mt-4'>
                <div className='flex items-center border-2 border-gray-200 text-green-800  p-2 rounded-md shadow-md mx-2'><FaShareSquare className='m-1'/> <span>Share</span></div>
                <div className='flex items-center border-2 border-gray-200 text-green-800  p-2 rounded-md shadow-md mx-2'><MdFavoriteBorder className='m-1'/> <span>Add To Favorite</span></div>
                <div className='flex items-center border-2 border-gray-200 text-green-800  p-2 rounded-md shadow-md mx-2'><FaCopy className='m-1'/> <span>Copy Link</span></div>

            
            
            </div>
            
            <div className='flex mt-10'>

                <div className='w-8/12'>
                <Gallary mainImage={props.data.image}/>

                </div>
                <div className='w-4/12 px-4'>
                    
                    <div className='w-full border-w rounded-md shadow-md p-4'>
                        <h2 className='text-xl font-blod text-green-800 px-3'> <span className='px-1'>{props.data.price}</span>sp</h2>
                        <button className='w-full p-2 bg-green-700 rounded-md hover:bg-green-800 text-center text-white mt-4'>
                            {props.data.user.mobile}
                        </button>

                        <button className='w-full p-2 outline outline-green-800 rounded-md hover:bg-green-800 text-center text-green-800 hover:text-white mt-4'>
                            Chat
                        </button>
                    </div>
                    <div className={`w-full border-w rounded-md shadow-md p-4 my-2 ${bazaar?.post==1 ?'':'hidden'}`}>
                        <h2 className='text-center'>Bazaar</h2>
                        <div className='w-full flex justify-between xl:flex-row lg:flex-row md:flex-col sm:flex-col xs:flex-col'>
                           <div>
                           <span className="text-red-800">Min Price: {bazaar?.min}</span>

                           </div>
                           <div>
                           <span className="text-green-800">Max Price: {bazaar?.max}</span>
                            </div> 

                        </div>
                        <div className='w-full flex justify-between xl:flex-col lg:flex-col md:flex-col sm:flex-col xs:flex-col'>
                           <div>
                           <span>Starts In: {bazaar?.start}</span>
                            </div> 
                            <span>Expires in : {bazaar?.end}</span>

                        </div>
                        <button onClick={handleModal} className='w-full p-2 outline outline-blue-800 rounded-md hover:bg-blue-800 text-center text-blue-800 hover:text-white mt-4'>
                            Offer
                        </button>
                        
                    </div>
                </div>
            </div>

            <div className='flex flex-col mt-4'>
            <h2 className='p-2 font-blod text-lg'>Information :</h2>


                <div className='w-8/12 border-2 flex flex-wrap justify-center rounded-md p-1'>
                    <div className='w-36 border-2 border-gay-200 bg-gray-50 rounded-md p-2 m-1 shadow-sm flex items-center justify-center'>
                        <span className='mx-1'>Kitchen :</span>
                        <span>{props.data.detail.kitchen}</span>
                    </div>

                    <div className='w-36 border-2 border-gay-200 bg-gray-50 rounded-md p-2 m-1 shadow-sm flex items-center justify-center'>
                        <span className='mx-1'>Salon :</span>
                        <span>{props.data.detail.salon}</span>
                    </div>

                    <div className='w-36 border-2 border-gay-200 bg-gray-50 rounded-md p-2 m-1 shadow-sm flex items-center justify-center'>
                        <span className='mx-1'>Bedroom :</span>
                        <span>{props.data.detail.bedroom}</span>
                    </div>

                    <div className='w-36 border-2 border-gay-200 bg-gray-50 rounded-md p-2 m-1 shadow-sm flex items-center justify-center'>
                        <span className='mx-1'>Bathroom :</span>
                        <span>{props.data.detail.bathroom}</span>
                    </div>

                    <div className='w-36 border-2 border-gay-200 bg-gray-50 rounded-md p-2 m-1 shadow-sm flex items-center justify-center'>
                        <span className='mx-1'>garden :</span>
                        <span>{props.data.detail.garden}</span>
                    </div>

                    <div className='w-36 border-2 border-gay-200 bg-gray-50 rounded-md p-2 m-1 shadow-sm flex items-center justify-center'>
                        <span className='mx-1'>Floor :</span>
                        <span>{props.data.detail.floor}</span>
                    </div>

                    <div className='w-36 border-2 border-gay-200 bg-gray-50 rounded-md p-2 m-1 shadow-sm flex items-center justify-center'>
                        <span className='mx-1'>Location :</span>
                        <span>{props.data.location.location}</span>
                    </div>

                    <div className='w-36 border-2 border-gay-200 bg-gray-50 rounded-md p-2 m-1 shadow-sm flex items-center justify-center'>
                        <span className='mx-1'>Type :</span>
                        <span>{props.data.type}</span>
                    </div>

                    <div className='w-36 border-2 border-gay-200 bg-gray-50 rounded-md p-2 m-1 shadow-sm flex items-center justify-center'>
                        <span className='mx-1'>Sale :</span>
                        <span>{props.data.sale_status}</span>
                    </div>

                    


                </div>
                {/* <div className='w-4/12'>
                    contact
                </div> */}
            </div>

            <div className='w-8/12 mt-2'>
                <h2 className='p-2 font-blod text-lg'>Description :</h2>
                <p className='w-full p-1'>{props.data.description}</p>
            </div>
        </div>
    
       
        <div className={`absolute shadow-lg  rounded-lg mx-auto w-[50%] left-0 right-0 top-[13.8rem] bg-gray-100  z-50 ${modal?"":"hidden"}`}>
            <div className='relative pt-10 px-5 pb-5'>
                <button onClick={handleModal} className='absolute right-0 top-0 p-2 text-xl text-green-800'>
                    <IoMdClose/>
                </button>
            <h2 className='text-green-900 text-center text-lg '>Bazaar</h2>
            <form onSubmit={submitOffer}>
            <div className='w-full flex mt-6'>
                <div className='w-2/12'>
                <span >Your Offer : </span>

                </div>

                <input type="number" name="offer" onChange={handleInput} className='w-10/12 p-1 rounded-md  focus:outline-offset-1 outline-green-600'/>

            </div>
            <button type='submit' className='bg-green-800 text-white w-full p-1 rounded-md mt-3'>Submit</button>
            </form>
            </div>
        </div>
    </Layout>
  )
}

export default Index
