import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const commonApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000/',
    prepareHeaders: headers => {
      headers.set('Content-Type', 'application/json;charset=UTF-8');
      headers.set('Authorization', 'anonymous');

      return headers;
    },
  }),
  tagTypes: ['MockList'],
  endpoints: _ => ({}),
});
