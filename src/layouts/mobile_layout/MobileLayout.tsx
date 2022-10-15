import React from "react";
import { useLocation } from "react-router-dom";
import BottomNav from "../bottom_nav/BottomNav";
import TopNav from "../top_nav/TopNav";

import "./MobileLayout.scss";

const MobileLayout = (props: any) => {
  const location = useLocation();

  return (
    <>
      <TopNav />
      <main className='mobile-layout'>{props.children}</main>
      {location.pathname == "/" && <BottomNav />}
    </>
  );
};

export default MobileLayout;
