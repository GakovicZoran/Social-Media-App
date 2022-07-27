import { css } from "@emotion/css";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../../Context/AuthContext";
import { auth } from "../../../data/firebaseConfig";
import { IUsers } from "../../../Interfaces/Interfaces";
import { AboutModalEdit } from "./AboutModalEdit";

const aboutContainer = css`
  & h3 {
    text-align: center;
    font-size: 30px;
    font-weight: 500;
  }

  p {
    font-size: 19px;
    font-weight: 500;
  }

  & button {
    background-color: transparent;
    border: 0;
    font-size: 17px;
    cursor: pointer;
  }
`;

const editBioIcon = css`
  font-size: 30px;
`;
export const About = () => {
  const { users } = useContext(AuthContext);
  const { id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const toggleModal = () => setIsModalOpen(true);
  return (
    <div className={aboutContainer}>
      {users
        .filter((userID: IUsers) => userID.id === id)
        .map((user: IUsers) => {
          return (
            <div key={user.id}>
              <div>
                <h3>Biography</h3>
                <p>Name: {user.userName}</p>
                <p>Email: {user.userEmail}</p>
                <p>Gender: {user.userBio.gender}</p>
                <p>Age: {user.userBio.age} </p>
                <p>Phone: {user.userBio.phoneNumber} </p>
                <p>DOB: {user.userBio.birthDate} </p>
              </div>
              {id === auth.currentUser?.uid ? (
                <button onClick={toggleModal}>
                  <FontAwesomeIcon icon={faEdit} className={editBioIcon} />
                </button>
              ) : null}
            </div>
          );
        })}

      {isModalOpen && <AboutModalEdit closeModal={setIsModalOpen} />}
    </div>
  );
};
