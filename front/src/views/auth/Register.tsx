import { Alert, Button, Form, Input } from "antd";
import "aos/dist/aos.css";
import { useEffect, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { Link, useNavigate } from "react-router-dom";
import { axiosInstance } from "../../axios/axiosInstance";
import { CardBackgrounSection } from "../../components/ui/CardBackgrounSection";
import Meta from "../../components/ui/Meta";
import { LOGO } from "../../constants/LOGO";
import { TOKENCAPTCHA } from "../../constants/TokenReCaptcha";
import EmailFormItem from "../../components/ui/form/items/EmailFormItem";
import PasswordFormItem from "../../components/ui/form/items/PasswordFormItem";
import { HOME, LOGIN, PRIVATEUSERS, REQUESTRESETPASSWORD } from "../../routes/Paths";
import { useAuthUser } from "../../store/useAuthUser";


export default function Register() {
  const { login, isAuthenticated, userLogged } = useAuthUser();

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isLoadingButton, setIsLoadingButton] = useState(false);
  const [captchaValue, setCaptchaValue] = useState<string | null>(null);

  const [alert, setAlert] = useState({
    isVisible: false,
    message: "",
    type: "",
  });

  const navigate = useNavigate();

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

  const Register = async () => {
    setAlert((prev) => ({
      ...prev,
      isVisible: false,
    }));

    if (!captchaValue) {
      setAlert({
        isVisible: true,
        type: "error",
        message: "Por favor completa el reCAPTCHA",
      });
      return;
    }

    setIsLoadingButton(true);

    const formValues = form.getFieldsValue();

    const formData = new FormData();
    formData.append("name", formValues.name);
    formData.append("lastname", formValues.lastname);
    formData.append("email", formValues.email);
    formData.append("password", formValues.password);
    formData.append("password_confirmation", formValues.password_confirmation);
    formData.append("captcha_value", captchaValue);

    await axiosInstance
      .post("/api/auth/register", formData)
      .then((response) => {
        navigate(LOGIN + "?i=1");
      })
      .catch((error) => {
        console.log(error);
        if (error.response?.data?.errors?.email) {
          setAlert({
            isVisible: true,
            type: "error",
            message: "El correo electrónico ya existe, intenta con otro",
          });
        } else if (error.response?.data?.message) {
          setAlert({
            isVisible: true,
            type: "error",
            message: error.response.data.message,
          });
        }
      })
      .finally(function () {
        setIsLoadingButton(false);
      });
  };

  return (
    <>
      <Meta title="Registro" description="Registra tu cuenta." />

      <CardBackgrounSection width={712}>
        {/* Logo vortex */}
        <Link to={HOME} className="mx-auto w-full block max-w-[128px]">
          <img src={LOGO} alt="logo" />
        </Link>

        {/*Text */}
        <div className="mt-4 mb-8 text-center">
          <h2 className="text-2xl font-bold text-center sora-font text-negro md:text-3xl">
            Registrate
          </h2>
        </div>

        {/* Form */}
        <Form
          className="w-full "
          form={form}
          layout="vertical"
          onFinish={Register}
        >
          {/* Alert Success */}
          {alert.type === "success" && alert.isVisible && (
            <div className="mb-4">
              <Alert description={alert.message} type={alert.type} showIcon />
            </div>
          )}

          <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
            {/* name */}
            <Form.Item
              name="name"
              label="Nombre"
              className="w-full"
              validateTrigger="onBlur"
              rules={[{ max: 70, required: true }]}
            >
              <Input
                type="text"
                className="w-full"
                placeholder="Ingresa nombre"
              />
            </Form.Item>

            {/* lastname */}
            <Form.Item
              name="lastname"
              label="Apellido"
              validateTrigger="onBlur"
              className="w-full"
              rules={[{ max: 70, required: true }]}
            >
              <Input type="text" placeholder="Ingresa apellido" />
            </Form.Item>
          </div>

          {/* email */}
          <EmailFormItem required={true} />

          <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
            {/* Password */}
            <PasswordFormItem />

            {/* Password confirmation*/}
            <PasswordFormItem
              name="password_confirmation"
              label="Confirma contraseña"
              placeholder="Ingresa tu contraseña"
            />
          </div>

          {/* Alert error */}
          {alert.isVisible && alert.type === "error" && (
            <div className="mb-4">
              <Alert
                message="Error"
                description={alert.message}
                type={alert.type}
                showIcon
              />
            </div>
          )}

          <div className="flex justify-center w-full">
            <ReCAPTCHA
              sitekey={TOKENCAPTCHA}
              onChange={(value: string) => setCaptchaValue(value)}
            />
          </div>

          {/* Button */}
          <Form.Item className="mt-6">
            <Button
              type="primary"
              className="w-full"
              loading={isLoadingButton}
              htmlType="submit"
            >
              Registrarse
            </Button>
          </Form.Item>

          {/* Links */}
          <div className="flex flex-col mt-6 text-center">
            <Link
              to={REQUESTRESETPASSWORD}
              className="inline-block text-sm text-text-primary hover:text-text-primary"
            >
              ¿Olvidaste tu contraseña?{" "}
              <span className="text-primary">Recupérala aquí</span>
            </Link>
            <Link
              to={LOGIN}
              className="inline-block text-sm text-text-primary hover:text-text-primary"
            >
              ¿Ya tienes cuenta?{" "}
              <span className="text-primary">Inicia sesion aquí</span>
            </Link>
          </div>
        </Form>
      </CardBackgrounSection>
    </>
  );
}
