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
export const categoryDashApi = createApi({
  reducerPath: 'categoryDashApi',
  baseQuery: axiosBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_CATEGORY_URL,
  }), // Use Axios as the fetch function
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath]
    }
  },
  endpoints: (builder) => ({
    getCategories: builder.query({
        query:({page,search})=>({
            url:`/api/category?page=${page}${search?"&search="+search:''}`,method:"get"
        })
    }),
    getCategoryCount:builder.query({
      query:()=>({
        url:"/api/dashboard/categoryCount",
        method:"get"
      })
    }),

    getShowCategory: builder.query({
      query:({id})=>({
          url:`/api/category/show?id=${id}`,method:"get"
      })
  }),

  getAllCategoryId: builder.query({
    query:()=>({
        url:`/api/category/all`,method:"get"
    })
  }),
  destroyCategory: builder.mutation({
    query:(patch)=> ({
      url:`/api/dashboard/category/delete`,
      method:'POST',
      data:patch
    
    })
   }),
   postCategory: builder.mutation({
    query:(patch)=> ({
      url:`/api/dashboard/category/create`,
      method:'POST',
      data:patch
    
    })
   }),


  }),

});

export const {
    useGetShowCategoryQuery,
    useGetAllCategoryIdQuery,
    useDestroyCategoryMutation,
    usePostCategoryMutation,
    useGetCategoriesQuery,
    useGetCategoryCountQuery,
    util: { getRunningQueriesThunk  },
  } = categoryDashApi;
  export const {getCategories,getShowCategory,getAllCategoryId,destroyCategory,postCategory}= categoryDashApi.endpoints;