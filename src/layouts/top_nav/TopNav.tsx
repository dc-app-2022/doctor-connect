import { Typography } from "@mui/material";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { RiArrowLeftLine } from "react-icons/ri";

import Squircle from "../../components/Squircle";
import { useAuth } from "../../contexts/AuthUser.context";
import { ApplicationUser, AppUser } from "../../models/user";

import "./TopNav.scss";
import { useAppState } from "../../contexts/AppState.context";

const TopNav = (props: any) => {
  const location = useLocation();
  const curPageTitle = useAppState().curPageTitle;
  const currentUser: AppUser = useAuth().currentUser;
  const isHomePage = location.pathname == "/";

  return (
    <div className='app-top-nav'>
      {isHomePage && (
        <div className='top-nav-home'>
          <div className='auth-user-avatar'>
            <Squircle
              imgUrl={`https://ui-avatars.com/api/?name=${
                currentUser?.first_name && currentUser?.last_name
                  ? currentUser?.first_name + "+" + currentUser?.last_name
                  : currentUser?.email
              }&background=ed763f&color=fff`}
            />
          </div>
          <Typography variant='h6' noWrap textOverflow={"ellipsis"}>
            👋 Hi <strong>{currentUser?.first_name || currentUser?.email}</strong>
          </Typography>
        </div>
      )}

      {!isHomePage && (
        <div className='top-nav child-page'>
          <div className='back-action'>
            <Link to={props?.onBack || "../"}>
              <RiArrowLeftLine />
            </Link>
          </div>
          <div className='page-title'>
            <Typography variant='h1' className='title'>
              {curPageTitle}
            </Typography>
          </div>
        </div>
      )}
    </div>
  );
};

export default TopNav;
