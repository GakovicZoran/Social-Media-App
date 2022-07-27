import { css } from "@emotion/css";
import { useContext, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import { AddBio } from "./AddBio";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const signUpContainer = css`
  text-align: center;
  border: 2px solid black;
  width: 500px;
  margin: 10vh auto;
  border-radius: 10px;
  box-shadow: 0px 0px 5px 0px #666;

  & h2 {
    font-size: 25px;
    font-weight: 500;
    margin-top: 10px;
  }

  & form {
    width: 400px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  & input {
    width: 100%;
    height: 30px;
    padding: 15px 12px;
    font-size: 18px;
    border-radius: 10px;
    margin-bottom: 30px;
    border: 1px solid #bdbbbb;
  }

  & button {
    font-size: 17px;
    align-self: center;
    border: none;
    background-color: #d5d3d3;
    padding: 12px 22px;
    font-weight: bold;
    color: #007bff;
    text-transform: uppercase;
    border-radius: 10px;
    cursor: pointer;
    margin-top: 10px;
  }
`;

const lockIcon = css`
  margin-top: 100px;
  font-size: 25px;
  background-color: #f01b1b;
  padding: 15px;
  border-radius: 100px;
  color: white;
`;

const errorStyle = css`
  color: red;
  background-color: #c2c1c177;
  max-width: 50%;
  margin: 30px auto;
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 10px;
`;

const signUpBtnBox = css`
  display: flex;
`;

const alreadyHaveAcc = css`
  display: flex;
  justify-content: center;
  color: #007bff;
  font-size: 17px;
  margin: 60px 40px 30px 40px;
  & a {
    color: #007bff;
    text-decoration: none;
  }
`;
export const SignUp = () => {
  const [password, setPassword] = useState<string>("");
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordConfirmRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string>("");
  const [showForm, setShowForm] = useState<boolean>(false);
  const { createUser, setName, setEmail, email } = useContext(AuthContext);
  const navigate = useNavigate();

  const handlerSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const isEmailValid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
      email
    );

    if (passwordRef?.current?.value !== passwordConfirmRef?.current?.value) {
      return setError("Passwords do not match");
    }

    setError("");

    if (isEmailValid) {
      try {
        await createUser(email, password);
      } catch (err) {
        alert(err);
      }
      navigate("/home");
    }
    return setError("Email is not valid");
  };

  const handlerShowForm = () => {
    setShowForm(!showForm);
  };

  return (
    <div className={signUpContainer}>
      <FontAwesomeIcon icon={faLock} className={lockIcon} />
      <h2>Sign up</h2>
      {error && <p className={errorStyle}>{error}</p>}
      <form onSubmit={handlerSubmit}>
        <input
          type="text"
          onChange={(e) => setName(e.target.value)}
          placeholder="Name *"
          required
        ></input>
        <input
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email Address *"
          required
        ></input>

        <input
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password *"
          ref={passwordRef}
          required
        ></input>

        <input
          type="password"
          placeholder="Confirm password *"
          ref={passwordConfirmRef}
          required
        ></input>

        {showForm && <AddBio />}
        <button>Sign up</button>
      </form>
      <div className={signUpBtnBox}> </div>
      <div>
        <button onClick={handlerShowForm}>ADD BIO</button>
      </div>
      <div className={alreadyHaveAcc}>
        <Link to="/"> Already have an account? Sign in</Link>
      </div>
    </div>
  );
};
