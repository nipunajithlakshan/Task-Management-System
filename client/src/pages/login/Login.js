import React, { useState } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Flex } from "antd";
import "./Login.css";
import LoginImage from "../../assets/LoginImage.jpg";
import { userSignin } from "../../api/userApi";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const Login = () => {
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
      const response = await userSignin(values);
      if (response.data.success) {
        const token = response.data.data.token;
        console.log(token)
        
        localStorage.setItem("token", token);
        localStorage.setItem("userId", response.data.data.UserId);

        const decoded = jwtDecode(token);
        const expiresAt = decoded.exp * 1000;
        const now = Date.now();
        const timeUntilExpiry = expiresAt - now;

        if (timeUntilExpiry > 0) {
          setTimeout(() => {
            localStorage.clear();
            showPopup("Session expired. Please log in again.", "error");
            navigate("/login");
          }, timeUntilExpiry);
        }

        showPopup("Login successful!", "success");
        
        setTimeout(() => {

          navigate("/task");
        }, 1000);
        
      } else {
        showPopup(response.data.message || "Login failed!", "error");
      }
    } catch (error) {
      showPopup("Login failed! Please try again.", "error");
    }
  };

  return (
    <div
      className="login-container"
      style={{ backgroundImage: `url(${LoginImage})` }}
    >
      {/* Custom popup */}
      {popup.visible && (
        <div className={`custom-popup ${popup.type}`}>{popup.message}</div>
      )}

      <Form name="login" initialValues={{ remember: true }} onFinish={onFinish}>
        <h1>Sign In</h1>

        <Form.Item
          name="email"
          rules={[{ required: true, message: "Please input your Email!" }]}
        >
          <Input prefix={<UserOutlined />} placeholder="Email" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input.Password prefix={<LockOutlined />} placeholder="Password" />
        </Form.Item>

        <Form.Item>
          <Flex justify="space-between" align="center">
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <a href="#">Forgot password?</a>
          </Flex>
        </Form.Item>

        <Form.Item>
          <Button block type="primary" htmlType="submit">
            Log in
          </Button>
          <div className="login-links">
            <span>or</span> <a href="/register">Register now!</a>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
