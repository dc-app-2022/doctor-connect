import React from "react";
import SideBar from "../sidebar/SideBar";

import "./DesktopLayout.scss";

const DesktopLayout = (props: any) => {
  return (
    <>
      <SideBar />
      <main className='desktop-layout'>{props.children}</main>
    </>
  );
};

export default DesktopLayout;
