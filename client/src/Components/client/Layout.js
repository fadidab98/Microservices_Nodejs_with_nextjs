import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux';
import dynamic from 'next/dynamic'
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
  return (
    <div className='relative' dir={locale=="ar"?'rtl':"ltr"}>
   

      <Navbar/>
        
      {loading ?<Loading/> : children}
      <Footer/>
      </div>
  )
}

export default Layout