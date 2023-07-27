"use client";
import { Button } from "@mui/material";
import Head from "next/head";
import styled from "styled-components";
import Image from "next/image";
import img_login from "../acsset/img_login.png";
import WhatsAppLogo from "../acsset/WhatsApp.svg.webp";
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
  display: grid;
  place-items: center;
  background-color: #6534d9;
`;
const StyleLoginContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  background-color: white;
  border-radius: 15px;
  padding: 100px;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 8 0/1);
  width: 70%;
  height: 50%;
`;
const StyleImageWrapper = styled.div`
  width: 90%;
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
          <Image
            onClick={() => {
              return router.push("/");
            }}
            src={img_login}
            quality={100}
            alt="bg"
            priority={true}
            style={{
              objectFit: "contain",
              width: "80%",
              height: "80%",
            }}
          ></Image>
        </StyleImageWrapper>
        <StyledButtonLogin onClick={handelSignInGoogle}>
          Sign In With Google
        </StyledButtonLogin>
      </StyleLoginContainer>
    </StyleContainer>
  );
};
export default Login;
