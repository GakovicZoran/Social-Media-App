import { css } from "@emotion/css";
import { getDocs } from "firebase/firestore";
import { useContext, useEffect } from "react";
import { AuthContext } from "../Context/AuthContext";
import { db } from "../data/firebaseConfig";
import { IUsers } from "../Interfaces/Interfaces";
import { Users } from "./Users";

const usersExploreContainer = css`
  overflow-y: scroll;
  height: 95vh;

  & ul {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
    justify-items: center;
    text-align: center;
    align-items: center;
  }

  & li {
    list-style: none;
  }

  & a {
    text-decoration: none;
  }

  & img {
    width: 300px;
    height: 300px;
    border-top-left-radius: calc(0.25rem - 1px);
    border-top-right-radius: calc(0.25rem - 1px);
    object-fit: cover;
  }
`;

export const Explore = () => {
  const { users, user, setUsers } = useContext(AuthContext);

  useEffect(() => {
    const getPostInfo = async () => {
      const userCollectionRef = db.collection("users");
      const dataUser = await getDocs(userCollectionRef);

      try {
        setUsers(
          dataUser.docs.map((doc) => {
            return { ...doc.data(), id: doc.id } as IUsers;
          })
        );
      } catch (err) {
        console.error(err);
      }
    };

    getPostInfo();
  }, []);

  return (
    <div className={usersExploreContainer}>
      <ul>
        {users.map(({ id, userPhoto, userName, userEmail }: IUsers) => {
          if (id === user.uid) return "";
          return (
            <Users
              key={id}
              id={id}
              userPhoto={userPhoto}
              userName={userName}
              userEmail={userEmail}
            />
          );
        })}
      </ul>
    </div>
  );
};
