import { Header } from "antd/es/layout/layout";
import { useState } from "react";
import { MenuHamburgerIcon } from "../ui/icons/MenuHamburgerIcon";
import { AppLogoVersion } from "./components/AppLogoVersion";
import { SideBarDrawer } from "./SideBarDrawer";

export const MobileHeader = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    // @ts-ignore
    <Header className="flex max-h-[64px] justify-between p-4 bg-white border-b md:hidden">
      {/* Logo */}
      <div className="flex items-center gap-1">
        <AppLogoVersion />
      </div>

      {/* Button hamburger */}
      <div className="flex gap-2 md:hidden">
        <button
          className="items-center gap-x-2"
          onClick={() => setIsOpen(true)}
        >
          <MenuHamburgerIcon />
        </button>
      </div>

      <SideBarDrawer isOpen={isOpen} setIsOpen={setIsOpen} />
    </Header>
  );
};
