import "./App.scss";
import Login from "./Pages/Login";
import { useState } from "react";
import { auth } from "./firebase";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Pages/Home";
import ChatPage from "./Pages/ChatPage";
interface user {
  fullName: string;
  email: string;
  photoURL: string;
}

function App() {
  const dummyUser: user = {
    fullName: "",
    email: "",
    photoURL: "",
  };
  if (localStorage.getItem("user")) {
    const tempUser = JSON.parse(localStorage.getItem("user") || "");
    dummyUser.fullName = tempUser?.fullName;
    dummyUser.email = tempUser.email;
    dummyUser.photoURL = tempUser.photoURL;
  }
  const [user, setUser] = useState<user>(dummyUser);
  const signOut = () => {
    const tempUser2: user = {
      fullName: "",
      email: "",
      photoURL: "",
    };
    auth
      .signOut()
      .then(() => {
        setUser(tempUser2);
        localStorage.removeItem("user");
      })
      .catch((err) => alert(err.message));
  };
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home signOut={signOut} />,
    },
    {
      path: ":emailId",
      element: <ChatPage signOut={signOut} />,
    },
  ]);
  console.log(user);
  localStorage.getItem("user");
  return (
    <div className="main-app-div">
      {user.fullName !== "" && <RouterProvider router={router} />}
      {/* {user?.email !== "" && <MainChat />} */}
      {user.email === "" && (
        <Login
          setUser={(value: {
            fullName: string | null;
            email: string | null;
            photoURL: string | null;
          }) => {
            const tempUser: user = {
              fullName: value.fullName ? value.fullName : "",
              email: value.email ? value.email : "",
              photoURL: value.photoURL ? value.photoURL : "",
            };
            setUser(tempUser);
          }}
        />
      )}
    </div>
  );
}

export default App;
