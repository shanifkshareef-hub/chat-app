import React from "react";
import { Form, Input } from "antd";

const NewForm = () => {
  return (
    <div className="">
      <Form
        onFinish={(values) => {
          console.log("values", values);
        }}
        id="form"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, type: "email" }]}
        >
          <Input type="email" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true }]}
        >
          <Input type="password" />
        </Form.Item>
      </Form>
      <button form="form" type="submit" className="border">
        Submit
      </button>
    </div>
  );
};

export default NewForm;
