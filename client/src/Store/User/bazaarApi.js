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
export const bazaarApi = createApi({
  reducerPath: 'bazaarApi',
  baseQuery: axiosBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BAZAAR_URL ,
  }), // Use Axios as the fetch function
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath]
    }
  },
  endpoints: (builder) => ({
   
    postOffer: builder.mutation({
      query: ({id,patch}) => ({
        url: `/api/bazaar/post?postid=${id}`,
        method:'post',
        data:patch,
         }),
        
    }),
    postBazaar: builder.mutation({
      query: ({patch,cookie}) => ({
        url: `/api/bazaar/create`,
        method:'POST',
        headers:{
          Cookie: cookie
        },
        data:patch,
         }),
        
    }),
    getBids: builder.query({
      query: ({id,cookie}) => {
        console.log("id:",id,"cookie :",cookie)
      return {
        url: `/api/bazaar/post/bids?post=${id}`,
        method:'get',
        headers:{
          Cookie: cookie
        },
         }      },
        
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
    usePostOfferMutation,
    usePostBazaarMutation,
    useGetBidsQuery,
    util: { getRunningQueriesThunk  },
  } = bazaarApi;
  export const {postOffer,postBazaar,getBids}= bazaarApi.endpoints;