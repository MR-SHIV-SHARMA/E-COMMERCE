import React, { useContext } from "react";
import UserContext from "../context/UserContext";

function ProfileContext() {
  const { user } = useContext(UserContext);
  if (!user) return <div>please Login</div>
  return <div>Hello {user.username}</div>;
}

export default ProfileContext;
