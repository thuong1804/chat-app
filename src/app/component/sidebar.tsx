"use client";

import {
  Avatar,
  Button,
  Icon,
  IconButton,
  TextField,
  Tooltip,
} from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import MoreVerTicalIcon from "@mui/icons-material/MoreVert";
import LogoutIcon from "@mui/icons-material/Logout";
import SearchIcon from "@mui/icons-material/Search";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import styled from "styled-components";
import { signOut } from "firebase/auth";
import { auth, db } from "../config/firebase";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import * as EmailValidator from "email-validator";
import { addDoc, collection, query, where } from "firebase/firestore";
import { Conversation } from "@/app/types/type";
import ConversationSelect from "./ConversationSelect";
import Loading from "./login-loading";

const StyleContainer = styled.div`
  height: 98vh;
  min-width: 300px;
  max-width: 350px;
  overflow-y: scroll;
  border-right: 1px solid whitesmoke;
`;
const StyleHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  background-color: white;
  padding: 10px;
  border-bottom: 1px solid whitesmoke;
  top: 0;
  z-index: 1;
`;
const StyleSearch = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px;
  border-radius: 2px;
`;

const StyleAvatar = styled(Avatar)`
  cursor: pointer;
  :hover {
    opacity: 0.8;
  }
`;
const StyleInputSearch = styled.input`
  outline: none;
  border: none;
  flex: 1;
`;

const StyleSideBarButton = styled(Button)`
  width: 100%;
  border-bottom: 1px solid whitesmoke;
  color: blue;
  font-weight: bold;
`;

const SideBar = () => {
  const [loggerInUser, _loading, _error] = useAuthState(auth);
  const [openNewConversation, setOpenNewConversation] = useState(false);
  const [textInputEmail, setTextInputEmail] = useState("");

  const logOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.log("error", error);
    }
  };
  const handleClickOpen = () => {
    setOpenNewConversation(!openNewConversation);
    setTextInputEmail("");
  };
  // ham` kiem tra coversation da ton` tai khi nguoi dung dang nhap hay chua
  const queryGetConversationForCurrentUser = query(
    collection(db, "coversation"),
    where("users", "array-contains", loggerInUser?.email)
  );
  const [conversationSnapshot] = useCollection(
    queryGetConversationForCurrentUser
  );
  // ham` kiem tra xem gmail nao` da~ duoc moi` vao chat
  const isConversationAlreadyExits = (textInputEmail: string) => {
    return conversationSnapshot?.docs.find((coversation) =>
      (coversation.data() as Conversation).users.includes(textInputEmail)
    ); //props docs nhan tat ca cac document coversation
    //conversationSnapshot lay tat ca cac cuoc hoi thoai bao gom user dang loggin
  };
  const isInvitingSelf = textInputEmail === loggerInUser?.email; // khi tu nhap vao email chinh minh
  const handleClose = () => {
    setOpenNewConversation(!openNewConversation);
  };

  console.log("conversation", conversationSnapshot?.docs);

  // ham tao cuoc hoi thoai
  const handleCreateConversation = async () => {
    if (!textInputEmail) return;
    if (
      EmailValidator.validate(textInputEmail) &&
      !isInvitingSelf &&
      !isConversationAlreadyExits(textInputEmail)
    ) {
      // neu la email va khong phai tu moi` minh` thi` add vao db
      //add vao db coversation
      await addDoc(collection(db, "coversation"), {
        users: [loggerInUser?.email, textInputEmail],
      });
    }
    handleClose();
  };
  const handelTextEmail = (e: any) => {
    setTextInputEmail(e.target.value);
  };
  return (
    <StyleContainer>
      <StyleHeader>
        <Tooltip title={loggerInUser?.email} placement="right">
          <StyleAvatar src={loggerInUser?.photoURL || ""}></StyleAvatar>
        </Tooltip>
        <div>
          <IconButton>
            <ChatIcon></ChatIcon>
          </IconButton>
          <IconButton>
            <MoreVerTicalIcon></MoreVerTicalIcon>
          </IconButton>
          <IconButton onClick={logOut}>
            <LogoutIcon></LogoutIcon>
          </IconButton>
        </div>
      </StyleHeader>
      <StyleSearch>
        <SearchIcon></SearchIcon>
        <StyleInputSearch placeholder="Search in convertion"></StyleInputSearch>
      </StyleSearch>
      <StyleSideBarButton onClick={handleClickOpen}>
        Start New Conversation
      </StyleSideBarButton>
      {conversationSnapshot?.docs.map((coversation) => (
        <ConversationSelect
          key={coversation.id}
          id={coversation.id}
          coversationUser={(coversation.data() as Conversation).users}
        />
      ))}
      <Dialog open={openNewConversation} onClose={handleClose}>
        <DialogTitle>New Conversation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter a Google email address for the user you wish chat with
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            onChange={handelTextEmail}
            value={textInputEmail}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button disabled={!textInputEmail} onClick={handleCreateConversation}>
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </StyleContainer>
  );
};
export default SideBar;
