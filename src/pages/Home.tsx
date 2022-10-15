import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import PageTitle from "../components/PageTitle";
import { useAuth } from "../contexts/AuthUser.context";
import DesktopLayout from "../layouts/desktop_layout/DesktopLayout";
import MobileLayout from "../layouts/mobile_layout/MobileLayout";
import { AppUser } from "../models/user";
import UserRoleSelection from "./account-creation/UserRoleSelection";
import Dashboard from "./Dashboard/Dashboard";

const Home = () => {
  const currentUser: AppUser = useAuth().currentUser;
  const [reRender, setRerender] = React.useState(0);
  const location = useLocation();
  console.log({ location: location.pathname });

  React.useEffect(() => {
    window.addEventListener("resize", () => {
      setRerender((old) => old + 1);
    });
  }, []);

  if (!currentUser?.uid) return <LoadingSpinner />;

  if (!currentUser?.role) return <UserRoleSelection />;

  return (
    <>
      <PageTitle title='Home' />
      {window.innerWidth > 1024 ? (
        <DesktopLayout>{location.pathname == "/" ? <Dashboard /> : <Outlet />}</DesktopLayout>
      ) : (
        <MobileLayout>{location.pathname == "/" ? <Dashboard /> : <Outlet />}</MobileLayout>
      )}
    </>
  );
};

export default Home;
