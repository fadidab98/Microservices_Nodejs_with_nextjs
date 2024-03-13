import React, { useEffect, useState,useRef } from 'react'
import SelectInput from "../../SelectInput/index"
import ar from '../../../../../locales/ar'
import en from '../../../../../locales/en'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
const Select = dynamic(() => import('react-select'), { ssr: false });

function Index(props) {
    const {locale}= useRouter()
    const router =useRouter()
    const t = locale=='en'?en:ar;
    const [inputs,setInputs]=useState({})
    const [labels,setLabels]=useState({})
    const [location,setLocation]=useState({})
    const options= [{value:"",label:"All"}]
    const priceOptions= [
      {value:"",label:"All"},
      {value:"1",label:"between 50000000 and 100000000"},
      {value:"2",label:"between 100000000 and 150000000"},
      {value:"3",label:"More than 150000000"},
    ]
    const areaOptions= [
      {value:"",label:"All"},
      {value:"1",label:"<=50 m²"},
      {value:"2",label:"<= 100 m²"},
      {value:"3",label:"<= 200 m²"},
      {value:"4",label:"<= 250 m²"},
      {value:"5",label:"<= 300 m²"},
    ]
    const typeRef = useRef({})
    const { query } = router;

    props.data?.map(val=>{

      return options.push({value:val.id,label:val.location})
    });
    const typeOptions = [
      {value:"",label:"all"},
      {value:"0",label:"Sale"},
      {value:"1",label:"Sale2"}
    ]
    const floorOptions = [
      {value:"",label:"all"},
      {value:"0",label:"Grund Floor"},
      {value:"1",label:"1"},
      {value:"2",label:"2"},
      {value:"3",label:"3"},
      {value:"4",label:"4"},
      {value:"5",label:"5"},
      {value:"6",label:"6"},
      {value:"7",label:"7"},
    ]
    
    console.log("from filter",options)
      const  handleType=(e)=>{

        setInputs({...inputs,type:e.value})
        typeRef.current={...inputs,type:e.value}
        console.log("inputs2",typeRef.current)

        setLabels({...labels,type:e.label})
        if(!e.value)
        {
          const { type, ...restQuery } = query;

    // Set the query parameter you want to remove to undefined
         
          router.push({
            pathname: router.pathname, // Replace with the desired page URL
            query:restQuery, // Replace with your query parameters
          });
        }else{
          router.push({
            pathname: router.pathname, // Replace with the desired page URL
            query: { ...router.query, ...typeRef.current ,page:1}, // Replace with your query parameters
          });
        }
      }
      const handleLocation = (e) => {
       
        setInputs({...inputs,location:e.value})
        typeRef.current={...inputs,location:e.value}
        setLabels({...labels,location:e.label})
        if(!e.value)
        {
          const { location, ...restQuery } = query;

    // Set the query parameter you want to remove to undefined
         
          router.push({
            pathname: router.pathname, // Replace with the desired page URL
            query:restQuery, // Replace with your query parameters
          });
        }else{
          router.push({
            pathname: router.pathname, // Replace with the desired page URL
            query:{ ...router.query, ...typeRef.current ,page:1} , // Replace with your query parameters
          });
        }
       
       
      };
      const  handlePrice=(e)=>{

        setInputs({...inputs,price:e.value})
        typeRef.current={...inputs,price:e.value}
        console.log("inputs2",typeRef.current)

        setLabels({...labels,price:e.label})
        if(!e.value)
        {
          const { price, ...restQuery } = query;

    // Set the query parameter you want to remove to undefined
         
          router.push({
            pathname: router.pathname, // Replace with the desired page URL
            query:restQuery, // Replace with your query parameters
          });
        }else{
          router.push({
            pathname: router.pathname, // Replace with the desired page URL
            query:{ ...router.query, ...typeRef.current ,page:1} , // Replace with your query parameters
          });
        }
      }
      const  handleFloor=(e)=>{

        setInputs({...inputs,floor:e.value})
        typeRef.current={...inputs,floor:e.value}
        console.log("inputs2",typeRef.current)

        setLabels({...labels,floor:e.label})
        if(!e.value)
        {
          const { floor, ...restQuery } = query;

    // Set the query parameter you want to remove to undefined
         
          router.push({
            pathname: router.pathname, // Replace with the desired page URL
            query:restQuery, // Replace with your query parameters
          });
        }else{
          router.push({
            pathname: router.pathname, // Replace with the desired page URL
            query:{ ...router.query, ...typeRef.current ,page:1} , // Replace with your query parameters
          });
        }
      }
      const  handleArea=(e)=>{

        setInputs({...inputs,area:e.value})
        typeRef.current={...inputs,area:e.value}
        console.log("inputs2",typeRef.current)

        setLabels({...labels,area:e.label})
        if(!e.value)
        {
          const { area, ...restQuery } = query;

    // Set the query parameter you want to remove to undefined
         
          router.push({
            pathname: router.pathname, // Replace with the desired page URL
            query:restQuery, // Replace with your query parameters
          });
        }else{
          router.push({
            pathname: router.pathname, // Replace with the desired page URL
            query:{ ...router.query, ...typeRef.current ,page:1} , // Replace with your query parameters
          });
        }
      }
console.log("inputs",typeRef.current)

  return (
    <div className='w-full h-16  pt-16'>
      
        <div className='w-full h-16 bg-green-800 grid grid-cols-5 flex items-center px-2 opacity-70'>
            <div className='m-2 opacity-100 relative'>
              
            <Select id="location" placeholder={t.filter.location} aria-label="location" options={options} value={labels?.location} onChange={handleLocation}/>
            </div>
            <div className='m-2 relative'>
                    <Select id="forsale"   placeholder={t.filter.forsale} aria-label="forsale" options={typeOptions} value={labels?.type} onChange={handleType}/>

            </div>
            <div className='m-2 relative'>
                       <Select  aria-label="price"  id="price" name="price"  placeholder={t.filter.price} options={priceOptions} onChange={handlePrice}/>

            </div>
            <div className='m-2 relative'>
                       <Select  aria-label="Floor"  id="Floor" name="Floor"  placeholder={t.filter.rooms} options={floorOptions} onChange={handleFloor}/>

            </div>
            <div className='m-2 relative'>
                      <Select  aria-label="area"  id="area" name="area" placeholder={t.filter.area} options={areaOptions} onChange={handleArea}/>
            </div>
     
        </div>
        
      
    </div>
  )
}

export default Index