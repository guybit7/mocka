import { listApi } from './list-api';

export function useList() {
  const { data: theList = [], isLoading: listLoading } =
    listApi.useGetListQuery();

  const loading = listLoading;

  return {
    theList,
    loading,
  };
}
