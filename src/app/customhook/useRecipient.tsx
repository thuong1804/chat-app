import { useAuthState } from "react-firebase-hooks/auth";
import { AppUser, Conversation } from "../types/type";
import { auth, db } from "../config/firebase";
import { getRecipientEmail } from "../ultils/getRecipientEmail";
import { collection, query, where } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";

//component hook lay gmail
const useRecipient = (coversationUser: Conversation["users"]) => {
  const [loggerInUser, _loading, _error] = useAuthState(auth);

  //get recipient Email , lay gmail cua nguoi duoc moi
  const recipientEmail = getRecipientEmail(coversationUser, loggerInUser);

  //get recipient Avatar, // lay avatar cua nguoi duoc moi
  const queryGetRecipient = query(
    collection(db, "user"),
    where("email", "==", recipientEmail)
  );
  //lay email nguoi nhan trong co so du lieu
  const [conversationsSnapshot] = useCollection(queryGetRecipient);
  //gan docs[0]? truong hop array trong (la khi moi mot email chua loggin lan nao)
  const recipient = conversationsSnapshot?.docs[0]?.data() as
    | AppUser
    | undefined;
  return {
    recipient,
    recipientEmail,
  };
};
export default useRecipient;
