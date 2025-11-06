// src/types/table.ts

export type TableState<T> = {
  data: T[];
  isLoading: boolean;
  params: {
    current: number;
    pageSize: number;
    field?: string | null;
    total: number;
    order?: "asc" | "desc" | null;
    filters?: Record<string, string | number | boolean>;
  };
};
