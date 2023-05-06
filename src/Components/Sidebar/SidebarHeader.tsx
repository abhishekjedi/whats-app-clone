import InsertCommentIcon from "@mui/icons-material/InsertComment";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { DonutLarge } from "@mui/icons-material";
import "./SidebarHeader.scss";
import { Avatar, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";

const SidebarHeader: React.FC<{ signOut: () => void }> = ({ signOut }) => {
  const navigate = useNavigate();
  const clickHandler = () => {
    signOut();
    navigate("/");
  };
  const data = localStorage.getItem("user");
  const userInformation = JSON.parse(data!);
  return (
    <div className="SidebarHeader">
      <div className="SidebarHeader__user-image" onClick={clickHandler}>
        <Avatar src={userInformation?.photoURL} />
      </div>
      <div className="SidebarHeader__icons">
        <IconButton>
          <InsertCommentIcon />
        </IconButton>
        <IconButton>
          <DonutLarge />
        </IconButton>
        <IconButton>
          <MoreVertIcon />
        </IconButton>
      </div>
    </div>
  );
};
export default SidebarHeader;
