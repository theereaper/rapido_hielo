import { Form, Input, InputProps, InputRef } from "antd";
import { forwardRef, useState } from "react";

interface PasswordFormItem extends Omit<InputProps, "form"> {
  label?: string;
  name?: string;
  required?: boolean;
  nameValidateMatch?: string;
  validateMatch?: boolean;
  dependencies?: string[];
}

export default function (props: PasswordFormItem) {
  const {
    label = "Contraseña",
    name = "password",
    required = true,
    nameValidateMatch,
    validateMatch = false,
    dependencies = [],
    ...inputProps
  } = props;

  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <Form.Item
      name={name}
      validateTrigger="onBlur"
      label={label}
      dependencies={dependencies}
      rules={[
        { required, min: 8, max: 20 },
        validateMatch
          ? ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue(nameValidateMatch) === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("Las contraseñas no coinciden")
                );
              },
            })
          : {},
      ]}
    >
      <Input.Password
        visibilityToggle={{
          visible: passwordVisible,
          onVisibleChange: setPasswordVisible,
        }}
        placeholder="Ingresa contraseña"
        {...inputProps}
      />
    </Form.Item>
  );
}
