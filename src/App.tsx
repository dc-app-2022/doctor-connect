import React from "react";
import "./App.scss";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/authentication/Login";
import Register from "./pages//authentication/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import ResetPassword from "./pages/authentication/ResetPassword";
import { useAuth } from "./contexts/AuthUser.context";
import LoadingSpinner from "./components/LoadingSpinner";
import AccountPage from "./pages/account-creation/AccountPage";
import Dashboard from "./pages/Dashboard/Dashboard";

function App() {
  const { currentUser, isLoggedIn } = useAuth();

  React.useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        console.log("Latitude is :", position.coords.latitude);
        console.log("Longitude is :", position.coords.longitude);
      });
    } else {
      console.log("Not Available");
    }
  }, []);

  if (isLoggedIn !== "INIT") {
    return (
      <Routes>
        <Route path='/' element={<ProtectedRoute children={<Home />} />}>
          <Route path='/account' element={<AccountPage />} />
          <Route path='/consultations' element={<AccountPage />} />
        </Route>

        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/reset' element={<ResetPassword />} />
      </Routes>
    );
  } else {
    return <LoadingSpinner />;
  }
}

export default App;
