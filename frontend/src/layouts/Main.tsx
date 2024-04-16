import { Outlet, useNavigate } from "react-router-dom";
import { Layout, Menu, theme } from "antd";
import { useState } from "react";

import { AppstoreOutlined } from "@ant-design/icons";

import Logo from "@assets/logo.png";
import Header from "@components/Header";
import Sider from "@components/Sider";
import { ItemType } from "antd/es/menu/hooks/useItems";

const { Content } = Layout;

const Main = () => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const menuItems: ItemType[] = [
    {
      icon: <AppstoreOutlined />,
      key: "/app/dashboard",
      label: "Dashboard",
    },
    {
      icon: <AppstoreOutlined />,
      key: "/app/menu",
      label: "Menu",
      children: [
        {
          icon: <AppstoreOutlined />,
          key: "/app/menu/submenu1",
          label: "SubMenu1",
        },
        {
          icon: <AppstoreOutlined />,
          key: "/app/menu/submenu2",
          label: "SubMenu2",
        },
      ],
    },
  ];

  return (
    <Layout className="h-full">
      <Sider collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <img
          src={Logo}
          alt={"Contructly logo"}
          className="logo h-16 w-16 m-auto pt-4"
        />

        <Menu
          onSelect={({ key }) => {
            navigate(key);
          }}
          className="pt-5"
          theme="light"
          defaultSelectedKeys={["/app/dashboard"]}
          mode="inline"
          items={menuItems}
        />
      </Sider>
      <Layout>
        <Header />
        <Content className="mx-4 my-4">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default Main;
