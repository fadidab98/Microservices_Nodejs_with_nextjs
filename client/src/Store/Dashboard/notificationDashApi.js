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
export const notificationDashApi = createApi({
  reducerPath: 'notificationDashApi',
  baseQuery: axiosBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_NOTIFICATION_URL,
  }), // Use Axios as the fetch function
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath]
    }
  },
  endpoints: (builder) => ({

 
   getNot: builder.query({
    query:({notnummber,cook})=> ({
      url:`/api/notification?number=${notnummber}`,
      method:'GET',
      headers:{
        Cookie: cook
      },
    })
   }),
   getNotIds:builder.query({
    query:()=>({
     url:`/api/dashboard/notification/all`,
     method:"GET"
    })
   }),
   getShowNot: builder.query({
    query:({id})=>({
        url:`/api/dashboard/notification/show?id=${id}`,method:"get"
    })
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
    useGetNotQuery,
  
    util: { getRunningQueriesThunk  },
  } = notificationDashApi;
  export const {getNot,getNotIds,getShowNot}= notificationDashApi.endpoints;