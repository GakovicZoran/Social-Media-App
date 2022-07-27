import { css } from "@emotion/css";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { About } from "./AboutUser/About";
import { updateProfile } from "firebase/auth";
import {
  ICurrentUser,
  IFile,
  IFollow,
  IUsers,
} from "../../Interfaces/Interfaces";
import { useParams } from "react-router-dom";
import { db, auth, storage } from "../../data/firebaseConfig";
import { Following } from "./Following";
import { Followers } from "./Followers";
import { getDocs } from "firebase/firestore";
import { ProfilePosts } from "./ProfilePosts";

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
  width: 1500px;
  margin-top: 50px;
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
  const { user, setFollowers, setFollowing, followers, following } =
    useContext(AuthContext);
  const [userDATA, setUserDATA] = useState<IUsers | null>(null);
  const { id } = useParams();

  useEffect(() => {
    const getFollowingsInfo = async () => {
      const followingsCollectionRef = db.collection(
        `users/${auth?.currentUser?.uid}/followings`
      );
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
  }, [user]);

  useEffect(() => {
    const getFollowersInfo = async () => {
      const followersCollectionRef = db.collection(
        `users/${auth.currentUser?.uid}/followers`
      );
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
  }, [user]);

  useEffect(() => {
    const fetchUserDATA = async () => {
      const userCollectionRef = db.collection("users");
      const dataUser = await getDocs(userCollectionRef);

      dataUser.docs.forEach((doc) => {
        const data = doc.data();
        if (doc.id === id) {
          setUserDATA({ ...data, id: doc.id } as IUsers);
        }
      });
    };
    fetchUserDATA();
  }, [id]);

  useEffect(() => {
    if (profileImage) return handleUploadProfileImage();
  }, [profileImage]);

  useEffect(() => {
    if (coverImage) return handleUploadCoverImage();
  }, [coverImage]);

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
      if (userDATA) {
        userDATA.userPhoto = photoURL;
      }
    }

    setLoading(false);
    alert("Uploaded file!");
  };

  // Nisam znao rijesiti ANY
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
      if (userDATA) {
        userDATA.userCoverPhoto = photoCoverURL;
      }
    }

    setLoading(false);
    alert("Uploaded Cover Image!");
  };

  // Nisam znao rijesiti ANY
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

  if (!userDATA) {
    return <div>loading...</div>;
  }

  return (
    <div>
      <div className={bannerBox}>
        <div className={bannerImgBox}>
          <img
            className={bannerImg}
            src={`${userDATA.userCoverPhoto}?${new Date().getTime()}`}
            alt="Banner Loading.."
          />
          {userDATA.id === user.uid ? (
            <div className={addCoverPhoto}>
              <input type="file" onChange={handleCoverImageChange} />
              <button
                disabled={loading || !coverImage}
                onClick={handleUploadCoverImage}
              >
                <FontAwesomeIcon icon={faCamera} />
              </button>
            </div>
          ) : null}
        </div>

        <div className={profileBox}>
          <div className={profileImgBox}>
            <img
              src={`${userDATA.userPhoto}?${new Date().getTime()}`}
              alt="Loading..."
              className={profileImg}
            />
            {userDATA.id === user.uid ? (
              <div className={addProfilePhoto}>
                <input type="file" onChange={handleImageChange} />
                <button
                  disabled={loading || !profileImage}
                  onClick={handleUploadProfileImage}
                >
                  <FontAwesomeIcon icon={faCamera} className={profileImgIcon} />
                </button>
              </div>
            ) : null}
          </div>
          <p className={profileUserName}>{userDATA.userName}</p>
        </div>
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
              <ProfilePosts userDATA={userDATA} />
            </div>
          ) : null}
          {followersRender ? <div>{<Followers />}</div> : null}
          {followingRender ? <div>{<Following />}</div> : null}
          {aboutRender ? <About /> : null}
        </div>
      </div>
    </div>
  );
};
