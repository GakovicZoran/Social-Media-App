import { useEffect, useState } from "react";
import { auth, db } from "../../data/firebaseConfig";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  addDoc,
} from "firebase/firestore";
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { css } from "@emotion/css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faTrash } from "@fortawesome/free-solid-svg-icons";
import { faHeart, faMessage } from "@fortawesome/free-regular-svg-icons";
import { EditPost } from "./EditPost";
import firebase from "firebase/compat/app";
import { Comments } from "./PostComments/Comments";
import { IPost } from "../../Interfaces/Interfaces";

const shareBox = css`
  position: relative;
  overflow-y: scroll;
  overflow-x: hidden;
  width: 100%;
`;

const postContainer = css`
  border: 3px solid black;
  margin-bottom: 100px;
`;

const createPostContainer = css`
  width: 100%;
  position: relative;

  & form {
    border: 1px solid black;
    border-top: none;
  }

  & img {
    width: 200px;
  }
`;

const createPostTitle = css`
  background-color: rgb(224, 224, 224);
  border: 1px solid black;
  border-top: none;

  & h3 {
    margin: 0;
    padding: 10px;
  }
`;

const userThoughtsInput = css`
  width: 99%;
  height: 120px;
  font-size: 16px;
  border: none;
  &:focus {
    outline: none;
  }
`;

const customFileUpload = css`
  display: inline-block;
  padding: 0 6px;
  cursor: pointer;

  & input[type="file"] {
    display: none;
  }

  font-size: 35px;
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

const userShareInfo = css`
  display: flex;
  align-items: center;
  gap: 20px;
  justify-content: space-between;
  & p {
    font-weight: 500;
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
  margin: 0 0 20px 0;
`;

const likeItCommentIt = css`
  display: flex;
  justify-content: space-evenly;
  border-top: 1px solid black;
  border-bottom: 1px solid black;
  margin-bottom: 20px;
  padding: 10px 0;
  align-items: center;
  & button {
    font-size: 20px;
  }
`;

const userPostInfoBox = css`
  display: flex;
  align-items: center;

  & img {
    margin-right: 10px;
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

const commentIconBox = css`
  display: flex;
  align-items: center;

  & a {
    text-decoration: none;
    font-size: 20px;
  }
`;
export const Post = () => {
  const {
    user,
    setUserInfo,
    storingPost,
    setStoringPost,
    textPost,
    setTextPost,
    postComment,
  } = useContext(AuthContext);
  const [photoPost, setPhotoPost] = useState<string>("");

  const handlePostChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextPost(e.target.value);
  };

  const handleUpload = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    if (textPost === "") return;

    const docRef = doc(db, "users", `${auth?.currentUser?.uid}`);
    const colRef = collection(docRef, "post");

    try {
      addDoc(colRef, {
        userPost: textPost,
        userPostPhoto: photoPost,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      });
    } catch (err) {
      console.log(err);
    }

    setTextPost("");
    setPhotoPost("");
  };

  useEffect(() => {
    db.collection(`/users/${auth?.currentUser?.uid}/post`)
      .orderBy("createdAt")
      .limit(50)
      .onSnapshot((snapshot) => {
        setStoringPost(
          snapshot.docs.map((doc: any) => {
            return { ...doc.data(), id: doc.id };
          })
        );
      });
  }, []);

  useEffect(() => {
    const getPostInfo = async () => {
      const userCollectionRef = db.collection("users");
      const dataUser = await getDocs(userCollectionRef);

      try {
        setUserInfo(
          dataUser.docs.map((doc: any) => {
            return { ...doc.data(), id: doc.id };
          })
        );
      } catch (err) {
        console.error(err);
      }
    };

    getPostInfo();
  }, []);

  // Delete post from firebase //
  const deletePost = async (id: string) => {
    const postDoc = doc(db, `/users/${auth?.currentUser?.uid}/post`, id);
    try {
      await deleteDoc(postDoc);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={shareBox}>
      <div className={createPostContainer}>
        <div className={createPostTitle}>
          <h3>Create Post</h3>
        </div>
        <form>
          <textarea
            onChange={handlePostChange}
            placeholder="Write something here"
            value={textPost}
            className={userThoughtsInput}
          ></textarea>
          <div>
            <img src={photoPost} />
          </div>
        </form>
        <div className={imgPostBtnBox}>
          <label className={customFileUpload}>
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

      <div className={userInfoContainer}>
        {storingPost.map((users: IPost) => {
          return (
            <div className={postContainer} key={users.id}>
              <div className={userShareInfo}>
                <div className={userPostInfoBox}>
                  <div>
                    <img
                      className={userProfilePostImg}
                      src={user?.photoURL as unknown as string}
                      alt="Loading..."
                    />
                  </div>

                  <div>
                    <p>{user.displayName}</p>
                    {
                      <p>
                        {new Date(
                          users?.createdAt?.seconds * 1000
                        ).toLocaleDateString("en-US")}
                      </p>
                    }
                  </div>
                </div>
                <div className={editDeletePostBox}>
                  <div>
                    <EditPost id={users.id} />
                  </div>
                  <div>
                    <button onClick={() => deletePost(users.id)}>
                      <FontAwesomeIcon
                        icon={faTrash}
                        className={trashPostIcon}
                      />
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <p className={userPostText}>{users.userPost}</p>
              </div>

              {users.userPostPhoto ? (
                <img
                  src={users.userPostPhoto}
                  alt="Loading.."
                  className={userPostImg}
                />
              ) : null}
              <div className={likeItCommentIt}>
                <div>
                  <button>
                    <FontAwesomeIcon icon={faHeart} />
                  </button>
                </div>
                <div className={commentIconBox}>
                  <div>
                    <button>
                      <FontAwesomeIcon icon={faMessage} />
                    </button>
                  </div>

                  <div>
                    {postComment.length > 0 ? (
                      <a href="#">
                        <p>{postComment.length}</p>
                      </a>
                    ) : null}
                  </div>
                </div>
              </div>
              <Comments />
            </div>
          );
        })}
      </div>
    </div>
  );
};
