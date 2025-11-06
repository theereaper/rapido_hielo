import { Button } from "antd";
import { AddIcon } from "./icons/AddIcon";

type SectionPrivateHeaderProps = {
  title: string;
  onButtonClick?: () => void;
  buttonText?: string;
  existsButton?: boolean;
};

export const SectionPrivateHeader = (props: SectionPrivateHeaderProps) => {
  const {
    title,
    onButtonClick,
    buttonText = "Agregar",
    existsButton = true,
  } = props;

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
      <h2 className="text-3xl font-bold sm:text-4xl">{title}</h2>
      {existsButton && (
        <div className="ml-auto max-w-fit">
          <Button
            type="primary"
            icon={<AddIcon className="size-5" />}
            onClick={onButtonClick}
          >
            {buttonText}
          </Button>
        </div>
      )}
    </div>
  );
};
