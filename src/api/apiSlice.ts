import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IResponse, IDocument } from "../common/types.ts";
import { NewDoc } from "../features/docs/AddEditDocForm.tsx";

const API_URL = "https://test.v5.pryaniky.com/ru/data/v3/testmethods/docs";
const tempToken = "supersecrettoken_for_user1";

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  tagTypes: ["Docs"],
  endpoints: (builder) => ({
    getDocks: builder.query<IDocument[], void>({
      query: () => ({
        url: "/userdocs/get",
        headers: {
          "x-auth": tempToken,
        },
      }),
      transformResponse: (response: IResponse<IDocument[]>) => {
        return response.data;
      },
      providesTags: ["Docs"],
    }),
    addNewDoc: builder.mutation<IResponse<undefined>, NewDoc>({
      query: (doc) => ({
        url: "/userdocs/create",
        method: "POST",
        body: JSON.stringify(doc),
        headers: {
          "x-auth": tempToken,
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["Docs"],
    }),
    editDoc: builder.mutation<IResponse<undefined>, { doc: NewDoc, id: string }>({
      query: ({ doc, id }) => ({
        url: `/userdocs/set/${id}`,
        method: "POST",
        body: JSON.stringify(doc),
        headers: {
          "x-auth": tempToken,
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["Docs"],
    }),
    deleteDoc: builder.mutation<IResponse<undefined>, string>({
      query: (id) => ({
        url: `/userdocs/delete/${id}`,
        method: "POST",
        headers: {
          "x-auth": tempToken,
        },
      }),
      invalidatesTags: ["Docs"],
    }),
  }),
});

export const {
  useGetDocksQuery,
  useAddNewDocMutation,
  useEditDocMutation,
  useDeleteDocMutation,
} = apiSlice;