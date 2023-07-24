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
import { auth } from "../config/firebase";
import { useCollection } from "react-firebase-hooks/firestore";
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

  const conversationId = params?.id;
  const queryMessege = generateQueryGetMessages(conversationId as string);
  console.log({ conversationId });
  const { recipientEmail, recipient } = useRecipient(conversationUser);
  const [messegeSnapshot, messegeLoading, __error] =
    useCollection(queryMessege);
  //neu giao dien loading messege truoc thi return messege tu ssr {from [id].tsx}
  const showMessege = () => {
    if (!messegeLoading) {
      return conversationmessege.map((mes, index) => (
        <p key={index}>{JSON.stringify(mes)}</p>
      ));
    }

    if (messegeSnapshot) {
      messegeSnapshot.docs.map((messege, index) => (
        <p key={index}>{JSON.stringify(transformMessege(messege))}</p>
      ));
    }
    return null;
  };
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
      </div>
    </>
  );
};
export default ConversationSrceen;
