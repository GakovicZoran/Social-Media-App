import { css } from "@emotion/css";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { Post } from "../Post";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { auth, storage } from "../../data/firebaseConfig";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { About } from "./About";
import { updateProfile } from "firebase/auth";
import { IUser } from "../../Interfaces/Interfaces";
import { useParams } from "react-router-dom";
import { setDoc, doc, addDoc } from "firebase/firestore";
import { db } from "../../data/firebaseConfig";

const bannerBox = css`
  position: relative;
  }
`;

const bannerImg = css`
  width: 100%;
  margin-top: -15%;
`;

const bannerImgBox = css`
  height: 30vh;
  overflow: hidden;
`;

const profileBox = css`
  display: flex;
  position: absolute;
  left: 59px;
  bottom: 0;
  right: 0;
  height: 180px;

  & p {
    align-self: flex-end;
  }
`;

const profileImgBox = css`
  width: 180px;
  height: 180px;
  border-radius: 3px;
  margin-top: 28px;
  overflow: hidden;
  box-shadow: 0 0 0 5px #fff;
`;

const profileImg = css`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const userInfoBox = css`
  display: flex;
  justify-content: center;
  height: 95vh;
`;

const infoBox = css`
  height: 95vh;
`;

const post = css`
  overflow-y: scroll;
  overflow-x: hidden;
  height: 95vh;
`;

const addProfilePhoto = css`
  position: absolute;
  left: 0px;
  top: 178px;
  width: 180px;
  height: 30px;
  background-color: lightgray;
  opacity: 0.7;
  display: flex;
  align-items: center;

  & button {
    background-color: transparent;
    padding-left: 42%;
    border: none;
    font-size: 20px;
    cursor: pointer;
  }

  // input[type="file"] {
  //   // opacity: 0;
  //   position: absolute;
  //   top: 0;
  //   left: 0;
  //   right: 0;
  //   bottom: 0;
  //   cursor: pointer;
  // }
`;

export const Profile = () => {
  const { user, userInfo } = useContext(AuthContext);
  const [postRender, setPostRender] = useState<boolean>(true);
  const [followersRender, setFollowersRender] = useState<boolean>(false);
  const [followingRender, setFollowingRender] = useState<boolean>(false);
  const [aboutRender, setAboutRender] = useState<boolean>(false);
  const [image, setImage] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { id } = useParams();

  const upload = async (file: any, currentUser: any, setLoading: any) => {
    const imageRef = ref(storage, currentUser.uid + ".png");
    setLoading(true);
    await uploadBytes(imageRef, file);
    const photoURL = await getDownloadURL(imageRef);

    if (auth.currentUser) {
      await db.collection("users").doc(`${auth.currentUser.uid}`).update({
        userPhoto: photoURL,
      });
      updateProfile(auth.currentUser, {
        photoURL,
      });
    }

    setLoading(false);
    alert("Uploaded file!");
  };

  const handleImageChange = (e: any) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUploadProfileImage = () => {
    upload(image, auth.currentUser, setLoading);
  };

  return (
    <div>
      <div className={bannerBox}>
        <div className={bannerImgBox}>
          <img
            className={bannerImg}
            src="https://image-assets.eu-2.volcanic.cloud/api/v1/assets/images/e6f2674da83a9d0ae9667986941853b5?t=1643249086&webp_fallback=png"
            alt="Banner Loading.."
          />
        </div>
        {userInfo
          .filter((users: IUser) => users.id === id)
          .map((eachUser: IUser) => {
            return (
              <div key={eachUser.id} className={profileBox}>
                <div className={profileImgBox}>
                  <img
                    key={Math.random() * 1000}
                    src={eachUser.userPhoto}
                    alt="Profile Picture Loading..."
                    className={profileImg}
                  />
                  <div className={addProfilePhoto}>
                    <input type="file" onChange={handleImageChange} />
                    <button
                      disabled={loading || !image}
                      onClick={handleUploadProfileImage}
                    >
                      <FontAwesomeIcon icon={faCamera} />
                    </button>
                  </div>
                </div>
                <p>{eachUser.userName}</p>
              </div>
            );
          })}
      </div>

      <div className={userInfoBox}>
        <div className={infoBox}>
          <button
            onClick={() => {
              return (
                setPostRender(true),
                setFollowersRender(false),
                setFollowingRender(false),
                setAboutRender(false)
              );
            }}
          >
            Posts
          </button>

          <button
            onClick={() => {
              return (
                setFollowersRender(true),
                setPostRender(false),
                setFollowingRender(false),
                setAboutRender(false)
              );
            }}
          >
            Followers
          </button>
          <button
            onClick={() => {
              return (
                setFollowingRender(true),
                setPostRender(false),
                setFollowersRender(false),
                setAboutRender(false)
              );
            }}
          >
            Following
          </button>
          <button
            onClick={() => {
              return (
                setAboutRender(true),
                setFollowersRender(false),
                setPostRender(false),
                setFollowingRender(false)
              );
            }}
          >
            About
          </button>
          {postRender ? (
            <div className={post}>
              <Post />
            </div>
          ) : null}
          {followersRender ? <div>Followers</div> : null}
          {followingRender ? <div>Following</div> : null}
          {aboutRender ? <About /> : null}
        </div>
      </div>
    </div>
  );
};
