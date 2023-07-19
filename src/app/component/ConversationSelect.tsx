import useRecipient from "../customhook/useRecipient";
import { Conversation } from "../types/type";
import styled from "styled-components";
import RecipientAvatar from "../component/recipientAvatar";
const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 15px;
  gap: 2px;
  word-break: break-all;

  &:hover {
    background-color: #e9eaeb;
  }
`;

const ConversationSelect = ({
  id,
  coversationUser,
}: {
  id: string;
  coversationUser: Conversation["users"];
}) => {
  const { recipient, recipientEmail } = useRecipient(coversationUser);
  return (
    <StyledContainer>
      <RecipientAvatar
        recipient={recipient}
        recipientEmail={recipientEmail}
      ></RecipientAvatar>
      <span>{recipientEmail}</span>
    </StyledContainer>
  );
};
export default ConversationSelect;
