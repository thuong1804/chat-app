import { use } from "react";
import { auth, db } from "@/app/config/firebase";
import { Conversation } from "../../types/type";
import { doc, getDoc } from "firebase/firestore";
import { getRecipientEmail } from "@/app/ultils/getRecipientEmail";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import SideBar from "@/app/component/sidebar";

export function Page({ params: { id } }: any) {
  const [conversation, setConversation] = useState<any>();
  const [loggedInUser, _loading, _error] = useAuthState(auth);

  console.log({ conversation });

  useEffect(() => {
    const getConversation = async () => {
      // get conversation, to know who we are chatting with
      const conversationRef = doc(db, "conversation", id as string);
      const conversationSnapshot = await getDoc(conversationRef);
      // get all messages between logged in user and recipient in this conversation
      const conversation = conversationSnapshot.data() as Conversation;

      setConversation(conversation);
    };

    id && getConversation();
  }, [id]);

  return (
    <div>
      <SideBar></SideBar>
      {conversation &&
        loggedInUser &&
        getRecipientEmail(conversation?.user, loggedInUser)}
    </div>
  );
  // return {
  //   props: {
  //     conversation: conversationSnapshot.data() as Conversation,
  //   },
  // };
}
export default Page;
