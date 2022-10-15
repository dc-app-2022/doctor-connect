import React from "react";
import { useLocation } from "react-router-dom";
import { useAppState } from "../contexts/AppState.context";

const PageTitle = ({ title }: { title: string }) => {
  const setPageTitle = useAppState().setPageTitle;
  const location = useLocation();

  React.useEffect(() => {
    setPageTitle(location.pathname == "/" ? "Home" : title);
  });
  return <></>;
};

export default PageTitle;
