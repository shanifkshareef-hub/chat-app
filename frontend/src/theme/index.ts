import { ThemeConfig } from "antd";

// Use this site to create theme
// https://theme.antd.group/
const theme: Theme = {
  dark: {},
  light: {
    token: {
      colorPrimary: "#486aff",
      colorBgContainer: "#ffffff",
    },
    components: {
      Layout: {
        colorBgHeader: "#ffffff",
        colorBgBody: "#e9edf2",
        colorBgTrigger: "#d9d9d9",
      },
      Menu: {},
    },
  },
};

interface Theme {
  dark: ThemeConfig;
  light: ThemeConfig;
}

export default theme;
