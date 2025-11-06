import { AppLogoVersion } from "./components/AppLogoVersion";
import { DataUser } from "./components/DataUser";
import { MenuSidebar } from './components/MenuSidebar';
import { Layout } from "antd";
const { Sider } = Layout;

export const DesktopSideBar = () => {
  return (
    <div className="hidden border-r border-gray-300 md:block">
      <Sider
        width={270}
        style={{
          background: "white",
          overflow: "auto",
          height: "100vh",
          position: "sticky",
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <div className="flex items-center justify-center gap-1 py-4 mb-4 border-b border-gray-300">
          <AppLogoVersion />
        </div>

        <div className="flex flex-col h-[calc(100vh-92px)]">
          <MenuSidebar />

          <div className="mt-auto">
            <div className="block">
              <DataUser />
            </div>
          </div>
        </div>
      </Sider>
    </div>
  );
};
