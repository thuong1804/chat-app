"use client";
import { IconButton } from "@mui/material";
import styled from "styled-components";
import LoginIcon from "@mui/icons-material/Login";
import Bg_img from "../acsset/bg-img.png";
import Image from "next/image";
import { useRouter } from "next/navigation";

const StyledContainer = styled.div`
  height: 90vh;
`;
const StyledHeader = styled.div`
  background-color: green;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: white;
  font-size: 1rem;
  font-weight: bold;
  padding: 10px;
`;

const StyledMain = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const StyledTitle = styled.h1`
  font-weight: bold;
  color: black;
  display: flex;
  flex-direction: column;
`;
const StyleButtonLogin = styled.button`
  position: relative;
  font-size: 1.5rem;
  width: 200px;
  height: 50px;
  background-color: green;
  border-radius: 15px;
  color: white;
  border: none;
  font-weight: bold;
  transition: color 1s linear;
  &:hover {
    background-color: whitesmoke;
    color: green;
    cursor: pointer;
  }
`;
const StyledFooter = styled.div``;
const StyledHeaderTitle = styled.h2`
  color: white;
  font-weight: bold;
`;
const StyledHoverName = styled.span`
  color: green;
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
        <Image
          src={Bg_img}
          quality={100}
          sizes="100vw"
          alt="bg"
          priority={true}
          style={{
            objectFit: "contain",
            width: "50%",
            height: "70vh",
          }}
        ></Image>
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
