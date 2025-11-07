import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCacheAfterCreate } from "../../helpers/updateCacheMutation";
import { Product } from "../../types/Product";
import { createProduct } from "./api";

export function useCreateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (values: Product) => createProduct(values),
    onSuccess: (data) => {
      console.log(data);

      const newItem = data.register as Product;
      updateCacheAfterCreate(queryClient, ["products", undefined], newItem);
    },
  });
}

/* export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (values: User) => updateUser(values),
    onSuccess: (_response, values) => {
      updateCacheAfterUpdate(queryClient, ["users", undefined], values);
    },
  });
} */

/* export function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: User["id"]) => deleteUser(id),
    onSuccess: (_response) => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
}
 */
