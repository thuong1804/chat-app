"use client";
import Loading from "./component/login-loading";
import { auth } from "./config/firebase";
// import Login from "./login/page";
import { useAuthState } from "react-firebase-hooks/auth";

import Home from "./component/home";

export default function Page() {
  const [__loggerInUser, loading, _error] = useAuthState(auth);

  if (loading) {
    return <Loading></Loading>;
  }
  return <Home></Home>;
}
