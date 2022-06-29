import { css } from "@emotion/css";
import { useContext, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import { AddBio } from "./AddBio";

const signUpContainer = css`
  text-align: center;
  & form {
    width: 500px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  & input {
    width: 300px;
    padding: 18px 14px;
    font-size: 16px;
  }
`;

export const SignUp = () => {
  const { createUser, setName, setEmail, email } = useContext(AuthContext);
  const [password, setPassword] = useState<string>("");
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordConfirmRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string>("");
  const [showForm, setShowForm] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (passwordRef?.current?.value !== passwordConfirmRef?.current?.value) {
      return setError("Passwords do not match");
    }

    setError("");
    //Kasnije dodaj error state i to globalno da ne bude za svaki catch posebno.
    try {
      await createUser(email, password);
    } catch {
      setError("fail");
    }

    navigate("/home");
  };

  const handleShowForm = () => {
    setShowForm(!showForm);
  };

  return (
    <div className={signUpContainer}>
      <h2>Sign up</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={(e) => setName(e.target.value)}
          placeholder="Name *"
        ></input>
        <input
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email Address *"
        ></input>

        <input
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password *"
          ref={passwordRef}
        ></input>

        <input
          type="password"
          placeholder="Confirm password *"
          ref={passwordConfirmRef}
        ></input>

        {showForm && <AddBio />}
        <button>Sign up</button>
      </form>
      <button onClick={handleShowForm}> ADD BIO</button>
      <div>
        Already have an account? <Link to="/">Sign in</Link>
      </div>
    </div>
  );
};
