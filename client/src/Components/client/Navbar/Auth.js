import Cookies from 'js-cookie'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'

import Register from './Register'
import Dashboard from './Dashboard'

function Auth() {
   
    const [auth,setAuth]=useState(<Register/>)
    useEffect(()=>{
        if(Cookies.get("accessToken")){
            setAuth( <Dashboard/> )
        }else{
            setAuth(<Register/>)
        }

    },[])
  return (<>
     {auth}

  </>
  )
}

export default Auth
