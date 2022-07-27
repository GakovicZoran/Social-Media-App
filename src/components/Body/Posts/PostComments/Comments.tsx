import { css } from "@emotion/css";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { useContext, useRef } from "react";
import { db } from "../../../data/firebaseConfig";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../../../Context/AuthContext";
import { EditComment } from "./EditComment";
import { IComments, IPosts } from "../../../Interfaces/Interfaces";

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
  gap: 15px;
  margin-bottom: 20px;
  align-items: center;
  & img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;
    font-weight: 20px;
  }

  & strong {
    margin-right: 10px;
  }
`;
interface ICommentsProp {
  postID: string;
}

export const Comments = ({ postID }: ICommentsProp) => {
  const { user, textComment, setTextComment, posts } = useContext(AuthContext);
  const commentRef = useRef(null);

  const handlerCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextComment(e.target.value);
  };

  // Nisam znao rijesiti any, problem je u e.target.reset //
  const onSubmitComment = async (e: any) => {
    e.preventDefault();
    if (textComment === "") return;

    try {
      const postRef = db.collection("posts").doc(postID);
      await postRef.update({
        comments: arrayUnion({
          userComment: textComment,
          userCommentName: user.displayName,
          postOwnerID: postID,
          ownerPhoto: user.photoURL,
          ownerID: user.uid,
        }),
      });
    } catch (err) {
      console.log(err);
    }
    e.target.reset();
  };

  // Delete comments
  const deleteComment = async (index: number) => {
    const currentPost = posts.filter((post: IPosts) => post.id === postID)[0];
    const currentComment = currentPost.comments[index];

    try {
      const commentRef = doc(db, "posts", `${postID}`);

      await updateDoc(commentRef, {
        comments: arrayRemove(currentComment),
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div>
        {posts.map((postComments: IPosts) =>
          postComments?.comments
            ?.filter(({ postOwnerID }: IComments) => postOwnerID === postID)
            .map(
              (
                {
                  userComment,
                  userCommentName,
                  ownerPhoto,
                  ownerID,
                }: IComments,
                index: number
              ) => {
                return (
                  <div key={Math.random() * 1000}>
                    <div className={commentsMessages}>
                      <div className={userInfoCommentPost}>
                        <img
                          className={userProfilePostImg}
                          src={ownerPhoto}
                          alt="Loading..."
                        />
                        <div>
                          <strong> {userCommentName}:</strong>
                          <span>{userComment}</span>
                        </div>
                      </div>
                      <div className={editDeleteCommentBox}>
                        {user.uid === ownerID ? (
                          <div>
                            {<EditComment index={index} postID={postID} />}
                          </div>
                        ) : null}
                        {user.uid === ownerID ? (
                          <div>
                            <button onClick={() => deleteComment(index)}>
                              <FontAwesomeIcon icon={faTrash} />
                            </button>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                );
              }
            )
        )}
      </div>
      <form onSubmit={onSubmitComment}>
        <textarea
          ref={commentRef}
          onChange={handlerCommentChange}
          className={userCommentInput}
          placeholder="Write a comment..."
        ></textarea>

        <button className={postCommentBtn}>POST COMMENT</button>
      </form>
    </div>
  );
};
