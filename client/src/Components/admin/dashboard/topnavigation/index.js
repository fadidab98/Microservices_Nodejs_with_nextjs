import { BsBellFill } from 'react-icons/bs';
import { useToggle } from '../provider/context';
import Image from 'next/image';
import { useEffect } from 'react';
import { io } from 'socket.io-client';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useGetNotQuery } from '@/Store/Dashboard/notificationDashApi';
import Link from 'next/link';

export default function TopNavigation() {
  const [not,setNot]= useState([])
  const cook = useSelector((state)=>state.setting.setting.cookies)
  const [merg,setMerg]= useState([])
  const [notnummber,setNotnummber]= useState(1)

  const {data:notification,refetch }= useGetNotQuery({notnummber,cook})
 const socket = io('http://localhost:5000');

  useEffect(()=>{
    socket?.on("getNotification",(data)=>{
      setNot([data])
    })


  },[socket])
  useEffect(() => {
    const init = async () => {
      const { Dropdown,
        Ripple,
        initTE, } = await import("tw-elements");
        initTE({ Dropdown, Ripple });
      };
    init();
  }, []);

 console.log("not",not)
  const handleNot =()=>{
    setNotnummber(notnummber+1);
    console.log(notnummber)
    refetch({notnummber,cook})

  }
 console.log("notification :",notification)

  const { toggle } = useToggle();
  return (
    <header className="bg-green-900 h-20 items-center relative w-full z-10 shadow-xl">
      <div className="flex flex-col h-full justify-center mx-auto px-3 relative">
        <div className="flex items-center pl-1 relative w-full sm:ml-0 sm:pr-2 lg:max-w-68">
          <div className="flex left-0 relative w-3/4">
            <div className="flex group h-full items-center relative w-12">
              <button
                type="button"
                aria-expanded="false"
                aria-label="Toggle sidenav"
                onClick={toggle}
                className="text-4xl text-white focus:outline-none lg:hidden"
              >
                &#8801;
              </button>
            </div>
          </div>
          <div className="flex items-center justify-end ml-5 p-1 relative w-full sm:mr-0 sm:right-auto">
            <a href="#" className="block pr-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5.636 18.364a9 9 0 010-12.728m12.728 0a9 9 0 010 12.728m-9.9-2.829a5 5 0 010-7.07m7.072 0a5 5 0 010 7.07M13 12a1 1 0 11-2 0 1 1 0 012 0z"
                />
              </svg>
            </a>
            <div class="relative" data-te-dropdown-ref>
  
  <button
   className='block pr-5'
    type="button"
    id="dropdownMenuButton1ds"
    data-te-dropdown-toggle-ref
    aria-expanded="false"
    
   >
   <div className='relative'>
              <BsBellFill className='text-white' size="30px"/>
         {not?.length>0 ?(<div className='absolute right-0 top-0 w-4 h-4 bg-red-600 rounded-full shadow-inner shadow-red-500 text-sm text-white'>{not.length}</div>):""}     
         </div>
  </button>
  <ul
    className="absolute z-[1000] p-1 float-left m-0 hidden min-w-max list-none overflow-hidden rounded-lg border-none bg-white bg-clip-padding text-left text-base shadow-lg dark:bg-neutral-700 [&[data-te-dropdown-show]]:block w-36 max-h-96 h-auto  overflow-y-scroll"
    aria-labelledby="dropdownMenuButton1ds"
    data-te-dropdown-menu-ref>
    
      {not?.map(noti=>{
        return <li className="w-full flex p-1  m-1 border bg-gray-50 rounded-md " key={noti.postid}>
          <Link className={`w-full flex p-1  m-1 border  rounded-md ${noti.status == 1?"":"bg-gray-50"}`}  href={`/dashboard/notification/${noti.postid}`}>
          <div className='p-1'>
            <h1 className='text-sm mt-1'><span className='font-bold'>{noti.username}</span>  has added a new house</h1>
            
          </div>
          <div className='w-14 h-14 relative rounded-md'>
              <Image src={noti.image} fill alt='No Image' className='rounded-md' loading="lazy"/>
            </div>
            </Link>
    </li>
      })}
        {notification?.data?.map(noti=>{
        return <li className={`w-full flex p-1  m-1 border  rounded-md ${noti.status == 1?"":"bg-gray-50"}`} key={noti.notification.postid}>
                  <Link className={`w-full flex p-1  m-1 border  rounded-md ${noti.status == 1?"":"bg-gray-50"}`} href={`/dashboard/notification/${noti.notification.id}`}>

        <div className='p-1'>
          <h1 className='text-sm mt-1'><span className='font-bold'>{noti.user.username}</span>  has added a new house</h1>
          
        </div>
        <div className='w-14 h-14 relative rounded-md'>
            <Image src={noti.notification.image} fill alt='No Image' className='rounded-md' loading="lazy"/>
          </div>
          </Link>
      </li>
      })}
   
   <li className='w-full'><button onClick={handleNot} className='w-full p-1 bg-gray-50'>Show More</button></li>

  </ul>
</div>
      
            <a href="#" className="block relative">
              <Image
              width="33"
              height="33"
                alt="Enoch Ndika"
                src="/images/1.jpg"
                className="h-10 mx-auto object-cover rounded-full w-10"
              />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
