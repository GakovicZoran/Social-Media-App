import { css } from "@emotion/css";
import { useContext } from "react";
import { AuthContext } from "../../../Context/AuthContext";
import { auth, db } from "../../../data/firebaseConfig";

const modalAboutContainer = css`
  position: absolute;
  width: 25%;
  height: 40%;
  left: 39%;
  border: 1px solid black;
  background-color: white;
  padding-bottom: 80px;
  text-align: center;
  & h4 {
    margin: 0;
    padding: 20px;
    font-size: 20px;
    border-bottom: 1px dotted black;
    text-align: center;
  }

  & input {
    width: 60%;
    height: 20px;
    padding: 10px 8px;
    font-size: 18px;
    border-radius: 10px;
    margin-bottom: 30px;
    border: 1px solid #bdbbbb;
  }
`;

const btnCloseModal = css`
  position: absolute;
  top: 5px;
  right: 5px;
  border: none;
  cursor: pointer;
  gap: 50px;
  background-color: #ac2525 !important;
  border-radius: 5px;
  color: white;
  padding: 5px 10px;
`;

const editText = css`
  padding: 20px;
  border-bottom: 1px dotted black;
`;

const saveModalChange = css`
  display: flex;
  justify-content: flex-end;
  margin-top: 50px;

  & button {
    border: none;
    font-size: 17px;
    color: white;
    border-radius: 5px;
    padding: 5px 7px;
    cursor: pointer;
    margin-right: 10px;
  }
`;

const btnSave = css`
  background-color: #007bff !important;
`;

const btnClose = css`
  background-color: #ac2525 !important; ;
`;
interface IModalProp {
  closeModal: (active: boolean) => void;
}

export const AboutModalEdit = ({ closeModal }: IModalProp) => {
  const { bio, setBio } = useContext(AuthContext);

  const handlerUpdatedBio = (e: {
    target: { value: string; name: string };
  }) => {
    let value = e.target.value;
    setBio({
      ...bio,
      [e.target.name]: value,
    });
  };

  const handlerEdit = async () => {
    await db.collection(`/users/`).doc(`${auth.currentUser?.uid}`).update({
      userBio: bio,
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
            onChange={handlerUpdatedBio}
            name="gender"
          />
          <input
            type="number"
            placeholder="Your Age"
            onChange={handlerUpdatedBio}
            name="age"
          />
          <input
            type="number"
            placeholder="Your Phone"
            onChange={handlerUpdatedBio}
            name="phoneNumber"
          />
          <input
            type="date"
            placeholder="Your Date Of Birth"
            onChange={handlerUpdatedBio}
            name="birthDate"
          />
        </form>
      </div>
      <div className={saveModalChange}>
        <button onClick={() => closeModal(false)} className={btnSave}>
          Close
        </button>
        <button onClick={handlerEdit} className={btnClose}>
          Save Changes
        </button>
      </div>
    </div>
  );
};
