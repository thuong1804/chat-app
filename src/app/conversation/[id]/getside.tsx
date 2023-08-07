"use client";
import ConversationSrceen from "@/app/component/ConversationSrceen";
import SideBar from "@/app/component/sidebar";
import { auth } from "@/app/config/firebase";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

const RenderPage = ({ dataMapping, messMapping }: any) => {
  const [loggerInUser, loading, _error] = useAuthState(auth);
  const { push } = useRouter();
  console.log({ dataMapping });

  return (
    <>
      {loggerInUser && (
        <div className="container-box-chat">
          <div className="name-box-chat">
            <div className="side-bar-chat">
              <SideBar></SideBar>
            </div>

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
export default RenderPage;
