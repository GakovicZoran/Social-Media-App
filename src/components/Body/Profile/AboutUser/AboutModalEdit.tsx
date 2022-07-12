import { css } from "@emotion/css";
import { useState } from "react";
import { auth, db } from "../../../data/firebaseConfig";

const modalAboutContainer = css`
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

const editText = css`
  padding: 20px;
  border-bottom: 1px dotted black;
`;

const saveModalChange = css`
  display: flex;
  justify-content: flex-end;
`;

interface IModalProp {
  closeModal: (active: boolean) => void;
}

export const AboutModalEdit = ({ closeModal }: IModalProp) => {
  const [updatedBio, setUpdatedBio] = useState<{}>({});

  const handleUpdatedBio = (e: { target: { value: string; name: string } }) => {
    const value = e.target.value;
    setUpdatedBio({
      ...updatedBio,
      [e.target.name]: value,
    });
  };

  const handleEdit = async () => {
    await db.collection(`/users/`).doc(`${auth?.currentUser?.uid}`).update({
      userBio: updatedBio,
    });
    closeModal(false);
  };

  return (
    <div className={modalAboutContainer}>
      <h4>ADD/EDIT Biography</h4>
      <button className={btnCloseModal} onClick={() => closeModal(false)}>
        x
      </button>
      <div className={editText}>
        <p>My Personal Info:</p>
        <form>
          <input
            type="text"
            placeholder="Your Gender"
            onChange={handleUpdatedBio}
            name="gender"
          />
          <input
            type="number"
            placeholder="Your Age"
            onChange={handleUpdatedBio}
            name="age"
          />
          <input
            type="number"
            placeholder="Your Phone"
            onChange={handleUpdatedBio}
            name="phoneNumber"
          />
          <input
            type="date"
            placeholder="Your Date Of Birth"
            onChange={handleUpdatedBio}
            name="birthDate"
          />
        </form>
      </div>
      <div className={saveModalChange}>
        <button onClick={() => closeModal(false)}>Close</button>
        <button onClick={handleEdit}>Save Changes</button>
      </div>
    </div>
  );
};
