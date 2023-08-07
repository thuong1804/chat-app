import { useAuthState } from "react-firebase-hooks/auth";
import { Imessege } from "../types/type";
import { auth, db } from "../config/firebase";
import { styled } from "styled-components";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Button, IconButton, Menu, MenuItem } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import {
  Firestore,
  deleteDoc,
  doc,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";

const StyledMessege = styled.div`
  width: fit-content;
  word-break: break-all;
  max-width: 90%;
  min-width: 30%;
  padding: 15px 15px 30px;
  border-radius: 8px;
  margin: 10px;
  position: relative;
`;
const StyledsenderMessege = styled(StyledMessege)`
  margin-left: auto;
  background-color: #c7ac95;
  color: whitesmoke;
`;
const StyledReceiveMessege = styled(StyledMessege)`
  background-color: whitesmoke;
`;
const StyledTimestamp = styled.div`
  color: gray;
  padding: 18px;
  font-size: x-small;
  position: absolute;
  bottom: -15px;
  right: 0;
  text-align: right;
  @media (max-width: 46.1875em) {
    bottom: -18px;
    font-size: 5px;
  }
`;
const StyledDelete = styled.div`
  width: 50px;
  height: 50px;
  background: #000;
`;
const Messege = ({ messege }: { messege: Imessege }) => {
  const [loggerInUser, _loading, _error] = useAuthState(auth);

  const clickshowdelete = () => {
    const styled = StyledDelete;
    return styled;
  };

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
      });
    } else {
      alert("do not delete ");
    }
  };

  const MessegeType =
    loggerInUser?.email === messege.user
      ? StyledsenderMessege
      : StyledReceiveMessege;
  return (
    <div
      className="chatbox-icon"
      style={{ display: "flex", alignItems: "center" }}
    >
      <MessegeType>
        {messege.text}
        <StyledTimestamp>{messege.sent_at}</StyledTimestamp>
      </MessegeType>
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
          Message Recall
        </MenuItem>
      </Menu>
    </div>
  );
};
export default Messege;
function secDoc(db: Firestore, arg1: string, text: string) {
  throw new Error("Function not implemented.");
}
