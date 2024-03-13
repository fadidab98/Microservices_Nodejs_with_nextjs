import React from 'react'

function index(props) {
  return (
    <button className=' w-full rounded-md p-2 bg-white flex  items-center justify-center hover:bg-lime-800 hover:text-white outline outline-white hover:outline-offset-0 '>{props.t.basic.search}</button>   
  )
}

export default index