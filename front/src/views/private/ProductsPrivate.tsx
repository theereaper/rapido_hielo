import { message, Popconfirm, Space, Table, Tooltip } from "antd";
import { ColumnsType } from "antd/es/table";
import { useRef } from "react";
import { SectionPrivateHeader } from "../../components/ui/SectionPrivateHeader";
import { CheckIcon } from "../../components/ui/icons/CheckIcon";
import { ClearFiltersIcon } from "../../components/ui/icons/ClearFiltersIcon";
import { DeleteIcon } from "../../components/ui/icons/DeleteIcon";
import { EditIcon } from "../../components/ui/icons/EditIcon";
import {
  ModalCUProduct,
  ModalCUProductRef,
} from "../../components/ui/modals/ModalCUProduct";
import { Colors } from "../../constants/Colors";
import useTableFilters from "../../hooks/table/useTableFiltersV2";
import useColumnSearch from "../../hooks/useColumnSearch";
import { useProducts } from "../../services/products/queries";
import { Product } from "../../types/Product";
import { SinDatoBadget } from "../../components/ui/SinDatoBadget";
import { formatPrice } from "../../helpers/formatPrice";

export default function ProductsPrivate() {
  const modalCURef = useRef<ModalCUProductRef>(null);

  const [messageApi, contextHolder] = message.useMessage();

  const { tableParams, tableKey, resetFilters, handleTableChange } =
    useTableFilters();

  const { data, isLoading, isError, error, isFetching, refetch, isBaseQuery } =
    useProducts(tableParams);

  const { getColumnSearchProps } = useColumnSearch();

  const columns: ColumnsType<Product> = [
    {
      title: "Nombre",
      dataIndex: "name",
      key: "name",
      ...getColumnSearchProps("name"),
    },
    {
      title: "Descripción",
      dataIndex: "description",
      key: "description",
      render: (text: string) => (
        <p>{text ? text : <SinDatoBadget text="descripción" />}</p>
      ),
    },
    {
      title: "Peso (Kg)",
      dataIndex: "weight",
      key: "weight",
    },
    {
      title: "Precio",
      dataIndex: "price",
      key: "price",
      render: (text: number) => <p>{formatPrice(text)}</p>,
      sorter: true,
    },
    {
      title: "Estado",
      dataIndex: "status",
      key: "status",
      width: 130,
      render: (text: Product["status"]) => {
        if (text === "active") {
          return (
            <span
              className="inline-flex items-center gap-x-1.5
               py-1.5 px-3 rounded-full text-xs font-medium
               bg-green-100 text-green-500"
            >
              Activado
            </span>
          );
        } else {
          return (
            <span
              className="inline-flex items-center gap-x-1.5 py-1.5
               px-3 rounded-full text-xs font-medium bg-red-100 text-red-500"
            >
              Desactivado
            </span>
          );
        }
      },
      filters: [
        {
          text: "Activados",
          value: "active",
        },
        {
          text: "Desactivados",
          value: "desactive",
        },
      ],
    },
    {
      title: "Acciones",
      dataIndex: "id",
      key: "id",

      width: 100,
      render: (id: Product["id"], record: Product) => (
        <Space size="middle">
          {/* EDIT */}
          <Tooltip placement="top" className="cursor-pointer" title="Editar">
            <button
              onClick={() => {
                modalCURef.current?.childFunction(id, record);
              }}
            >
              <EditIcon className="text-yellow-500 size-6" />
            </button>
          </Tooltip>

          {record.status === "active" ? (
            <Tooltip
              placement="top"
              className="cursor-pointer"
              title="Desactivar"
            >
              <div>
                <Popconfirm
                  title="¿Estás seguro/a que deseas desactivar a este usuario/a?"
                  okText="Sí, desactivar"
                  cancelText="No, cancelar"
                  cancelButtonProps={{
                    style: { borderRadius: 12 },
                  }}
                  okButtonProps={{
                    style: {
                      backgroundColor: "#ef4444",
                      border: 0,
                    },
                  }}
                  placement="left"
                  onConfirm={() => {
                    /* changeStatus(id); */
                  }}
                >
                  <button>
                    <DeleteIcon className="text-red-500 size-6" />
                  </button>
                </Popconfirm>
              </div>
            </Tooltip>
          ) : (
            <Tooltip placement="top" className="cursor-pointer" title="Activar">
              <div>
                <Popconfirm
                  title="¿Estás seguro/a que deseas activar a este usuario/a?"
                  okText="Sí, activar"
                  cancelText="No, cancelar"
                  placement="left"
                  cancelButtonProps={{
                    style: { borderRadius: 12 },
                  }}
                  okButtonProps={{
                    style: {
                      backgroundColor: Colors.primary,
                      border: 0,
                    },
                  }}
                  onConfirm={() => {
                    /* changeStatus(id); */
                  }}
                >
                  <button>
                    <CheckIcon className="text-green-500 size-6" />
                  </button>
                </Popconfirm>
              </div>
            </Tooltip>
          )}
        </Space>
      ),
    },
  ];

  /*   const deleteClient = useDeleteClient();

  const changeStatus = async (key: Client["id"]) => {
    deleteClient.mutate(key, {
      onSuccess: () => {
        refetch();
        messageApi.success(
          `El estado del cliente se ha cambiado correctamente.`
        );
      },
      // Si salio mal, añades ese item a la cache
      onError: () => {
        messageApi.error("Ups, algo salió mal. Intenta nuevamente.");
      },
    });
  }; */

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

      <Table<Product>
        columns={columns}
        dataSource={data?.data}
        key={tableKey}
        pagination={{
          current: tableParams?.pagination.current,
          pageSize: tableParams?.pagination.pageSize,
          total: data?.total,
          pageSizeOptions: [10],
        }}
        onChange={handleTableChange}
        loading={isLoading}
        scroll={{ x: 1000 }}
      />

      <ModalCUProduct ref={modalCURef} />
    </>
  );
}
