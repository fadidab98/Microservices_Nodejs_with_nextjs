import React from 'react'
import Link from "next/link"
import { useRouter } from 'next/router';
function UserNav() {
  const { asPath } = useRouter();

  return (
    <div className='w-full flex justify-center'>
        <ul className=' flex py-2  w-full text-center'>
            <li className={`p-2 bg-red-500 rounded-md m-1 text-white w-4/12  `}><button disabled className='block w-full h-full'>Chat</button></li>
            <li className={`p-2 bg-gray-100 rounded-md m-1 text-green-900 w-4/12  ${asPath =="/user/dashboard/favorite"?" border-b-2 border-green-700 ":""}`}><Link href="/user/dashboard/favorite" className='block w-full h-full'>Favorite</Link> </li>
            <li  className={`p-2 bg-gray-100 rounded-md m-1 text-green-900 w-4/12 di  ${asPath =="/user/dashboard"?" border-b-2 border-green-700 ":""}`}><Link href="/user/dashboard" className='block w-full h-full'>Your Houses</Link>   </li>


        </ul>
      
    </div>
  )
}

export default UserNav
