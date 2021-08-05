import React from "react";
import { authActions, authSelectors } from "../auth.slice";
import { useAppDispatch, useAppSelector } from "../../hooks";

const Login: React.FC = () => {
  const dispatch = useAppDispatch(),
    isAuthorized = useAppSelector(authSelectors.isAuthorized),
    user = useAppSelector(authSelectors.authUser);

  function handleLogin() {
    dispatch(
      authActions.login({
        username: "admin@aiis.com",
        password: "1234",
      })
    );
  }

  function handleLogout() {
    dispatch(authActions.logout());
  }

  return (
    <div className="wrapper">
      {isAuthorized ? (
        <div className="">
          <h1>{user.name}</h1>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <button onClick={handleLogin}>Login</button>
      )}
    </div>
  );
};

export default Login;
