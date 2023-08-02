// "use client";

// import React from "react";
// import { onAuthStateChanged, getAuth } from "firebase/auth";
// import { useAuthState } from "react-firebase-hooks/auth";
// import { auth } from "../config/firebase";
// import { useRouter } from "next/navigation";
// import Loading from "../component/login-loading";
// import Home from "../component/home";
// import SideBar from "../component/sidebar";

// export const AuthContext = React.createContext({});

// export const useAuthContext = () => React.useContext(AuthContext);

// export const AuthContextProvider = ({ children }: any) => {
//   const [loggerInUser, _loading, _error] = useAuthState(auth);
//   const router = useRouter();
//   console.log(loggerInUser);

//   React.useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (loggerInUser) => {
//       if (loggerInUser) {
//         return router.push("/component/");
//       } else {
//         return router.push("/");
//       }
//     });
//     _loading === false;
//     return () => unsubscribe();
//   }, []);

//   return (
//     <AuthContext.Provider value={{ loggerInUser }}>
//       {loggerInUser ? <SideBar></SideBar> : <Home></Home>}
//     </AuthContext.Provider>
//   );
// };
