import React, { useState, useEffect, useContext } from "react";
import "./style.scss";
import ChatHeader from "./ChatHeader";
import Chatbody from "./ChatBody";
import ChatSerach from "./ChatType";
import { useParams } from "react-router-dom";
import { serverTimestamp } from "firebase/firestore";
import {
  addItem,
  getItem,
  setItem,
} from "../../helpers/Firebase/Firestore.service";
import { AuthContext } from "../../Context/auth";
import { User } from "../../Context/auth/auth.manager.types";
const Chat = () => {
  const { user: loggedInUser } = useContext(AuthContext);
  const [chatUser, setChatUser] = useState<User | null>(null);
  const parms = useParams();

  useEffect(() => {
    const getUserInfo = async () => {
      const docSnap = await getItem<User>(["user", `${parms.emailId}`]);
      const userInfo: User = {
        fullName: docSnap?.fullName || "",
        email: docSnap?.email || "",
        photoURL: docSnap?.photoURL || "",
      };

      setChatUser(userInfo);
    };
    getUserInfo();
  }, [parms.emailId]);

  const onSend = async (value: string) => {
    const payload = {
      senderEmail: loggedInUser?.email,
      recieverEmail: chatUser?.email,
      message: value,
      timeStamp: serverTimestamp(),
    };
    await Promise.all([
      addItem(["chats", `${loggedInUser?.email}`, "messages"], payload),
      addItem(["chats", `${chatUser?.email}`, "messages"], payload),
      setItem(
        ["friendlist", loggedInUser?.email || "", "list"],
        chatUser?.email || "",
        {
          fullName: chatUser?.fullName,
          email: chatUser?.email,
          photoURL: chatUser?.photoURL,
          message: value,
          timeStamp: serverTimestamp(),
        }
      ),
      setItem(
        ["friendlist", chatUser?.email || "", "list"],
        loggedInUser?.email || "",
        {
          fullName: loggedInUser?.fullName,
          email: loggedInUser?.email,
          photoURL: loggedInUser?.photoURL,
          message: value,
          timeStamp: serverTimestamp(),
        }
      ),
    ]);
  };

  return (
    <div className="main-chat">
      {chatUser && <ChatHeader user={chatUser} />}
      <Chatbody />
      <ChatSerach
        onSend={(value: string) => {
          onSend(value);
        }}
      />
    </div>
  );
};

export default Chat;
