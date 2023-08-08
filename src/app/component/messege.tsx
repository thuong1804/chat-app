/* eslint-disable @next/next/no-img-element */
import { useAuthState } from "react-firebase-hooks/auth";
import { Imessege } from "../types/type";
import { auth, db } from "../config/firebase";
import { styled } from "styled-components";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Button, Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import {
  Firestore,
  deleteDoc,
  doc,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";

const StyledMessege = styled.div`
  word-break: break-all;
  max-width: 100%;
  min-width: 30%;
  padding: 15px 15px 15px;
  border-radius: 8px;
  position: relative;
`;
const StyledsenderMessege = styled(StyledMessege)`
  background-color: #c7ac95;
  color: whitesmoke;
`;
const StyledBoxSenderMessege = styled.div`
  margin-left: auto;
  max-width: 80%;
  padding-bottom: 10px;
`;
const StyledReceiveMessege = styled(StyledMessege)`
  background-color: whitesmoke;
`;
const StyledTimestamp = styled.div`
  color: gray;
  font-size: x-small;
  text-align: end;

  @media (max-width: 46.1875em) {
    bottom: -18px;
    font-size: 5px;
  }
`;
const StyledSenderImg = styled.div``;
const StyledBoxImage = styled.div`
  width: 100%;
  display: flex;
  align-items: end;
  flex-direction: column;
  justify-content: center;
`;
const Messege = ({ messege }: { messege: Imessege }) => {
  const [loggerInUser, _loading, _error] = useAuthState(auth);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const clickdelete = async (id: any) => {
    if (loggerInUser?.email === messege.user) {
      await updateDoc(doc(db, "messeges", id), {
        text: "Message has been deleted",
        img: "",
      });
    } else {
      alert("do not delete ");
    }
  };

  const MessegeType =
    loggerInUser?.email === messege.user
      ? StyledBoxSenderMessege
      : StyledReceiveMessege;

  return (
    <div
      className="chatbox-icon"
      style={{ display: "flex", alignItems: "center" }}
    >
      {messege.text && messege.img ? (
        <MessegeType>
          {messege.text}
          <StyledTimestamp>
            <span>{messege.sent_at}</span>
          </StyledTimestamp>
          {messege.img && <img src={messege.img} width={30} alt="" />}
        </MessegeType>
      ) : messege.img ? (
        <StyledBoxImage>
          <StyledSenderImg>
            <img
              src={messege.img}
              width={320}
              alt=""
              style={{ border: "1px solid none", borderRadius: "15px" }}
            />
            <StyledTimestamp>{messege.sent_at}</StyledTimestamp>
          </StyledSenderImg>
        </StyledBoxImage>
      ) : messege.text ? (
        <MessegeType>
          <StyledsenderMessege>{messege.text}</StyledsenderMessege>

          <StyledTimestamp>{messege.sent_at}</StyledTimestamp>
        </MessegeType>
      ) : null}

      {(messege.img || messege.text) && (
        <Button
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
          style={{ color: "gray" }}
        >
          <MoreVertIcon />
        </Button>
      )}
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={() => clickdelete(messege.id)}>
          Message Delete
        </MenuItem>
      </Menu>
    </div>
  );
};
export default Messege;
function secDoc(db: Firestore, arg1: string, text: string) {
  throw new Error("Function not implemented.");
}
