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
import ListMenuItems from "../components/Pages/ListMenuItems";
import EditDishItem from "../components/Pages/EditDishItem";

const routes = {
  "/": () => <Dashboard />,
  "/user/:user": ({ user }) => <ProfilePage user={user} />,
  "/addhotel": () => <AddHotel />,
  "/edithotel/:id": ({ id }) => <EditHotel id={id} />,
  "/hotel/:id": ({ id }) => <ViewMenu id={id} />,
  "/hotel/:id/addmenu": ({ id }) => <AddMenu id={id} />,
  "/hotel/:resid/:id/listmenuitems": ({ resid, id }) => (
    <ListMenuItems resid={resid} id={id} />
  ),
  "/editdish/:resid/:menuid/:dishid": ({ resid, dishid, menuid }) => (
    <EditDishItem dishid={dishid} menuid={menuid} resid={resid} />
  ),
};

const AuthenticatedRouter = () => {
  const page = useRoutes(routes);

  return page ? <AuthenticatedNavbar page={page} /> : <NotFoundPage />;
};

export default AuthenticatedRouter;
