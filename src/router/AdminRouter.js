import React from "react";
import { useRoutes } from "hookrouter";
import NotFoundPage from "../components/Pages/NotFoundPage";
import AdminDashboard from "../components/Pages/Admin/AdminDashboard";
import AdminNavbar from "../components/Navbar/AdminNavbar";
import AllCustomers from "../components/Pages/Admin/AllCustomers";
import ViewMenu from "../components/Pages/ViewMenu";
import ListMenuItems from "../components/Pages/ListMenuItems";

const routes = {
  "/": () => <AdminDashboard />,
  "/customers": () => <AllCustomers />,
  "/hotel/:id": ({ id }) => <ViewMenu id={id} usertype="admin" />,
  "/hotel/:resid/:id/:menuname": ({ resid, id, menuname }) => (
    <ListMenuItems usertype="admin" resid={resid} id={id} menuname={menuname} />
  ),
};

const AdminRouter = () => {
  const page = useRoutes(routes);
  return page ? <AdminNavbar page={page} /> : <NotFoundPage />;
};

export default AdminRouter;
