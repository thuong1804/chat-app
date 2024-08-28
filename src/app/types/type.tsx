import { Timestamp } from "firebase/firestore";

export interface Conversation {
  user: string[];
}

export interface AppUser {
  email: string;
  lastSeen: Timestamp;
  photoURL: string;
}
export interface Imessege {
  id: string;
  conversation_id: string;
  text: string;
  sent_at: string | null;
  user: string;
  img?: string;
  isDeletedReceiver: boolean;
  isDeletedSender: boolean;
}
