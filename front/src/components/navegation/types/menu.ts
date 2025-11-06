import { ReactNode } from "react";

export interface MenuItem {
  key: string;
  icon?: ReactNode;
  children?: MenuItem[];
  label: ReactNode;
  type?: string;
}