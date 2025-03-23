import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IResponse, IDocument } from "../common/types.ts";
import { NewDoc } from "../features/docs/AddEditDocForm.tsx";
import { ILoginData } from "../features/auth/Login.tsx";
import { RootState } from "../app/store.ts";

const API_URL = "https://test.v5.pryaniky.com/ru/data/v3/testmethods/docs";

const baseQuery = fetchBaseQuery({
  baseUrl: API_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).authToken.token;

    if (token) {
      headers.set("x-auth", token);
    }

    return headers;
  },
});

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["Docs"],
  endpoints: (builder) => ({
    login: builder.mutation<IResponse<{ token: string }>, ILoginData>({
      query: (data) => ({
        url: "/login",
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "content-type": "application/json",
        },
      }),
    }),
    getDocks: builder.query<IResponse<IDocument[] | null>, void>({
      query: () => ({
        url: "/userdocs/get",
      }),
      providesTags: ["Docs"],
    }),
    addNewDoc: builder.mutation<IResponse<IDocument>, NewDoc>({
      query: (doc) => ({
        url: "/userdocs/create",
        method: "POST",
        body: JSON.stringify(doc),
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["Docs"],
    }),
    editDoc: builder.mutation<IResponse<IDocument>, { doc: NewDoc, id: string }>({
      query: ({ doc, id }) => ({
        url: `/userdocs/set/${id}`,
        method: "POST",
        body: JSON.stringify(doc),
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["Docs"],
    }),
    deleteDoc: builder.mutation<IResponse<undefined>, string>({
      query: (id) => ({
        url: `/userdocs/delete/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["Docs"],
    }),
  }),
});

export const {
  useLoginMutation,
  useGetDocksQuery,
  useAddNewDocMutation,
  useEditDocMutation,
  useDeleteDocMutation,
} = apiSlice;