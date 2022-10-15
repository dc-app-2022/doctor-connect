import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthUser.context";
import { auth } from "../shared/firebase.config";

const ProtectedRoute = (props: any) => {
  const { currentUser, isLoggedIn } = useAuth();
  const isloggedIn = auth.currentUser?.uid ? true : false;
  console.log({ isloggedIn, currentUser });
  if (!isloggedIn) {
    return <Navigate to='/login' />;
  } else {
    return props.children;
  }
};

export default ProtectedRoute;
