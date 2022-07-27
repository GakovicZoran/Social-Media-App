import { css } from "@emotion/css";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";

const bioContainer = css`
  display: flex;
  flex-direction: column;
`;
export const AddBio = () => {
  const { bio, setBio } = useContext(AuthContext);

  const handlerUserBio = (e: { target: { value: string; name: string } }) => {
    const value = e.target.value;
    setBio({
      ...bio,
      [e.target.name]: value,
    });
  };

  return (
    <div className={bioContainer}>
      <h4>All fields are optional!</h4>
      <input
        onChange={handlerUserBio}
        type="text"
        placeholder="Type Gender: Male / Female"
        name="gender"
      ></input>
      <input
        onChange={handlerUserBio}
        type="number"
        placeholder="Type Age:"
        name="age"
      ></input>

      <input
        onChange={handlerUserBio}
        type="number"
        placeholder="Type Phone Number:"
        name="phoneNumber"
      ></input>

      <input
        onChange={handlerUserBio}
        type="date"
        placeholder="Type Birth Year: "
        name="birthYear"
      ></input>
    </div>
  );
};
