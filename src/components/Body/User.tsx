import { css } from "@emotion/css";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import { IUser } from "../Interfaces/Interfaces";

const userContainer = css`
  text-align: center;
  border-left: 1px solid black;
  width: 30%;
  & img {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    object-fit: cover;
  }
`;
export const User = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className={userContainer}>
      <div key={user?.uid}>
        <img src={user?.photoURL as any} alt="Loading..." />

        <Link to="/profile">
          <p>{user?.displayName}</p>
        </Link>
      </div>
      {/* {userInfo
        .filter((users: IUser) => users?.id === user?.uid)
        .map((user: IUser) => {
          return (
            <div key={user.id}>
              <img src={user.photoURL} alt="Loading..." />

              <Link to="/profile">
                <p>{user.userName}</p>
              </Link>
            </div>
          );
        })} */}
      <span>Followers(0)</span> <br></br>
      <span>Following(0)</span>
    </div>
  );
};
