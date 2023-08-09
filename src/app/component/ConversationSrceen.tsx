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
import { auth, db, storage } from "../config/firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import Messege from "./messege";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { styled } from "styled-components";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import EmojiPicker from "emoji-picker-react";
import { Theme } from "emoji-picker-react";
import { EmojiStyle } from "emoji-picker-react";
import { SkinTones } from "emoji-picker-react";
import {
  KeyboardEventHandler,
  MouseEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { Button, Menu, MenuItem } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import {
  getDownloadURL,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

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
  const [buttonScrollBottom, setbuttonScrollBottom] = useState(false);
  const conversationUser = conversation.user;
  const messID = conversationmessege.map((con) => con.id);
  const params = useParams();
  const [newMessege, setNewMessege] = useState("");
  const conversationId = params?.id;
  const queryMessege = generateQueryGetMessages(conversationId as string);
  const { recipientEmail, recipient } = useRecipient(conversationUser);
  const [uploadImg, setUploadImg] = useState<File | "">("");
  const [showIcon, setShowIcon] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  console.log({ conversationmessege });

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [messegeSnapshot, messegeLoading, __error] =
    useCollection(queryMessege);

  // const refMessege = useRef<HTMLDivElement>(null);
  useEffect(() => {
    ScrollDownMessges();
  }, []);

  useEffect(() => {
    buttonscroll();
  }, []);
  const buttonscroll = () => {
    const scrollButton = document
      .querySelector(".main-chat-box")
      ?.addEventListener("scroll", (e: any) => {
        const height = e.target.scrollHeight - e.target.clientHeight;

        if (e.target.scrollTop < height) {
          return setbuttonScrollBottom(true);
        } else {
          setbuttonScrollBottom(false);
        }
      });

    // if (scrollButton) {
    //   setbuttonScrollBottom(true);
    //   ScrollDownMessges();
    // } else {

    // }
  };

  const ScrollDownMessges = () => {
    const elementMessage = document.querySelector(".main-chat-box");
    console.log({ elementMessage });

    if (elementMessage) {
      elementMessage.scrollTo({
        top: elementMessage.scrollHeight,
        behavior: "smooth",
      });
    }
  };
  //neu giao dien loading messege truoc thi return messege tu ssr {from [id].tsx}
  const showMessege = () => {
    if (messegeLoading) {
      return conversationmessege.map((messege) => (
        <Messege key={messege.id} messege={messege} />
      ));
    }

    if (messegeSnapshot) {
      return messegeSnapshot.docs.map((messege) => (
        <Messege key={messege.id} messege={transformMessege(messege)} />
      ));
    }
    return null;
  };
  const addMessegeToDbAndUpdateLastSeen = async () => {
    if (uploadImg) {
      handleUploadFile();
    } else {
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
        isDeletedReceiver: false,
        isDeletedSender: false,
      });
    }

    //reset new mess
    setNewMessege("");
    setUploadImg("");
    ScrollDownMessges();
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
  const handleUploadFile = () => {
    console.log("img", uploadImg);
    if (!uploadImg) return;
    const imgRef = ref(storage, uuidv4());
    const uploadTask = uploadBytesResumable(imgRef, uploadImg);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          await addDoc(collection(db, "messeges"), {
            conversation_id: conversationId,
            sent_at: serverTimestamp(),
            text: newMessege,
            user: loggerInUser?.email,
            img: downloadURL,
          });
        });
      }
    );
    handleClose();
  };
  const clickshowIcon = () => {
    setShowIcon(showIcon);
  };
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
                <span>
                  {`${
                    recipient
                      ? `Last active: ${convertFiretoreTimestampToString(
                          recipient?.lastSeen
                        )}`
                      : ""
                  }`}
                </span>
              </div>
            </div>
          </div>

          <div className="icon-action">
            <AttachFileIcon></AttachFileIcon>
            <MoreVertIcon></MoreVertIcon>
          </div>
        </div>
        <div className="main-chat-box">
          <div>{showMessege()}</div>
          {buttonScrollBottom && (
            <div className="button-scroll" onClick={ScrollDownMessges}>
              <IconButton style={{ background: "white" }}>
                <ArrowDownwardIcon />
              </IconButton>
            </div>
          )}
        </div>
        <StyledInputContainer>
          <IconButton onClick={() => clickshowIcon()}>
            <InsertEmoticonIcon></InsertEmoticonIcon>
          </IconButton>

          <StyledInput
            value={newMessege}
            onChange={(e) => setNewMessege(e.target.value)}
            onKeyDown={sendMessegeOnEnter}
          ></StyledInput>
          <IconButton onClick={sendMessegeClick} disabled={!newMessege}>
            <SendIcon></SendIcon>
          </IconButton>
          <Button
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
            style={{ color: "gray" }}
          >
            <AddPhotoAlternateIcon />
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
            <MenuItem>
              {" "}
              <input
                type="file"
                onChange={(e) => {
                  e.target.files != null && setUploadImg(e.target.files[0]);
                }}
              ></input>
            </MenuItem>
            <IconButton onClick={handleUploadFile}>
              <AddIcon></AddIcon>
            </IconButton>
          </Menu>
        </StyledInputContainer>
      </div>
    </>
  );
};
export default ConversationSrceen;
