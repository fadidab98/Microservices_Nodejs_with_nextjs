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
export const postDashApi = createApi({
  reducerPath: 'postDashApi',
  baseQuery: axiosBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_POSTS_URL,
  }), // Use Axios as the fetch function
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath]
    }
  },
  endpoints: (builder) => ({

    getPostCount: builder.query({
      query: () => (
        {
           url: `/api/dashboard/postCount`,
           method: 'get',
          
          }
        )
    }),
    getShowPost: builder.query({
      query:({id})=>({
          url:`/api/category/show?id=${id}`,method:"get"
      })
  }),

  getAllPostId: builder.query({
    query:()=>({
        url:`/api/category/all`,method:"get"
    })
  }),
  getAllDashPost: builder.query({
    query:({page,search})=>({
        url:`/api/dashboard/posts?page=${page}${search?"&search="+search:''}`,method:"get"
    })
  }),
  destroyPost: builder.mutation({
    query:({id})=> ({
      url:`/api/dashboard/post/delete?id=${id}`,
      method:'POST',
    
    })
   }),
   getShowPost: builder.query({
    query:({id})=>({
        url:`/api/post/show?id=${id}`,method:"get"
    })
}),

getAllPostId: builder.query({
  query:()=>({
      url:`/api/post/all`,method:"get"
  })
}),
   postPostDash: builder.mutation({
    query: ({patch}) => ({
      url: `/api/dashboard/post/create`,
      method:'POST',
      data:patch,
    
       }),
      

  }),
  getpostUser: builder.query({
    query:({userid,postid})=>({
        url:`/api/post/show?userid=${userid}&postid=${postid}`,method:"get"
    })
}),
postUpdateDash: builder.mutation({
  query: ({patch,cookie,id}) => ({
    url: `/api/dashboard/post/accept?post=${id}`,
    method:'POST',
    headers:{
      Cookie:cookie
    },
    data:patch,
  
     }),
    

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
    useGetUsersQuery,
    useGetLocationQuery,
    usePostPostMutation,
    useGetPostCountQuery,
    useDestroyPostMutation,
    usePostPostDashMutation,
    userGetPostUserQuery,
    usePostUpdateDashMutation,
    util: { getRunningQueriesThunk  },
  } = postDashApi;
  export const {getUsers,postUpdateDash,getLocation,postPost,getPostCount,getShowPost,getAllPostId,getAllDashPost,postPostDash,getpostUser}= postDashApi.endpoints;