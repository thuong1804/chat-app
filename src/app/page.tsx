"use client";
import { useEffect } from "react";
import Loading from "./component/login-loading";
import SideBar from "./component/sidebar";
import { auth, db } from "./config/firebase";
import Login from "./login/page";
import { useAuthState } from "react-firebase-hooks/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { AppProps } from "next/app";
import Conversation from "./conversation/[id]/page";
import Link from "next/link";
export default function Home({ pageProps }: AppProps) {
  const [loggerInUser, loading, _error] = useAuthState(auth);
  useEffect(() => {
    const setUserinDB = async () => {
      try {
        await setDoc(
          doc(db, "user", loggerInUser?.email as string),
          {
            email: loggerInUser?.email,
            lastSeen: serverTimestamp(),
            photoURL: loggerInUser?.photoURL,
          },
          { merge: true } // xem database  co key email === email login thi ghi de lan login ban dau`
        );
      } catch (error) {
        console.log("error", error);
      }
    };
    if (loggerInUser) {
      setUserinDB();
    }
  }, [loggerInUser]);

  if (loading) {
    return <Loading></Loading>;
  }

  if (!loggerInUser) {
    return <Login></Login>;
  }
  // if (loggerInUser) {
  //   <Conversation></Conversation>;
  // }
  return (
    <>
      <SideBar {...pageProps}></SideBar>
    </>
  );
}
