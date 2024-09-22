import React, { useContext } from "react";
import Sidebar from "../../Components/Sidebar";
import "./style.scss";
import { AuthContext } from "../../Context/auth";

const Home = () => {
  const { logOut } = useContext(AuthContext);
  return (
    <div className="home-div">
      <Sidebar signOut={logOut} />
      <div className="background">
        {/* <img src={bg} alt="background" className="background" /> */}
      </div>
    </div>
  );
};

export default Home;
