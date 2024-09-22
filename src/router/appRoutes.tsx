import { RouteObject } from "react-router";
import { createBrowserRouter } from "react-router-dom";
import CONSTANTS from "../Constants/constants";
import Home from "../Pages/Home";
import ChatPage from "../Pages/ChatPage";
import RootLayout from "../Components/Layout/RootLayout";
// import Match from "../views/match";

const appRoutes: RouteObject[] = [
  {
    path: CONSTANTS.PAGES.HOME,
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: ":emailId",
        element: <ChatPage />,
      },
    ],
  },
];

const router = createBrowserRouter(appRoutes);

export default router;
