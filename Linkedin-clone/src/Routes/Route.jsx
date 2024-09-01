import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import Connections from "../pages/Connections";
import ConnectedProfile from "../componants/Profile/ConnectedProfile";

export const router = createBrowserRouter([

    {
      path: "/Login",
      element: <Login />,
    },
    {
      path: "/",
      element: <Register />,
    },
    
  {
    path: "/Home",
    element: <Home />,
  },
    {
      path: "/Profile",
      element: <Profile />,
    },
    {
      path: "/Connections",
      element: <Connections />,
    },
    {
      path: "/ConnectedUserProfile",
      element: <ConnectedProfile />,
    }
  ]);