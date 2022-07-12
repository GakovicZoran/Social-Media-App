import { css } from "@emotion/css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { ModalEditPost } from "./ModalEditPost";

const openModalBtn = css`
  align-items: center;
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  font-size: 16px;
  height: 100%;
  text-transform: uppercase;
  transition: all 0.3s;
  gap: 10px;
`;

const editPostIcon = css`
  font-size: 23px;
`;

interface IEditPost {
  id: string;
}

export const EditPost = ({ id }: IEditPost) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const toggleModal = () => setIsModalOpen(true);

  return (
    <div>
      <button onClick={toggleModal} className={openModalBtn}>
        <FontAwesomeIcon icon={faEdit} className={editPostIcon} />
      </button>
      {isModalOpen && <ModalEditPost closeModal={setIsModalOpen} id={id} />}
    </div>
  );
};
