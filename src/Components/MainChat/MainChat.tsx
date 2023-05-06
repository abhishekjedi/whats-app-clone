import React, { useState, useEffect } from "react";
import "./MainChat.scss";
import MainChatHeader from "./MainChatHeader";
import MainChatbody from "./MainChatbody";
import MainChatSerach from "./MainChatSerach";
import { useParams } from "react-router-dom";
import {
  doc,
  getDoc,
  serverTimestamp,
  addDoc,
  setDoc,
  collection,
} from "firebase/firestore";
import { db } from "../../firebase";
const MainChat = () => {
  interface user {
    fullName: string;
    email: string;
    photoURL: string;
  }
  const dummyUser: user = {
    fullName: "",
    email: "",
    photoURL: "",
  };
  const [chatUser, setChatUser] = useState<user>(dummyUser);
  const loggedInUser = JSON.parse(localStorage.getItem("user") || "");
  const parms = useParams();
  const getUserInfo = async () => {
    const docRef = doc(db, "user", `${parms.emailId}`);
    const docSnap = await getDoc(docRef);
    const userInfo = docSnap.data();
    const mainUser: user = {
      fullName: userInfo?.fullName,
      email: userInfo?.email,
      photoURL: userInfo?.photoURL,
    };
    setChatUser(mainUser);
  };
  useEffect(() => {
    getUserInfo();
  }, [parms.emailId]);

  const onSend = async (value: string) => {
    await getUserInfo();
    console.log(chatUser);
    const payload = {
      senderEmail: loggedInUser.email,
      recieverEmail: chatUser.email,
      message: value,
      timeStamp: serverTimestamp(),
    };
    console.log(parms.emailId);
    const docRef = collection(db, "chats", `${loggedInUser.email}`, "messages");
    await addDoc(docRef, payload).then(() => {
      console.log("document has been added");
    });

    const docRef2 = collection(db, "chats", `${chatUser.email}`, "messages");
    await addDoc(docRef2, payload).then(() => {
      console.log("document has been added");
    });

    const colRef = collection(db, "friendlist");
    const docRef3 = doc(colRef, chatUser.email);
    const colRef2 = collection(docRef3, "list");
    await setDoc(doc(colRef2, loggedInUser.email), {
      fullName: loggedInUser.fullName,
      email: loggedInUser.email,
      photoURL: loggedInUser.photoURL,
      message: value,
    });
    const docRef4 = doc(colRef, loggedInUser.email);
    const colRef4 = collection(docRef4, "list");
    await setDoc(doc(colRef4, chatUser.email), {
      fullName: chatUser.fullName,
      email: chatUser.email,
      photoURL: chatUser.photoURL,
      message: value,
    });
  };

  return (
    <div className="main-chat">
      <MainChatHeader />
      <MainChatbody />
      <MainChatSerach
        onSend={(value: string) => {
          onSend(value);
        }}
      />
    </div>
  );
};

export default MainChat;
