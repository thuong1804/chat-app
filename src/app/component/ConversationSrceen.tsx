import useRecipient from "../customhook/useRecipient";
import "../component/conversationSrceen.scss";
import { Imessege } from "../types/type";
const ConversationSrceen = ({ conversation, conversationmessege }: any) => {
  const conversationUser = conversation.user;
  const { recipientEmail, recipient } = useRecipient(conversationUser);
  console.log("srcen", conversationUser);
  return (
    <>
      <div className="header"></div>
    </>
  );
};
export default ConversationSrceen;
