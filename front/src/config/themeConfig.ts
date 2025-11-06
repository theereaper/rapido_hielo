// themeConfig.ts
import { ThemeConfig } from "antd/es/config-provider/context";
import esES from "antd/locale/es_ES";
import { Colors } from "../constants/Colors";

export const themeLocale = esES;

export const themeConfig: ThemeConfig = {
  token: {
    fontFamily: "Inter",
    colorText: Colors.textPrimary,
    colorPrimary: Colors.primary,
  },
  components: {
    Menu: {
      itemSelectedColor: Colors.textPrimary,
      colorBgElevated: "#1E40AF",
    },
    Descriptions: {
      colorText: Colors.textPrimary,
      colorTextTertiary: Colors.textPrimary,
    },
    Segmented: {
      trackPadding: 24,
    },
    Input: {
      colorPrimary: Colors.primary,
      colorBorder: Colors.borderInputs,
      colorTextPlaceholder: Colors.textPlaceholder,
      algorithm: true,
      paddingBlock: 12,
      paddingInline: 16,
      borderRadius: 12,
      lineWidth: 1,
    },
    DatePicker: {
      colorPrimary: Colors.primary,
      colorBorder: Colors.borderInputs,
      colorTextPlaceholder: Colors.textPlaceholder,
      algorithm: true,
      paddingBlock: 12,
      paddingInline: 16,
      borderRadius: 12,
      lineWidth: 1,
    },
    InputNumber: {
      colorPrimary: Colors.primary,
      colorBorder: Colors.borderInputs,
      colorTextPlaceholder: Colors.textPlaceholder,
      algorithm: true,
      paddingBlock: 12,
      paddingInline: 16,
      borderRadius: 12,
      lineWidth: 1,
    },
    Select: {
      colorPrimary: Colors.primary,
      colorBorder: Colors.borderInputs,
      colorTextPlaceholder: Colors.textPlaceholder,
      algorithm: true,
      borderRadius: 12,
      controlHeight: 48,
      lineWidth: 1,
    },
    Button: {
      borderRadius: 12,
      defaultHoverBorderColor: null,
      defaultHoverBg: null,
      defaultShadow: null,
      defaultHoverColor: null,
    },
    Table: {
      headerBg: "#ecf1f7",
    },
    Popconfirm: {},
  },
};
