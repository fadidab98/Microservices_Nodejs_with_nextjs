import React from 'react'
import Link from "next/link"
import { useRouter } from 'next/router'
import en from '../../../../locales/en'
import ar from '../../../../locales/ar'
function Register() {
    const {locale,locales,asPath} = useRouter()

    const t= locale=="en"?en:ar

  return (
    <>
    <li className='mx-2 border-2 border-lime-700 px-5 rounded-xl hover:bg-lime-700 hover:text-white text-lime-900'><Link rel="preconnect" className='block w-full' href="/login">{t.navbar.login}</Link></li>
<li className='mx-2 border-2 border-lime-700 px-5 rounded-xl hover:bg-lime-700 hover:text-white text-lime-900'><Link rel="preconnect" className='block w-full' href="/register">{t.navbar.register}</Link></li>  

    </>
  )
}

export default Register
