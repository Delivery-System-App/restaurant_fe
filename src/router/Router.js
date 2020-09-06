import React, { useState } from "react";
import PublicRouter from "./PublicRouter";
import AuthenticatedRouter from "./AuthenticatedRouter";
import { useAbortableEffect } from "../utils/UseAbortableEffect";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "../redux/apiActions";
import { navigate } from "hookrouter";
import Loader from "../utils/Loader";
import AdminRouter from "./AdminRouter";
const Router = () => {
  const [user, setUser] = useState();
  const [admin, setAdmin] = useState(false);
  const dispatch = useDispatch();
  const state = useSelector((reduxState) => reduxState);
  const currentUser = state.newapi.currentUser;

  useAbortableEffect(
    async (status) => {
      const access = localStorage.getItem("access_token");
      if (access) {
        const res = await dispatch(getCurrentUser());
        if (
          res &&
          (res.data.data.type === "owner" || res.data.data.type === "admin")
        ) {
          res.data.data.type === "admin" ? setAdmin(true) : setAdmin(false);
          setUser(res.data.data);
        } else {
          navigate("/error");
        }
      } else {
        setUser(null);
      }
    },
    [dispatch]
  );
  if (user !== null && (!currentUser || currentUser.isFetching)) {
    return <Loader />;
  }
  return user ? (
    admin ? (
      <AdminRouter />
    ) : (
      <AuthenticatedRouter />
    )
  ) : (
    <PublicRouter />
  );
};

export default Router;
