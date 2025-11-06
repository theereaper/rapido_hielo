import { useEffect, useState } from "react";
import { axiosInstance } from "../axios/axiosInstance";
import { VERSIONNUMBER } from "../constants/VersionNumber";

export const useVersionChecker = () => {
  const [hasNewVersion, setHasNewVersion] = useState(false);

  useEffect(() => {
    const checkVersion = async () => {
      try {
        const response = await axiosInstance.get("/api/version");
        if (response.data.version !== VERSIONNUMBER) {
          setHasNewVersion(true);
        }
      } catch (err) {
        console.log("Error checking app version:", err);
      }
    };

    checkVersion();
  }, []);

  return { hasNewVersion };
};
