import { css } from "@emotion/css";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../../Context/AuthContext";
import { IUser } from "../../../Interfaces/Interfaces";
import { AboutModalEdit } from "./AboutModalEdit";

const aboutContainer = css``;
export const About = () => {
  const { userInfo, user } = useContext(AuthContext);
  const { id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const toggleModal = () => setIsModalOpen(true);

  return (
    <div className={aboutContainer}>
      {userInfo
        .filter((users: IUser) => users.id === id)
        .map((eachUser: IUser) => {
          return (
            <div key={eachUser.id}>
              <div>
                <h3>Biography</h3>
                <p>Name: {eachUser.userName}</p>
                <p>Email: {eachUser.userEmail}</p>
                <p>Gender: {eachUser.userBio.gender}</p>
                <p>Age: {eachUser.userBio.age} </p>
                <p>Phone: {eachUser.userBio.phoneNumber} </p>
                <p>DOB: {eachUser.userBio.birthDate} </p>
              </div>
              {eachUser.id === user.uid ? (
                <button onClick={toggleModal}>
                  <FontAwesomeIcon icon={faEdit} /> EDIT BIO
                </button>
              ) : null}
            </div>
          );
        })}

      {isModalOpen && <AboutModalEdit closeModal={setIsModalOpen} />}
    </div>
  );
};
