import Layout from '@/Components/client/Layout'
import React, { useState } from 'react'
import Card from "@/Components/client/UserDashCard/Card"
import { initializeStore } from '@/Store/store'
import { getRunningQueriesThunk, getUserPosts } from '@/Store/User/postApi'
import { parse } from 'cookie'
import Axios from '@/leb/Axios'
import UserNav from '@/Components/client/UserNav/UserNav'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import DateTimePicker  from 'react-datetime-picker';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import { usePostBazaarMutation } from '@/Store/User/BazaarApi'
import { changeBazaarStart } from '@/Store/settingSlice'
function Dashboard(props) {
  const dispatch = useDispatch()
  const bazaar = useSelector(state=>state.setting.setting.bazaarStart);
  const [postBazaar,result]=usePostBazaarMutation() 
  console.log(bazaar)
  const [selectedStartDateTime, onChange] = useState(new Date());
  const [selectedEndDateTime, onChangeEnd] = useState(new Date());
  const postId = useSelector(state=>state.setting.setting.postId)
  const submitBazaar =async(e)=>{
    e.preventDefault();
    const data ={
      postid:postId,
      start:selectedStartDateTime,
      end:selectedEndDateTime
    }
    await postBazaar({patch:data,cookie:props.cookies}).then((res)=>{
      return closeFunc()
    })

  }
  const closeFunc =()=>{
    dispatch(changeBazaarStart(bazaar))
  }
  console.log("selectedStartDateTime :",selectedStartDateTime)
  return (
    <Layout>
      <div className='pt-16'>
        <UserNav/>
        <div className='p-4 relative w-11/12 mx-auto m-2'>
          <h1 className='text-lg text-green-900'>Your Houses</h1>
          <span className='absolute left-0 top-0 bottom-0 w-1 bg-green-700 h-14 rounded-md'></span>
          <div className=' mt-5 p-0'>
           
          <div className='w-full flex flex-wrap'>
            {props?.data?.data?.length>0?(
            props?.data?.data?.map((post,index)=>{
              return  <Card data={post} key={index}/>
            })):(
              <div className='w-full flex items-center justify-center border-2 rounded-md p-3'>
              <h2 className='text-md text-gray-500'>
                No homes have been added by you
              </h2>
            </div>
            )
          }
          </div>
          </div>
        </div>
      </div>
    <div className={`absolute left-0 top-[13rem] right-0 bg-gray-50 w-1/2 p-2 pt-5 shadow-lg rounded-md mx-auto ${bazaar?'  ':'hidden '}`}>
      <h2 className='text-green-800 text-center text-lg'>Start Bazaar</h2>
      <form onSubmit={submitBazaar} className='w-full px-3 py-5 m-2'>
      <div
        className="relative mb-3 flex items-center">
           <label
              htmlFor="startDate"
              className='w-3/12'
              >Select Start Date :</label>
        <DateTimePicker
        onChange={onChange}
        className="w-9/12  rounded-md p-2"
        value={selectedStartDateTime}
        format="y-MM-dd HH:mm:ss"
        // Other props can be added for customization
      />
    </div> 
        
          <div
            className="relative mb-3 flex items-center">
              <label
              htmlFor="endDate"
              className='w-3/12'
              >Select End Date :</label>
           <DateTimePicker
            onChange={onChangeEnd}
            className="w-9/12  rounded-md p-2"
            value={selectedEndDateTime}
            format="y-MM-dd HH:mm:ss"
            // Other props can be added for customization
          />
            </div>

          <div className='w-full rounded-md m-1 flex justify-between'>
            <button type='submit' className=' p-1 rounded-md bg-primary-600 hover:bg-primary-800 text-white w-4/12' >Submit</button>
            <button onClick={closeFunc} className=' p-1 rounded-md bg-red-600 hover:bg-red-800 text-white w-4/12' >Close</button>

          </div>
      </form>
    </div>
    </Layout>
  )
}

export default Dashboard

export const getServerSideProps=async(context)=>{
 
  const store = initializeStore();
  const { req } = context;
  const cookie =req.headers.cookie || '' ; 
  
   const cookies = parse(cookie);
   Axios.defaults.headers.common['Authorization'] = `Bearer ${cookies.access_token}`;

   const csrf =cookies._csrf
   console.log('req method app ',csrf)
   Axios.interceptors.request.use(function (config) {
    const token =cookies.access_token
    console.log('token app',token)
    config.headers.Authorization = token ? `Bearer ${token}` : "";
    return config;
  });
  await store.dispatch(getUserPosts.initiate(cookie))
  await Promise.all(store.dispatch(getRunningQueriesThunk()))
  const {data:da} = await getUserPosts.select(cookie)(store.getState());
  console.log("data",da)
  return{
    props:{data:da||{},cookies:cookie}
  }


}