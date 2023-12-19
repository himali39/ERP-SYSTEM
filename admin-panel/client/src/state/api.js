//Api.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

/**API HOOK */
export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),

  reducerPath: "adminApi",
  tagTypes: ["admin", "Dashboard", "Faculty", "data"],

  endpoints: (builder) => ({
    adminLogin: builder.query({
      query: (id) => `/auth/getadmin/${id}`,
      providesTags: ["admin"],
    }),
    getUser: builder.query({
      query: (id) => `/general/user/${id}`, //getuser from controller
      providesTags: ["User"],
    }),

    getDashboard: builder.query({
      query: () => `general/dashboard`, //getDashboard from controller
      providesTags: ["Dashboard"],
    }),
    getFaculty: builder.query({
      query: () => "faculty/facultyList",
      providesTags: ["Faculty"],
    }),
    addFaculty: builder.mutation({
      query: (data) => ({
        url: "/faculty/addfaculty",
        method: "POST",
        body: data,
      }),
    }),
    deleteFaculty: builder.query({
      query: (id) => `faculty/deletefaculty/${id}`,
      method: "DELETE",
      // providesTags: ["admin"],
    }),
    //     deleteFaculty: builder.mutation({
    //       query: (id) => ({
    //         url: `faculty/deletefaculty/${id}`,
    //         method: "DELETE",
    //         // body: id,
    //       }),
    //       invalidateTags: ["Faculty"],
    //     }),
  }),
});

export const {
  useAdminLoginQuery,
  useGetUserQuery,
  useGetDashboardQuery,
  useGetFacultyQuery,
  useAddFacultyMutation,
  useDeleteFacultyQuery,
  // useDeleteFacultyMutation,
} = api;
