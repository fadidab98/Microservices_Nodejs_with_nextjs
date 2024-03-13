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
export const userDashApi = createApi({
  reducerPath: 'userDashApi',
  baseQuery: axiosBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_USERS_URL,
  }), // Use Axios as the fetch function
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath]
    }
  },
  endpoints: (builder) => ({

    getUsers: builder.query({
        query:({page,search})=>({url:`/api/dashboard/users?page=${page}${search?"&search="+search:""}`,method:"get"})
    }),
    getShowUser: builder.query({
      query:({id})=>({
          url:`/api/user/show?id=${id}`,method:"get"
      })
  }),

  getAllUserId: builder.query({
    query:()=>({
        url:`/api/user/all`,method:"get"
    })
  }),
  destroyUser: builder.mutation({
    query:({...patch})=> ({
      url:`/api/dashboard/user/delete`,
      method:'POST',
      data:patch
    
    })
   }),
   postUser: builder.mutation({
    query:({patch})=> ({
      url:`/api/dashboard/user/create`,
      method:'POST',
      data:patch
    
    })
   }),
   getUserCount: builder.query({
    query: () => (
      {
         url: `/api/dashboard/userCount`,
         method: 'get',
        
        }
      )
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
    useDestroyUserMutation,
    usePostUserMutation,
    useGetUserCountQuery,
    util: { getRunningQueriesThunk  },
  } = userDashApi;
  export const {getUsers,getShowUser,getAllUserId,destroyUser,postUser}= userDashApi.endpoints;