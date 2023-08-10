/* eslint-disable @next/next/no-img-element */
"use client";
import { useAuthState } from "react-firebase-hooks/auth";
import { Conversation, Imessege } from "../types/type";
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
import useRecipient from "../customhook/useRecipient";

const StyledMessege = styled.div`
  width: fit-content;
  word-break: break-all;
  max-width: 80%;

  padding: 10px 15px 10px;
  border-radius: 15px;
  margin: 10px;
  position: relative;
`;
const StyledsenderMessege = styled(StyledMessege)`
  margin-left: auto;
  background-color: #0d6efd;
  color: white;
`;
const StyledReceiveMessege = styled(StyledMessege)`
  background-color: whitesmoke;
`;
const StyledTimestamp = styled.div`
  color: gray;
  padding: 18px;
  font-size: x-small;

  bottom: -15px;
  right: 0;
  text-align: right;
`;
const StyledImg = styled.div`
  margin-bottom: 20px;
  margin-top: 20px;
  border: none;
  margin-left: auto;
  padding: 15px 15px 30px;
  border-radius: 15px;
`;
const StyledImgeRecienpt = styled.div`
  background-color: transparent;
  padding: 10px;
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
        isDeletedSender: true,
        img: "",
      });
    } else {
      alert("do not delete ");
    }
  };

  const MessegeType =
    loggerInUser?.email === messege.user
      ? StyledsenderMessege
      : StyledReceiveMessege;

  const MessImgType =
    loggerInUser?.email === messege.user ? StyledImg : StyledImgeRecienpt;

  console.log({ loggerInUser, messege });
  const clickDeleteDb = async (id: any) => {
    if (loggerInUser?.email === messege.user) {
      await updateDoc(doc(db, "messeges", id), {
        isDeletedSender: true,
        isDeletedReceiver: true,
        img: "",
      });
    }
  };
  return (
    <div
      className="chatbox-icon"
      style={{ display: "flex", alignItems: "center" }}
    >
      {messege.img ? (
        <MessImgType>
          <img
            src={messege.img}
            width={300}
            height={300}
            alt=""
            style={{
              border: "1px solid none",
              borderRadius: "15px",
              objectFit: "cover",
            }}
          />
        </MessImgType>
      ) : messege.text ? (
        <MessegeType>
          {messege.isDeletedReceiver ? (
            <span style={{ fontSize: "1rem", color: "#f3c8c8" }}>
              Messege Deleted
            </span>
          ) : messege.isDeletedSender &&
            loggerInUser?.email === messege.user ? (
            <span style={{ fontSize: "1rem", color: "#5b5353" }}>
              Messege Deleted 1
            </span>
          ) : (
            messege.text
          )}
        </MessegeType>
      ) : null}
      {loggerInUser?.email === messege.user &&
        (messege.img || messege.text) && (
          <div>
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
          </div>
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
          Delete Messages Yourself
        </MenuItem>
        <MenuItem onClick={() => clickDeleteDb(messege.id)}>
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
