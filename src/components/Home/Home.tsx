import { css } from "@emotion/css";
import { Chat } from "../Body/Chat/Chat";
import { Posts } from "../Body/Posts/Posts";
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
      <Posts />
      <User />
    </div>
  );
};
