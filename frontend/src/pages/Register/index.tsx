import React from "react";
import { useNavigate } from "react-router-dom";
import { RegisterData } from "src/interfaces/common";
import Services from "@services/auth";
import { Form } from "antd";

const Register = () => {
  let navigate = useNavigate();

  const onFinish = async (
    values: RegisterData & { confirmPassword: string }
  ) => {
    console.log(values);

    const { confirmPassword, ...rest } = values;
    const resp = await Services.register(rest);

    if (resp && resp.status && resp.data) {
      navigate("/login");
    }
  };

  return (
    <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8 overflow-hidden ob">
      <div className="w-full z-10 max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Register
          </h2>
        </div>
        <Form
          className="mt-8 space-y-6 w-full"
          initialValues={{
            email: undefined,
            password: undefined,
            confirmPassword: undefined,
          }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            name="userName"
            rules={[{ required: true, message: "Please input user name!" }]}
          >
            <input
              id="user-name"
              name="text"
              type="text"
              required
              className=" block w-full appearance-none  rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              placeholder="User Name"
            />
          </Form.Item>
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
              type="password"
              required
              className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("The new password that you entered do not match!")
                  );
                },
              }),
            ]}
          >
            <input
              id="password"
              type="password"
              required
              className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              placeholder="Confirm Password"
            />
          </Form.Item>

          <div className="flex flex-row space-x-4">
            <button
              type="submit"
              className="group relative flex flex-1 justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <span className="absolute inset-y-0 left-0 flex items-center pl-3"></span>
              Register
            </button>
          </div>

          <p className="text-sm mt-2">
            Already have an account ?{" "}
            <span
              onClick={() => {
                navigate("/login");
              }}
              className="font-medium cursor-pointer text-indigo-600 hover:text-indigo-500 "
            >
              Login
            </span>
          </p>
        </Form>
      </div>
    </div>
  );
};

export default Register;
