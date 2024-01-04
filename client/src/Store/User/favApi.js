// api.js
import Axios from '@/leb/Axios';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { HYDRATE } from 'next-redux-wrapper'
// Create an Axios instance

 const axiosBaseQuery =
 ({ baseUrl } = { baseUrl: '' }) =>
  async ({ url, method, data, params }) => {
    try {
      const result = await Axios({ url: baseUrl + url, method, data, params })
      return { data: result.data }
    } catch (axiosError) {
      let err = axiosError
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      }
    }
  } 
export const favApi = createApi({
  reducerPath: 'favApi',
  baseQuery: axiosBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_FAV_URL ,
  }), // Use Axios as the fetch function
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath]
    }
  },
  endpoints: (builder) => ({
   
    getFav: builder.query({
      query: ({cookie}) => {
        console.log("cookie from api : ",cookie)
        return{
          
            url: `/api/favorite`,
            method:'get',
            headers:{
              Cookie: cookie
            }
             
        }
      },
        
    }),
    postFav: builder.mutation({
      query: ({patch,cookie}) => ({
        url: `/api/favorite/add`,
        method:'post',
        data:patch,

        headers:{
          Cookie: cookie
        },
         }),
        
    }),

    destroyFav: builder.mutation({
      query: ({id,cookie}) => {
        console.log("id ------------------:",id, "cookie ------------------ :",cookie)
        return {
          url: `/api/favorite/delete?post=${id}`,
          method:'POST',
  
          headers:{
            Cookie: cookie
          },
           }
      },
        
    }),
  }),
  async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
    const patchResult = dispatch(
        cartApi.util.updateQueryData('getAllProductsByCategory', id, (draft) => {
        Object.assign(draft, patch)
      })
    )
    try {
      await queryFulfilled
    } catch {
      patchResult.undo()

      /**
       * Alternatively, on failure you can invalidate the corresponding cache tags
       * to trigger a re-fetch:
       * dispatch(api.util.invalidateTags(['Post']))
       */
    }
  },
});

export const {
    useGetFavQuery,
    usePostFavMutation,
    useDestroyFavMutation,
    util: { getRunningQueriesThunk  },
  } = favApi;
  export const {getFav,postFav,destroyFav}= favApi.endpoints;