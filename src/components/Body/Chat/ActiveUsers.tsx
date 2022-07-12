import { css } from "@emotion/css";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import { IUser } from "../../Interfaces/Interfaces";

const usersRoomsContainer = css`
  width: 30%;
  border-right: 2px solid black;
`;

const usersList = css`
  list-style: none;
  padding-left: 15px;

  & img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    object-fit: cover;
  }

  & li {
    display: flex;
    align-items: center;
    gap: 15px;
  }
`;

export const ActiveUsers = () => {
  const { userInfo, user } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className={usersRoomsContainer}>
      {userInfo?.map((users: IUser) => {
        return users.id !== user?.uid ? (
          <ul key={users.id} className={usersList}>
            <Link
              to={users.id}
              onClick={() => {
                navigate(`${users.id}`);
              }}
            >
              <li>
                <img src={users.userPhoto} alt="Loading..." />
                <h4>{users.userName}</h4>
              </li>
            </Link>
          </ul>
        ) : null;
      })}
    </div>
  );
};
