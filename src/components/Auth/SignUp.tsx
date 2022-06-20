import { css } from "@emotion/css";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../App";

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
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const { createUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setError("");
    try {
      await createUser(email, password);
      navigate("/home");
    } catch {
      setError("fail");
    }
  };
  return (
    <div className={signUpContainer}>
      <h2>Sign up</h2>
      {error && <p>Nista</p>}
      <form onSubmit={handleSubmit}>
        <input
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email Address *"
          id="email"
        ></input>

        <input
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password *"
          id="password"
        ></input>

        <input
          type="password"
          placeholder="Confirm password *"
          id="confirm-password"
        ></input>

        {/* <span>
          Male <input type="checkbox"></input>
        </span>

        <span>
          Female
          <input type="checkbox"></input>
        </span> */}

        <button>Sign up</button>
      </form>
      <div>
        Already have an account? <Link to="/">Sign in</Link>
      </div>
    </div>
  );
};
