import { Alert, Button, Form, Input, message, Modal, Space } from "antd";
import { forwardRef, useImperativeHandle, useState } from "react";
import { axiosInstance } from "../../../../axios/axiosInstance";
import { User } from "../../../../types/user";
import EmailFormItem from "../../form/items/EmailFormItem";

export interface ModalUAccountRef {
  childFunction: (data: User) => void; // Definimos el tipo con parámetros
}

type ModalUAccountProps = {
  reloadTable: () => void;
};

export const ModalUAccount = forwardRef<ModalUAccountRef, ModalUAccountProps>(
  (props, ref) => {
    const [open, setOpen] = useState<boolean>(false);
    const [isLoadingButton, setIsLoadingButton] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();

    const [form] = Form.useForm();

    const [alert, setAlert] = useState({
      visible: false,
      description: "",
    });

    const childFunction = (data: User) => {
      setOpen(true);
      setAlert({ visible: false, description: "" });
      setIsLoadingButton(false);
      form.resetFields();

      form.setFieldsValue({
        name: data.name,
        lastname: data.lastname,
        role: data.role,
        email: data.email,
      });
    };

    useImperativeHandle(ref, () => ({
      childFunction,
    }));

    const update = async () => {
      setAlert({ visible: false, description: "" });
      setIsLoadingButton(true);

      const formValues = form.getFieldsValue();

      const formData = new FormData();
      formData.append("name", formValues.name);
      formData.append("lastname", formValues.lastname);
      formData.append("email", formValues.email);
      formData.append("role", formValues.role);

      await axiosInstance
        .put(`/api/account/`, formData)
        .then((response) => {
          messageApi.success("Usuario editado con éxito");
          setOpen(false);
          props.reloadTable();
        })
        .catch((error) => {
          console.log(error);
          messageApi.error("No se ha podido editar el usuario");

          if (error.response?.data?.errors?.email) {
            setAlert({
              visible: true,
              description: "El correo electrónico ya existe, intenta con otro",
            });
          }
        })
        .finally(function () {
          setIsLoadingButton(false);
        });
    };

    return (
      <Modal
        title={"Editar usuario"}
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
          onFinish={update}
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
