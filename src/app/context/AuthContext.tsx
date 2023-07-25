"use client";

import React from "react";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../config/firebase";
import Login from "../login/page";
import SideBar from "../component/sidebar";
import { useRouter } from "next/navigation";
import Loading from "../component/login-loading";

export const AuthContext = React.createContext({});

export const useAuthContext = () => React.useContext(AuthContext);

export const AuthContextProvider = ({ children }: any) => {
  const [loggerInUser, _loading, _error] = useAuthState(auth);
  const router = useRouter();
  console.log(_loading);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (loggerInUser) => {
      if (loggerInUser) {
        return router.push("/component/");
      } else {
        return router.push("/");
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ loggerInUser }}>
      {_loading ? (
        <div>
          <Loading></Loading>
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};
