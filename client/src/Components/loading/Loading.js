import React, { useEffect } from 'react'

function Loading() {
    useEffect(()=>{
        const use = async () => {
          (await import('tw-elements')).default;
            };
            use();
          
       
       },[])
  return (
    <div id="loading-growing-spinner " className="h-96 w-full flex items-center justify-center">
  <div
  className='w-10 h-10' 
     data-te-loading-management-init
    data-te-parent-selector="#loading-growing-spinner">
    <div
      data-te-loading-icon-ref
      className="inline-block bg-lime-700 h-8 w-8 animate-[spinner-grow_0.75s_linear_infinite] rounded-full bg-current opacity-0 motion-reduce:animate-[spinner-grow_1.5s_linear_infinite]"
      role="status"></div>
    <span className='text-lime-700 -m-2' data-te-loading-text-ref>Loading...</span>
  </div>
</div>
  )
}

export default Loading
