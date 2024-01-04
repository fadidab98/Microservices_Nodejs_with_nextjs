// api.js
import Axios from '@/leb/Axios';
import { createApi } from '@reduxjs/toolkit/query/react';

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
export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: axiosBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_USERS_URL,
  }), // Use Axios as the fetch function
  extractRehydrationInfo(action, {reducerPath}) {
    if (action.type === HYDRATE) {
      return action.payload [ reducerPath ] 
    }
  },
  endpoints: (builder) => ({
    loginPost: builder.mutation({
      query: ({patch,csrfToken}) => {
        console.log("patch: ",patch," csrf : ",csrfToken)
        return {
          url: `/login`,
           method: 'post',
           headers: {
             'X-CSRF-Token': csrfToken,
           },
           data:patch ,
       }
      },
      
    }),
    getUserCount: builder.query({
      query:()=> ({url:`/api/dashboard/userCount`, method: 'get'}),
     
    }),
    getCheckAuthUser: builder.query({
      query:(cookie)=> ({
        url:`/api/user/auth`, 
      method: 'get',  
        headers:{
          
        Cookie: cookie
      },}),

      
    }),
    getCsrfToken: builder.query({
      query: () => ({
      url: `/csrf-token`,
      method: 'get'
    }), 
    invalidates: [{ endpointName: 'getCsrfToken' }],
    mergeStrategy: 'merge',

    }),
    
 
  
 /*    postPost: builder.mutation({
      query: ({lang,patch}) => ({
        url: `post/create?lang=${lang}`,
        method:'post',
        data:patch
         }),
    }), */
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
    useLoginPostMutation,
    useGetUserCountQuery,
    useGetCsrfTokenQuery,
    useGetTokenQuery,
    useGetCheckAuthUserQuery,
    util: { getRunningQueriesThunk  },
  } = userApi;
  export const {loginPost,getUserCount,getCsrfToken,getToken,getCheckAuthUser}= userApi.endpoints;