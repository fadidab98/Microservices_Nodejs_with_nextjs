import Layout from '@/Components/client/Layout'
import React from 'react'
import FilterBar from '../../Components/client/Services/FilterBar/index'
/* import Card from "../../Components/client/Card/index"
 */import { useRouter } from 'next/router'
import en from '../../../locales/en'
import ar from '../../../locales/ar'
import Pagination from "../../Components/pagination"
import Head from 'next/head'
import { getAllPosts, getRunningQueriesThunk, useGetAllPostsQuery } from '@/Store/User/postApi'
import { initializeStore } from '@/Store/store'
import { useDispatch, useSelector } from 'react-redux'
import { changeLoading } from '@/Store/settingSlice'
import { useEffect } from 'react'
import { useState } from 'react'
import dynamic from 'next/dynamic'
import LoadingCard from '@/Components/client/Loading/LoadingCard'
import { getCookies } from 'cookies-next'

const Card = dynamic(() => import('../../Components/client/Card/Card'), { ssr: false,loading:()=> <LoadingCard/> });

function Index(props) {
  const {locale} = useRouter()
  const csrf = useSelector(state=>state.setting.setting.csrf)
  const [loadinForm,setLoadingForm]=useState()
  const loading = useSelector(state=>state.setting.setting.loading)
  console.log("loading",loading)
  const results =locale=="ar"?ar.basic.result:en.basic.result
  console.log("posts",props)
  return (
    <Layout>
        <Head>
        <title>Alwadi House |{locale}</title>
      </Head>
        <FilterBar data={props.data?.locations}/>
        {loading?<div className='mt-24 w-3/4 m-auto flex items-center text-green-600 border-b-2 pb-3'>Loading</div>:<>
       <section className='mt-24 w-3/4 m-auto flex items-center text-green-600 border-b-2 pb-3'>
            <h2 className='text-2xl'>{results} : </h2> <span className='p-1 pt-2 text-md'> ({props?.data?.data.length>0 ? props?.data?.pagination?.count:0})</span>
          </section>
        <section className='w-3/4  pt-5 m-auto min-h-[21.67vh]'>
          <div className='flex flex-col justify-center items-center'>
        {props.data?.data.length==0?(<div className=' w-full h-[10vh] flex items-center justify-center border-2 m-1 rounded-md'>
          <h3 className='text-xl text-gray-500'>No Data Found</h3>
        </div>):(
          props.data?.data?.map((post,index)=>{
            return  <Card data={post} key={index} cookies={props.cookies}/>
            {/* <Card data={post} key={index}/ >*/}
          })
        )}
         
  
          </div>
          <div className='w-full flex flex-items justify-center'>
            {props?.data?.data.length==0?"": <Pagination data={props.data.pagination}/>
}
          </div>
        </section>
      </>}
       
    </Layout>
  )
}

export default Index


export async function getServerSideProps(context){
  context.res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate');

  let page = parseInt(context.query['page']||1);
  let location = parseInt(context.query['location']);
  let type = parseInt(context.query['type']);
  let price = parseInt(context.query['price']);
  let floor = parseInt(context.query['floor']);
  let area = parseInt(context.query['area']);

  console.log("queries : ",context.query)
  const store = initializeStore();
  const cookies = getCookies()
  await store.dispatch(getAllPosts.initiate({page:page,location:location,type:type,price:price,area:area,floor:floor}))
  await Promise.all(store.dispatch(getRunningQueriesThunk()))
  const {data:data} = await getAllPosts.select({page:page,location:location,type:type,price:price,area:area,floor:floor})(store.getState())

  console.log(" data services : ",data)

  return{
    props:{data:data||{},cookies:cookies},
    
  }

 }