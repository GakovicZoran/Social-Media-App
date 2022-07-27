import { useEffect, useState } from "react";
import { db } from "../../data/firebaseConfig";
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { css } from "@emotion/css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faTrash } from "@fortawesome/free-solid-svg-icons";
import { faMessage } from "@fortawesome/free-regular-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { EditPost } from "../Posts/EditPost";
import firebase from "firebase/compat/app";
import { Comments } from "../Posts/PostComments/Comments";
import { IPosts, IUsers } from "../../Interfaces/Interfaces";
import {
  arrayRemove,
  arrayUnion,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";

const postsContainer = css`
  position: relative;
  width: 100%;
`;

const createPostTitle = css`
  background-color: rgb(224, 224, 224);
  border: 1px solid black;

  & h3 {
    margin: 0;
    padding: 10px;
    text-align: center;
  }
`;

const createPost = css`
  width: 100%;
  position: relative;

  & form {
    border: 1px solid black;
    border-top: none;
  }

  & img {
    width: 250px;
  }
`;

const textArea = css`
  width: 99%;
  height: 230px;
  font-size: 20px;
  border: none;
  &:focus {
    outline: none;
  }
`;

const postImgUpload = css`
  display: inline-block;
  padding: 0 6px;
  cursor: pointer;

  & input[type="file"] {
    display: none;
  }
  font-size: 35px;
`;

const usersPosts = css`
  border: 4px solid black;
  margin-bottom: 100px;
`;

const usersPostsInfo = css`
  display: flex;
  align-items: center;
  gap: 15px;
  justify-content: space-between;
  margin: 0 0 0 10px;
  & p {
    font-weight: 500;
  }
`;

const userInfoContainer = css`
  margin-top: 50px;
  & ul {
    padding: 0;
    margin: 0;
  }

  & span {
    margin: 0;
  }
`;

const imgPostBtnBox = css`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: 10px;

  & button {
    border: none;
    background-color: #007bff;
    font-size: 17px;
    color: white;
    border-radius: 5px;
    padding: 5px 7px;
    cursor: pointer;
  }
`;

const userProfilePostImg = css`
  width: 50px;
  border-radius: 100px;
  object-fit: cover;
`;

const userPostImg = css`
  width: 400px;
`;

const userPostText = css`
  font-size: 20px;
  border-top: 1px solid black;
  font-weight: 500;
  padding-top: 10px;

  & p {
    padding-left: 10px;
  }
`;

const likeItCommentIt = css`
  display: flex;
  justify-content: space-evenly;
  border-top: 1px solid black;
  border-bottom: 1px solid black;
  margin-bottom: 20px;
  padding: 10px 0;
  align-items: center;
  height: 50px;
  & button {
    font-size: 30px;
    border: none;
    cursor: pointer;
    background-color: transparent;
  }
`;

const userPostInfoBox = css`
  display: flex;
  align-items: center;
  margin: 20px 0 20px 0;

  & img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 20px;
  }
`;

const editDeletePostBox = css`
  display: flex;

  & button {
    font-size: 17px;
    border: none;
    background-color: transparent;
    margin-right: 10px;
    cursor: pointer;
  }
`;

const trashPostIcon = css`
  font-size: 23px;
`;

const commentContainer = css`
  display: flex;
  align-items: center;

  & p {
    font-size: 20px;
    font-weight: 500;
  }
`;

const likeContainer = css`
  display: flex;
  align-items: center;

  & p {
    font-size: 20px;
    font-weight: 500;
    align-self: center;
  }
`;
const likeIconStyle = (likeIcon: boolean) => css`
  color: ${likeIcon ? "#000000" : "#b17171"};
  height: 25px;
  width: 25px;
`;

interface IUserDATA {
  userDATA: IUsers;
}

/////////////////////////////////////////////////////////////////////////////
// Ova komponenta je SKORO ista kao ona Posts komponenta, nisam znao kako da to uradim drugacije
////////////////////////////////////////////////////////////////////////////
export const ProfilePosts = ({ userDATA }: IUserDATA) => {
  const [photoPost, setPhotoPost] = useState<string>("");
  const [textPost, setTextPost] = useState<string>("");
  const [likeStyle, setLikeStyle] = useState<boolean>(false);
  const { user, setUsers, following, users, posts, setPosts, liked, setLiked } =
    useContext(AuthContext);

  const handlePostChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextPost(e.target.value);
  };

  const handleUpload = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    if (textPost === "") return;

    try {
      await db.collection("posts").add({
        userPost: textPost,
        userPostPhoto: photoPost,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        ownerID: user.uid,
        ownerName: user.displayName,
        ownerPhoto: user.photoURL,
      });
    } catch (err) {
      console.log(err);
    }

    setTextPost("");
    setPhotoPost("");
  };

  useEffect(() => {
    db.collection("posts")
      .orderBy("createdAt")
      .limit(50)
      .onSnapshot((snapshot) => {
        setPosts(
          snapshot.docs.map((doc) => {
            return { ...doc.data(), id: doc.id } as IPosts;
          })
        );
      });
  }, []);

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

  const deletePost = async (id: string) => {
    const postDoc = doc(db, `posts`, id);
    try {
      await deleteDoc(postDoc);
    } catch (err) {
      console.error(err);
    }
  };

  // Likes
  const handlerLikes = async (uid: string, postID: string) => {
    try {
      const likeRef = db.collection("posts").doc(postID);
      await likeRef.update({
        likeID: arrayUnion(user?.uid),
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handlerUnlikes = async (uid: string, postID: string) => {
    const currentPost = posts.filter((post: IPosts) => post.id === postID)[0];

    const currentLike = currentPost.likeID.find((id: string) => id === uid);

    try {
      const likeRef = doc(db, "posts", `${postID}`);

      await updateDoc(likeRef, {
        likeID: arrayRemove(currentLike),
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={postsContainer}>
      {userDATA.id === user?.uid ? (
        <div className={createPost}>
          <div className={createPostTitle}>
            <h3>Create Post</h3>
          </div>

          <form>
            <textarea
              onChange={handlePostChange}
              placeholder="Write something here"
              value={textPost}
              className={textArea}
            ></textarea>
            <div>
              <img src={photoPost} />
            </div>
          </form>
          <div className={imgPostBtnBox}>
            <label className={postImgUpload}>
              <FontAwesomeIcon icon={faImage} />

              <input
                type="file"
                onChange={(e) => {
                  if (e.target.files) {
                    setPhotoPost(URL.createObjectURL(e.target.files[0]));
                  }
                }}
              ></input>
            </label>

            <button onClick={handleUpload}>POST</button>
          </div>
        </div>
      ) : null}

      <div className={userInfoContainer}>
        {posts.map(
          ({
            userPost,
            userPostPhoto,
            createdAt,
            id,
            ownerID,
            ownerName,
            ownerPhoto,
            comments,
            likeID,
          }: IPosts) => {
            return userDATA.id === ownerID ? (
              <div className={usersPosts} key={id}>
                <div className={usersPostsInfo}>
                  <div className={userPostInfoBox}>
                    <div>
                      <img
                        className={userProfilePostImg}
                        src={ownerPhoto}
                        alt="Loading..."
                      />
                    </div>

                    <div>
                      <p>{ownerName}</p>
                      {
                        <p>
                          {new Date(createdAt?.seconds * 1000).toLocaleString(
                            [],
                            {
                              dateStyle: "medium",
                              timeStyle: "short",
                            }
                          )}
                        </p>
                      }
                    </div>
                  </div>
                  {user.uid === ownerID ? (
                    <div className={editDeletePostBox}>
                      <div>
                        <EditPost id={id} />
                      </div>
                      <div>
                        <button onClick={() => deletePost(id)}>
                          <FontAwesomeIcon
                            icon={faTrash}
                            className={trashPostIcon}
                          />
                        </button>
                      </div>
                    </div>
                  ) : null}
                </div>

                <div>
                  <p className={userPostText}>{userPost}</p>
                </div>

                {userPostPhoto ? (
                  <img
                    src={userPostPhoto}
                    alt="Loading.."
                    className={userPostImg}
                  />
                ) : null}
                <div className={likeItCommentIt}>
                  <div className={likeContainer}>
                    <div>
                      <button
                        onClick={() => {
                          return (
                            handlerLikes(user.uid, id),
                            handlerUnlikes(user.uid, id)
                          );
                        }}
                      >
                        <FontAwesomeIcon
                          icon={faHeart}
                          className={likeIconStyle(likeStyle)}
                        />
                      </button>
                    </div>
                    <div>
                      {likeID?.length > 0 ? <p>{likeID?.length}</p> : null}
                    </div>
                  </div>
                  <div className={commentContainer}>
                    <div>
                      <button>
                        <FontAwesomeIcon icon={faMessage} />
                      </button>
                    </div>
                    <div>
                      {comments?.length > 0 ? <p>{comments?.length}</p> : null}
                    </div>
                  </div>
                </div>
                <Comments postID={id} />
              </div>
            ) : null;
          }
        )}
      </div>
    </div>
  );
};
