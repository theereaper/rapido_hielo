import { Link } from "react-router-dom";
import { HOME } from "../../../routes/Paths";
import { LOGO } from "../../../constants/LOGO";
import { VersionNumber } from "./VersionNumber";

export const AppLogoVersion = () => {
  return (
      <Link to={HOME} className="flex flex-1 justify-center items-center gap-1">
        <img width={150} src={LOGO} alt="logo" />
        <VersionNumber />
      </Link>
  );
};
