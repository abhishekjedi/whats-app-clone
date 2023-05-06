import React, { useState, useEffect } from "react";
import InsertCommentIcon from "@mui/icons-material/InsertComment";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Avatar, IconButton } from "@mui/material";
import "./MainChatHeader.scss";
import { useParams } from "react-router-dom";
import { collection, doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";

const MainChatHeader = () => {
  interface users {
    fullName: string;
    email: string;
    photoURL: string;
  }
  const dummyUser: users = {
    fullName: "",
    email: "",
    photoURL: "",
  };
  const [user, setUser] = useState<users>(dummyUser);
  const params = useParams();
  const colRef = collection(db, "user");
  useEffect(() => {
    const getUser = async () => {
      const data = await getDoc(doc(colRef, params.emailId));
      const tempUser: users = {
        fullName: data?.data()?.fullName,
        email: data?.data()?.email,
        photoURL: data?.data()?.photoURL,
      };
      setUser(tempUser);
    };
    getUser();
  }, [params.emailId]);
  return (
    <div className="main-chat-header">
      <div className="main-chat-header__info">
        <span className="main-chat-header__avatar">
          <Avatar src={user.photoURL} />
        </span>
        <h1 className="main-chat-header__group-name">{user.fullName}</h1>
      </div>
      <div className="main-chat-header__buttons">
        <IconButton>
          <InsertCommentIcon />
        </IconButton>
        <IconButton>
          <MoreVertIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default MainChatHeader;
