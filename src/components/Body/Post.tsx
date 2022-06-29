import { useEffect, useState } from "react";
import { auth, db } from "../data/firebaseConfig";
import { deleteDoc, doc, getDocs } from "firebase/firestore";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { css } from "@emotion/css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import { faHeart, faMessage } from "@fortawesome/free-regular-svg-icons";
import { EditComment } from "./Comments/EditComment";

const shareBox = css`
  overflow-y: scroll;
  overflow-x: hidden;
  width: 100%;
`;

const postContainer = css`
  border: 1px solid black;
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
  //   justify-content: flex-end;
  align-items: center;
`;

const userShareInfo = css`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const userProfilePostImg = css`
  width: 50px;
  border-radius: 100px;
`;

const userPostImg = css`
  width: 200px;
`;

const likeItCommentIt = css`
  display: flex;
  justify-content: space-evenly;
  border-top: 1px solid black;
  border-bottom: 1px solid black;
  margin-bottom: 20px;
  padding: 10px 0;
  & button {
    font-size: 20px;
  }
`;

const userCommentInput = css`
  width: 99%;
  height: 30px;
  font-size: 16px;
  border: none;
  &:focus {
    outline: none;
  }
`;

const commentsMessages = css`
  display: flex;
  align-items: center;
`;

export const Post = () => {
  const { user, userInfo, setUserInfo, storingPost, setStoringPost } =
    useContext(AuthContext);
  const [textPost, setTextPost] = useState<any>();
  const [matchID, setMatchID] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<any>();
  const [comment, setComment] = useState<string>("");

  const handlePostChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextPost(e.target.value);
  };

  const handleUpload = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    setTextPost("");
    // ovo jos ispitaj da li radi
    // setSelectedFile("");
  };

  useEffect(() => {
    const getPostInfo = async () => {
      const userCollectionRef = db.collection("users");
      const dataUser = await getDocs(userCollectionRef);

      await db.collection("users").doc(`${auth?.currentUser?.uid}`).update({
        userPost: textPost,
      });

      try {
        setUserInfo(
          dataUser.docs.map((doc: any) => {
            setMatchID(doc.id);

            return { ...doc.data(), id: doc.id };
          })
        );
      } catch (err) {
        //Kao i prije mozes napraviti state za success gore i error za ovdje
        console.error(err);
      }
    };

    getPostInfo();
  }, [textPost]);
  // dependency je bio [textPost]

  // Delete post from firebase //
  const deletePost = async (id: string) => {
    const postDoc = doc(db, "post", id);
    try {
      await deleteDoc(postDoc);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeletePost = async () => {
    deletePost(matchID);
  };

  const handleComment = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
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
            {/* POSTAVI USLOV AKO NESTO POSTOJI ONDA POKAZI OVAJ DIV AKO NE NISTA */}
            <img src={selectedFile} />
          </div>
        </form>
        <div className={imgPostBtnBox}>
          <FontAwesomeIcon icon={faImage} />
          <input
            type="file"
            value={selectedFile}
            onChange={(e: any) => {
              setSelectedFile(URL.createObjectURL(e.target.files[0]));
            }}
          ></input>

          <button onClick={handleUpload}>POST</button>
        </div>
      </div>

      <div className={userInfoContainer}>
        {userInfo.map((users: any) => {
          return (
            <div className={postContainer} key={users.id}>
              <div className={userShareInfo}>
                <div>
                  <img
                    className={userProfilePostImg}
                    src="http://getdrawings.com/img/facebook-profile-picture-silhouette-female-3.jpg"
                    alt="Loading..."
                  />
                </div>
                <div>
                  <p>{user.displayName}</p>
                  <p>datum</p>
                </div>
                <EditComment />
                <button onClick={handleDeletePost}>
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>

              <div>
                <span>{users.userPost}</span>
              </div>
              <img
                src={users.imagePost}
                alt="Loading.."
                className={userPostImg}
              />
              <div className={likeItCommentIt}>
                <div>
                  <button>
                    <FontAwesomeIcon icon={faHeart} />
                  </button>
                </div>
                <div>
                  <button>
                    <FontAwesomeIcon icon={faMessage} />
                  </button>
                </div>
              </div>
              <div className={commentsMessages}>
                <div>
                  <img
                    className={userProfilePostImg}
                    src="http://getdrawings.com/img/facebook-profile-picture-silhouette-female-3.jpg"
                    alt="Loading..."
                  />
                </div>
                <button>
                  <FontAwesomeIcon icon={faEdit} />
                </button>
                <button onClick={handleDeletePost}>
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
              <textarea
                value={comment}
                onChange={handleComment}
                className={userCommentInput}
                placeholder="Write a comment..."
              ></textarea>
              <button>POST COMMENT</button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
