import { useAuthState } from "react-firebase-hooks/auth";
import { Conversation } from "../types/type";
import { auth } from "../config/firebase";
import { getRecipientEmail } from "../ultils/getRecipientEmail";

//component hook lay gmail
const useRecipient = (coversationUser: Conversation["users"]) => {
  const [loggerInUser, _loading, _error] = useAuthState(auth);

  //get recipient Email , lay gmail cua nguoi duoc moi
  const recipientEmail = getRecipientEmail(coversationUser, loggerInUser);

  //get recipient Avatar, // lay avatar cua nguoi duoc moi
  return {
    recipientEmail,
  };
};
export default useRecipient;
