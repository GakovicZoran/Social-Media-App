import { useContext, useState } from "react";
import { db } from "../../data/firebaseConfig";
import firebase from "firebase/compat/app";
import { css } from "@emotion/css";
import { AuthContext } from "../../Context/AuthContext";
import { IoSendSharp } from "react-icons/io5";
import { addDoc, collection, doc } from "firebase/firestore";

const sendMsgs = css`
  height: 5.2%;
  width: 27.8%;
  border: 1px solid #263238;
  display: flex;
  position: absolute;
`;

const chatInput = css`
  height: 100%;
  width: 340%;
  border: 0;
  padding: 0 10px;
  font-size: 17px;
  border-right: 1px dotted #607d8b;
  outline: none;
  font-family: "Open Sans", sans-serif;
`;

const chatSentBtn = css`
  position: absolute;
  top: 0;
  right: 17px;
  border: 0;
  display: grid;
  place-items: center;
  cursor: pointer;
  height: 100%;
  background: transparent;
  outline: none;
  font-size: 28px;
  color: lightgray;

  &:hover {
    color: black;
  }
`;

interface IAppProps {
  // Nisam znao rijesiti ANY
  scroll: any;
  roomName: string;
}

export const SendMessages = ({ scroll, roomName }: IAppProps) => {
  const [msgs, setMsgs] = useState<string>("");
  const { user } = useContext(AuthContext);

  const handlerChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMsgs(e.target.value);
  };
  const handlerSendMessage = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (msgs === "") return;

    try {
      const docRef = doc(db, `chats/${roomName}`);
      const colRef = collection(docRef, `${roomName}`);
      addDoc(colRef, {
        text: msgs,
        name: user.displayName,
        photoURL: user.photoURL,
        fromID: user.uid,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      });
    } catch (err) {
      console.log(err);
    }
    setMsgs("");
    scroll.current.scrollTo({ top: 2000, behavior: "smooth" });
  };

  return (
    <div className={sendMsgs}>
      <form onSubmit={handlerSendMessage}>
        <input
          className={chatInput}
          value={msgs}
          onChange={handlerChanges}
          placeholder="Type something..."
        ></input>
        <button className={chatSentBtn} type="submit">
          <IoSendSharp />
        </button>
      </form>
    </div>
  );
};
