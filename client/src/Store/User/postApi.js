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
export const postApi = createApi({
  reducerPath: 'postApi',
  baseQuery: axiosBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_POSTS_URL ,
  }), // Use Axios as the fetch function
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath]
    }
  },
  endpoints: (builder) => ({
    getAllPosts: builder.query({
<<<<<<< HEAD
      query: ({page,location,type,price,area,floor}) => ({ url: `/posts?page=${page}&location=${location}&type=${type}&price=${price}&area=${area}&floor=${floor}`, method: 'get' }),
=======
      query: ({page,location,type,price}) => ({ url: `/posts?page=${page}&location=${location}&type=${type}&price=${price}`, method: 'get' }),
>>>>>>> 802321716b56db79acec7e66d8e6f9c17aac17eb
     

    }),
    // Add more endpoints as needed
    getLocation: builder.query({
      query: () => ({ url: `/add-house`, method: 'get' }),
     

    }),
    postPost: builder.mutation({
      query: ({lang,patch,cook}) => ({
        url: `/post/create?lang=${lang}`,
        method:'post',
        data:patch,
        headers:{
          Cookie: cook
        },
         }),
        

    }),
    getUserPosts:builder.query({
      query:({cookie})=>( {
        url:"/api/post/userPosts",
        method:"get",
        headers:{
          Cookie: cookie
        },
      })
    }),
    getUserPost:builder.query({
      query:({cookie,id})=>( {
        url:`/api/post/userPost?post=${id}`,
        method:"get",
        headers:{
          Cookie: cookie
        },
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
    useGetAllPostsQuery,
    useGetLocationQuery,
    usePostPostMutation,
    useGetPostCountQuery,
    useGetUserPostsQuery,  
    util: { getRunningQueriesThunk  },
  } = postApi;
  export const {getAllPosts,getLocation,postPost,getPostCount,getUserPosts,getUserPost}= postApi.endpoints;