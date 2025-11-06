import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { axiosInstance } from "../../axios/axiosInstance";
import { LoadingScreen } from "../../components/ui/loadings/LoadingScreen";
import { useAuthUser } from "../../store/useAuthUser";

export default function Logout() {
  const { logout, isAuthenticated } = useAuthUser();

  useEffect(() => {
    const handleLogout = async () => {
      try {
        // Solo si hay token válido
        await axiosInstance.post("/api/logout");
      } catch (error) {
        console.error("Error al hacer logout:", error);
      } finally {
        logout();
      }
    };

    if (isAuthenticated) {
      handleLogout();
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <LoadingScreen />;
}
