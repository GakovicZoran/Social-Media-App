import { css } from "@emotion/css";

import { Chat } from "../Body/Profile/Chat/Chat";
import { Post } from "../Body/Post";
import { User } from "../Body/User";
import { Route, Routes } from "react-router-dom";

const homeContainer = css`
  display: flex;
  justify-content: space-between;
  height: 93.5vh;
`;
export const Home = () => {
  return (
    <div className={homeContainer}>
      <Chat />
      <Post />
      <User />
    </div>
  );
};
