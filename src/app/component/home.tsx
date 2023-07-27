"use client";
import { IconButton } from "@mui/material";
import styled from "styled-components";
import LoginIcon from "@mui/icons-material/Login";
import Bg_img from "../acsset/bg-img.png";
import Bg_img_home from "../acsset/background_home_auto.jpg";
import img_home from "../acsset/img-home.png";
import Image from "next/image";
import { useRouter } from "next/navigation";

const StyledContainer = styled.div`
  height: 90vh;
  background: url(${Bg_img_home?.src}) no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
`;
const StyledHeader = styled.div`
  height: 70px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  justify-content: flex-end;
  color: white;
  font-size: 1rem;
  font-weight: bold;
  padding: 10px;
`;

const StyledMain = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-end;
`;
const StyledTitle = styled.h1`
  font-weight: bold;
  color: black;
  display: flex;
  flex-direction: column;
  border-left: 10px solid #8d5e85;
  padding-left: 10px;
`;
const StyleButtonLogin = styled.button`
  position: relative;
  font-size: 1.5rem;
  width: 200px;
  height: 50px;
  background-color: whitesmoke;
  border-radius: 15px;
  color: #292d31;
  border: none;
  font-weight: bold;
  transition: color 2s linear;
  &:hover {
    background-color: #8d5e85;
    color: whitesmoke;
    cursor: pointer;
  }
`;
const StyledFooter = styled.div``;
const StyledHeaderTitle = styled.h2`
  color: #292d31;
  font-weight: bold;
  transition: transform 0.5s;

  &:hover {
    transform: translatey(30px);
  }
`;
const StyledHoverName = styled.span`
  color: #292d31;
  font-size: 5rem;
  transition: transform 0.5s;

  &:hover {
    transform: translateX(30px);
  }
`;
const Home = () => {
  const router = useRouter();
  const routerLogin = () => {
    router.push("/login");
  };
  return (
    <StyledContainer>
      <StyledHeader>
        <StyledHeaderTitle>CHATTER!</StyledHeaderTitle>

        <IconButton
          onClick={routerLogin}
          style={{
            color: "white",
            display: "flex",
            gap: "5px",
          }}
        >
          Sign In
          <LoginIcon style={{ color: "white", cursor: "pointer" }}></LoginIcon>
        </IconButton>
      </StyledHeader>
      <StyledMain>
        {/* <Image
          src={img_home}
          quality={100}
          sizes="100vw"
          alt="bg"
          priority={true}
          style={{
            objectFit: "contain",
            width: "50%",
            height: "70vh",
          }}
        ></Image> */}
        <StyledTitle>
          WELCOME TO <StyledHoverName>CHATTER!</StyledHoverName>
          <StyleButtonLogin onClick={routerLogin}>
            Start Chatting
          </StyleButtonLogin>
        </StyledTitle>
      </StyledMain>
      <StyledFooter></StyledFooter>
    </StyledContainer>
  );
};
export default Home;
