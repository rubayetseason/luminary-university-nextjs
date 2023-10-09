import { IManageDepartments, IMeta } from "@/types";
import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const MANAGE_DEPARTMENT_URL = "/management-department";

export const managementDepartmentApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    departments: build.query({
      query: (arg: Record<string, any>) => ({
        url: MANAGE_DEPARTMENT_URL,
        method: "GET",
        params: arg,
      }),
      transformResponse: (response: IManageDepartments, meta: IMeta) => {
        return {
          departments: response,
          meta,
        };
      },

      //for caching data --> name same with tagtypes
      providesTags: [tagTypes.manageDepartment],
    }),

    addDepartment: build.mutation({
      query: (data) => ({
        url: MANAGE_DEPARTMENT_URL,
        method: "POST",
        data,
      }),
      //for caching data --> name same with tagtypes
      invalidatesTags: [tagTypes.manageDepartment],
    }),

    // get single department by id
    department: build.query({
      query: (id) => ({
        url: `${MANAGE_DEPARTMENT_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.manageDepartment],
    }),

    // update single department by id
    updateDepartment: build.mutation({
      query: (data) => ({
        url: `${MANAGE_DEPARTMENT_URL}/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.manageDepartment],
    }),
  }),
});

export const {
  useDepartmentsQuery,
  useAddDepartmentMutation,
  useDepartmentQuery,
  useUpdateDepartmentMutation,
} = managementDepartmentApi;
