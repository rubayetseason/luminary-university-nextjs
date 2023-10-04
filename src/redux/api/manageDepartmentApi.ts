import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const MANAGE_DEPARTMENT_URL = "/management-department";

export const managementDepartmentApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    addDepartment: build.mutation({
      query: (data) => ({
        url: MANAGE_DEPARTMENT_URL,
        method: "POST",
        data,
      }),
      //for caching data --> name same with tagtypes
      invalidatesTags: [tagTypes.manageDepartment],
    }),
  }),
});

export const { useAddDepartmentMutation } = managementDepartmentApi;
