import { css } from "@emotion/css";
import { getDocs } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import { db } from "../data/firebaseConfig";
import { IUser } from "../Interfaces/Interfaces";
import firebase from "firebase/compat/app";

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
  const { userInfo, user, setFollowers } = useContext(AuthContext);
  const [followersFlag, setFollowersFlag] = useState<boolean>(false);

  const handlerFollowers = async (id: string, name: string, photo: string) => {
    try {
      await db.collection("followers").add({
        userName: name,
        // userPhoto: profilePhotoUrl,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      });
    } catch (err) {
      console.log(err);
    }
    setFollowersFlag(!followersFlag);
  };

  useEffect(() => {
    const getFollowersInfo = async () => {
      const followersCollectionRef = db.collection("followers");
      const dataFollowers = await getDocs(followersCollectionRef);
      try {
        setFollowers(
          dataFollowers.docs.map((doc: any) => {
            return { ...doc.data(), id: doc.id };
          })
        );
      } catch (err) {
        console.error(err);
      }
    };
    getFollowersInfo();
  }, []);

  return (
    <div className={usersExploreContainer}>
      <ul>
        {userInfo.map((users: IUser) => {
          return users.id !== user.uid ? (
            <div key={users.id} className={userExploreContainer}>
              <li>
                <Link to={`/${users.id}`}>
                  <img src={users.userPhoto} alt="Loading..." />
                  <h4>{users.userName}</h4>
                </Link>
                <p>{users.userEmail}</p>

                <button
                  onClick={() =>
                    handlerFollowers(users.id, users.userName, users.userPhoto)
                  }
                >
                  {followersFlag ? <p>FOLLOW</p> : <p>UNFOLLOW</p>}
                </button>
              </li>
            </div>
          ) : null;
        })}
      </ul>
    </div>
  );
};
