import React from "react";
import {
  RiHome3Fill,
  RiUser3Line,
  RiCalendarCheckFill,
  RiMoreFill,
  RiFileList3Line,
} from "react-icons/ri";
import { Link, NavLink } from "react-router-dom";
import { isIOS, isSafari } from "react-device-detect";

import "./BottomNav.scss";
import { Menu, MenuItem } from "@mui/material";
import { useAuth } from "../../contexts/AuthUser.context";

const BottomNav = () => {
  const currentUser = useAuth().currentUser;
  return (
    <nav className={`app-bottom-nav ${isIOS && isSafari ? "for-safari-mobile" : ""} `}>
      <NavLink to='/' className={"isActive nav-link"} end>
        <RiHome3Fill />
        <span className='bottom-nav-title'>Home</span>
      </NavLink>
      <NavLink to='/account' className={"nav-link"} end>
        <RiUser3Line />
        <span className='bottom-nav-title'>Account</span>
      </NavLink>
      <NavLink to='/consultations' className={"nav-link"} end>
        <RiCalendarCheckFill />
        <span className='bottom-nav-title'>Consultations</span>
      </NavLink>
      {currentUser.role == "PT" && (
        <NavLink to='/reports' className={"nav-link"} end>
          <RiFileList3Line />
          <span className='bottom-nav-title'>Reports</span>
        </NavLink>
      )}
      <NavLink to='/more' className={"nav-link"}>
        <RiMoreFill />
        <span className='bottom-nav-title'>More</span>
      </NavLink>
    </nav>
  );
};

export default BottomNav;
