import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ConfigProvider } from "antd";
import React from "react";
import VersionUpdateBanner from "./components/system/VersionUpdateBanner";
import { LoadingScreen } from "./components/ui/loadings/LoadingScreen";
import { themeConfig, themeLocale } from "./config/themeConfig";
import useInitialData from "./hooks/useInitialData";
import { PrivateRoutes } from "./routes/PrivateRoutes";
import { useAuthUser } from "./store/useAuthUser";
import Error404 from "./views/Error404";
import { PublicRoutes } from "./routes/PublicRoutes";

const App: React.FC = () => {
  useInitialData();

  const isLoadingInitialData = useAuthUser(
    (state) => state.isLoadingInitialData
  );

  return (
    <>
      <ConfigProvider locale={themeLocale} theme={themeConfig}>
        {isLoadingInitialData && <LoadingScreen />}
        <VersionUpdateBanner />

        <BrowserRouter>
          <Routes>
            {PublicRoutes()}
            {PrivateRoutes()}
            <Route path="*" element={<Error404 />} />
          </Routes>
        </BrowserRouter>
      </ConfigProvider>
    </>
  );
};

export default App;
