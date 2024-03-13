
import '../styles/globals.css'
import { Provider, useDispatch, useSelector } from 'react-redux'
import { appWithTranslation } from 'next-i18next'
import {  useStore } from '@/Store/store'
import { getCookie, setCookie } from 'cookies-next';
import axios from 'axios';
import { changeLoading, changeSocket, changeSocketBazaar, setCsrf } from '@/Store/settingSlice';
import useCustomDispatch from '@/Store/useCustomDispatch';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Axios from '@/leb/Axios';
import { io } from 'socket.io-client';


axios.defaults.withCredentials = true;

 const App=(props)=> {
 
  const Component = props.Component
  const store = useStore(props.pageProps.initialReduxState)

  return ( 
    <Provider store={store}>
      <AppWrapper Component={Component} pageProps={props.pageProps}/>
    </Provider>
    

  )
}
export default appWithTranslation(App)
/* server auth */

 

export function AppWrapper({ Component, pageProps }) {
  const dispatch = useDispatch();
  const router = useRouter();

  const [csrftoken,setCsrftoken]=useState()
   const csrf = useSelector(state=>state.setting.setting.csrf)
  const socket =  useSelector(state=>state.setting.setting.socket) 
  useEffect(() => {
    const handleStart = () => {
      dispatch(changeLoading(false));
    };
   
    const handleComplete = () => {
      setTimeout(() =>{dispatch(changeLoading(true))},1000);
    };
    router.events.on('routeChangeStart', handleStart );
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  
  }, [router,dispatch]);
/* 
 */
 
  
useEffect(()=>{
  (async()=>{
    Axios.get(`${process.env.NEXT_PUBLIC_USERS_URL}/csrf-token`).then(res=>{
    dispatch(setCsrf(res.data))
    Axios.defaults.headers.common['X-CSRF-Token'] = res.data.csrfToken

      })

  })()

},[dispatch])

  return (
      <Component {...pageProps}  />
  );
}

