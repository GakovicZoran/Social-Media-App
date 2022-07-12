import { css } from "@emotion/css";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { Post } from "../Posts/Post";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { About } from "./AboutUser/About";
import { updateProfile } from "firebase/auth";
import { ICurrentUser, IFile, IUser } from "../../Interfaces/Interfaces";
import { useParams } from "react-router-dom";
import { db, auth, storage } from "../../data/firebaseConfig";
import { Followers } from "./Followers";

const bannerBox = css`
  position: relative;
`;

const bannerImg = css`
  width: 100%;
  margin-top: -15%;
`;

const bannerImgBox = css`
  height: 50vh;
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

const profileUserName = css`
  font-size: 20px;
  color: white;
  margin-left: 20px;
`;

const userInfoBox = css`
  display: flex;
  justify-content: center;
  height: 95vh;
`;

const infoBox = css`
  height: 95vh;
`;

const profilePost = css`
  overflow-y: scroll;
  overflow-x: hidden;
  height: 95vh;
  width: 1000px;
`;

const addProfilePhoto = css`
  position: absolute;
  top: 178px;
  width: 180px;
  height: 30px;
  background-color: lightgray;
  opacity: 0.7;
  display: flex;
  align-items: center;

  & button {
    background-color: transparent;
    border: none;
    font-size: 20px;
    cursor: pointer;
  }

  input[type="file"] {
    opacity: 0;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    cursor: pointer;
  }
`;

const profileImgIcon = css`
  margin-left: 73px;
`;
const addCoverPhoto = css`
  position: absolute;
  right: 30px;
  top: 50px;
  width: 180px;
  height: 30px;
  background-color: lightgray;
  opacity: 0.7;
  display: flex;
  align-items: center;

  & button {
    background-color: transparent;
    padding: 0 45%;
    border: none;
    font-size: 20px;
    cursor: pointer;
  }
`;

const profileNav = css`
  text-align: center;

  & button {
    border: none;
    padding: 20px;
    font-size: 20px;
    border: 1px dotted black;
    cursor: pointer;
  }

  & button:hover {
    color: #007bff;
  }
`;

export const Profile = () => {
  const [postRender, setPostRender] = useState<boolean>(true);
  const [followersRender, setFollowersRender] = useState<boolean>(false);
  const [followingRender, setFollowingRender] = useState<boolean>(false);
  const [aboutRender, setAboutRender] = useState<boolean>(false);
  const [profileImage, setProfileImage] = useState<IFile | null>(null);
  const [coverImage, setCoverImage] = useState<IFile | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { user, userInfo } = useContext(AuthContext);
  const { id } = useParams();

  // Profile Image //
  const uploadProfileImg = async (
    file: IFile,
    currentUser: ICurrentUser,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    setLoading(true);
    const imageRef = ref(storage, currentUser?.uid + ".png");
    await uploadBytes(
      imageRef,
      file as unknown as Blob | Uint8Array | ArrayBuffer
    );
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
      setProfileImage(e.target.files[0]);
    }
  };

  const handleUploadProfileImage = () => {
    uploadProfileImg(
      profileImage as IFile,
      auth.currentUser as unknown as ICurrentUser,
      setLoading
    );
    setProfileImage(null);
  };

  useEffect(() => {
    if (profileImage) return handleUploadProfileImage();
  }, [profileImage]);

  // Cover Image //
  const uploadCoverImg = async (
    file: IFile,
    currentUser: ICurrentUser,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    const coverImageRef = ref(
      storage,
      `coverImage/${currentUser?.uid}` + ".png"
    );
    setLoading(true);
    await uploadBytes(
      coverImageRef,
      file as unknown as Blob | Uint8Array | ArrayBuffer
    );
    const photoCoverURL = await getDownloadURL(coverImageRef);

    if (auth.currentUser) {
      await db.collection("users").doc(`${auth.currentUser.uid}`).update({
        userCoverPhoto: photoCoverURL,
      });
    }

    setLoading(false);
    alert("Uploaded Cover Image!");
  };

  const handleCoverImageChange = (e: any) => {
    if (e.target.files[0]) {
      setCoverImage(e.target.files[0]);
    }
  };

  const handleUploadCoverImage = () => {
    uploadCoverImg(
      coverImage as IFile,
      auth.currentUser as unknown as ICurrentUser,
      setLoading
    );
    setCoverImage(null);
  };

  return (
    <div>
      <div className={bannerBox}>
        {userInfo
          .filter((users: IUser) => users.id === id)
          .map((eachUser: IUser) => {
            return (
              <div key={eachUser.id} className={bannerImgBox}>
                <img
                  className={bannerImg}
                  src={`${eachUser.userCoverPhoto}?${new Date().getTime()}`}
                  alt="Banner Loading.."
                />
                {eachUser.id === user.uid ? (
                  <div className={addCoverPhoto}>
                    <input type="file" onChange={handleCoverImageChange} />
                    {coverImage && (
                      <button
                        disabled={loading || !coverImage}
                        onClick={handleUploadCoverImage}
                      >
                        <FontAwesomeIcon icon={faCamera} />
                      </button>
                    )}
                  </div>
                ) : null}
              </div>
            );
          })}

        {userInfo
          .filter((users: IUser) => users.id === id)
          .map((eachUser: IUser) => {
            return (
              <div key={eachUser.id} className={profileBox}>
                <div className={profileImgBox}>
                  <img
                    src={`${eachUser.userPhoto}?${new Date().getTime()}`}
                    alt="Loading..."
                    className={profileImg}
                  />
                  {eachUser.id === user.uid ? (
                    <div className={addProfilePhoto}>
                      <input type="file" onChange={handleImageChange} />
                      <button
                        disabled={loading || !profileImage}
                        onClick={handleUploadProfileImage}
                      >
                        <FontAwesomeIcon
                          icon={faCamera}
                          className={profileImgIcon}
                        />
                      </button>
                    </div>
                  ) : null}
                </div>
                <p className={profileUserName}>{eachUser.userName}</p>
              </div>
            );
          })}
      </div>

      <div className={userInfoBox}>
        <div className={infoBox}>
          <div className={profileNav}>
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
          </div>
          {postRender ? (
            <div className={profilePost}>
              <Post />
            </div>
          ) : null}
          {followersRender ? <div>{<Followers />}</div> : null}
          {followingRender ? <div>Following</div> : null}
          {aboutRender ? <About /> : null}
        </div>
      </div>
    </div>
  );
};
