import "./App.scss";
import Login from "./Components/Login";
import { useState } from "react";
import { auth } from "./firebase";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Components/Home";
import ChatPage from "./Components/ChatPage";

function App() {
  const signOut = () => {
    auth
      .signOut()
      .then(() => {
        setUser({ fullName: "", email: "", photoURL: "" });
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

  const [user, setUser] = useState<{
    fullName: string | null;
    email: string | null;
    photoURL: string | null;
  }>();

  return (
    <div className="main-app-div">
      {user?.fullName !== "" && <RouterProvider router={router} />}
      {/* {user?.email !== "" && <MainChat />} */}
      {user?.email === "" && (
        <Login
          setUser={(value: {
            fullName: string | null;
            email: string | null;
            photoURL: string | null;
          }) => {
            setUser(value);
          }}
        />
      )}
    </div>
  );
}

export default App;
