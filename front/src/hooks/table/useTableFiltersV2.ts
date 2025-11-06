import { useState } from "react";
import type {
  TablePaginationConfig,
  // @ts-ignore
  FilterValue,
  // @ts-ignore
  SorterResult,
} from "antd/es/table";

type Filters = Record<string, FilterValue | null>;

export interface UseTableFilters {
  pagination: TablePaginationConfig;
  filters: Filters;
  order?: "asc" | "desc";
  field?: string;
  tableKey: number;
  handleTableChange: (
    pagination: TablePaginationConfig,
    filters: Filters,
    sorter: SorterResult<any>
  ) => void;
  resetFilters: () => void;
}

const useTableFilters = () => {
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 10,
  });
  const [filters, setFilters] = useState<Filters>({});
  const [order, setOrder] = useState<UseTableFilters["order"]>(undefined);
  const [field, setField] = useState<UseTableFilters["field"]>(undefined);
  const [tableKey, setTableKey] = useState(0);

  const handleTableChange: UseTableFilters["handleTableChange"] = (
    pagination,
    filters,
    sorter
  ) => {
    setPagination(pagination);

    setFilters(
      Object.values(filters || {}).every((value) => value === null)
        ? {}
        : filters
    );

    setOrder(
      sorter?.order === "ascend"
        ? "asc"
        : sorter?.order === "descend"
        ? "desc"
        : undefined
    );

    setField(sorter?.field);
  };

  const resetFilters = () => {
    setFilters({});
    setOrder(undefined);
    setField(undefined);
    setPagination({ current: 1, pageSize: 10 });
    setTableKey((key) => key + 1);
  };

  const addFilters = (newFilters : Filters) => {
    setFilters(newFilters)
  }

  const tableParams = {
    pagination,
    filters,
    order,
    field,
    current: pagination.current,
  };

  return {
    resetFilters,
    handleTableChange,
    tableParams,
    tableKey,
    addFilters
  };
};

export default useTableFilters;
