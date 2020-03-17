import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { data } from "../../constants/AMconstants";

const LoginForm = ({ isLoginChange, usernameChange }) => {
  const [loginData, loginDataChange] = useState({
    username: "",
    password: ""
  });

  const handleLoginData = e => {
    const target = e.target;
    loginDataChange({ ...loginData, [target.name]: target.value });
  };

  const LogInHandler = e => {
    e.preventDefault();
    if (
      data.some(
        cred =>
          cred.username === loginData.username &&
          cred.password === loginData.password
      ) ||
      (loginData.username === "admin" && loginData.password === "admin")
    ) {
      isLoginChange(true);
      usernameChange(loginData.username);
    }
  };

  return (
    <Form>
      <Form.Group>
        <Form.Label>Имя пользователя</Form.Label>
        <Form.Control
          value={loginData.username}
          name="username"
          type="text"
          placeholder="Введите имя пользователя"
          onChange={handleLoginData}
        ></Form.Control>
      </Form.Group>
      <Form.Group>
        <Form.Label>Пароль</Form.Label>
        <Form.Control
          value={loginData.password}
          name="password"
          type="password"
          placeholder="Введите пароль"
          onChange={handleLoginData}
        ></Form.Control>
      </Form.Group>
      <Button variant="primary" type="submit" onClick={LogInHandler}>
        Вход
      </Button>
    </Form>
  );
};

export default LoginForm;
