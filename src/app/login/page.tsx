"use client";
import { Button } from "@mui/material";
import Head from "next/head";
import styled from "styled-components";
import Image from "next/image";
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
  background-color: #f8f9f9;
`;
const StyleLoginContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: white;
  border-radius: 5px;
  padding: 100px;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 8 0/1);
`;
const StyleImageWrapper = styled.div`
  margin-bottom: 50px;
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
            src={WhatsAppLogo}
            width={200}
            height={200}
            alt="WhatsAppLogo"
            style={{ cursor: "pointer" }}
          ></Image>
        </StyleImageWrapper>
        <Button variant="outlined" onClick={handelSignInGoogle}>
          Sign In With Google
        </Button>
      </StyleLoginContainer>
    </StyleContainer>
  );
};
export default Login;
