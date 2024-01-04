import DashHome from '@/Components/admin/Home/DashHome'
import DashboardLayout from '@/Components/admin/dashboard/layout'
import { useGetPostCountQuery } from '@/Store/Dashboard/postDashApi'
import { getUserCount, useGetCsrfTokenQuery, useGetUserCountQuery } from '@/Store/User/userApi'
import { initializeStore } from '@/Store/store'
import Axios from '@/leb/Axios'
import axios from 'axios'
import { parse } from 'cookie'
import React from 'react'
import { useEffect } from 'react'
import { parseCookies } from 'next-cookies';
import { useDispatch } from 'react-redux'
import { changeCookies } from '@/Store/settingSlice'
import Chartjs from '@/Components/admin/Home/Chartjs'
import Dounght from '@/Components/admin/Home/Dounght'
import { useGetCategoryCountQuery } from '@/Store/Dashboard/categoryDashApi'

 function Index (props) {
  const {data:post}=useGetPostCountQuery()
  const {data:user}=useGetUserCountQuery()
  const {data:category}=useGetCategoryCountQuery()
  console.log(category)
 const dispatch= useDispatch()
  useEffect(()=>{
    dispatch(changeCookies(props.cookies))
  
  },[])

  useEffect(() => {
    const use = async () => {
      (await import('tw-elements')).default;
        };
        use();
      }, []); 
    return (
    <DashboardLayout>
      <DashHome post={post?.data} user={user?.data} category={category?.data}/> 
      <div className='flex w-10/12 flex-wrap pt-10 mx-auto'>
        <div className='w-8/12 p-4'>
        <Chartjs/>

        </div>
        <div className='w-4/12 pt-4 flex items-center '>
        <Dounght/>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default Index

export const getServerSideProps=async(context)=>{
  const { req } = context;
  const cookies =req.headers.cookie || '' ; 

  
  return{
    props:{cookies:cookies||{}}
  }
 
 

 

 

}