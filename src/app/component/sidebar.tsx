"use client";
import * as firebase from "firebase/app";
import {
  addDoc,
  collection,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { Avatar, IconButton, TextField, Tooltip } from "@mui/material";
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
import { auth, db } from "../config/firebase";
import { useEffect, useState } from "react";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import * as EmailValidator from "email-validator";

import { Conversation } from "@/app/types/type";
import ConversationSelect from "./ConversationSelect";
import Loading from "./login-loading";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import { useRouter } from "next/navigation";
const StyleContainer = styled.div`
  height: 90vh;
  min-width: 300px;
  max-width: 350px;
  overflow-y: scroll;
  border-right: 1px solid whitesmoke;
  padding: 15px;
  /* Hide scrollbar for Chrome, Safari and Opera */
  &::-webkit-scrollbar {
    display: none;
  }

  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
`;

const StyleHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  background-color: whitesmoke;
  border-radius: 10px;
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

const StyleSideBarButton = styled.button`
  position: relative;
  width: 100%;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 10px;
  color: rgb(97 140 230);
  font-weight: bold;
  transition: color 1s linear;
  &:hover {
    background-color: rgb(97 140 230);
    color: whitesmoke;
  }
`;
const StyledNameLogOut = styled.span`
  font-size: 1.6rem;
  font-weight: bold;
`;
const StyledBoxConversation = styled.div`
  background-color: whitesmoke;
  margin-top: 20px;
  border-radius: 10px;
`;
const SideBar = () => {
  const [loggerInUser, _loading, _error] = useAuthState(auth);
  const [openNewConversation, setOpenNewConversation] = useState(false);
  const [show, setShow] = useState(false);
  const [signOut, loading, error] = useSignOut(auth);
  const [textInputEmail, setTextInputEmail] = useState("");
  const router = useRouter();
  const handleCloseModal = () => setShow(false);
  const handleShowModal = () => setShow(true);

  const [inputSearch, setInputSearch] = useState("");
  // const [data, setData] = useState<any[]>([]);
  // const [filteredContacts, setFilteredContacts] = useState<any[]>([]);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const q = query(collection(db, "conversation"));
  //     const doc_refs = await getDocs(q);
  //     console.log(q);
  //     const res: any[] = [];
  //     doc_refs.forEach((item) => {
  //       res.push({
  //         id: item.id,
  //         ...item.data(),
  //       });
  //     });
  //     console.log(doc_refs.docs);
  //     console.log("textinput", inputSearch);
  //     setData(res);
  //   };
  //   fetchData();
  // }, []);

  // useEffect(() => {
  //   setFilteredContacts(
  //     data.filter((item: any) => {
  //       return item.emailRecipient
  //         .toLowerCase()
  //         .includes(inputSearch.toLowerCase());
  //     })
  //   );
  // }, [inputSearch, data]);

  // console.log("data", data);
  // console.log("filter", filteredContacts);

  const logOut = async () => {
    await signOut();
    if (loading) return <Loading></Loading>;
    handleCloseModal();
    return router.push("/");
  };
  const handleClickOpen = () => {
    setOpenNewConversation(!openNewConversation);
    setTextInputEmail("");
  };
  // ham` kiem tra conversation da ton` tai khi nguoi dung dang nhap hay chua
  const queryGetConversationForCurrentUser = query(
    collection(db, "conversation"),
    where("user", "array-contains", loggerInUser?.email || "")
  );
  const [conversationSnapshot, __loading, __error] = useCollection(
    queryGetConversationForCurrentUser
  );
  // ham` kiem tra xem gmail nao` da~ duoc moi` vao chat
  const isConversationAlreadyExits = (textInputEmail: string) => {
    return conversationSnapshot?.docs.find((conversation) =>
      (conversation.data() as Conversation).user.includes(textInputEmail)
    ); //props docs nhan tat ca cac document conversation
    //conversationSnapshot lay tat ca cac cuoc hoi thoai bao gom user dang loggin
  };
  const isInvitingSelf = textInputEmail === loggerInUser?.email; // khi tu nhap vao email chinh minh
  const handleClose = () => {
    setOpenNewConversation(!openNewConversation);
  };

  // ham tao cuoc hoi thoai
  const handleCreateConversation = async () => {
    if (!textInputEmail) return;
    if (
      EmailValidator.validate(textInputEmail) &&
      !isInvitingSelf &&
      !isConversationAlreadyExits(textInputEmail)
    ) {
      // neu la email va khong phai tu moi` minh` thi` add vao db
      //add vao db conversation
      await addDoc(collection(db, "conversation"), {
        user: [loggerInUser?.email, textInputEmail],
        emailRecipient: textInputEmail,
      });
    }
    handleClose();
  };
  const handelTextEmail = (e: any) => {
    setTextInputEmail(e.target.value);
  };

  const conversationSnapshotFilterd = conversationSnapshot?.docs?.filter(
    (con: any) =>
      con
        .data()
        .emailRecipient.toLowerCase()
        .includes(inputSearch.toLowerCase())
  );

  return (
    <>
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
            <IconButton onClick={handleShowModal}>
              <LogoutIcon></LogoutIcon>
            </IconButton>
          </div>
        </StyleHeader>
        <StyleSearch>
          <SearchIcon></SearchIcon>
          <StyleInputSearch
            value={inputSearch}
            id="user"
            placeholder="Search in convertion"
            onChange={(e) => setInputSearch(e.target.value)}
          ></StyleInputSearch>
        </StyleSearch>
        <StyleSideBarButton onClick={handleClickOpen}>
          Start New Conversation
        </StyleSideBarButton>
        <StyledBoxConversation>
          {conversationSnapshotFilterd?.map((conversation) => (
            <ConversationSelect
              key={conversation.id}
              id={conversation.id}
              conversationUser={(conversation.data() as Conversation).user}
            />
          ))}
        </StyledBoxConversation>

        <Dialog open={openNewConversation} onClose={handleClose}>
          <DialogTitle>New Conversation</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please enter a Google email address for the user you wish chat
              with
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
            <Button
              disabled={!textInputEmail}
              onClick={handleCreateConversation}
            >
              Create
            </Button>
          </DialogActions>
        </Dialog>
      </StyleContainer>
      <Modal
        show={show}
        onHide={handleCloseModal}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Sign Out</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Hi <StyledNameLogOut>{loggerInUser?.displayName}</StyledNameLogOut> !
          Do you want to sign out of Chatter?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={logOut}>
            Sure
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default SideBar;
