import React from "react";
import useHeading from "./useHeading";

function ProfilePage({ user }) {
  useHeading(user);

  return <div>ProfilePage : {user} </div>;
}

export default ProfilePage;
