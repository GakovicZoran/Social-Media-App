import { css } from "@emotion/css";
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { IUsers } from "../../Interfaces/Interfaces";

const usersChatContainer = css`
  width: 35%;
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

const currentChat = css`
  cursor: pointer;
`;

export const ActiveUsers = ({
  onUserClicked,
}: {
  onUserClicked: (userId: string) => void;
}) => {
  const { users, user: chatUser } = useContext(AuthContext);

  return (
    <div className={usersChatContainer}>
      {users?.map((user: IUsers) => {
        return user.id !== chatUser?.uid ? (
          <ul key={user.id} className={usersList}>
            <a onClick={() => onUserClicked(user.id)} className={currentChat}>
              <li>
                <img src={user.userPhoto} alt="Loading..." />
                <h4>{user.userName}</h4>
              </li>
            </a>
          </ul>
        ) : null;
      })}
    </div>
  );
};
