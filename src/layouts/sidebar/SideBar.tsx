import { Typography } from "@mui/material";
import React from "react";
import { Link, NavLink } from "react-router-dom";
import Squircle from "../../components/Squircle";
import { useAuth } from "../../contexts/AuthUser.context";
import { AppUser } from "../../models/user";
import "./SideBar.scss";

import {
  RiHome3Fill,
  RiHome3Line,
  RiUser3Line,
  RiUser3Fill,
  RiLogoutBoxRLine,
  RiBookletFill,
  RiBookletLine,
} from "react-icons/ri";

const SideBar = () => {
  const { currentUser, signout }: { currentUser: AppUser; signout: Function } = useAuth();

  const handleSignOut = () => {
    signout();
  };

  return (
    <nav className='app-side-bar'>
      <div className='auth-user-welcome'>
        <div className='user-favicon'>
          <Squircle
            imgUrl={`https://ui-avatars.com/api/?name=${
              currentUser?.first_name && currentUser?.last_name
                ? currentUser?.first_name + "+" + currentUser?.last_name
                : currentUser?.email
            }&background=ed763f&color=fff`}
          />
        </div>
        <div className='user-info'>
          <Typography variant='body1' textOverflow={"ellipsis"}>
            Hi <strong>{currentUser?.first_name || currentUser?.email}</strong> 👋
          </Typography>
        </div>
      </div>

      <div className='nav-links'>
        <NavLink
          to='/'
          className={({ isActive }) => "nav-link " + (isActive ? "active" : "inactive")}
          end
        >
          <RiHome3Fill className='nav-icon active' />
          <RiHome3Line className='nav-icon inactive' />
          Home
        </NavLink>
        <NavLink
          to='/account'
          className={({ isActive }) => "nav-link " + (isActive ? "active" : "inactive")}
        >
          <RiUser3Fill className='nav-icon active' />
          <RiUser3Line className='nav-icon inactive' />
          Account
        </NavLink>
        <NavLink
          to='/consultations'
          className={({ isActive }) => "nav-link " + (isActive ? "active" : "inactive")}
        >
          <RiBookletFill className='nav-icon active' />
          <RiBookletLine className='nav-icon inactive' />
          Consultations
        </NavLink>

        {currentUser?.role === "PT" && (
          <NavLink
            to='/reports'
            className={({ isActive }) => "nav-link " + (isActive ? "active" : "inactive")}
          >
            <RiUser3Fill className='nav-icon active' />
            <RiUser3Line className='nav-icon inactive' />
            Reports
          </NavLink>
        )}
        <NavLink onClick={handleSignOut} className='nav-link' to='/login'>
          <RiLogoutBoxRLine />
          Logout
        </NavLink>
      </div>
    </nav>
  );
};

export default SideBar;
