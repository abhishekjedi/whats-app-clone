import InsertCommentIcon from "@mui/icons-material/InsertComment";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Avatar, IconButton } from "@mui/material";
import "./style.scss";
import { ChatHeaderProps } from "./ChatHeader.types";

const ChatHeader = ({ user }: ChatHeaderProps) => {
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
