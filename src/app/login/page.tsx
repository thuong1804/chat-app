"use client";
import { Button } from "@mui/material";
import Head from "next/head";
import styled from "styled-components";
import Image from "next/image";
import Slide from "../component/Slide";
import {
  useSignInWithFacebook,
  useSignInWithGithub,
  useSignInWithGoogle,
} from "react-firebase-hooks/auth";
import { auth, provider } from "../config/firebase";
import { useRouter } from "next/navigation";
import iconGG from "../acsset/icongg.webp";
import Loading from "../component/login-loading";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
} from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";

const StyleContainer = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;

  background-color: #6534d9;
`;
const StyleLoginContainer = styled.div`
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 8 0/1);
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 46.1875em) {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;
const StyleImageWrapper = styled.div`
  width: 50%;
  @media (max-width: 46.1875em) {
    padding-left: 23px;
  }
`;
const StyledButtonLogin = styled.button`
  width: 200px;
  height: 70px;
  display: flex;
  align-items: center;
  gap: 10px;
  border: none;
  color: #fd8c73;
  font-size: 1rem;
  font-weight: bold;
  border-radius: 15px;
  transition: color 1.5s linear;
  &:hover {
    cursor: pointer;
    background-color: whitesmoke;
    color: #2962ff;
  }
  @media (max-width: 46.1875em) {
    height: 40px;
  }
`;
const StyledTitle = styled.h1`
  position: absolute;
  left: 0;
  color: whitesmoke;
  margin-left: 10px;
  padding: 10px;
  font-weight: bold;
  transition: color 1.5s linear;

  &:hover {
    cursor: pointer;
    color: #2962ff;
    background-color: whitesmoke;
    border-radius: 15px;
  }
`;
const Login = () => {
  const router = useRouter();
  const [signInWithGoogle, _user, _loading, _error] = useSignInWithGoogle(auth);
  const handelSignInGoogle = async (event: any) => {
    event.preventDefault();
    // await signInWithGoogle();
    const provider = new GoogleAuthProvider();
    // select account
    provider.setCustomParameters({
      prompt: "select_account",
    });
    await signInWithPopup(auth, provider)
      .then((result) => {
        console.log("Logged In", result);
        toast("loggin success");
        return router.push("/component/");
      })
      .catch((_error) => {
        console.log("Caught error Popup closed", _error);
      });

    if (_error) {
      return console.log(_error);
    }
  };

  return (
    <StyleContainer>
      <StyledTitle onClick={() => router.push("/")}>Chatter!</StyledTitle>
      <StyleLoginContainer>
        <StyleImageWrapper>
          <Slide></Slide>
        </StyleImageWrapper>

        <StyledButtonLogin onClick={handelSignInGoogle}>
          <Image
            src={iconGG}
            alt="icongg"
            style={{ width: "20px", height: "20px" }}
          ></Image>
          Sign In With Google
        </StyledButtonLogin>
      </StyleLoginContainer>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
        theme="light"
      />
    </StyleContainer>
  );
};
export default Login;
