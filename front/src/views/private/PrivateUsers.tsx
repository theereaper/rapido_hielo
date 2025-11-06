import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthUser } from "../../store/useAuthUser";
import { defaultRoutesByRole } from "../../routes/permissionsRole";
import { UNAUTHORIZED } from "../../routes/Paths";
import { Spin } from "antd";

export default function PrivateUsers() {
  const { isAuthenticated, userLogged, isLoadingInitialData } = useAuthUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoadingInitialData) return; // Espera a que cargue el usuario

    if (!isAuthenticated || !userLogged) {
      navigate(UNAUTHORIZED, { replace: true });
      return;
    }

    const route = defaultRoutesByRole[userLogged.role];
    if (!route) {
      navigate(UNAUTHORIZED, { replace: true });
      return;
    }

    navigate(route, { replace: true });
  }, [isLoadingInitialData, isAuthenticated, userLogged]);

  return (
    <div className="mx-auto max-w-fit">
      <Spin message="Cargando redirección..." />
    </div>
  );
}
