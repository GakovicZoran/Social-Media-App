import { css } from "@emotion/css";
import { useContext, useState } from "react";

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
}

export const ModalComment = ({ closeModal }: IModalProp) => {
  // const { storingPost, setStoringPost } = useContext(AuthContext);

  const [test, setTest] = useState<any>();
  // storingPost.map((user: any) => user.userPost)

  const updated = { test };
  const handleCommentEdit = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTest(e.target.value);
  };

  return (
    <div className={modalCommentContainer}>
      <h4>Edit Post</h4>
      <button className={btnCloseModal} onClick={() => closeModal(false)}>
        x
      </button>
      <div className={editText}>
        <p>Post Text:</p>
        <textarea
          onChange={handleCommentEdit}
          value={test}
          className={editCommentInput}
          required
        ></textarea>
        <p>Post Image:</p>
      </div>
      <div className={saveCommentChange}>
        <button onClick={() => closeModal(false)}>Close</button>
        <button
          onClick={() => {
            setTest(test);
          }}
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};
