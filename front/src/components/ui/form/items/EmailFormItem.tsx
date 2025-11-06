import { Form, Input, InputProps } from "antd";

interface EmailFormItemProps extends Omit<InputProps, "form"> {
  label?: string;
  name?: string;
  required?: boolean;
}

export default function EmailFormItem(props: EmailFormItemProps) {
  const {
    label = "Correo electrónico",
    name = "email",
    required = false,
    ...inputProps
  } = props;

  return (
    <Form.Item
      name={name}
      label={label}
      validateTrigger="onBlur"
      rules={[
        {
          required,
        },
        {
          pattern: /^\S+@\S+\.\S+$/,
          message: "Correo electrónico inválido",
        },
        { max: 90 },
      ]}
    >
      <Input
        type="email"
        placeholder="Ingresa correo electrónico"
        {...inputProps}
      />
    </Form.Item>
  );
}
