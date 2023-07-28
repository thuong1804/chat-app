"use client";
import { Button } from "@mui/material";
import Head from "next/head";
import styled from "styled-components";
import Slide from "../component/Slide";
import {
  useSignInWithFacebook,
  useSignInWithGithub,
  useSignInWithGoogle,
} from "react-firebase-hooks/auth";
import { auth, provider } from "../config/firebase";
import { useRouter } from "next/navigation";
import Loading from "../component/login-loading";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
} from "firebase/auth";

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
`;
const StyleImageWrapper = styled.div`
  width: 50%;
`;
const StyledButtonLogin = styled.button`
  width: 200px;
  height: 70px;
  background-color: #2962ff;
  border: none;
  color: whitesmoke;
  font-size: 1rem;
  font-weight: bold;
  border-radius: 15px;
  transition: color 1.5s linear;
  &:hover {
    cursor: pointer;
    background-color: whitesmoke;
    color: #2962ff;
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
      })
      .catch((_error) => {
        console.log("Caught error Popup closed", _error);
      });

    if (_error) {
      return console.log(_error);
    }
    return router.push("/component/");
  };

  return (
    <StyleContainer>
      <Head>
        <title>Login</title>
      </Head>
      <StyleLoginContainer>
        <StyleImageWrapper>
          <Slide></Slide>
        </StyleImageWrapper>

        <StyledButtonLogin onClick={handelSignInGoogle}>
          Sign In With Google
        </StyledButtonLogin>
      </StyleLoginContainer>
    </StyleContainer>
  );
};
export default Login;
