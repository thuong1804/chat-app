import {
  DocumentData,
  QueryDocumentSnapshot,
  Timestamp,
  collection,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "../config/firebase";
import { timeStamp } from "console";
import { Imessege } from "../types/type";

export const generateQueryGetMessages = (id: string) =>
  query(
    collection(db, "messeges"),
    where("conversation_id", "==", id),
    orderBy("sent_at", "asc")
  );

export const transformMessege = (
  messege: QueryDocumentSnapshot<DocumentData, DocumentData>
) =>
  ({
    id: messege.id,
    ...messege.data(),
    sent_at: messege.data().sent_at
      ? convertFiretoreTimestampToString(messege.data().sent_at as Timestamp)
      : null,
  } as Imessege);

export const convertFiretoreTimestampToString = (timeStamp: Timestamp) =>
  new Date(timeStamp.toDate().getTime()).toLocaleString();
