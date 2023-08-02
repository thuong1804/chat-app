"use client";
import SideBar from "./sidebar";
import styled from "styled-components";

const StyledContainer = styled.div`
  display: flex;
  @media (max-width: 46.1875em) {
    width: 100%;
  }
`;

const StyledMain = styled.h1`
  color: gray;
  padding: 30px;

  @media (max-width: 46.1875em) {
    display: none;
  }
`;
const PageComponent = () => {
  return (
    <StyledContainer>
      <SideBar></SideBar>
      <StyledMain>Please choose conversation</StyledMain>
    </StyledContainer>
  );
};
export default PageComponent;
