import { css } from "@emotion/css";
import { useState } from "react";
import { db } from "../../data/firebaseConfig";

const modalPostContainer = css`
  position: absolute;
  width: 30%;
  height: 20%;
  left: 39%;
  top: 55%;
  border: 1px solid black;
  background-color: white;
  padding-bottom: 100px;
  & h4 {
    margin: 0;
    padding: 20px;
    font-size: 20px;
    border-bottom: 1px dotted black;
  }
`;

const btnCloseModal = css`
  position: absolute;
  top: 5px;
  right: 0;
  border: none;
  cursor: pointer;
  gap: 50px;
  background-color: #ac2525 !important;
  border-radius: 5px;
  color: white;
  padding: 5px 10px;
`;

const editPostInput = css`
  width: 100%;
  height: 100px;
`;

const editText = css`
  padding: 20px;
`;

const savePostChange = css`
  display: flex;
  justify-content: flex-end;

  & button {
    border: none;
    font-size: 17px;
    color: white;
    border-radius: 5px;
    padding: 5px 7px;
    cursor: pointer;
  }
`;

const btnSaveModalPost = css`
  background-color: #007bff !important;
`;

const btnCloseModalPost = css`
  background-color: #ac2525 !important; ;
`;

interface IModalProp {
  closeModal: (active: boolean) => void;
  id: string;
}

export const ModalEditPost = ({ closeModal, id }: IModalProp) => {
  const [updatedTextPost, setUpdatedTextPost] = useState<string>("");

  const handlerCommentEdit = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUpdatedTextPost(e.target.value);
  };

  const handlerEdit = async (id: string) => {
    if (updatedTextPost === "") return;
    await db.collection(`posts`).doc(id).update({
      userPost: updatedTextPost,
    });
    closeModal(false);
  };

  return (
    <div className={modalPostContainer}>
      <h4>Edit Post</h4>
      <button className={btnCloseModal} onClick={() => closeModal(false)}>
        x
      </button>
      <div className={editText}>
        <p>New Text:</p>
        <textarea
          onChange={handlerCommentEdit}
          value={updatedTextPost}
          className={editPostInput}
          required
        ></textarea>
      </div>
      <div className={savePostChange}>
        <button onClick={() => closeModal(false)} className={btnCloseModalPost}>
          Close
        </button>
        <button onClick={() => handlerEdit(id)} className={btnSaveModalPost}>
          Save Changes
        </button>
      </div>
    </div>
  );
};
