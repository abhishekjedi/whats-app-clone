import InsertCommentIcon from "@mui/icons-material/InsertComment";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Avatar, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "./style.scss";
import { ChatHeaderProps } from "./ChatHeader.types";
import { useNavigate } from "react-router-dom";
import CONSTANTS from "../../../Constants/constants";

const ChatHeader = ({ user }: ChatHeaderProps) => {
  const navigate = useNavigate();
  return (
    <div className="main-chat-header">
      <div className="main-chat-header__info">
        <ArrowBackIcon
          className="main-chat-header__back"
          onClick={() => navigate(CONSTANTS.PAGES.HOME)}
        />
        <span className="main-chat-header__avatar">
          <Avatar src={user.photoURL} />
        </span>
        <h1 className="main-chat-header__group-name">{user.fullName}</h1>
      </div>
      <div className="main-chat-header__buttons">
        <IconButton>
          <InsertCommentIcon style={{ color: "white" }} />
        </IconButton>
        <IconButton>
          <MoreVertIcon style={{ color: "white" }} />
        </IconButton>
      </div>
    </div>
  );
};

export default ChatHeader;
