import React, { useState, cloneElement } from "react";
import LoginForm from "../LoginForm/LoginForm";
import { Button } from "react-bootstrap";

const ModelContainer = ({ children, UsersData }) => {
  
  const [isLogin, isLoginChange] = useState(false);
  const [username, usernameChange] = useState(false);

  return isLogin ? (
    <React.Fragment>
      <Button onClick={() => isLoginChange(false)}>LogOut</Button>
      {cloneElement(children, { username, UsersData })}
    </React.Fragment>
  ) : (
    <LoginForm isLoginChange={isLoginChange} usernameChange={usernameChange} UsersData={UsersData} />
  );
};

export default ModelContainer;
