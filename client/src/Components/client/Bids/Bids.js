import React, { useEffect, useState } from 'react'
import { FaCircleUser } from 'react-icons/fa6'

function Bids(props) {
  const [time,setTime]=useState(null)

 
    const [currentDate, setCurrentDate] = useState(new Date());
  const [timeDifference, setTimeDifference] = useState(null);

  useEffect(() => {
    // Calculate the time difference when the component mounts
    const calculateTimeDifference = () => {
      const difference = currentDate - new Date(props?.date);

      const minutesDifference = (difference * -1) / (1000 * 60);
      if(minutesDifference  >1 && minutesDifference <60){
        setTime(minutesDifference + "m")
      }
      else if(minutesDifference > 60 && minutesDifference <3600){
  
        setTime(minutesDifference + "h")
  
      }else if(minutesDifference >3600){
  
  
        setTime(minutesDifference + "d")
  
  
      }
      setTimeDifference(difference *-1);
    };
   

    // Update the time difference every second (for real-time updates)
    const interval = setInterval(calculateTimeDifference, 1000);

    // Clean up the interval when the component is unmounted
    return () => clearInterval(interval);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(()=>{

  },[new Date(),timeDifference])
    console.log("time",time)
<<<<<<< HEAD
    
=======
>>>>>>> 802321716b56db79acec7e66d8e6f9c17aac17eb
  return (
  
  

    <div className='w-full flex items-center mt-2 border-2 border-gray-100 rounded-md'>
        <div className='w-3/12 flex items-center justify-center bg-gray-200 h-16 rounded-md mx-2'>
        <FaCircleUser size={40} className='text-gray-700' />

        </div>
        <div className='w-9/12 flex px-2'>
            <div className='w-full flex-col'>
                <h2 className='text-sm'>userName</h2>
                 <h3 className='text-sm'>email</h3> 
                 <div className='w-full flex justify-between'>
                 <h2>offer : <span className='text-red-500'>{props.price}</span></h2> 
                <span>{time}</span>
                 </div>

            </div>
        </div>

    </div>

   
  )
}

export default Bids
