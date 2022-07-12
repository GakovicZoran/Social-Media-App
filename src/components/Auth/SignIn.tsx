import { css } from "@emotion/css";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const signInContainer = css`
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
    font-size: 20px;
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

const forgotPassBox = css`
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

const errorSignIn = css`
  color: red;
  background-color: #c2c1c177;
  max-width: 50%;
  margin: 30px auto;
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 10px;
`;

export const SignIn = () => {
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const { signIn, email, setEmail } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    setError("");
    try {
      await signIn(email, password);
      navigate("/home");
    } catch {
      setError("fail");
    }
  };

  return (
    <div className={signInContainer}>
      <FontAwesomeIcon icon={faLock} className={lockIcon} />
      <h2>Sign in</h2>
      {error && (
        <p className={errorSignIn}>Incorrect Data, Please Try Again!</p>
      )}

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email Address *"
          id="email"
          required
          onBlur={() => setError("")}
        ></input>

        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password *"
          id="password"
          required
        ></input>

        <button>Sign in</button>
      </form>

      <div className={forgotPassBox}>
        <span>
          <Link to="/signup">Don't have an account? Sign up</Link>
        </span>
        <div>
          <Link to="/passwordReset">Forgot/Reset Password?</Link>
        </div>
      </div>
    </div>
  );
};
