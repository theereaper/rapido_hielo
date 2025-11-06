import { useEffect } from "react";
import { useAuthUser } from "../store/useAuthUser";

const useInitialData = () : void => {
  const { getMe } = useAuthUser();

  useEffect(() => {
    const token: string | null = localStorage.getItem("token");
    if (token) {
      getMe();
    }
  }, []);
};

export default useInitialData;
