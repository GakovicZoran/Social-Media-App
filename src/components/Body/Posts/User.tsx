import { css } from "@emotion/css";
import { useContext } from "react";
import { Link } from "react-router-dom";
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
`;
export const User = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className={userContainer}>
      <div key={user?.uid}>
        <img src={user?.photoURL as unknown as string} alt="Loading..." />

        <Link to="/profile">
          <p>{user?.displayName}</p>
        </Link>
      </div>
      <span>Followers(0)</span> <br></br>
      <span>Following(0)</span>
    </div>
  );
};
