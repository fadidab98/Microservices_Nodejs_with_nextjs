import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import ar from "../../../../locales/ar/index"

import en from "../../../../locales/en/index"
import { useRouter } from 'next/router'
import { RiArrowDownSLine } from 'react-icons/ri';
import { HiOutlineBars4 } from "react-icons/hi2";
import { useDispatch, useSelector } from 'react-redux'
import { changeTogle } from '@/Store/settingSlice'
import { changeSlideButton } from '@/Store/settingSlice';
import { TbDatabaseSearch } from "react-icons/tb";
import { MdOutlineLanguage } from "react-icons/md";
import { MdAddHome } from "react-icons/md";
import { FcAbout } from "react-icons/fc";
import { IoMdHome } from "react-icons/io";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import Auth from './Auth'

function Navbar() {
  const {locale,locales,asPath} = useRouter()
  const dispatch = useDispatch()
  const toggle = useSelector((state)=>state.setting.setting.toggle)
/*   const cookie =  Cookies.get("accessToken")
 */ 
  const t= locale=="en"?en:ar
  const handleToggle=()=>{
    dispatch(changeTogle(toggle))
  }
  const languageButton = useSelector(state=>state.setting.setting?.languageButton)||false
  const serviceButton = useSelector(state=>state.setting.setting?.serviceButton)||false

      const handleButton =({key,value})=>{
        console.log("key :",key)
        dispatch(changeSlideButton({key:key,value:value}))
        
      }

      /*  */
  return (<>
    <nav className='bg-gray-50 flex flex-row items-center justify-between h-16 px-5  opacity-90 fixed left-0 right-0 z-50	shadow-lg w-full'>
      <div className='p-0  m-0  flex items-center h-full w-36 text-lg'>
        <div className='w-full h-9 relative '>
<<<<<<< HEAD
        <Image src={"https://res.cloudinary.com/demo/image/fetch/f_auto/https://res.cloudinary.com/dg2c3liap/image/upload/v1703829320/logo_lr20sf.png"}  width={200} height={100} priority layout="responsive" alt="Image Error"    /> 
=======
        <Image src={"https://res.cloudinary.com/demo/image/fetch/f_auto/https://res.cloudinary.com/dg2c3liap/image/upload/v1703829320/logo_lr20sf.png"}  width={200} height={100} priority layout="responsive" alt="Image Error"  loading="lazy"  /> 
>>>>>>> 802321716b56db79acec7e66d8e6f9c17aac17eb

        </div>

      </div>
      <div className='flex items-center justify-between  w-full xl:flex-row lg:flex-row  md:flex-row-reverse sm:flex-row-reverse  xs:flex-row-reverse'>
    
          <ul className='flex items-center justify-between text-center w-100 xl:flex-row xl:flex lg:flex lg:flex-row md:hidden md:flex-row sm:flex-row xs:flex-row	 sm:hidden xs:hidden '>
            <li className=' text-lime-900 mx-1 w-full'><Link rel="preconnect" className='block w-full' href="/">{t.navbar.home}</Link> </li>
            <li className=' text-lime-900 mx-1 w-full'><Link rel="preconnect" className='block w-full' href="/services?page=1">{t.navbar.services}</Link> </li>
            <li className=' text-lime-900 mx-1 w-full'><Link rel="preconnect" className='block w-full' href="/aboutUs">{t.navbar.about}</Link></li>
            <li className=' text-lime-900 -mx-1 w-full'><Link rel="preconnect" className='block w-full' href="/add-house">{t.navbar.addHouse}</Link></li>
            <li className=' text-lime-900 -mx-1 opacity-100 w-full relative  text-center p-0 group'><div className='flex items-center justify-center opacity-100 backdrop-blur-2xl	'>{locale} <RiArrowDownSLine className='mx-2'/></div> 
            <ul className='absolute  invisible opacity-100 	  top-100 right-0 left-0 bg-white rounded-lg shdow-lg border-2 border-gray-50 w-full z-100 group-hover:visible'>
             {locales.map(loc=>{
              return <li key={loc} className='p-2 w-full opacity-100 hover:bg-lime-100'><Link rel="preconnect" className='block' href={asPath} locale={loc}>{loc}</Link></li>
             })}
              
          
              
            </ul>
            </li>

          </ul>
   

        {/* auth */}
        <ul className='flex items-center p-0 m-0 '>
            <li className='mx-2 border-b-0 text-lime-900 '>{t.navbar.search}</li>

            <li className='mx-2 border-b-0 text-lime-900 lg:flex md:hidden md:flex-row-reverse	 sm:hidden xs:hidden'>{t.navbar.favorite}</li>
            <Auth/>
               <li className='mx-2 border-b-0 text-lime-900'>

           <button  aria-label="Submit Form" onClick={handleToggle} className={`flex justify-center items-center xl:hidden lg:hidden md:block sm:block xs:block `}>
            <HiOutlineBars4 size={30}></HiOutlineBars4>

           </button>
             </li>
          </ul>
      </div>

    </nav>
    <nav className={` ${toggle?"xl:hidden lg:hidden md:fixed sm:fixed xs:fixed":"hidden"}  left-0 top-16 bottom-0 w-72 bg-white z-50 shadow-lg pt-5`}>
        <ul className="relative m-0 list-none px-[0.2rem]" data-te-sidenav-menu-ref>
           
            <li className="relative">
              <button 
              onClick={()=>handleButton({key:"serviceButton",value:serviceButton})}
              className="flex h-12 cursor-pointer w-full items-center truncate rounded-[5px] px-6 py-4 text-[0.875rem] text-gray-600 outline-none transition duration-300 ease-linear hover:bg-slate-50 hover:text-inherit hover:outline-none focus:bg-slate-50 focus:text-inherit focus:outline-none active:bg-slate-50 active:text-inherit active:outline-none data-[te-sidenav-state-active]:text-inherit data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none "
               >
                <TbDatabaseSearch
                  className="mr-4 [&>svg]:h-4 [&>svg]:w-4 [&>svg]:text-gray-400 dark:[&>svg]:text-gray-300">
                 
                </TbDatabaseSearch>
                <span>Services</span>
                <span
                  className="absolute right-0 ml-auto mr-[0.8rem] transition-transform duration-300 ease-linear motion-reduce:transition-none [&>svg]:text-gray-600 dark:[&>svg]:text-gray-300"
                  data-te-sidenav-rotate-icon-ref>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-5 w-5">
                    <path
                      fill-rule="evenodd"
                      d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                      clip-rule="evenodd" />
                  </svg>
                </span>
              </button>
              <ul
                className={` relative m-0  list-none p-0 ${serviceButton?"":" hidden "}`}
               >
                <li className="relative">
                  <Link rel="preconnect"
                  href="/services?page=1"
                    className="flex h-6 cursor-pointer items-center truncate rounded-[5px] py-4 pl-[3.4rem] pr-6 text-[0.78rem] text-gray-600 outline-none transition duration-300 ease-linear hover:bg-slate-50 hover:text-inherit hover:outline-none focus:bg-slate-50 focus:text-inherit focus:outline-none active:bg-slate-50 active:text-inherit active:outline-none data-[te-sidenav-state-active]:text-inherit data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none dark:text-gray-300 dark:hover:bg-white/10 dark:focus:bg-white/10 dark:active:bg-white/10"
                    data-te-sidenav-link-ref
                    >House</Link>
                </li>
                <li className="relative">
                  <a
                    className="flex h-6 cursor-pointer items-center truncate rounded-[5px] py-4 pl-[3.4rem] pr-6 text-[0.78rem] text-gray-600 outline-none transition duration-300 ease-linear hover:bg-slate-50 hover:text-inherit hover:outline-none focus:bg-slate-50 focus:text-inherit focus:outline-none active:bg-slate-50 active:text-inherit active:outline-none data-[te-sidenav-state-active]:text-inherit data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none dark:text-gray-300 dark:hover:bg-white/10 dark:focus:bg-white/10 dark:active:bg-white/10"
                    data-te-sidenav-link-ref
                    >Link 3</a>
                </li>
              </ul>
            </li>
            <li className="relative">
      <Link rel="preconnect"
        href="/"
        className="flex h-12 cursor-pointer items-center truncate rounded-[5px] px-6 py-4 text-[0.875rem] text-gray-600 outline-none transition duration-300 ease-linear hover:bg-slate-50 hover:text-inherit hover:outline-none focus:bg-slate-50 focus:text-inherit focus:outline-none active:bg-slate-50 active:text-inherit active:outline-none data-[te-sidenav-state-active]:text-inherit data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none dark:text-gray-300 dark:hover:bg-white/10 dark:focus:bg-white/10 dark:active:bg-white/10"
        >
        <IoMdHome
          className="mr-4 [&>svg]:h-4 [&>svg]:w-4 [&>svg]:text-gray-400 dark:[&>svg]:text-gray-300">
         
        </IoMdHome>
        <span>Home</span>
      </Link>
      </li>
      <li className="relative">
      <Link rel="preconnect"
            href="/aboutUs"

        className="flex h-12 cursor-pointer items-center truncate rounded-[5px] px-6 py-4 text-[0.875rem] text-gray-600 outline-none transition duration-300 ease-linear hover:bg-slate-50 hover:text-inherit hover:outline-none focus:bg-slate-50 focus:text-inherit focus:outline-none active:bg-slate-50 active:text-inherit active:outline-none data-[te-sidenav-state-active]:text-inherit data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none dark:text-gray-300 dark:hover:bg-white/10 dark:focus:bg-white/10 dark:active:bg-white/10"
        data-te-sidenav-link-ref>
        <FcAbout
          className="mr-4 [&>svg]:h-4 [&>svg]:w-4 [&>svg]:text-gray-400 dark:[&>svg]:text-gray-300 text-gray-300">
         
        </FcAbout>
        <span>About Us</span>
      </Link>
    </li>
    <li className="relative">
      <Link rel="preconnect"
      href="/add-house"
        className="flex h-12 cursor-pointer items-center truncate rounded-[5px] px-6 py-4 text-[0.875rem] text-gray-600 outline-none transition duration-300 ease-linear hover:bg-slate-50 hover:text-inherit hover:outline-none focus:bg-slate-50 focus:text-inherit focus:outline-none active:bg-slate-50 active:text-inherit active:outline-none data-[te-sidenav-state-active]:text-inherit data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none dark:text-gray-300 dark:hover:bg-white/10 dark:focus:bg-white/10 dark:active:bg-white/10"
        data-te-sidenav-link-ref>
        <MdAddHome
          className="mr-4 [&>svg]:h-4 [&>svg]:w-4 [&>svg]:text-gray-400 dark:[&>svg]:text-gray-300">
          
        </MdAddHome>
        <span>Add House</span>
      </Link>
    </li>
   
    <li className="relative">
              <button 
              onClick={()=>handleButton({key:"languageButton",value:languageButton})}

                className="flex h-12 cursor-pointer w-full items-center truncate rounded-[5px] px-6 py-4 text-[0.875rem] text-gray-600 outline-none transition duration-300 ease-linear hover:bg-slate-50 hover:text-inherit hover:outline-none focus:bg-slate-50 focus:text-inherit focus:outline-none active:bg-slate-50 active:text-inherit active:outline-none data-[te-sidenav-state-active]:text-inherit data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none "
               >
                    <MdOutlineLanguage
                  className="mr-4 [&>svg]:h-4 [&>svg]:w-4 [&>svg]:text-gray-400 dark:[&>svg]:text-gray-300">
                 
                </MdOutlineLanguage>
                <span>Language</span>
                <span
                  className="absolute right-0 ml-auto mr-[0.8rem] transition-transform duration-300 ease-linear motion-reduce:transition-none [&>svg]:text-gray-600 dark:[&>svg]:text-gray-300"
                  data-te-sidenav-rotate-icon-ref>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-5 w-5">
                    <path
                      fill-rule="evenodd"
                      d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                      clip-rule="evenodd" />
                  </svg>
                </span>
              </button>
              <ul
                className={` relative m-0  list-none p-0 ${languageButton?"":" hidden "}`}
               >
                {locales.map(loc=>{
              return <li key={loc} className="relative">
              <Link rel="preconnect"
                className="flex h-6 cursor-pointer items-center truncate rounded-[5px] py-4 pl-[3.4rem] pr-6 text-[0.78rem] text-gray-600 outline-none transition duration-300 ease-linear hover:bg-slate-50 hover:text-inherit hover:outline-none focus:bg-slate-50 focus:text-inherit focus:outline-none active:bg-slate-50 active:text-inherit active:outline-none data-[te-sidenav-state-active]:text-inherit data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none dark:text-gray-300 dark:hover:bg-white/10 dark:focus:bg-white/10 dark:active:bg-white/10"
                href={asPath} locale={loc}>{loc}
              </Link>
              </li>
              
             })}
                <li className="relative">
                  <a
                    className="flex h-6 cursor-pointer items-center truncate rounded-[5px] py-4 pl-[3.4rem] pr-6 text-[0.78rem] text-gray-600 outline-none transition duration-300 ease-linear hover:bg-slate-50 hover:text-inherit hover:outline-none focus:bg-slate-50 focus:text-inherit focus:outline-none active:bg-slate-50 active:text-inherit active:outline-none data-[te-sidenav-state-active]:text-inherit data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none dark:text-gray-300 dark:hover:bg-white/10 dark:focus:bg-white/10 dark:active:bg-white/10"
                    data-te-sidenav-link-ref
                    >House</a>
                </li>
                <li className="relative">
                  <a
                    className="flex h-6 cursor-pointer items-center truncate rounded-[5px] py-4 pl-[3.4rem] pr-6 text-[0.78rem] text-gray-600 outline-none transition duration-300 ease-linear hover:bg-slate-50 hover:text-inherit hover:outline-none focus:bg-slate-50 focus:text-inherit focus:outline-none active:bg-slate-50 active:text-inherit active:outline-none data-[te-sidenav-state-active]:text-inherit data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none dark:text-gray-300 dark:hover:bg-white/10 dark:focus:bg-white/10 dark:active:bg-white/10"
                    data-te-sidenav-link-ref
                    >Link 3</a>
                </li>
              </ul>
            </li>
            <li className="relative">
      <a
        className="flex h-12 cursor-pointer items-center truncate rounded-[5px] px-6 py-4 text-[0.875rem] text-gray-600 outline-none transition duration-300 ease-linear hover:bg-slate-50 hover:text-inherit hover:outline-none focus:bg-slate-50 focus:text-inherit focus:outline-none active:bg-slate-50 active:text-inherit active:outline-none data-[te-sidenav-state-active]:text-inherit data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none dark:text-gray-300 dark:hover:bg-white/10 dark:focus:bg-white/10 dark:active:bg-white/10"
        data-te-sidenav-link-ref>
        <MdOutlineFavoriteBorder
          className="mr-4 [&>svg]:h-4 [&>svg]:w-4 [&>svg]:text-gray-400 dark:[&>svg]:text-gray-300">
          
        </MdOutlineFavoriteBorder>
        <span>Favorite</span>
      </a>
    </li>
        </ul>
     </nav>
    </>
  )
}

export default Navbar