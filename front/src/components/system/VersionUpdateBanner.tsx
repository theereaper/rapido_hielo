import React from "react";
import { useVersionChecker } from "../../hooks/useVersionChecker";

const VersionUpdateBanner: React.FC = () => {
  const { hasNewVersion } = useVersionChecker();

  if (!hasNewVersion) return null;

  return (
    <div className="fixed top-0 left-1/2 -translate-x-1/2 bg-primary text-white px-4 py-2 rounded-b-lg shadow-lg z-50">
      🔄 Nueva versión disponible.{" "}
      <button
        onClick={() => window.location.reload()}
        className="underline ml-2"
      >
        Actualizar
      </button>
    </div>
  );
};

export default VersionUpdateBanner;
