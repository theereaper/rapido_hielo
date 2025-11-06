// src/types/query.ts
import type { TablePaginationConfig } from "antd/es/table";
import type { FilterValue } from "antd/es/table/interface";

export type QueryParamsBase = {
  pagination?: TablePaginationConfig;
  current?: number;
  filters?: Record<string, FilterValue | null>; // ahora opcional
  order?: "asc" | "desc";                        // opcional
  field?: string;                                // opcional
  fields?: string[];                             // opcional
};