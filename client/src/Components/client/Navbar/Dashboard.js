import React from 'react'
import Link from "next/link"

function Dashboard() {
  return (
    <li className='mx-2 border-2 border-lime-700 px-5 rounded-xl hover:bg-lime-700 hover:text-white text-lime-900'><Link rel="preconnect" className='block w-full' href="/user/dashboard">Dashboard</Link></li>   
  )
}

export default Dashboard
