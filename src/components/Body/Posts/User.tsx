import { css } from "@emotion/css";
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";

const userContainer = css`
  text-align: center;
  border-left: 1px solid black;
  width: 30%;
  margin-top: 20px;
  & img {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    object-fit: cover;
  }
  & a {
    text-decoration: none;
    font-size: 18px;
    color: black;
    font-weight: 500;
  }

  & p {
    font-size: 22px;
    font-weight: 500;
  }
`;
export const User = () => {
  const { user, followers, following } = useContext(AuthContext);

  return (
    <div className={userContainer}>
      <div key={user?.uid}>
        <img src={user?.photoURL as unknown as string} alt="Loading..." />
        <p>{user?.displayName}</p>
      </div>

      <div>
        <span>Followers({followers.length})</span> <br></br>
      </div>

      <div>
        <span>Following({following.length})</span> <br></br>
      </div>
    </div>
  );
};
