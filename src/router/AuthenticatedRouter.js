import React from "react";
import { useRoutes } from "hookrouter";
import Dashboard from "../components/Pages/Dashboard";
import ProfilePage from "../components/Pages/ProfilePage";
import NotFoundPage from "../components/Pages/NotFoundPage";
import AuthenticatedNavbar from "../components/Navbar/AuthenticatedNavbar";
import AddHotel from "../components/Pages/AddHotel";

const routes = {
  "/": () => <Dashboard />,
  "/user/:user": ({ user }) => <ProfilePage user={user} />,
  "/addhotel": () => <AddHotel />,
};

const AuthenticatedRouter = () => {
  const page = useRoutes(routes);

  return page ? <AuthenticatedNavbar page={page} /> : <NotFoundPage />;
};

export default AuthenticatedRouter;
