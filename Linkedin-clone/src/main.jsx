import ReactDOM from "react-dom/client";
import { router } from "./Routes/Route.jsx";
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppProvider from "./heplers/Context/AppProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AppProvider>
    <RouterProvider router={router} />
    <ToastContainer />
  </AppProvider>
);
