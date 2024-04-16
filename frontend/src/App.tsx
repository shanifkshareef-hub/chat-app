import { ConfigProvider } from "antd";
import { BrowserRouter, useRoutes } from "react-router-dom";

import routes from "./routes";
import theme from "./theme";

import "./styles/App.css";

const Routes = () => {
  const routing = useRoutes(routes);
  return routing;
};

const App = () => {
  return (
    <ConfigProvider theme={theme.light}>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </ConfigProvider>
  );
};

export default App;
