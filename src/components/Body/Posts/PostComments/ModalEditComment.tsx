import { css } from "@emotion/css";
import { useState } from "react";
import { auth, db } from "../../../data/firebaseConfig";

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
  id: string;
}

export const ModalEditComment = ({ closeModal, id }: IModalProp) => {
  const [updatedComment, setUpdatedComment] = useState<string>("");

  const handleCommentEdit = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUpdatedComment(e.target.value);
  };

  const handleEdit = async (id: string) => {
    await db
      .collection(`/users/${auth?.currentUser?.uid}/comments`)
      .doc(id)
      .update({
        userComment: updatedComment,
      });
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
          onChange={handleCommentEdit}
          value={updatedComment}
          className={editCommentInput}
          required
        ></textarea>
      </div>
      <div className={saveCommentChange}>
        <button onClick={() => closeModal(false)}>Close</button>
        <button onClick={() => handleEdit(id)}>Save Changes</button>
      </div>
    </div>
  );
};
