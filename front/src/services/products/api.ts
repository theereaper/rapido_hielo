import { axiosInstance } from "../../axios/axiosInstance";
import { PaginatedResponse } from "../../types/pagination";
import { Product } from "../../types/Product";
import { QueryParamsBase } from "../../types/query";

//index
export const getProducts = async (
  params?: QueryParamsBase
): Promise<PaginatedResponse<Product>> => {
  const { data } = await axiosInstance.get("/api/products", {
    params,
  });
  return data;
};

//store
export async function createProduct(values: Product) {
  const { data } = await axiosInstance.post(`/api/products`, values);
  return data;
}
