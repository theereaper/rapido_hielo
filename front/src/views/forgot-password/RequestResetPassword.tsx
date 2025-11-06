import { Alert, Button, Form, Input } from "antd";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { axiosInstance } from "../../axios/axiosInstance";
import { CardBackgrounSection } from "../../components/ui/CardBackgrounSection";
import Meta from "../../components/ui/Meta";
import { LOGO } from "../../constants/LOGO";
import { HOME, LOGIN, PRIVATEUSERS } from "../../routes/Paths";
import { useAuthUser } from "../../store/useAuthUser";

export default function RequestResetPassword() {
  const { login, isAuthenticated, userLogged } = useAuthUser();

  const [form] = Form.useForm();

  const [isLoadingButton, setIsLoadingButton] = useState(false);

  const [alert, setAlert] = useState({
    isVisible: false,
    type: "",
    message: "",
    description: "",
  });

  const navigate = useNavigate();

  //Si ingresa al login desde la url pero esta autenticado que lo redirija al private
  useEffect(() => {
    if (isAuthenticated) {
      if (userLogged != null) {
        navigate(PRIVATEUSERS);
        return;
      }
    }
  }, [isAuthenticated, userLogged]);

  const requestResetPassword = async () => {
    setIsLoadingButton(true);

    setAlert((prevState) => ({
      ...prevState,
      isVisible: false,
      message: "",
    }));

    const formValues = form.getFieldsValue();

    const formData = new FormData();
    formData.append("email", formValues.email);

    await axiosInstance
      .post("/api/password-reset", formData)
      .then(() => {
        setAlert({
          type: "success",
          isVisible: true,
          description: "Revisa tu bandeja de entrada",
          message: "",
        });

        form.resetFields();
      })
      .catch((error) => {
        console.log(error);

        if (error?.response.data?.message) {
          setAlert({
            type: "error",
            isVisible: true,
            message: "Error",
            description: "El correo no pudo ser enviado",
          });
        }
      })
      .finally(function () {
        setIsLoadingButton(false);
      });
  };

  return (
    <>
      <Meta
        title="¿Olvidaste tu contraseña?"
        description="Solicita un enlace para restablecer tu contraseña."
      />

      <CardBackgrounSection>
        {/* Logo  */}
        <Link to={HOME} className="mx-auto w-full block max-w-[128px] mb-4">
          <img src={LOGO} />
        </Link>

        {/* Titulo de pagina */}
        <div className="mb-2">
          <h2
            className="sora-font max-w-[800px] mx-auto 
               text-2xl md:text-3xl font-bold text-center"
          >
            ¿Olvidate tu contraseña? Recuperala Aquí
          </h2>
          <p className="text-text-secondary text-balance md:text-base mt-5 max-w-[800px] mx-auto text-center">
            Ingresa tu correo electrónico, si es válido te llegara un enlace en
            la bandeja de entrada, tienes 1 hora para utilizarlo.
          </p>
        </div>

        <Form form={form} layout="vertical" onFinish={requestResetPassword}>
          {/* Email */}
          <Form.Item
            name="email"
            label="Correo electrónico"
            rules={[
              { required: true, message: "Ingresa tu correo electrónico" },
              {
                pattern:
                  /([-!#-'*+/-9=?A-Z^-~]+(\.[-!#-'*+/-9=?A-Z^-~]+)*|\"([]!#-[^-~ \t]|(\\[\t -~]))+\")@([-!#-'*+/-9=?A-Z^-~]+(\.[-!#-'*+/-9=?A-Z^-~]+)*|\[[\t -Z^-~]*])/,
                message: "Email inválido",
              },
            ]}
          >
            <Input type="email" placeholder="Ingresa tu correo electrónico" />
          </Form.Item>

          {alert.isVisible && (
            <div className="mb-4">
              <Alert
                message={alert.message}
                description={alert.description}
                type={alert.type}
                showIcon
              />
            </div>
          )}

          {/* Button */}
          <Form.Item>
            <Button
              type="primary"
              className="w-full"
              loading={isLoadingButton}
              htmlType="submit"
            >
              Solicitar enlace
            </Button>
          </Form.Item>
        </Form>

        {/* Links */}
        <div className="mx-auto max-w-[500px] rounded-xl">
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
