"use client";
import SideBar from "./sidebar";
import styled from "styled-components";

const StyledContainer = styled.div`
  display: flex;
`;

const StyledMain = styled.h1`
  color: gray;
  padding: 30px;
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
