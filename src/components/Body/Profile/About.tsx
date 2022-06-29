import { css } from "@emotion/css";
import { userInfo } from "os";
import { useContext, useState } from "react";
import { AddBio } from "../../Auth/AddBio";
import { AuthContext } from "../../Context/AuthContext";
const aboutContainer = css``;
export const About = () => {
  const { user } = useContext(AuthContext);

  const [showForm, setShowForm] = useState<boolean>(false);
  const handleShowForm = () => {
    setShowForm(!showForm);
  };
  return (
    <div className={aboutContainer}>
      <div>
        <h3>Biography</h3>
        <p>Name: </p>
        <p>Email: {user.email}</p>
        <p>Gender: </p>
        <p>Age: </p>
        <p>Phone Number: </p>
        <p>Birth Year: </p>
      </div>
      <button onClick={handleShowForm}>Add Bio</button>
      {/* OVDJE BI TREBALO DODATI SADA EDIT BIO PA AKO NEMA BIO DA GA DODA, AKO IMA MOZE EDITOVATI TO */}
      {showForm && (
        <form>
          <AddBio />
          <button>Submit</button>
        </form>
      )}
    </div>
  );
};
