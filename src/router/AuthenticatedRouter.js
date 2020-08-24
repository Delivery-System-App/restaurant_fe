import React from "react";
import { useRoutes } from "hookrouter";
import Dashboard from "../components/Pages/Dashboard";
import ProfilePage from "../components/Pages/ProfilePage";
import NotFoundPage from "../components/Pages/NotFoundPage";
import AuthenticatedNavbar from "../components/Navbar/AuthenticatedNavbar";
import AddHotel from "../components/Pages/AddHotel";
import EditHotel from "../components/Pages/EditHotel";
import ViewMenu from "../components/Pages/ViewMenu";
import AddMenu from "../components/Pages/AddMenu";

const routes = {
  "/": () => <Dashboard />,
  "/user/:user": ({ user }) => <ProfilePage user={user} />,
  "/addhotel": () => <AddHotel />,
  "/edithotel/:id": ({ id }) => <EditHotel id={id} />,
  "/hotel/:id": ({ id }) => <ViewMenu id={id} />,
  "/hotel/:id/addmenu": ({ id }) => <AddMenu id={id} />,
};

const AuthenticatedRouter = () => {
  const page = useRoutes(routes);

  return page ? <AuthenticatedNavbar page={page} /> : <NotFoundPage />;
};

export default AuthenticatedRouter;
