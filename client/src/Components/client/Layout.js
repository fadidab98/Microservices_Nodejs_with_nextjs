import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux';
import dynamic from 'next/dynamic'
<<<<<<< HEAD
import { useGetSettingQuery } from '@/Store/User/settingApi';
=======
>>>>>>> 802321716b56db79acec7e66d8e6f9c17aac17eb
const Navbar = dynamic(() => import('./Navbar/Navbar'), { ssr: false,loading:()=> <div>Loading...</div>});
const Footer = dynamic(() => import('./Footer/Footer'), { ssr: false,loading:()=> <div>Loading...</div>});
const Loading = dynamic(() => import('../loading/Loading'), { ssr: false,loading:()=> <div>Loading...</div>});


function Layout({children}) {
  const {locale}= useRouter();
  const [loads,setLoads]= useState(<Loading/>)
  const loading =  useSelector(state=>state.setting.setting.loading) 
  console.log("loading :",loading)
  useEffect(()=>{
    if(!loading){
      setLoads(children)
    }
  },[loading])
<<<<<<< HEAD
  const {data:data}= useGetSettingQuery();
  console.log("main data setting",data)
=======
>>>>>>> 802321716b56db79acec7e66d8e6f9c17aac17eb
  return (
    <div className='relative' dir={locale=="ar"?'rtl':"ltr"}>
   

      <Navbar/>
        
      {loading ?<Loading/> : children}
<<<<<<< HEAD
      <div className=''>
      <Footer data={data?.data}/>

      </div>
=======
      <Footer/>
>>>>>>> 802321716b56db79acec7e66d8e6f9c17aac17eb
      </div>
  )
}

export default Layout