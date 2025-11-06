import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  updateCacheAfterCreate,
  updateCacheAfterUpdate,
} from "../../helpers/updateCacheMutation";
import { Client } from "../../types/Client";
import { createClient, deleteClient, updateClient } from "./api";

export function useCreateClient() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (values: Client) => createClient(values),
    onSuccess: (data) => {
      console.log(data);

      const newItem = data.register as Client;
      updateCacheAfterCreate(queryClient, ["clients", undefined], newItem);
    },
  });
}

export function useUpdateClient() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (values: Client) => updateClient(values),
    onSuccess: (_response, values) => {
      updateCacheAfterUpdate(queryClient, ["clients", undefined], values);
    },
  });
}

export function useDeleteClient() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: Client["id"]) => deleteClient(id),
    onSuccess: (_response) => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
}
