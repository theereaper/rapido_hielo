import { useMutation, useQueryClient } from "@tanstack/react-query";
import { User } from "../../types/user";
import { createUser, deleteUser, updateUser } from "./api";
import {
  updateCacheAfterCreate,
  updateCacheAfterUpdate,
} from "../../helpers/updateCacheMutation";

export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (values: User) => createUser(values),
    onSuccess: (data) => {
      console.log(data);

      const newItem = data.register as User;
      updateCacheAfterCreate(queryClient, ["users", undefined], newItem);
    },
  });
}

export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (values: User) => updateUser(values),
    onSuccess: (_response, values) => {
      updateCacheAfterUpdate(queryClient, ["users", undefined], values);
    },
  });
}

export function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: User["id"]) => deleteUser(id),
    onSuccess: (_response) => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
}
