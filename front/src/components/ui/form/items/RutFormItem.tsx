import { Form, Input, InputProps, InputRef } from "antd";
import { FormInstance } from "antd/es/form";
import { forwardRef } from "react";
import { formatRut, validateRut } from "rutlib";

interface RutFormItemProps extends Omit<InputProps, "form"> {
  label?: string;
  name?: string;
  required?: boolean;
  extra?: string;
  form: FormInstance;
  classNameFormItem?: string;
  formItemValidateStatus?:
    | ""
    | "warning"
    | "error"
    | "success"
    | "validating"
    | undefined;
}

const RutFormItem = forwardRef<InputRef, RutFormItemProps>((props, ref) => {
  const {
    label = "RUT",
    name = "rut",
    required = true,
    extra = "",
    form,
    classNameFormItem,
    formItemValidateStatus = "",
    ...inputProps
  } = props;

  return (
    <Form.Item
      name={name}
      label={label}
      extra={extra}
      className={classNameFormItem}
      validateStatus={formItemValidateStatus}
      rules={[
        { required, /* max: 12, min: 10, */ whitespace: true },
        {
          validator: (_, value) => {
            let rawRut = value;
            rawRut = formatRut(rawRut, true);

            form.setFieldsValue({
              [name]: rawRut, // ojo, mejor usar el `name` dinámico
            });

            const isValid = validateRut(rawRut);

            if (!isValid) {
              return Promise.reject(
                new Error(`El RUN/RUT: ${rawRut} ingresado no es válido`)
              );
            }

            return Promise.resolve();
          },
        },
      ]}
    >
      <Input
        ref={ref}
        maxLength={12}
        placeholder={`Ingresa ${label}`}
        {...inputProps}
      />
    </Form.Item>
  );
});

export default RutFormItem;
