import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import LandingPage from "./pages/landingpage";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Header from "./components/Header";
import Footer from "./components/Footer";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
    
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Header />
    <RouterProvider router={router} />
    <Footer />
  </React.StrictMode>
  
);
