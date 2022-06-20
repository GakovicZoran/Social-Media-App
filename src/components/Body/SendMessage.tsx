import { useContext, useState } from "react";
import { db } from "../data/firebaseConfig";
import firebase from "firebase/compat/app";
import { getAuth } from "firebase/auth";
import { css } from "@emotion/css";
import { AuthContext } from "../../App";
import { IoSendSharp } from "react-icons/io5";

const sendMsg = css`
  height: 40px;
  width: 300px;
  border: 1px solid #263238;
  display: flex;
  position: absolute;
`;

const inputStyle = css`
  height: 100%;
  flex: 85%;
  border: 0;
  padding: 0 0.7em;
  font-size: 1em;
  border-right: 1px dotted #607d8b;
  outline: none;
  font-family: "Open Sans", sans-serif;
`;

const btnStyle = css`
  border: 0;
  display: grid;
  place-items: center;
  cursor: pointer;
  flex: 15%;
  height: 100%;
  background: transparent;
  outline: none;
  font-size: 20px;
  color: lightgray;
  &:hover {
    color: #00ffbf;
  }
`;

interface IAppProps {
  scroll: any;
}

export const SendMessage = ({ scroll }: IAppProps) => {
  const [msg, setMsg] = useState<string>("");
  const { user } = useContext(AuthContext);
  const handlerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMsg(e.target.value);
  };

  const handlerSendMessage = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (msg === "") return;

    const { uid, photoURL } = user;
    try {
      await db.collection("messages").add({
        text: msg,
        photoURL,
        uid,
        name: user.displayName,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      });
    } catch (err) {
      console.log(err);
    }
    setMsg("");
    scroll.current.scrollTo({ top: 2000, behavior: "smooth" });
  };

  return (
    <div className={sendMsg}>
      <form onSubmit={handlerSendMessage}>
        <input
          className={inputStyle}
          value={msg}
          onChange={handlerChange}
          placeholder="Type something..."
        ></input>
      </form>
      <button className={btnStyle} type="submit">
        <IoSendSharp />
      </button>
    </div>
  );
};
