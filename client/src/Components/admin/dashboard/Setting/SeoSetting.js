import React, { useEffect } from 'react'

function SeoSetting() {
    useEffect(() => {
        const init = async () => {
          const { Tab,
            initTE,
           } = await import("tw-elements");
          initTE({ Tab });
        };
        init();
      }, []);
  return (
    <div>
        <div className='m-3'>
          <h2 className='text-lg '>EN Setting :</h2>
        </div>
      <div class="relative z-0 w-full mb-6 group m-4">
              <input  name='seo_title'type="title"  id="title" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required autocomplete="off" />
              <label  for="title" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Seo Title</label>
      </div> 
      <div class="relative z-0 w-full mb-6 group m-4">
              <input  name='title'type="title"  id="title" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required autocomplete="off" />
              <label  for="title" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Seo Description</label>
      </div> 
        <div className='w-full m-4 text-green-700 '>
  
          {/* Data */}
          <div className="mb-3 w-full">
            <label
              for="formFileMultiple"
              className="mb-2 inline-block text-neutral-700 dark:text-neutral-200"
              >Image</label>
            <input
              className="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
              type="file"
              name='image'
              id="formFileMultiple"
              />
          </div>

        </div>  
      
      </div>
  )
}

export default SeoSetting
