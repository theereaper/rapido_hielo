import { FloatButton, Popconfirm } from "antd";
import { EmailIcon } from "./icons/EmailIcon";
import { QuestionIcon } from "./icons/QuestionIcon";

export const FloatButtonDashboard = () => {
  return (
    <div className=" fixed z-[1000] w-full ">
      <FloatButton.Group
        trigger="click"
        type="primary"
        style={{
          bottom: 25,
        }}
        icon={<QuestionIcon className="size-6 -ml-[3px]" />}
      >
        {/* Link soporte */}
        <Popconfirm
          title="¿Tienes un problema o duda?"
          description="Puedes contactar a soporte desarrollo@grupovortex.cl"
          okText="Contactar"
          cancelText="Cerrar"
          onConfirm={() => {
            window.open("mailto:desarrollo@grupovortex.cl", "_blank");
          }}
        >
          <FloatButton icon={<EmailIcon className="size-6 -ml-[3px]" />} />
        </Popconfirm>
      </FloatButton.Group>
    </div>
  );
};
