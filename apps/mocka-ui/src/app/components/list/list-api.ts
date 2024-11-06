import { commonApi } from '../../redux/common.api';

export const listApi = commonApi.injectEndpoints({
  endpoints: build => ({
    getList: build.query<[], void>({
      query: () => ({
        url: '/mock/getAll',
        params: {
          limit: 5,
        },
      }),
      providesTags: result => [{ type: 'MockList', id: 'List' }],
    }),
  }),
});
