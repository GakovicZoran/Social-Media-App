import { css } from "@emotion/css";
import { useContext } from "react";
import { AuthContext } from "../../App";
import { Chat } from "../Body/Chat";
import { Post } from "../Body/Post";
import { User } from "../Body/User";

const homeContainer = css`
  display: flex;
  justify-content: space-between;
  height: 100vh;
`;
export const Home = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className={homeContainer}>
      <Chat />
      <Post />
      <User />
    </div>
  );
};
