import { app, db } from "@/app/config/firebase";
import { Conversation } from "../../types/type";
import { useAuthState } from "react-firebase-hooks/auth";
import { doc, getDoc, getDocs } from "firebase/firestore";
import SideBar from "@/app/component/sidebar";
import "../../conversation/conversation.scss";
import { getRecipientEmail } from "@/app/ultils/getRecipientEmail";
import {
  generateQueryGetMessages,
  transformMessege,
} from "@/app/ultils/generateQueryGetMessages";
import ConversationSrceen from "@/app/component/ConversationSrceen";
import { getAuth } from "firebase/auth";

const authen = getAuth(app);

console.log({ authen });

async function getData(id: string) {
  const conversationRef = doc(db, "conversation", id as string);
  const conversationSnapshot = await getDoc(conversationRef);
  //get messeges user and recipient
  const queryMessege = generateQueryGetMessages(id);
  const messegeSnapshot = await getDocs(queryMessege);
  const messege = messegeSnapshot.docs.map((messegeDoc) =>
    transformMessege(messegeDoc)
  );
  console.log("meseng", messegeSnapshot.docs[0].data());
  return {
    props: {
      conversation: conversationSnapshot.data() as Conversation,
      messege,
    },
  };
}

export default async function Page(props: any) {
  const data = await getData(props.params.id);

  const dataMapping = data.props.conversation;
  const messMapping = data.props.messege;
  return (
    <div className="container-box-chat">
      <div className="name-box-chat">
        <SideBar></SideBar>
        <ConversationSrceen
          conversation={dataMapping}
          conversationmessege={messMapping}
        ></ConversationSrceen>
      </div>
    </div>
  );
}
