import React, { useContext } from "react";
import Sidebar from "../../Components/Sidebar";
import Chat from "../../Components/Chat";
import "./style.scss";
import { AuthContext } from "../../Context/auth";

const ChatPage = () => {
  const { logOut } = useContext(AuthContext);
  return (
    <div className="chatpage">
      <div className="chatpage__sidebar">
        <Sidebar signOut={logOut} />
      </div>

      <Chat />
    </div>
  );
};

export default ChatPage;
