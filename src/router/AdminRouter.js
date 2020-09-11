import React from "react";
import { useRoutes } from "hookrouter";
import NotFoundPage from "../components/Pages/NotFoundPage";
import AdminDashboard from "../components/Pages/Admin/AdminDashboard";
import AdminNavbar from "../components/Navbar/AdminNavbar";
import AllCustomers from "../components/Pages/Admin/AllCustomers";

const routes = {
  "/": () => <AdminDashboard />,
  "/customers": () => <AllCustomers />,
};

const AdminRouter = () => {
  const page = useRoutes(routes);
  return page ? <AdminNavbar page={page} /> : <NotFoundPage />;
};

export default AdminRouter;
