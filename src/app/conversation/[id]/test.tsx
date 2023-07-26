// import { use } from "react";
// import { auth, db } from "@/app/config/firebase";
// import { Conversation } from "../../types/type";
// import { doc, getDoc, getDocs } from "firebase/firestore";
// import { getRecipientEmail } from "@/app/ultils/getRecipientEmail";
// import { useEffect, useState } from "react";
// import { useAuthState } from "react-firebase-hooks/auth";
// import SideBar from "@/app/component/sidebar";
// import "../../conversation/conversation.scss";
// import {
//   generateQueryGetMessages,
//   transformMessege,
// } from "@/app/ultils/generateQueryGetMessages";
// import ConversationSrceen from "@/app/component/ConversationSrceen";

// async function getData(id: string) {
//   const conversationRef = doc(db, "conversation", id as string);
//   const conversationSnapshot = await getDoc(conversationRef);
//   // get all messages between logged in user and recipient in this conversation

//   return {
//     props: {
//       conversation: conversationSnapshot.data() as Conversation,
//     },
//   };
// }

// export default async function Page(props: any) {
//   const data = await getData(props);
//   console.log("data", data.props.conversation.user);
//   return <main>{data.props.conversation.user}</main>;
// }
