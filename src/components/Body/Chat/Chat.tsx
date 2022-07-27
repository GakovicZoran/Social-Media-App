import { useEffect, useRef, useContext, useState } from "react";
import { auth, db } from "../../data/firebaseConfig";
import { SendMessages } from "./SendMessages";
import { css } from "@emotion/css";
import { AuthContext } from "../../Context/AuthContext";
import { IMessages } from "../../Interfaces/Interfaces";
import { ActiveUsers } from "./ActiveUsers";

const chatContainer = css`
  width: 50%;
`;

const chatHeader = css`
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-around;
  align-items: center;
  height: 45px;
  background: #263238;
`;

const chatInnerContainer = css`
  display: flex;
  width: 100%;
  height: 90%;
  overflow-y: scroll;
  overflow-x: hidden;
  border: 1px solid #263238;
  background: #fff;
`;

const chatHeaderTitle = css`
  display: block;
  color: #fff;
  font-weight: 700;
  line-height: 45px;
  margin: 0;
`;

const userChatImg = css`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;

const chatMsgs = (currentUser: boolean) => css`
  display: flex;
  align-items: center;
  height: 45px;
  flex-direction: ${currentUser ? "row-reverse" : "row"};
`;

const chatMsgsText = (sendOrRecive: boolean) => css`
  width: auto;
  height: auto;
  min-height: 40px;
  max-width: 120px;
  background-color: ${sendOrRecive ? "rgb(224, 224, 224)" : "#4498489d"};
  border-radius: 5px;
  color: black;
  display: flex;
  align-items: center;
  margin-right: 5px;
  margin-left: 5px;
  padding-right: 5px;
  padding-left: 5px;
  overflow-wrap: break-word;
  word-break: break-word;
`;

const chatMsgsContainer = css`
  padding: 15px;
`;

const userSentMsgs = css`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const userReceivedMsg = css`
  display: flex;
  flex-direction: column;
  align-items: start;
`;

const chatUserName = css`
  margin: 7px 0 0 0;
  font-weight: bold;
  color: #263238;
`;

const chatMsgsBox = css`
  display: flex;
  flex-direction: column;
  width: 70%;
`;

const welcomeChatMsg = css`
  margin: 0 auto;
  font-size: 25px;
`;

const chatDate = css`
  align-self: center;
`;
export const Chat = () => {
  const [messages, setMessages] = useState<IMessages[]>([]);
  const [roomName, setRoomName] = useState<string>("");
  const { user } = useContext(AuthContext);
  const scroll = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (roomName) {
      db.collection(`chats/${roomName}/${roomName}`)
        .orderBy("createdAt")
        .limit(50)
        .onSnapshot((snapshot) => {
          setMessages(snapshot.docs.map((doc) => doc.data() as IMessages));
        });
    }
  }, [roomName]);

  return (
    <div className={chatContainer}>
      <div className={chatHeader}>
        <p className={chatHeaderTitle}>Live chat</p>
      </div>
      <div ref={scroll} className={chatInnerContainer}>
        <ActiveUsers
          onUserClicked={(userID: string) =>
            setRoomName(
              user.uid < userID ? user.uid + userID : userID + user.uid
            )
          }
        />
        <div className={chatMsgsBox}>
          <div className={welcomeChatMsg}>
            {!roomName ? <p>Select a user to start conversation!</p> : null}
          </div>
          {messages
            .filter((chatUser: IMessages) => chatUser.id !== user.uid)
            .map(
              ({ createdAt, text, photoURL, fromID, name, id }: IMessages) => (
                <div
                  key={id}
                  className={`
               ${chatMsgsContainer} ${
                    fromID === auth.currentUser?.uid
                      ? userSentMsgs
                      : userReceivedMsg
                  }
               
             `}
                >
                  <p className={chatDate}>
                    {new Date(createdAt?.seconds * 1000).toLocaleString([], {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </p>
                  <p className={chatUserName}>{name}</p>
                  <div className={chatMsgs(fromID === auth.currentUser?.uid)}>
                    <img
                      className={userChatImg}
                      src={photoURL}
                      alt="Loading..."
                    />
                    <p
                      className={chatMsgsText(fromID === auth.currentUser?.uid)}
                    >
                      {text}
                    </p>
                  </div>
                </div>
              )
            )}
        </div>
      </div>
      <SendMessages scroll={scroll} roomName={roomName} />
    </div>
  );
};
