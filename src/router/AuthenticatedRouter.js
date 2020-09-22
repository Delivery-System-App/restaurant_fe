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
import UpdateProfile from "../components/Pages/UpdateProfile";
import AddDishToMenu from "../components/Pages/AddDishToMenu";
import Listbookings from "../components/Pages/ListBookings";
import BookingDetails from "../components/Pages/BookingDetails";
import AddCustomer from "../../src/components/Pages/Customers/AddCustomer";
import CustomerDashboard from "../components/Pages/Customers/CustomerDashboard";
import BannerManagement from "../components/Pages/BannerManagement";
import ViewReport from "../components/Pages/ViewReport";
import ViewReviews from "../components/Pages/ViewReviews";

const routes = {
  "/": () => <Dashboard />,
  "/customers": () => <CustomerDashboard />,
  "/addcustomers": () => <AddCustomer />,
  "/user/:user": ({ user }) => <ProfilePage user={user} />,
  "/addhotel": () => <AddHotel />,
  "/edithotel/:id": ({ id }) => <EditHotel id={id} />,
  "/hotel/:id": ({ id }) => <ViewMenu id={id} usertype="owner" />,
  "/hotel/:id/:name/reviews": ({ id, name }) => (
    <ViewReviews id={id} hotelName={name} usertype="owner" />
  ),
  "/hotel/:id/addmenu": ({ id }) => <AddMenu id={id} />,
  "/hotel/:resid/:id/:menuname": ({ resid, id, menuname }) => (
    <ListMenuItems usertype="owner" resid={resid} id={id} menuname={menuname} />
  ),
  "/editdish/:resid/:menuid/:dishid": ({ resid, dishid, menuid }) => (
    <EditDishItem dishid={dishid} menuid={menuid} resid={resid} />
  ),
  "/updateprofile": () => <UpdateProfile />,
  "/:resid/addmenudishes/:menuname/:id": ({ menuname, resid, id }) => (
    <AddDishToMenu menuname={menuname} resid={resid} menuid={id} />
  ),
  "/hotel/:resid/bookings": ({ resid }) => <Listbookings resid={resid} />,
  "/hotel/:resid/banner": ({ resid }) => <BannerManagement resid={resid} />,

  "/bookings/:bookid": ({ bookid }) => <BookingDetails bookid={bookid} />,

  "/hotel/:id/report": ({ id }) => <ViewReport id={id} />,
};

const AuthenticatedRouter = () => {
  const page = useRoutes(routes);
  return page ? <AuthenticatedNavbar page={page} /> : <NotFoundPage />;
};

export default AuthenticatedRouter;
