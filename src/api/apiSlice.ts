import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IResponse, IDocument } from "../common/types.ts";

const API_URL = "https://test.v5.pryaniky.com/ru/data/v3/testmethods/docs";
const tempToken = "supersecrettoken_for_user1";

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
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
    }),
  }),
});

export const { useGetDocksQuery } = apiSlice;