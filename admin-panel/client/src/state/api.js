import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

/**API HOOK */
export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),

  reducerPath: "adminApi",
  tagTypes: ["User", "Dashboard", "Faculty"],

  endpoints: (build) => ({
    getUser: build.query({
      query: (id) => `/general/user/${id}`, //getuser from controller
      providesTags: ["User"],
    }),

    getDashboard: build.query({
      query: () => `general/dashboard`, //getDashboard from controller
      providesTags: ["Dashboard"],
    }),
    getFaculty: build.query({
      query: () => "faculty/facultyList",
      providesTags: ["Faculty"],
    }),
    addFaculty: build.mutation({
      query: (data) => ({
        url: "/faculty/addfaculty",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useGetUserQuery, useGetDashboardQuery, useGetFacultyQuery,useAddFacultyMutation } = api;
