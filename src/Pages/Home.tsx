import React from "react";
import Sidebar from "../Components/Sidebar/Sidebar";
import "./Home.scss";

const Home: React.FC<{ signOut: () => void }> = ({ signOut }) => {
  return (
    <div className="home-div">
      <Sidebar signOut={signOut} />
      <div className="background">
        {/* <img src={bg} alt="background" className="background" /> */}
      </div>
    </div>
  );
};

export default Home;
