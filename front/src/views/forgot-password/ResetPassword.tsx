import { Alert, Button, Form, Input } from "antd";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { axiosInstance } from "../../axios/axiosInstance";
import { CardBackgrounSection } from "../../components/ui/CardBackgrounSection";
import { LOGO } from "../../constants/LOGO";
import { HOME, LOGIN, PRIVATEUSERS } from "../../routes/Paths";
import { useAuthUser } from "../../store/useAuthUser";

export default function ResetPassword() {
  const { login, isAuthenticated, userLogged } = useAuthUser();

  const navigate = useNavigate();
  const { token } = useParams<{ token: string }>();

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isLoadingButton, setIsLoadingButton] = useState(false);

  const [alert, setAlert] = useState({
    isVisible: false,
    message: "",
  });

  const [form] = Form.useForm();

  //Si ingresa al login desde la url pero esta autenticado que lo redirija al private
  useEffect(() => {
    if (isAuthenticated) {
      if (userLogged != null) {
        navigate(PRIVATEUSERS);
        return;
      }
    }
  }, [isAuthenticated, userLogged]);

  const resetPassword = async () => {
    const formValues = form.getFieldsValue();

    const formData = new FormData();
    // @ts-ignore
    formData.append("token", token);
    formData.append("password", formValues.password);
    formData.append("password_confirmation", formValues.passwordConfirmed);

    setIsLoadingButton(true);
    setAlert((prevState) => ({
      ...prevState,
      isVisible: false,
    }));

    await axiosInstance
      .put("/api/password-reset", formData)
      .then((response) => {
        navigate(LOGIN + "?i=2");
      })
      .catch((error) => {
        console.log(error);

        if (error?.response?.data?.message) {
          setAlert((prevState) => ({
            ...prevState,
            isVisible: true,
            message: error.response.data.message,
          }));
        }
      })
      .finally(function () {
        setIsLoadingButton(false);
      });
  };

  return (
    <>
      <CardBackgrounSection>
        {/* Logo vortex */}
        <Link to={HOME} className="mx-auto w-full block max-w-[128px]">
          <img src={LOGO} alt="logo" />
        </Link>

        {/*Text */}
        <div className="mt-4 mb-8 text-center">
          <h2 className="text-2xl font-bold text-center sora-font md:text-3xl">
            Cambiar contraseña
          </h2>
        </div>

        <Form form={form} layout="vertical" onFinish={resetPassword}>
          {/*ALERTS*/}
          <div className="mb-4">
            {alert.isVisible && (
              <Alert
                message="Error"
                description={alert.message}
                type="error"
                showIcon
              />
            )}
          </div>

          {/* Password */}
          <Form.Item
            hasFeedback
            name="password"
            label="Contraseña"
            rules={[
              { required: true, message: "Ingresa tu contraseña" },
              { min: 8 },
              { max: 20 },
            ]}
          >
            <Input.Password
              visibilityToggle={{
                visible: passwordVisible,
                onVisibleChange: setPasswordVisible,
              }}
              placeholder="Ingresa tu contraseña"
            />
          </Form.Item>

          {/* Confirmed Password */}
          <Form.Item
            name="passwordConfirmed"
            label="Confirmar contraseña"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Por favor confirma tu contraseña",
              },
              {
                max: 20,
                message: "Contraseña debe tener hasta 20 caracteres",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("Las contrasñeas no coinciden")
                  );
                },
              }),
            ]}
          >
            <Input.Password
              visibilityToggle={{
                visible: passwordVisible,
                onVisibleChange: setPasswordVisible,
              }}
              placeholder="Confirma tu contraseña"
            />
          </Form.Item>

          {/* Button */}
          <Form.Item className="mt-6">
            <Button
              type="primary"
              className="w-full"
              loading={isLoadingButton}
              htmlType="submit"
            >
              Cambiar contraseña
            </Button>
          </Form.Item>
        </Form>

        {/* Links */}
        <div className="mx-auto rounded-xl">
          <div>
            <Link to={LOGIN} className="inline-block text-sm ">
              ¿Perdido?{" "}
              <span className="text-primary">Volver al inicio de sesión</span>
            </Link>
          </div>
        </div>
      </CardBackgrounSection>
    </>
  );
}
