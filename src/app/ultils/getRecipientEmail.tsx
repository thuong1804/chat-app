import { User } from "firebase/auth";
import { Conversation } from "../types/type";

// componet lay email tu nguoi duoc moi
export const getRecipientEmail = (
  conversationUser: Conversation["user"],
  loggerInUser?: User | null
) => conversationUser.find((userEmail) => userEmail !== loggerInUser?.email); // tim email khac voi email loggin
