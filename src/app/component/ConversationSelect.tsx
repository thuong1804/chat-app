import useRecipient from "../customhook/useRecipient";
import { Conversation } from "../types/type";
import styled from "styled-components";
import RecipientAvatar from "../component/recipientAvatar";
import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../config/firebase";

const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 15px;
  gap: 10px;
  word-break: break-all;

  &:hover {
    background-color: #e9eaeb;
  }
`;

const ConversationSelect = ({
  id,
  conversationUser,
}: {
  id: string;
  conversationUser: Conversation["user"];
}) => {
  const [loggerInUser, _loading, _error] = useAuthState(auth);
  const { recipient, recipientEmail } = useRecipient(conversationUser);
  const router = useRouter();
  const onSelectConversation = () => {
    router.push(`/conversation/${id}`);
  };

  return (
    <StyledContainer onClick={onSelectConversation}>
      <RecipientAvatar
        recipient={recipient}
        recipientEmail={recipientEmail}
      ></RecipientAvatar>
      <span>{recipientEmail}</span>
    </StyledContainer>
  );
};
export default ConversationSelect;
