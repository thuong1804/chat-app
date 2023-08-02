"use client";
import useRecipient from "../customhook/useRecipient";
import "../component/conversationSrceen.scss";
import { Conversation, Imessege } from "../types/type";
import RecipientAvatar from "./recipientAvatar";
import {
  convertFiretoreTimestampToString,
  generateQueryGetMessages,
  transformMessege,
} from "../ultils/generateQueryGetMessages";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useParams } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../config/firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import Messege from "./messege";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import { styled } from "styled-components";
import { KeyboardEventHandler, MouseEventHandler, useState } from "react";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { AuthContextProvider } from "../context/AuthContext";
import Home from "./home";
// import { AuthContextProvider } from "../context/AuthContext";

const StyledInputContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  position: sticky;
  bottom: 0;
  background-color: white;
  z-index: 100;
`;
const StyledInput = styled.input`
  flex-grow: 1;
  outline: none;
  border: none;
  border-radius: 10px;
  background-color: whitesmoke;
  padding: 15px;
  margin-left: 15px;
  margin-right: 15px;

  @media (max-width: 46.1875em) {
    padding: 0;
  }
`;

const ConversationSrceen = ({
  conversation,
  conversationmessege,
}: {
  conversation: Conversation;
  conversationmessege: Imessege[];
}) => {
  const [loggerInUser, _loading, _error] = useAuthState(auth);
  const conversationUser = conversation.user;
  const params = useParams();
  console.log(params.id);
  const [newMessege, setNewMessege] = useState("");
  const conversationId = params?.id;
  const queryMessege = generateQueryGetMessages(conversationId as string);
  console.log({ conversationId });
  const { recipientEmail, recipient } = useRecipient(conversationUser);
  const [messegeSnapshot, messegeLoading, __error] =
    useCollection(queryMessege);
  //neu giao dien loading messege truoc thi return messege tu ssr {from [id].tsx}
  const showMessege = () => {
    if (messegeLoading) {
      return conversationmessege.map((messege) => (
        <Messege key={messege.id} messege={messege}></Messege>
      ));
    }

    if (messegeSnapshot) {
      return messegeSnapshot.docs.map((messege) => (
        <Messege key={messege.id} messege={transformMessege(messege)}></Messege>
      ));
    }
    return null;
  };
  const addMessegeToDbAndUpdateLastSeen = async () => {
    await setDoc(
      doc(db, "user", loggerInUser?.email as string),
      {
        lastSeen: serverTimestamp(),
      },
      { merge: true } // chi update nhung gi da thay doi
    );

    // add new messege
    await addDoc(collection(db, "messeges"), {
      conversation_id: conversationId,
      sent_at: serverTimestamp(),
      text: newMessege,
      user: loggerInUser?.email,
    });

    //reset new mess
    setNewMessege("");
  };
  const sendMessegeOnEnter: KeyboardEventHandler<HTMLInputElement> = (
    event
  ) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (!newMessege) return;
      addMessegeToDbAndUpdateLastSeen();
    }
  };

  const sendMessegeClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    console.log({ event, newMessege });
    event.preventDefault();
    if (!newMessege) return;
    addMessegeToDbAndUpdateLastSeen();
  };
  console.log("new messeg", newMessege);
  console.log("srcenmess", messegeSnapshot);
  return (
    <>
      <div className="header">
        <div className="box-chat">
          <div>
            <RecipientAvatar
              recipient={recipient}
              recipientEmail={recipientEmail}
            ></RecipientAvatar>
            <div className="head-info">
              <div className="head-email">{recipientEmail}</div>
              <div>
                {recipient && (
                  <span>
                    Last active:{" "}
                    {convertFiretoreTimestampToString(recipient?.lastSeen)}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="icon-action">
            <AttachFileIcon></AttachFileIcon>
            <MoreVertIcon></MoreVertIcon>
          </div>
        </div>
        <div className="main-chat-box">{showMessege()}</div>
        <StyledInputContainer>
          <InsertEmoticonIcon></InsertEmoticonIcon>
          <StyledInput
            value={newMessege}
            onChange={(e) => setNewMessege(e.target.value)}
            onKeyDown={sendMessegeOnEnter}
          ></StyledInput>
          <IconButton onClick={sendMessegeClick} disabled={!newMessege}>
            <SendIcon></SendIcon>
          </IconButton>
          <IconButton>
            <KeyboardVoiceIcon></KeyboardVoiceIcon>
          </IconButton>
        </StyledInputContainer>
      </div>
    </>
  );
};
export default ConversationSrceen;
