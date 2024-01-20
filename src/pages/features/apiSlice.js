// src/api.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const todoApi = createApi({
  reducerPath: "todoApi",
  baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com/' }),
  endpoints: (builder) => ({
    getTodos: builder.query({
      query: () => 'todos',
    }),

    getPage:builder.query({     
      query: ({ _start = 0, _limit = 10 } = {}) => {
        return `todos?_start=${_start}&_limit=${_limit}`;
      },
    }),
    getPost:builder.query({
      query:(id)=>`todos/${id}`
    }),
    createPost:builder.mutation({
      query:(data)=>({
        url:"todos",
        method:"POST",
        body:data
      }),
      async onQueryStarted(args, {queryFulfilled, dispatch}){
        try{
          const {data: createPost} = await queryFulfilled;
          console.log(createPost);
          dispatch(
            todoApi.util.updateQueryData('getTodos', undefined, (draft) => {
              draft?.push(createPost)
            })
          )
        } catch(error){
          console.log(error);
        }
      }
    })
  }),
});

export const { useGetTodosQuery, useGetPageQuery, useGetPostQuery, useCreatePostMutation } = todoApi;
export const { reducerPath, setupListeners } = todoApi;

