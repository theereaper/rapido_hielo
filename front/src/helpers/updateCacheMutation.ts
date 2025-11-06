import { QueryClient } from "@tanstack/react-query";
import { PaginatedResponse } from "../types/pagination";

export function updateCacheAfterCreate(
  queryClient: QueryClient,
  queryKey: unknown[],
  newItem: any,
  isPaginated = true
) {
  if (!isPaginated) {
    // Existe data en cache? si existe modifico
    const existingData = queryClient.getQueryData(queryKey);
    if (!existingData) return;

    queryClient.setQueryData(queryKey, (oldData: any) => {
      const previousItems = oldData ?? [];
      const newData = [newItem, ...previousItems];
      return newData;
    });

    return;
  }

  // Verifica si la query ya existe
  const existingData =
    queryClient.getQueryData<PaginatedResponse<any>>(queryKey);
  if (!existingData) return;

  queryClient.cancelQueries({ queryKey });

  queryClient.setQueryData<PaginatedResponse<any>>(queryKey, (oldData) => {
    const previousItems = oldData?.data ?? [];

    // Agrega el nuevo item al inicio y mantiene solo 10 registros
    const newData = [newItem, ...previousItems].slice(0, 10);

    return {
      data: newData,
      total: (oldData?.total ?? 0) + 1,
    };
  });
}

export function updateCacheAfterUpdate(
  queryClient: QueryClient,
  queryKey: unknown[],
  values: any,
  isPaginated = true
) {
  if (!isPaginated) {
    // Existe data en cache? si existe modifico
    const existingData = queryClient.getQueryData(queryKey);
    if (!existingData) return;

    queryClient.setQueryData(queryKey, (oldData: any) => {
      const previousItems = oldData ?? [];
      const updateItems = previousItems.map((item: any) =>
        item.key === values.key ? { ...item, ...values } : item
      );
      return updateItems;
    });

    return;
  }

  const existingData =
    queryClient.getQueryData<PaginatedResponse<any>>(queryKey);
  if (!existingData) return;

  queryClient.cancelQueries({ queryKey });

  queryClient.setQueryData<PaginatedResponse<any>>(queryKey, (oldData) => {
    if (!oldData) return undefined;

    const updatedItems = oldData.data.map((item) =>
      item.key === values.key ? { ...item, ...values } : item
    );

    return { ...oldData, data: updatedItems };
  });
}

export function updateCacheOptimisticDelete(
  queryClient: QueryClient,
  queryKey: unknown[],
  key: string,
  isPaginated = true
) {
  if (!isPaginated) {
    //Eliminacion local automatica
    const previousData = queryClient.getQueryData(queryKey) as any[];

    const index = previousData.findIndex((item) => item.key === key);
    const itemToDelete = previousData[index];

    queryClient.setQueryData(queryKey, (oldData: any) => {
      const previousItems = oldData ?? [];
      const updatedItems = previousItems.filter(
        (item: any) => item.key !== itemToDelete?.key
      );
      return updatedItems;
    });

    return { itemToDelete, index };
  }

  // Paginated
  const previousData =
    queryClient.getQueryData<PaginatedResponse<any>>(queryKey);
  if (!previousData) return;

  const index = previousData.data.findIndex((item) => item.key === key);

  queryClient.cancelQueries({ queryKey });

  queryClient.setQueryData<PaginatedResponse<any>>(queryKey, (oldData) => {
    if (!oldData) return undefined;

    let updatedItems = oldData.data;
    if (index !== -1) {
      // Si está en cache, eliminar del array
      updatedItems = oldData.data.filter((item) => item.key !== key);
    }

    // Siempre disminuir total
    const updatedTotal = (oldData.total ?? 0) - 1;

    return { ...oldData, data: updatedItems, total: updatedTotal };
  });

  const itemToDelete = index !== -1 ? previousData.data[index] : undefined;

  return { itemToDelete, index };
}

export function handleErrorOptimisticDelete(
  queryClient: QueryClient,
  queryKey: unknown[],
  itemToRestore: any,
  index: number,
  isPaginated = true
) {
  if (!isPaginated) {
    queryClient.setQueryData(queryKey, (oldData: any) => {
      const previousItems = oldData ?? [];
      const newItems = [...previousItems];
      newItems.splice(index, 0, itemToRestore); // inserta en la posición original
      return newItems;
    });

    return;
  }

  queryClient.setQueryData<PaginatedResponse<any>>(queryKey, (oldData) => {
    if (!oldData) return undefined;

    const previousItems = oldData.data ?? [];
    const newItems = [...previousItems];
    newItems.splice(index, 0, itemToRestore); // inserta en la posición original

    return {
      ...oldData,
      data: newItems,
      total: (oldData.total ?? previousItems.length) + 1, // 👈 restaura el total
    };
  });
}
