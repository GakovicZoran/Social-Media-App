import { css } from "@emotion/css";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import { IUser } from "../Interfaces/Interfaces";

const usersExploreContainer = css`
  overflow-y: scroll;
  height: 95vh;

  & ul {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    justify-items: center;
    text-align: center;
    gap: 50px 0px;
  }

  & li {
    list-style: none;
  }

  & a {
    text-decoration: none;
  }

  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const userExploreContainer = css`
  width: 200px;
`;

export const Explore = () => {
  const { userInfo } = useContext(AuthContext);

  return (
    <div className={usersExploreContainer}>
      <ul>
        {userInfo?.map((users: IUser) => {
          return (
            <div key={users?.id} className={userExploreContainer}>
              <li>
                <Link to={`/${users.id}`}>
                  <img src={users.userPhoto} alt="Loading..." />
                  <h4>{users?.userName}</h4>
                  <p>{users?.userEmail}</p>
                  <button>FOLLOW</button>
                </Link>
              </li>
            </div>
          );
        })}
      </ul>
    </div>
  );
};
