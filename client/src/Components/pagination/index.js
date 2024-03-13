import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md'

function Index(props) {
  console.log("pagination :",props)
const router = useRouter();
const links =[]
  const handlePagination=(page)=>{
    router.push({
      pathname: router.pathname,
      query: { ...router.query, ...page },
    })

  }
  for(let i = 1 ; i<= props.data?.totalPage ; i++){
    links.push(<li key={i}><button onClick={()=>handlePagination({page:i})} className='py-1 px-2 rounded-full bg-green-400 text-white mx-1' >{i}</button> </li>)

  }
  return (
    <ul className='w-auto flex items-center m-auto my-2 ' dir="ltr">
      {props.data?.previous.page ==0 ?(
                      <li><button className='py-1 px-1  text-green-500 mx-1 flex ' disabled ><MdArrowBackIos/></button></li>


     ):(
      <li><button onClick={()=>handlePagination({page:props.data?.previous.page})} className='py-1 px-1  text-green-500 mx-1 flex' ><MdArrowBackIos/></button></li>

      )}
    {links}
        
        {(props.data?.next.page == props.data?.totalPage +1)?(
       <li><button  className='py-1 px-1  text-green-500 mx-1 flex' ><MdArrowForwardIos/></button></li>

        ):(
          <li><button onClick={()=>handlePagination({page:props.data?.next.page})} className='py-1 px-1  text-green-500 mx-1 flex' ><MdArrowForwardIos/></button></li>

        )}

    </ul>
  )
}

export default Index