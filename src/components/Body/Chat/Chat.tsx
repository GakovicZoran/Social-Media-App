import { useEffect, useRef, useContext } from "react";
import { auth, db } from "../../data/firebaseConfig";
import { SendMessage } from "./SendMessage";
import { css } from "@emotion/css";
import { AuthContext } from "../../Context/AuthContext";
import { IMessage } from "../../Interfaces/Interfaces";
import { ActiveUsers } from "./ActiveUsers";

const chatBox = css`
  width: 50%;
`;

const chatMsgs = css`
  display: flex;
  width: 100%;
  height: 90%;
  overflow-y: scroll;
  overflow-x: hidden;
  border: 1px solid #263238;
  background: #fff;
`;

const header = css`
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-around;
  align-items: center;
  height: 45px;
  background: #263238;
`;

const headerTitle = css`
  display: block;
  color: #fff;
  font-weight: 700;
  line-height: 45px;
  margin: 0;
`;

const img = css`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;

const imgAndMsg = (currentUser: boolean) => css`
  display: flex;
  align-items: center;
  height: 45px;
  flex-direction: ${currentUser ? "row-reverse" : "row"};
`;

const userText = css`
  width: auto;
  height: auto;
  min-height: 40px;
  max-width: 120px;
  background-color: #43a047;
  border-radius: 5px;
  color: white;
  display: flex;
  align-items: center;
  margin-right: 5px;
  margin-left: 5px;
  padding-right: 5px;
  padding-left: 5px;
  overflow-wrap: break-word;
  word-break: break-word;
`;

const msg = css`
  padding: 15px;
`;

const sent = css`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const received = css`
  display: flex;
  flex-direction: column;
  align-items: start;
`;

const userName = css`
  margin: 7px 0 0 0;
  font-weight: bold;
  color: #263238;
`;

const msgsBox = css`
  display: flex;
  flex-direction: column;
  width: 70%;
`;
export const Chat = () => {
  const { user, messages, setMessages } = useContext(AuthContext);
  const scroll = useRef<HTMLDivElement>(null);

  useEffect(() => {
    db.collection(`/chats/chatRoom/messages`)
      .orderBy("createdAt")
      .limit(50)
      .onSnapshot((snapshot) => {
        setMessages(snapshot.docs.map((doc: any) => doc.data()));
      });
  }, []);

  return (
    <div className={chatBox}>
      <div className={header}>
        <p className={headerTitle}>Live chat</p>
      </div>
      <div ref={scroll} className={chatMsgs}>
        <ActiveUsers />
        <div className={msgsBox}>
          {messages
            .filter((users: IMessage) => users.id !== user?.uid)
            .map(({ createdAt, text, photoURL, fromID, name }: IMessage) => (
              <div
                key={Math.random() * 1000}
                className={`
               ${msg} ${fromID === auth?.currentUser?.uid ? sent : received}
               
             `}
              >
                <p className={userName}>{name}</p>
                <div className={imgAndMsg(fromID === auth?.currentUser?.uid)}>
                  <img className={img} src={photoURL} alt="Loading..." />
                  <p className={userText}>{text}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
      <SendMessage scroll={scroll} />
    </div>
  );
};
