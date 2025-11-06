import { axiosInstance } from "../../axios/axiosInstance";
import { PaginatedResponse } from "../../types/pagination";
import { QueryParamsBase } from "../../types/query";
import { User } from "../../types/user";

//index
export const getUsers = async (
  params?: QueryParamsBase
): Promise<PaginatedResponse<User>> => {
  const { data } = await axiosInstance.get("/api/users", {
    params,
  });
  return data;
};

//store
export async function createUser(values: User) {
  const { data } = await axiosInstance.post(`/api/users`, values);
  return data;
}

//update
export async function updateUser(values: User) {
  const { data } = await axiosInstance.put(`/api/users/${values.id}`, values);
  return data;
}

//delete
export async function deleteUser(id: User["id"]) {
  const { data } = await axiosInstance.patch(`/api/users/${id}`);
  return data;
}
