import { message, Table } from "antd";
import { SectionPrivateHeader } from "../../components/ui/SectionPrivateHeader";
import { ClearFiltersIcon } from "../../components/ui/icons/ClearFiltersIcon";
import useTableFilters from "../../hooks/table/useTableFiltersV2";
import { useRef } from "react";
import {
  ModalCUProduct,
  ModalCUProductRef,
} from "../../components/ui/modals/ModalCUProduct";

export default function ProductsPrivate() {
  const modalCURef = useRef<ModalCUProductRef>(null);

  const [messageApi, contextHolder] = message.useMessage();

  const { tableParams, tableKey, resetFilters, handleTableChange } =
    useTableFilters();

  return (
    <>
      {contextHolder}
      <SectionPrivateHeader
        title="Productos"
        onButtonClick={() => modalCURef.current?.childFunction()}
      />

      <div className="flex flex-col items-end gap-2 mb-3">
        <button
          className="flex justify-center gap-2 text-text-secondary"
          onClick={() => resetFilters()}
        >
          <ClearFiltersIcon className="flex size-5" />
          Limpiar filtros
        </button>
      </div>

      <Table />

      <ModalCUProduct ref={modalCURef} />
    </>
  );
}
