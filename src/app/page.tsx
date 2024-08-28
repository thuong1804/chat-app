"use client";
import Loading from "./component/login-loading";
import { auth } from "./config/firebase";
// import Login from "./login/page";
import { useAuthState } from "react-firebase-hooks/auth";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Home from "./component/home";
import { Slider } from "@mui/material";
import Slide from "./component/Slide";

export default function Page() {
  const [__loggerInUser, loading, _error] = useAuthState(auth);

  if (loading) {
    return <Loading></Loading>;
  }
  return <Home></Home>;
}
