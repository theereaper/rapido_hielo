import type { QueryParamsBase } from "../types/query";

export function isBaseQueryParams(params?: QueryParamsBase): boolean {
  return (
    (params?.current ?? params?.pagination?.current ?? 1) === 1 &&
    Object.keys(params?.filters || {}).length === 0 &&
    (params?.order ?? null) === null
  );
}
