import { css } from "@emotion/css";
import { getDocs } from "firebase/firestore";
import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import { db } from "../../data/firebaseConfig";
import { IFollow } from "../../Interfaces/Interfaces";

const followingsContainer = css`
  text-align: center;
  width: 2000px;
  display: flex;
  & li {
    list-style: none;
  }
  & img {
    width: 200px;
    height: 200px;
    object-fit: cover;
  }

  & h5 {
    margin: 50px auto;
    font-size: 30px;
    color: #6c757d;
  }
`;

export const Following = () => {
  const { following, setFollowing } = useContext(AuthContext);
  const { id } = useParams();

  useEffect(() => {
    const getFollowingsInfo = async () => {
      const followingsCollectionRef = db.collection(`users/${id}/followings`);
      const dataFollowings = await getDocs(followingsCollectionRef);
      try {
        setFollowing(
          dataFollowings.docs.map((doc) => {
            return { ...doc.data(), id: doc.id } as IFollow;
          })
        );
      } catch (err) {
        console.error(err);
      }
    };
    getFollowingsInfo();
  }, [id]);
  return (
    <div className={followingsContainer}>
      {following.length < 1 ? <h5>User Doesn't Follow Anyone!</h5> : null}
      {following.map(({ userName, uid, userPhoto }: IFollow) => {
        return (
          <div key={uid}>
            <ul>
              <img src={userPhoto} alt="Loading.." />
              <li>{userName}</li>
            </ul>
          </div>
        );
      })}
    </div>
  );
};
