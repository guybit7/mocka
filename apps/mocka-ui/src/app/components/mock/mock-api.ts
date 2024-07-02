import { commonApi } from '../../redux/common.api';

export const mockApi = commonApi.injectEndpoints({
  endpoints: (build) => ({
    create: build.mutation<any, { body: Partial<any> }>({
      query: ({ body }) => ({
        url: '/mock',
        method: 'POST',
        body: body,
      }),
      invalidatesTags: ['MockList'],
    }),
    update: build.mutation<any, { body: Partial<any> }>({
      query: ({ body }) => ({
        url: '/mock',
        method: 'PUT',
        body: body,
      }),
      invalidatesTags: ['MockList'],
    }),
    delete: build.mutation<any, { body: Partial<any> }>({
      query: ({ body }) => ({
        url: '/mock',
        method: 'DELETE',
        body: body,
      }),
      invalidatesTags: ['MockList'],
    }),
  }),
});
