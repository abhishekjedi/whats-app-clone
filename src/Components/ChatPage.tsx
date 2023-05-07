import React from "react";
import Sidebar from "./Sidebar/Sidebar";
import MainChat from "./MainChat/MainChat";
import "./Chatpage.scss";
import { Provider } from "react-redux";
import store from "../store";
const ChatPage: React.FC<{ signOut: () => void }> = ({ signOut }) => {
  return (
    <Provider store={store}>
      <div className="chatpage">
        <Sidebar signOut={signOut} />
        <MainChat />
      </div>
    </Provider>
  );
};

export default ChatPage;
