import { useState, useEffect, useRef, useContext } from "react";
import { auth, db } from "../../../data/firebaseConfig";
import { SendMessage } from "../Chat/SendMessage";
import { css } from "@emotion/css";
import { AuthContext } from "../../../Context/AuthContext";
import { IMesProp, IUser } from "../../../Interfaces/Interfaces";
import { Timestamp } from "firebase/firestore";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ActiveUsers } from "./ActiveUsers";

const chatBox = css`
  width: 50%;
  // height: auto;
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

const timestamp = css`
  font-size: 13px;
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
  const scroll = useRef<HTMLInputElement>(null);
  const { user, userInfo, messages, setMessages } = useContext(AuthContext);
  const { id } = useParams();
  // console.log(id);
  // UGLAVNOM MORAO BIH IMATI NEKAKAV REALTIME UPDATE U BAZI, TO VEC IMAM U KOLEKCIJI TAKO DA STA CE MI I U BAZI HMM
  useEffect(() => {
    db.collection(`/users/${auth?.currentUser?.uid}/messages`)
      .orderBy("createdAt")
      .limit(50)
      .onSnapshot((snapshot) => {
        setMessages(snapshot.docs.map((doc: any) => doc.data()));
      });
  }, []);

  console.log(messages);

  console.log(userInfo);

  return (
    <div className={chatBox}>
      <div className={header}>
        <p className={headerTitle}>Live chat</p>
      </div>
      <div ref={scroll} className={chatMsgs}>
        <ActiveUsers />
        <div className={msgsBox}>
          {messages
            .filter((users: any) => users.id !== user.uid)
            .map(({ createdAt, text, photoURL, uid, name }: IMesProp) => (
              <div
                key={Math.random() * 1000}
                className={`
               ${msg} ${uid === auth?.currentUser?.uid ? sent : received}
               
             `}
              >
                {/* <Timestamp className={timestamp} date={createdAt?.toDate()} /> */}

                <p className={userName}>{name}</p>
                <div className={imgAndMsg(uid === auth?.currentUser?.uid)}>
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
