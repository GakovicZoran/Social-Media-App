import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import { css } from "@emotion/css";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const forgotPassContainer = css`
  text-align: center;
  border: 2px solid black;
  width: 500px;
  margin: 10vh auto;
  border-radius: 10px;
  box-shadow: 0px 0px 5px 0px #666;

  & h2 {
    font-size: 22px;
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
    font-size: 16px;
    align-self: center;
    border: none;
    background-color: #d5d3d3;
    padding: 12px 22px;
    font-weight: bold;
    color: #007bff;
    text-transform: uppercase;
    border-radius: 10px;
    cursor: pointer;
  }
`;

const lockIcon = css`
  margin-top: 100px;
  font-size: 22px;
  background-color: #f01b1b;
  padding: 15px;
  border-radius: 100px;
  color: white;
`;

const errorStyle = css`
  color: red;
  background-color: #c2c1c177;
  max-width: 55%;
  margin: 30px auto;
  padding: 10px 20px;
  font-size: 17px;
  border-radius: 10px;
`;

const resetPassNav = css`
  display: flex;
  justify-content: space-between;
  color: #007bff;
  font-size: 16px;
  margin: 30px 40px 70px 40px;
  & a {
    color: #007bff;
    text-decoration: none;
  }
`;
export const ForgotPassword = () => {
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const { passwordReset } = useContext(AuthContext);

  const handlerSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      setMessage("");
      setError("");
      await passwordReset(email);
      setMessage("Please check you're email inbox for instructions!");
    } catch {
      setError("Failed to RESET password, try again!");
    }
  };

  return (
    <div className={forgotPassContainer}>
      <FontAwesomeIcon icon={faLock} className={lockIcon} />
      <h2>Password Reset</h2>
      {error && <p className={errorStyle}>{error}!</p>}
      {message && <p className={errorStyle}>{message}</p>}

      <form onSubmit={handlerSubmit}>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email Address *"
          required
        ></input>
        <div>
          <button>Reset</button>
        </div>
      </form>
      <div className={resetPassNav}>
        <span>
          <Link to="/signup">Don't have an account? Sign up</Link>
        </span>
        <div>
          <Link to="/">Sign In</Link>
        </div>
      </div>
    </div>
  );
};
