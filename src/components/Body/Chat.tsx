import { useState, useEffect, useRef, useContext } from "react";
// import { db } from "./Helpers/firebaseConfig";
import { SendMessage } from "./SendMessage";
import { getAuth } from "firebase/auth";
import { css } from "@emotion/css";
// import Timestamp from "react-timestamp";
import { db } from "../data/firebaseConfig";
import { AuthContext } from "../../App";

const chatBox = css`
  width: 300px;
  height: auto;
`;

const chatMsgs = css`
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
  border-radius: 6px;
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

const timestamp = css`
  font-size: 13px;
`;

const userName = css`
  margin: 7px 0 0 0;
  font-weight: bold;
  color: #263238;
`;

interface IMesProp {
  createdAt?: any;
  name?: string;
  photoURL?: string;
  text?: string;
  uid?: string;
}
export const Chat = () => {
  const [messages, setMessages] = useState<IMesProp[]>([]);
  const scroll = useRef<HTMLInputElement>(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    db.collection("messages")
      .orderBy("createdAt")
      .limit(50)
      .onSnapshot((snapshot) => {
        setMessages(snapshot.docs.map((doc) => doc.data()));
      });
  }, []);

  return (
    <div className={chatBox}>
      <div className={header}>
        <p className={headerTitle}>Live chat</p>
      </div>
      <div ref={scroll} className={chatMsgs}>
        {messages.map(({ createdAt, text, photoURL, uid, name }: IMesProp) => (
          <div
            key={Math.random() * 1000}
            // className={`
            //     ${msg} ${uid === user.uid ? sent : received}
            //   `}
          >
            {/* <Timestamp className={timestamp} date={createdAt?.toDate()} /> */}
            <p className={userName}>{name}</p>
            {/* className={imgAndMsg(uid === user.uid)} */}
            <div>
              <img className={img} src={photoURL} alt="Loading..." />
              <p className={userText}>{text}</p>
            </div>
          </div>
        ))}
      </div>
      <SendMessage scroll={scroll} />
    </div>
  );
};
