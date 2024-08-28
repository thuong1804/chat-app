import styled from "@emotion/styled";
import WhatsAppLogo from "../acsset/WhatsApp.svg.webp";
import Image from "next/image";
import { CircularProgress } from "@mui/material";
import "react-toastify/dist/ReactToastify.css";
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

const Loading = () => {
  return (
    <>
      <StyleLoginContainer>
        <StyleImageWrapper>
          <Image
            src={WhatsAppLogo}
            width={200}
            height={200}
            alt="WhatsAppLogo"
          ></Image>
        </StyleImageWrapper>
        <CircularProgress></CircularProgress>
      </StyleLoginContainer>
    </>
  );
};
export default Loading;
