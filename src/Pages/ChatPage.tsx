import React from "react";
import Sidebar from "../Components/Sidebar/Sidebar";
import MainChat from "../Components/MainChat/MainChat";
import "./Chatpage.scss";

const ChatPage: React.FC<{ signOut: () => void }> = ({ signOut }) => {
  return (
    <div className="chatpage">
      <Sidebar signOut={signOut} />
      <MainChat />
    </div>
  );
};

export default ChatPage;
