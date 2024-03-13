import React from 'react'
import DashCard from '../dashboard/DashCard'
import { FaUsersLine } from "react-icons/fa6";
import { FaHouseUser } from "react-icons/fa";
import { BiSolidCategory } from "react-icons/bi";

function DashHome({childe,color,post,user,category}) {
  console.log("user count :",user)
  return (<>
    <div className=' flex justify-center flex-wrap '> 
        <DashCard color={"bg-gradient-to-r  from-sky-500 from-10% to-emerald-500 to-60%"} lik="/dashboard/users" count={user} icon={<FaUsersLine size={50}/>} title={"Users"}/> {/* users */}
        <DashCard color={"bg-gradient-to-r   from-emerald-500 from-10% to-teal-500 to-60%"} lik="/dashboard/houses" count={post} icon={<FaHouseUser size={50} />}title={"House"}/>{/* posts */}
        <DashCard color={"bg-gradient-to-r  from-teal-500 from-30% to-sky-500 to-80%"} lik="/dashboard/category" count={category} icon={<BiSolidCategory size={50} />}title={"Category"}/>   {/* earnings */}
{/*         <DashCard color={"bg-indigo-500"} count={post}/>
 */}    </div>

</>
  )
}

export default DashHome