import { Conversation } from "../types/type";
import styled from "styled-components";

const StyledContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  padding: 15px;
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
  return (
    <StyledContainer>
      {id} - {JSON.stringify(coversationUser)}
    </StyledContainer>
  );
};
export default ConversationSelect;
