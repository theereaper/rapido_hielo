import { Alert, Button, Form, Input, message, Modal, Space } from "antd";
import { forwardRef, useImperativeHandle, useState } from "react";
import { axiosInstance } from "../../../../axios/axiosInstance";
import PasswordFormItem from "../../form/items/PasswordFormItem";

export interface ModalChangePasswordRef {
  childFunction: () => void;
}

export const ModalChangePassword = forwardRef<ModalChangePasswordRef>(
  (props, ref) => {
    const [open, setOpen] = useState<boolean>(false);
    const [isLoadingButton, setIsLoadingButton] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();
    const [passwordVisible, setPasswordVisible] = useState(false);

    const [form] = Form.useForm();

    const [alert, setAlert] = useState({
      visible: false,
      description: "",
    });

    const childFunction = () => {
      setOpen(true);
      setAlert({ visible: false, description: "" });
      setIsLoadingButton(false);
      form.resetFields();
    };

    useImperativeHandle(ref, () => ({
      childFunction,
    }));

    const changePassword = async () => {
      setAlert({ visible: false, description: "" });
      setIsLoadingButton(true);

      try {
        const formValues = form.getFieldsValue();

        const formData = new FormData();
        formData.append("current_password", formValues.current_password);
        formData.append("new_password", formValues.new_password);
        formData.append(
          "new_password_confirmation",
          formValues.new_password_confirmation
        );

        await axiosInstance.patch("/api/account/password", formData);
        setOpen(false);
        messageApi.success("Contraseña cambiada con éxito");
      } catch (error: any) {
        console.error(error);
        messageApi.error("No se ha podido cambiar la contraseña");

        if (
          error.response?.data?.message &&
          typeof error.response?.data?.message === "string"
        ) {
          setAlert({
            visible: true,
            description: error.response.data.message,
          });
        }
      } finally {
        setIsLoadingButton(false);
      }
    };

    return (
      <Modal
        title="Cambiar contraseña"
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
          onFinish={changePassword}
        >
          {/* vieja Password */}
          <PasswordFormItem
            name="current_password"
            label="Contraseña actual"
            placeholder="Ingresa tu contraseña actual"
          />

          {/* nueva Password */}
          <PasswordFormItem
            name="new_password"
            label="Nueva contraseña"
            placeholder="Ingresa tu nueva contraseña"
          />

          {/* confirmar Password */}
          <PasswordFormItem
            name="new_password_confirmation"
            label="Confirma nueva contraseña"
            placeholder="Confirma tu nueva contraseña"
          />

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
