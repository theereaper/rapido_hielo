import { Spin } from "antd";
import { LOGO } from "../../../constants/LOGO";

interface LoadingScreenProps {
  opacity?: number;
  textLoading?: string;
  zIndex?: number;
}

export const LoadingScreen = (props: LoadingScreenProps) => {
  const { opacity = 1, textLoading, zIndex = 1000 } = props;

  return (
    <div
      role="status"
      style={{ opacity: opacity, zIndex: zIndex }}
      className={`fixed inset-0 flex justify-center items-center flex-col w-full h-full bg-white bg-opacity-${opacity}`}
    >
      <div
        className="flex flex-col items-center justify-center gap-4"
        role="status"
      >
        <img src={LOGO} width={150} alt="logo" />
        <Spin size="large" />
        {textLoading && <p>{textLoading}</p>}
      </div>
    </div>
  );
};
