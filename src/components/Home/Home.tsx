import { css } from "@emotion/css";
import { Chat } from "../Body/Chat/Chat";
import { Post } from "../Body/Posts/Post";
import { User } from "../Body/Posts/User";

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
