import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import "./index.css";

import LandingPage  from "./pages/landingpage";
import Login        from "./pages/login";
import Signup       from "./pages/signup";
import Dashboard    from "./pages/dashboard";
import History      from "./pages/history";
import About        from "./pages/about";
import Header       from "./components/Header";
import Footer       from "./components/Footer";

// Public layout — header + footer wrapping public pages
const PublicLayout = () => (
  <>
    <Header />
    <Outlet />
    <Footer />
  </>
);

const router = createBrowserRouter([
  // Public pages (with nav)
  {
    element: <PublicLayout />,
    children: [
      { path: "/",       element: <LandingPage /> },
      { path: "/about",  element: <About /> },
    ],
  },
  // Auth pages (standalone, no nav)
  { path: "/login",     element: <Login /> },
  { path: "/signup",    element: <Signup /> },
  // App pages (their own nav inside)
  { path: "/dashboard", element: <Dashboard /> },
  { path: "/history",   element: <History /> },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
