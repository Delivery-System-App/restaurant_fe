import React from "react";
import { useRoutes } from "hookrouter";
import HomePage from "../components/Pages/HomePage";
import AboutPage from "../components/Pages/AboutPage";
import LoginPage from "../components/Pages/LoginPage";
import RegisterPage from "../components/Pages/RegisterPage";
import NotFoundPage from "../components/Pages/NotFoundPage";
import PublicNavbar from "../components/Navbar/PublicNavbar";
import ErrorPage from "../components/Pages/ErrorPage";
import ForgotPassword from "../components/Pages/ForgotPassword";

const routes = {
  "/": () => <HomePage />,
  "/about": () => <AboutPage />,
  "/login": () => <LoginPage />,
  "/register": () => <RegisterPage />,
  "/error": () => <ErrorPage />,
  "/reset-password": () => <ForgotPassword />,
};

const PublicRouter = () => {
  const page = useRoutes(routes);

  return page ? <PublicNavbar page={page} /> : <NotFoundPage />;
};

export default PublicRouter;
