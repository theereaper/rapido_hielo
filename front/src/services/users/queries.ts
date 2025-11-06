import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getUsers } from "./api";
import { QueryParamsBase } from "../../types/query";
import { isBaseQueryParams } from "../../helpers/isBaseQueryParams";

const STALE_TIME_BASE = 1000 * 60 * 60; // 60 minutos

export function useUsers(params?: QueryParamsBase, options?: object) {
  const isBaseQuery = isBaseQueryParams(params); // Si la consulta es la base (sin filtros y la primera pagina)

  const paramsQuery = isBaseQuery ? undefined : params;

  const query = useQuery({
    queryKey: ["users", paramsQuery],
    queryFn: () => getUsers(paramsQuery),
    staleTime: isBaseQuery ? STALE_TIME_BASE : 0,
    gcTime: isBaseQuery ? STALE_TIME_BASE : 0,
    placeholderData: keepPreviousData,
    ...options,
  });

  return { ...query, isBaseQuery };
}
