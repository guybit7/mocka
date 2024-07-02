import { useCallback } from 'react';
import { mockApi } from './mock-api';

export function useMock() {
  const [createMutation, { isLoading: createLoading }] = mockApi.useCreateMutation();
  const [updateMutation, { isLoading: updateLoading }] = mockApi.useUpdateMutation();
  const [deleteMutation, { isLoading: deleteLoading }] = mockApi.useDeleteMutation();

  const loadingMock = createLoading || updateLoading || deleteLoading;

  const createMock = useCallback(
    (body: any) => {
      createMutation({
        body: body,
      });
    },
    [createMutation]
  );

  const updateMock = useCallback(
    (body: any) => {
      updateMutation({
        body: body,
      });
    },
    [updateMutation]
  );

  const deleteMock = useCallback(
    (body: any) => {
      deleteMutation({
        body: body,
      });
    },
    [deleteMutation]
  );

  return {
    loadingMock,
    createMock,
    updateMock,
    deleteMock,
  };
}
