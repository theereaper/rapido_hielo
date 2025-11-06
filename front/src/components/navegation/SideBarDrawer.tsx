import { Drawer } from "antd";
import { DataUser } from "./components/DataUser";
import { MenuSidebar } from "./components/MenuSidebar";

type SideBarDrawerProps = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
};

export const SideBarDrawer = ({ isOpen, setIsOpen }: SideBarDrawerProps) => {
  const closeDrawer = () => {
    setIsOpen(false);
  };

  return (
    <Drawer
      title="Menú"
      placement="left"
      width={275}
      onClose={() => setIsOpen(false)}
      open={isOpen}
    >
      <div className="flex flex-col h-full">
        <MenuSidebar closeDrawer={closeDrawer} />

        <div className="mt-auto">
          <div className="block">
            <DataUser closeDrawer={closeDrawer} />
          </div>
        </div>
      </div>
    </Drawer>
  );
};
