import React, { useState } from "react";
import "./UserRegister.css";
import { Button, Form, Input} from "antd";
import { registerUser } from "../../api/userApi";
import { useNavigate } from "react-router-dom";
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
    number: "${label} is not a valid number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};

const UserRegister = () => {
  const navigate = useNavigate();
    
  const [popup, setPopup] = useState({ visible: false, message: "", type: "" });

  const showPopup = (message, type = "success") => {
    setPopup({ visible: true, message, type });
    setTimeout(() => {
      setPopup({ visible: false, message: "", type: "" });
    }, 3000);
  };

  const onFinish = async (values) => {
    try {
      const payload = values.user;
      const response = await registerUser(payload);

      if (response.data.success) {
         showPopup("Registration successful!", "success");
        setTimeout(() => {

          navigate("/login");
        }, 2000);
      } else {
        showPopup(response.data.message || "Registration failed");
      }
    } catch (error) {
      console.error("Registration error:", error);
      showPopup("Something went wrong during registration.");
    }
  };
  return (
    <div className="register-container">
      {popup.visible && (
        <div className={`custom-popup ${popup.type}`}>{popup.message}</div>
      )}
      <Form
        {...layout}
        name="nest-messages"
        onFinish={onFinish}
        style={{ maxWidth: 600 }}
        validateMessages={validateMessages}
      >
        <h1>Sign Up</h1>
        <Form.Item
          name={["user", "userName"]}
          label="Username"
          rules={[{ required: true }]}
        >
          <Input placeholder="Username" />
        </Form.Item>
        <Form.Item
          name={["user", "firstName"]}
          label="First Name"
          rules={[{ required: true }]}
        >
          <Input placeholder="First Name" />
        </Form.Item>
        <Form.Item
          name={["user", "lastName"]}
          label="Last Name"
          rules={[{ required: true }]}
        >
          <Input placeholder="Last Name" />
        </Form.Item>
        <Form.Item
          name={["user", "email"]}
          label="Email"
          rules={[{ required: true }]}
        >
          <Input placeholder="Email" />
        </Form.Item>
        <Form.Item
          name={["user", "password"]}
          label="Password"
          rules={[{ required: true }]}
        >
          <Input type="password" placeholder="Password" />
        </Form.Item>

        <Form.Item label={null}>
          <Button block type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default UserRegister;
