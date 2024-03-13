import Card from '@/Components/client/FavCard/Card'
import Layout from '@/Components/client/Layout'
import UserNav from '@/Components/client/UserNav/UserNav'
import { getFav, getRunningQueriesThunk } from '@/Store/User/favApi'
import { initializeStore } from '@/Store/store'
import Axios from '@/leb/Axios'
import { getCookie, getCookies } from 'cookies-next'
import { parse } from 'dotenv'
import React from 'react'

function index(props) {
  console.log("props ",props)
  return (
    <Layout>
    <div className='pt-16'>
        <UserNav/>
        <div className='p-4 relative w-11/12 mx-auto m-2'>
          <h1 className='text-lg text-green-900'>Favorite</h1>
          <span className='absolute left-0 top-0 bottom-0 w-1 bg-green-700 h-14 rounded-md'></span>
        </div>
        <div className='w-full flex flex-wrap px-24'>
          {props?.data?.data?.length>0?(
          props.data.data.map((da,index)=>{
            return             <Card data={da} cook={props.cook} key={index} />

          })):(
            <div className='w-full flex items-center justify-center border-2 rounded-md p-3'>
              <h2 className='text-md text-gray-500'>
                There is nothing in favorites
              </h2>
            </div>
          )
        
        }
        </div>
    </div>
    </Layout>
  )
}

export default index

export const getServerSideProps=async(context)=>{
    const store = initializeStore();
    const cookie =getCookies() || '' ; 
    const access_token= getCookie('access-token')
    const parsedObject = context.req.headers.cookie ?context.req.headers.cookie.split(';').reduce((acc, pair) => {
      const [key, value] = pair.split('=');
      acc[key] = value;
      return acc;
    }, {}): {};
    const cookies = parse(cookie);
   Axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;

   const csrf =cookies._csrf
   console.log('req method app ',csrf)
   console.log('req method access ',access_token)

   Axios.interceptors.request.use(function (config) {
    const token =access_token
    console.log('token app',token)
    config.headers.Authorization = token ? `Bearer ${access_token}` : "";
    return config;
  });
  console.log(typeof cookie)
    await store.dispatch(getFav.initiate({cookie}))
    await Promise.all(store.dispatch(getRunningQueriesThunk()))
    const {data:fav}= await getFav.select({cookie})(store.getState())
    return {
      props:{data:fav||'',cook:cookie}
    }
}