import { Layout } from "antd";
import "./header.css";
import { PoweroffOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { clearToken } from "@utils/helpers";

const { Header: AntHeader } = Layout;

const Header = () => {
  const navigate = useNavigate();

  return (
    <AntHeader className="px-4 ">
      <div
        className="ml-auto w-fit hover:text-gray-600 cursor-pointer"
        onClick={() => {
          clearToken();
          navigate("/login");
        }}
      >
        <PoweroffOutlined /> logout
      </div>
    </AntHeader>
  );
};

export default Header;
