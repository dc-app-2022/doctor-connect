import React, { createContext, useState, useEffect } from "react";
import { User, onAuthStateChanged, signOut } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import { useLocation, useNavigate } from "react-router-dom";
import { app, auth, db } from "../shared/firebase.config";
import { AppUser } from "../models/user";
import { bool } from "yup";

const AuthContext = createContext({});

export type IsLoggedIn = "INIT" | boolean;
export interface AuthContextModel {
  isLoggedIn: boolean | "INIT";
  signout: Function;
  currentUser: AppUser;
}

const AuthProvider = (props: any) => {
  const [isLoggedIn, setIsLoggedIn] = useState<IsLoggedIn>("INIT");
  const [currentUser, setCurrentUser] = useState<AppUser>(null);

  useEffect(() => {
    onAuthStateChanged(auth, (authUser) => {
      setIsLoggedIn(authUser?.uid ? true : false);
      if (authUser?.uid) {
        onSnapshot(doc(db, "users", authUser?.uid), (docRef) => {
          setCurrentUser((docRef.data() as AppUser) || null);
        });
      }
    });
  }, []);

  const signout = () => signOut(auth);

  const authContextValue: AuthContextModel = {
    isLoggedIn,
    signout: signout as Function,
    currentUser: currentUser as AppUser,
  };

  return <AuthContext.Provider value={authContextValue} {...props} />;
};

const useAuth: any = () => React.useContext(AuthContext);

export { AuthProvider, useAuth };
