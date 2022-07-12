import { css } from "@emotion/css";
import { addDoc, collection, deleteDoc, doc } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { auth, db } from "../../../data/firebaseConfig";
import firebase from "firebase/compat/app";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../../../Context/AuthContext";
import { EditComment } from "./EditComment";
import { IComments } from "../../../Interfaces/Interfaces";

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
  justify-content: space-between;

  & span {
    font-size: 18px;
    text-decoration: underline;
  }
`;

const userProfilePostImg = css`
  width: 50px;
  border-radius: 100px;
  object-fit: cover;
`;

const editDeleteCommentBox = css`
  display: flex;

  & button {
    font-size: 17px;
    border: none;
    background-color: transparent;
    margin-right: 10px;
    cursor: pointer;
  }
`;

const postCommentBtn = css`
  border: none;
  background-color: #007bff;
  font-size: 15px;
  color: white;
  border-radius: 5px;
  padding: 5px 7px;
  cursor: pointer;
  margin-bottom: 10px;
`;

const userInfoCommentPost = css`
  display: flex;
  gap: 20px;
  margin-bottom: 20px;

  & img {
    font-weight: 20px;
  }
`;
export const Comments = () => {
  const [textComment, setTextComment] = useState<string>("");
  const { user, postComment, setPostComment } = useContext(AuthContext);

  const handleCommentUpload = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    if (textComment === "") return;

    try {
      const docRef = doc(db, "users", `${auth?.currentUser?.uid}`);
      const colRef = collection(docRef, "comments");

      addDoc(colRef, {
        userComment: textComment,
        userCommentName: user.displayName,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      });
    } catch (err) {
      console.log(err);
    }
    setTextComment("");
  };

  useEffect(() => {
    db.collection(`/users/${auth?.currentUser?.uid}/comments`)
      .orderBy("createdAt")
      .limit(50)
      .onSnapshot((snapshot) => {
        setPostComment(
          snapshot.docs.map((doc: any) => {
            return { ...doc.data(), id: doc.id as any };
          })
        );
      });
  }, []);

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextComment(e.target.value);
  };

  // Delete comments
  const deleteComment = async (id: string) => {
    const commentDoc = doc(db, `/users/${auth?.currentUser?.uid}/comments`, id);
    try {
      await deleteDoc(commentDoc);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <div>
        {postComment
          .filter((matchID: IComments) => matchID.id !== matchID.postID)
          .map(({ userComment, id, createdAt }: IComments) => {
            return (
              <div key={id}>
                <div className={commentsMessages}>
                  <div className={userInfoCommentPost}>
                    <img
                      className={userProfilePostImg}
                      src={user.photoURL as any}
                      alt="Loading..."
                    />
                    <p>
                      {user.displayName}: <span>{userComment}</span>
                    </p>
                  </div>
                  <div className={editDeleteCommentBox}>
                    <div>
                      <EditComment id={id} />
                    </div>
                    <div>
                      <button onClick={() => deleteComment(id)}>
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
      <textarea
        value={textComment}
        onChange={handleCommentChange}
        className={userCommentInput}
        placeholder="Write a comment..."
      ></textarea>
      <button onClick={handleCommentUpload} className={postCommentBtn}>
        POST COMMENT
      </button>
    </div>
  );
};
