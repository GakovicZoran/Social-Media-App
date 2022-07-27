import { css } from "@emotion/css";
import { getDocs } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import { db } from "../../data/firebaseConfig";
import { IFollow } from "../../Interfaces/Interfaces";

const followersContainer = css`
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

export const Followers = () => {
  const { followers, setFollowers } = useContext<any>(AuthContext);
  const { id } = useParams();

  useEffect(() => {
    const getFollowersInfo = async () => {
      const followersCollectionRef = db.collection(`users/${id}/followers`);
      const dataFollowers = await getDocs(followersCollectionRef);
      try {
        setFollowers(
          dataFollowers.docs.map((doc) => {
            return { ...doc.data(), id: doc.id } as IFollow;
          })
        );
      } catch (err) {
        console.error(err);
      }
    };
    getFollowersInfo();
  }, [id]);

  return (
    <div className={followersContainer}>
      {followers.length < 1 ? <h5>User Doesn't Have a Followers!</h5> : null}
      {followers.map(({ userName, uid, userPhoto }: IFollow) => {
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
