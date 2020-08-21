import React, { useState } from "react";
import PublicRouter from "./PublicRouter";
import AuthenticatedRouter from "./AuthenticatedRouter";
import { useAbortableEffect } from "../utils/UseAbortableEffect";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "../redux/apiactions";
import { navigate } from "hookrouter";
import Loader from "../utils/Loader";
function Router() {
  const [user, setUser] = useState();
  const dispatch = useDispatch();
  const state = useSelector((reduxState) => reduxState);
  console.log(state);
  const currentUser = state.newapi.currentUser;

  useAbortableEffect(
    async (status) => {
      const access = localStorage.getItem("access_token");
      console.log(access);
      if (access) {
        const res = await dispatch(getCurrentUser());
        console.log(res);
        setUser(res.data.data);
        navigate("/");
      } else {
        setUser(null);
      }
    },
    [dispatch]
  );
  if (user !== null && (!currentUser || currentUser.isFetching)) {
    return <Loader />;
  }
  return user ? <AuthenticatedRouter /> : <PublicRouter />;
}

export default Router;
