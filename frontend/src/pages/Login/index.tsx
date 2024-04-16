import { Form } from "antd";
import { Link, useNavigate } from "react-router-dom";
import Services from "@services/auth";
import { LoginData } from "src/interfaces/common";

const Login = () => {
  let navigate = useNavigate();

  const onFinish = async (values: LoginData) => {
    const resp = await Services.login(values);

    if (resp && resp.status && resp.data) {
      const res = await Services.getPk();
      localStorage.setItem("token", resp.data.token);
      if (res && res.status && res.data) {
        localStorage.setItem("pk", res.data);
        navigate("/app/chat", { replace: true });
      }
    }
  };

  return (
    <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8 overflow-hidden ob">
      <div className="w-full z-10 max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <Form
          className="mt-8 space-y-6 w-full"
          initialValues={{ email: undefined, password: undefined }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <input
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              required
              className=" block w-full appearance-none  rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              placeholder="Email address"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              placeholder="Password"
            />
          </Form.Item>

          <div className="flex flex-row space-x-4">
            <button
              type="submit"
              className="group relative flex flex-1 justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <span className="absolute inset-y-0 left-0 flex items-center pl-3"></span>
              Sign in
            </button>
          </div>
          <p className="text-sm mt-2">
            Don't have an account ?{" "}
            <span
              onClick={() => {
                navigate("/register");
              }}
              className="font-medium cursor-pointer text-indigo-600 hover:text-indigo-500 "
            >
              Register
            </span>
          </p>
        </Form>
      </div>
    </div>
  );
};

export default Login;
