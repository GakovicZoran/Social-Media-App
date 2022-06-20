import { css } from "@emotion/css";
import { useContext } from "react";
import { AuthContext } from "../../App";

const userContainer = css`
  text-align: center;
  border-left: 1px solid black;
  & img {
    width: 100px;
    border-radius: 100px;
  }
`;
export const User = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className={userContainer}>
      <div>
        <img
          src="http://getdrawings.com/img/facebook-profile-picture-silhouette-female-3.jpg"
          alt="Loading..."
        />
      </div>
      {/* <p>{user.email}</p> */}
      <span>Followers(0)</span> <br></br>
      <span>Following(0)</span>
    </div>
  );
};
