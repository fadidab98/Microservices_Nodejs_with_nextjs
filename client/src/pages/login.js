import Layout from '@/Components/client/Layout'
import { useLoginPostMutation } from '@/Store/User/userApi'
import { parse } from 'cookie'
import { getCookies, setCookie } from 'cookies-next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useEffect, useRef, useState } from 'react'
import Cookies from 'js-cookie';

function Index(props) {
  const [inputs,setInputs]= useState({})
  const inputsRef = useRef({})

  const data = 3
     const[loginPost,result ]=useLoginPostMutation();
  const router = useRouter()
  console.log("inputs",inputs)

  
  const handleInput = (e) => {
    setInputs((prevData) => {
      return { ...prevData, [e.target.name]: e.target.value };
    });
    inputsRef.current ={ ...inputsRef.current, [e.target.name]: e.target.value }
  };
  useEffect(() => {
    console.log("inputs in useEffect", inputs);
  }, [inputs]);

  /* useEffect(() => {
    const handleSubmit = async () => {
      try {
        await loginPost({patch:inputs,csrfToken:props?.csrf}).then((res)=>{
          Cookies.set('accessToken', res?.data?.data?.token);
    
    
        
        }) 
        // ... rest of the code
      } catch (error) {
        console.error('Error during login:', error);
        // Handle errors
      }
    };
  
    if (Object.keys(inputs).length > 0) {
      handleSubmit();
    }
  }, [inputs, loginPost, props?.csrf]);
   */
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await loginPost({patch:inputs,csrfToken:props?.csrf}).then((res)=>{
        Cookies.set('accessToken', res?.data?.data?.token);
  
        console.error('data during login:', res);

      
      }) 
      // ... rest of the code
    } catch (error) {
      console.error('Error during login:', error);
      // Handle errors
    }
  };
  
  return (
    <Layout>
      <Head>
      <meta name="csrf-token" content={props?.csrf} method="POST" />
      </Head>
        <div className='w-full h-screen relative pt-16 z-10 text-green-900'>
            <div className='absolute left-1/4 w-1/2  z-30   backdrop-blur-3xl bg-white/50 mt-20 mx-auto shadow-xl rounded-lg'>
            <h2 className='text-center mx-auto w-full text-xl mt-2'>Login</h2>
            <form onSubmit={handleSubmit}>
            <div className='w-full p-5 px-4 mt-1 flex justify-center flex-wrap mx-auto '>
             
              <div className=' w-3/4 p-3'>
              <label className='px-1'>Email :</label>
              <input type="email" name="email" value={inputs?.email}  onChange={handleInput} className=' bg-gray-50 w-full p-2 rounded-md border-2 border-gray-200 focus:outline-offset-1 outline-green-300 focus:bg-white'/>  
              </div> 
              
              <div className=' w-3/4 p-3'>
              <label className='px-1'>Password :</label>
              <input type="password" name="password" value={inputs?.password} onChange={handleInput}  className=' bg-gray-50 w-full p-2 rounded-md border-2 border-gray-200 focus:outline-offset-1 outline-green-300 focus:bg-white'/>  
              </div> 
                <div className='w-full text-center'>
                <button type='submit' className='mx-auto border-2 border-green-800 px-2 py-1 rounded-md hover:bg-green-800 hover:text-white'>Login</button>
                </div>
            </div>
            </form>
                </div>
            <div className='absolute left-0  bottom-0 top-0 right-1/2 z-20 bg-green-800 min-h-screen'></div>

        </div>
    </Layout>
  )
}

export default Index
export async function getServerSideProps(context){

  const { req } = context;
  const cookie =req.headers.cookie || '' ; 
  
   const cookies = parse(cookie);

   const csrf =cookies._csrf
 
  return{
    props:{csrf:csrf||''}
  }
}