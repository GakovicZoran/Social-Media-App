import { css } from "@emotion/css";
import { deleteDoc, doc, setDoc } from "firebase/firestore";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import { auth, db } from "../data/firebaseConfig";

const cardContainer = css`
  width: 300px;
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-color: #fff;
  background-clip: border-box;
  border: 1px solid black;
  border-radius: 0.25rem;

  & h4 {
    color: black;
    font-size: 20px;
  }

  & button {
    border: none;
    background-color: #007bff;
    font-size: 15px;
    color: white;
    border-radius: 5px;
    padding: 1px 10px;
    cursor: pointer;
    margin: 20px 0 30px 0;
  }
`;

interface IUsersProp {
  id: string;
  userPhoto: string;
  userName: string;
  userEmail: string;
}
export const Users = ({ id, userPhoto, userName, userEmail }: IUsersProp) => {
  const [toggleThisBtn, setToggleThisBtn] = useState(false);
  const { user } = useContext(AuthContext);

  const handlerFollowings = async (
    uid: string,
    name: string,
    photo: string
  ) => {
    try {
      await setDoc(doc(db, `users/${auth.currentUser?.uid}/followings`, uid), {
        userName: name,
        uid: uid,
        userPhoto: photo,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handlerFollowers = async (id: string) => {
    try {
      await setDoc(doc(db, `users/${id}/followers`, user.uid), {
        userName: user.displayName,
        uid: user.uid,
        userPhoto: user.photoURL,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const deleteFollowings = async (id: string) => {
    const followingsDoc = doc(
      db,
      `users/${auth.currentUser?.uid}/followings`,
      id
    );
    try {
      await deleteDoc(followingsDoc);
    } catch (err) {
      console.error(err);
    }

    const followersDoc = doc(
      db,
      `users/${id}/followers`,
      `${auth?.currentUser?.uid}`
    );
    try {
      await deleteDoc(followersDoc);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div>
      <div className={cardContainer}>
        <li>
          <Link to={`/${id}`}>
            <div>
              <img src={userPhoto} alt="Loading..." />
            </div>
            <h4>{userName}</h4>
          </Link>
          <p>{userEmail}</p>

          {!toggleThisBtn ? (
            <button
              onClick={() => {
                setToggleThisBtn((prev) => !prev);
                handlerFollowings(id, userName, userPhoto);
                handlerFollowers(id);
              }}
            >
              <p>FOLLOW</p>
            </button>
          ) : (
            <button
              onClick={() => {
                setToggleThisBtn((prev) => !prev);
                deleteFollowings(id);
              }}
            >
              <p>UNFOLLOW</p>
            </button>
          )}
        </li>
      </div>
    </div>
  );
};
