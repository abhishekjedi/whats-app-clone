import { useContext } from "react";
import { AuthContext } from "../../Context/auth";
import { Outlet } from "react-router-dom";
import Login from "../../Pages/Login";

const RootLayout = () => {
  const { user } = useContext(AuthContext);

  return <div>{user ? <Outlet /> : <Login />}</div>;
};

export default RootLayout;
