"use client";
import { Button } from "@mui/material";
import Head from "next/head";
import styled from "styled-components";
import Image from "next/image";
import WhatsAppLogo from "../acsset/WhatsApp.svg.webp";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth } from "../config/firebase";

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
  const [signInWithGoogle, _user, _loading, _error] = useSignInWithGoogle(auth);

  const handelSignInGoogle = () => {
    signInWithGoogle();
  };
  return (
    <StyleContainer>
      <Head>
        <title>Login</title>
      </Head>
      <StyleLoginContainer>
        <StyleImageWrapper>
          <Image
            src={WhatsAppLogo}
            width={200}
            height={200}
            alt="WhatsAppLogo"
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