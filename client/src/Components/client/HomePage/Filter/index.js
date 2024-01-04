import React from 'react'
import SelectInput from "../../SelectInput/index"
import ar from '../../../../../locales/ar'
import en from '../../../../../locales/en'
import SearchButton from "../../../SearchButton/index"

import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import LoadingSelect from '../../Loading/loadingSelect'
import Select from 'react-select'


function Index() {
  const {locale} = useRouter()
  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ]  
  const t= locale=="en"?en:ar
  return (
    

    <div className='absolute lg:left-1/4 md:left-1/5 sm:left:1/12 lg:right-1/4 md:right-1/5 sm:right:1/12   top-1/3 bg-lime-800 opacity-80 lg:w-1/2 md:w-3/4 sm:w-full  z-40 p-7 rounded-xl'>
        <div className='flex flex-wrap  w-full justify-center'>
            <div className='lg:w-48 md:w-60 sm:w-60 xs:w-full   m-2 z-40' aria-labelledby='mySelect1'>
            <label htmlFor="mySelect1"></label>
            <Select    placeholder={t.filter.location} options={options}/>
            </div>
            <div className='lg:w-48 md:w-60 sm:w-60 xs:w-full  m-2 z-30' aria-labelledby="mySelect2">
            <label htmlFor='mySelect2'></label>

            <Select   placeholder={t.filter.forsale} options={options}/>
            </div>
            <div className='lg:w-48 md:w-60 sm:w-60 xs:w-full  m-2 z-20' aria-labelledby='mySelect3'>
            <label htmlFor='mySelect3'></label>

            <Select  placeholder={t.filter.price} options={options}/>
   
            </div>
          
        
            <div className='lg:w-48 md:w-60 sm:w-60 xs:w-full m-2 z-10 ' aria-labelledby='mySelect4'>
            <label htmlFor='mySelect4'></label>

            <Select  placeholder={t.filter.rooms} options={options}/>

            </div>
            <div className='lg:w-48 md:w-60 sm:w-60 xs:w-full m-2 z-0'  aria-labelledby='mySelect5'>
            <label htmlFor='mySelect5'></label>

            <Select placeholder={t.filter.area} options={options}/>

            </div>
            <div className=' lg:w-48 md:w-60 sm:w-60 xs:w-60 m-2 '>
               <SearchButton t={t}/>
            </div>
          
        </div>
    </div>

  )
}

export default Index