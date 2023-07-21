// import Sidebar from "@/app/component/sidebar";
// import { auth, db } from "@/app/config/firebase";
// import { Conversation } from "@/app/types/type";
// import { getRecipientEmail } from "@/app/ultils/getRecipientEmail";
// import { doc, getDoc } from "firebase/firestore";
// import "../../conversation/conversation.scss";

// async function getServerSideProps(id: string) {
//   const conversationRef = doc(db, "conversation", id);
//   const conversationSnapshot = await getDoc(conversationRef);

//   return {
//     props: {
//       conversation: conversationSnapshot.data() as Conversation,
//     },
//   };
// }

// export default async function Page(conversation: Conversation) {
//   return (
//     <div>
//       <div className="main-box">
//         <Sidebar></Sidebar>
//         chat with {getRecipientEmail(conversation.user)}
//       </div>
//     </div>
//   );
// }

"use client";
import { use } from "react";
import { auth, db } from "@/app/config/firebase";
import { Conversation } from "../../types/type";
import { doc, getDoc, getDocs } from "firebase/firestore";
import { getRecipientEmail } from "@/app/ultils/getRecipientEmail";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import SideBar from "@/app/component/sidebar";
import "../../conversation/conversation.scss";
import { generateKey } from "crypto";
import {
  generateQueryGetMessages,
  transformMessege,
} from "@/app/ultils/generateQueryGetMessages";
import ConversationSrceen from "@/app/component/ConversationSrceen";

export function Page({ params: { id } }: any) {
  const [conversation, setConversation] = useState<any>();
  const [conversationmessege, setConversationmessege] = useState<any>([]);
  const [loggedInUser, _loading, _error] = useAuthState(auth);

  console.log({ conversation });
  console.log({ conversationmessege });
  useEffect(() => {
    const getConversation = async () => {
      // get conversation, to know who we are chatting with
      const conversationRef = doc(db, "conversation", id as string);
      const conversationSnapshot = await getDoc(conversationRef);
      // get all messages between logged in user and recipient in this conversation
      const conversation = conversationSnapshot.data() as Conversation;
      //get messeges user and recipient
      const queryMessege = generateQueryGetMessages(id);
      const messegeSnapshot = await getDocs(queryMessege);
      const mess = messegeSnapshot.docs.map((messegeDoc) =>
        transformMessege(messegeDoc)
      );

      setConversationmessege(mess);
      setConversation(conversation);
    };

    id && getConversation();
  }, [id]);

  return (
    <div className="container">
      <div className="name-box-chat">
        <SideBar></SideBar>

        <ConversationSrceen
          conversation={conversation}
          conversationmessege={conversationmessege}
        ></ConversationSrceen>
        <div className="container-box-chat">asdassdas</div>
      </div>
    </div>
  );
}
export default Page;
