import { useState } from "react";
// @ts-ignore
import { TablePaginationConfig } from "antd/es/table/interface";
// @ts-ignore
import { SorterResult, FilterValue } from "antd/es/table/interface";
import { TableState } from "../types/table";

type TableParams = TableState<any>["params"]; // <- Reutiliza el tipo exacto
type FetchDataCallback = (params: TableParams) => void;

const useTableFilters = (fetchDataCallback: FetchDataCallback) => {
  const [paramsFilters, setParamsFilters] = useState<TableParams>({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const [cleanAllFilters, setCleanAllFilters] = useState(0); // Forzar actualización de la tabla

  const handleTableChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<any> | SorterResult<any>[]
  ) => {
    const singleSorter = Array.isArray(sorter) ? sorter[0] : sorter;

    const order = singleSorter?.order
      ? singleSorter.order === "ascend"
        ? "asc"
        : "desc"
      : null;

    const params: TableParams = {
      current: pagination.current ?? 1,
      pageSize: pagination.pageSize ?? 10,
      total: paramsFilters.total ?? 0, // conservar total actual
      field: singleSorter?.field as string,
      order,
      filters: filters as Record<string, string | number | boolean>,
    };

    setParamsFilters(params);
    fetchDataCallback(params);
  };

  const resetFilters = () => {
    // Verificar si todas las propiedades son null o vacías
    const allFiltersNull = Object.values(paramsFilters.filters || {}).every(
      (value) => value === null
    );
    const isFieldNull =
      paramsFilters.field === null || paramsFilters.field === undefined;
    const isOrderNull =
      paramsFilters.order === null || paramsFilters.order === undefined;

    if (allFiltersNull && isFieldNull && isOrderNull) {
      return;
    }

    setCleanAllFilters((tableKey) => tableKey + 1);
    const resetParams: TableParams = {
      ...paramsFilters,
      field: null,
      order: null,
      filters: {},
    };
    setParamsFilters(resetParams);
    fetchDataCallback(resetParams);
  };

  return {
    cleanAllFilters,
    handleTableChange,
    resetFilters,
  };
};

export default useTableFilters;
