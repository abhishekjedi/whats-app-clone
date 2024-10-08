import React from "react";
import { Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./style.scss";
const ChatGroups: React.FC<{
  groupName: string;
  lastmessage: string;
  photoURL: string;
  email: string;
  time: string;
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
        <div>
          <p className="last-message">{props.lastmessage}</p>
          <p className="time-span-2">{props.time}</p>
        </div>
      </div>
    </div>
  );
};

export default ChatGroups;
