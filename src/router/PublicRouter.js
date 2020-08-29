import React from "react";
import { useRoutes } from "hookrouter";
import HomePage from "../components/Pages/HomePage";
import AboutPage from "../components/Pages/AboutPage";
import LoginPage from "../components/Pages/LoginPage";
import RegisterPage from "../components/Pages/RegisterPage";
import NotFoundPage from "../components/Pages/NotFoundPage";
import PublicNavbar from "../components/Navbar/PublicNavbar";
import ErrorPage from "../components/Pages/ErrorPage";

const routes = {
  "/home": () => <HomePage />,
  "/about": () => <AboutPage />,
  "/": () => <LoginPage />,
  "/register": () => <RegisterPage />,
  "/error": () => <ErrorPage />,
};

const PublicRouter = () => {
  const page = useRoutes(routes);

  return page ? <PublicNavbar page={page} /> : <NotFoundPage />;
};

export default PublicRouter;
