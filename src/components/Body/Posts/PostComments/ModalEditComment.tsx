import { css } from "@emotion/css";
import { arrayUnion, doc, FieldValue, updateDoc } from "firebase/firestore";
import { useContext, useState } from "react";
import { AuthContext } from "../../../Context/AuthContext";
import { auth, db } from "../../../data/firebaseConfig";
import { IPosts } from "../../../Interfaces/Interfaces";

const modalCommentContainer = css`
  position: absolute;
  width: 30%;
  height: 35%;
  left: 39%;
  border: 1px solid black;
  background-color: white;
  padding-bottom: 80px;
  & h4 {
    margin: 0;
    padding: 20px;
    font-size: 20px;
    border-bottom: 1px dotted black;
  }
`;

const btnCloseModal = css`
  position: absolute;
  top: 0;
  right: 0;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 30px;
  gap: 50px;
`;

const editCommentInput = css`
  width: 100%;
  height: 100px;
`;

const editText = css`
  padding: 20px;
  border-bottom: 1px dotted black;
`;

const saveCommentChange = css`
  display: flex;
  justify-content: flex-end;
`;

interface IModalProp {
  closeModal: (active: boolean) => void;
  index: number;
  postID: string;
}

export const ModalEditComment = ({ closeModal, index, postID }: IModalProp) => {
  const [updatedComment, setUpdatedComment] = useState<string>("");
  const { posts } = useContext(AuthContext);

  const handlerCommentEdit = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUpdatedComment(e.target.value);
  };

  const handlerEdit = async (index: number) => {
    const currentPost = posts.filter((post: IPosts) => post.id === postID)[0];
    const currentComment = currentPost.comments[index];
    const userComment = Object.values(currentComment)[0];
    const commentRef = doc(db, "posts", `${postID}`);

    try {
      await updateDoc(commentRef, {
        comments: [
          {
            userComment: updatedComment,
          },
        ],

        // Adding new arr outside comment arr
        // comments: arrayUnion(currentComment),
      });
    } catch (err) {
      console.log(err);
    }
    closeModal(false);
  };

  return (
    <div className={modalCommentContainer}>
      <h4>Edit Comment</h4>
      <button className={btnCloseModal} onClick={() => closeModal(false)}>
        x
      </button>
      <div className={editText}>
        <p>New Text:</p>
        <textarea
          onChange={handlerCommentEdit}
          value={updatedComment}
          className={editCommentInput}
          required
        ></textarea>
      </div>
      <div className={saveCommentChange}>
        <button onClick={() => closeModal(false)}>Close</button>
        <button onClick={() => handlerEdit(index)}>Save Changes</button>
      </div>
    </div>
  );
};
