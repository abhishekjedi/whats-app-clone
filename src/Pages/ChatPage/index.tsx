import React, { useContext } from "react";
import Sidebar from "../../Components/Sidebar";
import MainChat from "../../Components/Chat";
import "./style.scss";
import { AuthContext } from "../../Context/auth";

const ChatPage = () => {
  const { logOut } = useContext(AuthContext);
  return (
    <div className="chatpage">
      <Sidebar signOut={logOut} />
      <MainChat />
    </div>
  );
};

export default ChatPage;
