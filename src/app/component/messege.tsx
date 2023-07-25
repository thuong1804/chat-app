import { useAuthState } from "react-firebase-hooks/auth";
import { Imessege } from "../types/type";
import { auth } from "../config/firebase";
import { styled } from "styled-components";

const StyledMessege = styled.div`
  width: fit-content;
  word-break: break-all;
  max-width: 90%;
  min-width: 30%;
  padding: 15px 15px 30px;
  border-radius: 8px;
  margin: 10px;
  position: relative;
`;
const StyledsenderMessege = styled(StyledMessege)`
  margin-left: auto;
  background-color: #dcf8c6;
`;
const StyledReceiveMessege = styled(StyledMessege)`
  background-color: whitesmoke;
`;
const StyledTimestamp = styled.div`
  color: gray;
  padding: 18px;
  font-size: x-small;
  position: absolute;
  bottom: -15px;
  right: 0;
  text-align: right;
`;

const Messege = ({ messege }: { messege: Imessege }) => {
  const [loggerInUser, _loading, _error] = useAuthState(auth);
  const MessegeType =
    loggerInUser?.email === messege.user
      ? StyledsenderMessege
      : StyledReceiveMessege;
  return (
    <MessegeType>
      {messege.text}
      <StyledTimestamp>{messege.sent_at}</StyledTimestamp>
    </MessegeType>
  );
};
export default Messege;
