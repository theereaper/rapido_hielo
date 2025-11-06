import { Route } from "react-router-dom";
import {
  LOGIN,
  REGISTER,
  REQUESTRESETPASSWORD,
  RESETPASSWORD,
  UNAUTHORIZED,
} from "../routes/Paths";
import Login from "../views/auth/Login";
import Register from "../views/auth/Register";
import RequestResetPassword from "../views/forgot-password/RequestResetPassword";
import ResetPassword from "../views/forgot-password/ResetPassword";
import UnauthorizedPage from "../views/UnauthorizedPage";

export const PublicRoutes = () => {
  return (
    <>
      <Route path="/" element={<Login />} />
      <Route path={LOGIN} element={<Login />} />
      <Route path={REGISTER} element={<Register />} />
      <Route path={REQUESTRESETPASSWORD} element={<RequestResetPassword />} />
      <Route path={RESETPASSWORD} element={<ResetPassword />} />
      <Route path={UNAUTHORIZED} element={<UnauthorizedPage />} />
    </>
  );
};
