import React, { useState, cloneElement } from "react";
import LoginForm from "../LoginForm/LoginForm";
import { Button } from "react-bootstrap";

const ModelContainer = ({ children, UsersData, ObjectsData }) => {
  
  const [isLogin, isLoginChange] = useState(false);
  const [username, usernameChange] = useState(false);

  return isLogin ? (
    <React.Fragment>
      <Button onClick={() => isLoginChange(false)}>LogOut</Button>
      {cloneElement(children, { username, UsersData, ObjectsData, isLoginChange})}
    </React.Fragment>
  ) : (
    <LoginForm isLoginChange={isLoginChange} usernameChange={usernameChange} UsersData={UsersData} ObjectsData={ObjectsData}/>
  );
};

export default ModelContainer;
