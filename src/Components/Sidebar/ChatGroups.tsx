import React from "react";
import { Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./Abc.scss";
const ChatGroups: React.FC<{
  groupName: string;
  lastmessage: string;
  photoURL: string;
  email: string;
}> = (props) => {
  const navigate = useNavigate();
  const goToUser = () => {
    if (props.email && props.email !== "") {
      navigate(`/${props.email}`);
    }
  };
  return (
    <div className="chat-groups">
      <Avatar src={props.photoURL} className="chat-groups__avatar" />
      <div className="user-information" onClick={goToUser}>
        <h1>{props.groupName}</h1>
        <p>{props.lastmessage}</p>
      </div>
    </div>
  );
};

export default ChatGroups;
