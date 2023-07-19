import { User } from "firebase/auth";
import { Conversation } from "../types/type";

// componet lay email tu nguoi duoc moi
export const getRecipientEmail = (
  coversationUser: Conversation["users"],
  loggerInUser?: User | null
) => coversationUser.find((userEmail) => userEmail !== loggerInUser?.email); // tim email khac voi email loggin
