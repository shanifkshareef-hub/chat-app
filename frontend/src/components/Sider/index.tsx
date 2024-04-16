import { Layout, SiderProps } from "antd";
import "./sider.css";

const { Sider: AntSider } = Layout;

const Sider = (props: SiderProps) => {
  return (
    <AntSider breakpoint="lg" width={240} collapsible {...props}>
      {props.children}
    </AntSider>
  );
};

export default Sider;
