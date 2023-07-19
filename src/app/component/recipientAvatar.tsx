import { Avatar } from "@mui/material";
import useRecipient from "../customhook/useRecipient";

type Props = ReturnType<typeof useRecipient>;

const RecipientAvatar = ({ recipient, recipientEmail }: Props) => {
  //neu moi` email da loggin thi hien thi avatar nguoi do, neu chua loggin thi hien chu cai dau lien
  return recipient?.photoURL ? (
    <Avatar src={recipient.photoURL}></Avatar>
  ) : (
    <Avatar> {recipientEmail && recipientEmail[0].toUpperCase()}</Avatar>
  );
};
export default RecipientAvatar;
