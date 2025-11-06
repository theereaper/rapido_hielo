import { message } from "antd";
import { Input } from "antd";
import { Alert } from "antd";
import { Button } from "antd";
import { Space } from "antd";
import { Select } from "antd";
import { Form } from "antd";
import { Modal } from "antd";
import { forwardRef, useImperativeHandle, useState } from "react";
import { User } from "../../../types/user";
import { useCreateUser, useUpdateUser } from "../../../services/users/mutation";
import EmailFormItem from "../form/items/EmailFormItem";

export interface ModalCUUserRef {
  childFunction: (id?: string, data?: User) => void; // Definimos el tipo con parámetros
}

type ModalCUUserProps = {
  refetch?: () => void;
  onAddSuccess?: () => void;
};

export const ModalCUUser = forwardRef<ModalCUUserRef, ModalCUUserProps>(
  (props, ref) => {
    const [open, setOpen] = useState<boolean>(false);
    const [id, setId] = useState<string>("");
    const [isEdit, setIsEdit] = useState(false);
    const [isLoadingButton, setIsLoadingButton] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();

    const [form] = Form.useForm();

    const [alert, setAlert] = useState({
      visible: false,
      description: "",
    });

    const childFunction = (id?: string, data?: User) => {
      setOpen(true);
      setAlert({ visible: false, description: "" });
      setIsLoadingButton(false);
      setIsEdit(false);
      form.resetFields();

      if (id && data) {
        //si viene id es edit
        setId(id);
        setIsEdit(true);

        form.setFieldsValue({
          name: data.name,
          lastname: data.lastname,
          role: data.role,
          email: data.email,
        });
      }
    };

    useImperativeHandle(ref, () => ({
      childFunction,
    }));

    const createUserMutation = useCreateUser();
    const updateUserMutation = useUpdateUser();

    const handleError = (error: any) => {
      console.log(error);
      messageApi.error("Ups, algo salió mal. Intenta nuevamente.");
      if (error.response?.data?.errors?.email) {
        setAlert({
          visible: true,
          description: "El correo electrónico ya existe, intenta con otro",
        });
      }
    };

    const create = async () => {
      setIsLoadingButton(true);
      setAlert({
        visible: false,
        description: "",
      });

      const formValues = form.getFieldsValue();

      createUserMutation.mutate(formValues as User, {
        onSuccess: (data) => {
          messageApi.success(data.message);

          if (props?.onAddSuccess) {
            props.onAddSuccess();
          }

          setOpen(false);
        },
        onError: handleError,
        onSettled: () => {
          setIsLoadingButton(false);
        },
      });
    };

    const update = async () => {
      setIsLoadingButton(true);
      setAlert({
        visible: false,
        description: "",
      });
      const formValues = form.getFieldsValue();

      formValues.id = id;
      formValues.key = id;

      updateUserMutation.mutate(formValues as User, {
        onSuccess: (data) => {
          messageApi.success(data.message);
          if (props?.refetch) {
            props.refetch();
          }
          setOpen(false);
        },
        onError: handleError,
        onSettled: () => {
          setIsLoadingButton(false);
        },
      });
    };

    return (
      <Modal
        title={isEdit ? "Editar" : "Agregar"}
        centered
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
      >
        {contextHolder}

        <Form
          form={form}
          className="pt-4"
          scrollToFirstError={{
            behavior: "smooth",
            block: "center",
            inline: "center",
          }}
          layout="vertical"
          onFinish={isEdit ? update : create}
        >
          {/* Name y Lastname */}
          <div className="grid grid-cols-1 sm:gap-4 sm:grid-cols-2">
            {/* Name */}
            <Form.Item
              name="name"
              validateTrigger="onBlur"
              label="Nombre"
              rules={[{ required: true, max: 20, whitespace: true, min: 2 }]}
            >
              <Input placeholder="Ingresa nombre" />
            </Form.Item>

            {/* Lastname */}
            <Form.Item
              name="lastname"
              validateTrigger="onBlur"
              label="Apellidos"
              rules={[{ required: true, min: 2, max: 20, whitespace: true }]}
            >
              <Input placeholder="Ingresa apellidos" />
            </Form.Item>
          </div>

          {/* Rol */}

          <Form.Item
            name="role"
            label="Rol"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select
              placeholder="Selecciona rol"
              options={[
                {
                  value: "normal",
                  label: "Normal",
                },
                {
                  value: "admin",
                  label: "Administrador",
                },
              ]}
            />
          </Form.Item>

          {/* email */}
          <EmailFormItem required={true} />

          {/* Alert*/}
          {alert.visible && (
            <div className="mb-4">
              <Alert
                message="Error"
                description={alert.description}
                type="error"
                showIcon
              />
            </div>
          )}

          {/* Button */}
          <Form.Item className="flex justify-end p-0 m-0 mt-2">
            <Space size="middle">
              <Button danger type="text" onClick={() => setOpen(false)}>
                Cancelar
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                loading={isLoadingButton}
              >
                Guardar
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    );
  }
);
