"use client";
import { app, auth, db } from "@/app/config/firebase";
import { Conversation } from "../../types/type";
import { useAuthState } from "react-firebase-hooks/auth";
import { doc, getDoc, getDocs } from "firebase/firestore";
import SideBar from "@/app/component/sidebar";
import "../../conversation/conversation.scss";

import {
  generateQueryGetMessages,
  transformMessege,
} from "@/app/ultils/generateQueryGetMessages";
import ConversationSrceen from "@/app/component/ConversationSrceen";
import Home from "@/app/component/home";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
async function getData(id: string) {
  const conversationRef = doc(db, "conversation", id as string);
  const conversationSnapshot = await getDoc(conversationRef);
  //get messeges user and recipient
  const queryMessege = generateQueryGetMessages(id);
  const messegeSnapshot = await getDocs(queryMessege);
  const messege = messegeSnapshot.docs.map((messegeDoc) =>
    transformMessege(messegeDoc)
  );
  return {
    props: {
      conversation: conversationSnapshot.data() as Conversation,
      messege,
    },
  };
}

// eslint-disable-next-line @next/next/no-async-client-component
export default async function Page(props: any) {
  const data = await getData(props.params.id);
  const dataMapping = data.props.conversation;
  const messMapping = data.props.messege;

  return (
    <>
      <RenderPage
        dataMapping={dataMapping}
        messMapping={messMapping}
      ></RenderPage>
    </>
  );
}

const RenderPage = ({ dataMapping, messMapping }: any) => {
  const [loggerInUser, loading, _error] = useAuthState(auth);
  const { push } = useRouter();
  console.log({ dataMapping });
  useEffect(() => {
    if (!loggerInUser) push("/");
  }, []);

  return (
    <>
      {loggerInUser && (
        <div className="container-box-chat">
          <div className="name-box-chat">
            <SideBar></SideBar>
            <ConversationSrceen
              conversation={dataMapping}
              conversationmessege={messMapping}
            ></ConversationSrceen>
          </div>
        </div>
      )}
    </>
  );
};
