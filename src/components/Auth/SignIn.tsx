import { css } from "@emotion/css";
import { SyntheticEvent, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../App";

const signInContainer = css`
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
export const SignIn = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const { signIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e: SyntheticEvent) => {
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
      <h2>Sign in</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email Address *"
          id="email"
        ></input>

        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password *"
          id="password"
        ></input>

        <button>Sign in</button>
      </form>
      <div>
        Don't have an account? <Link to="/signup">Sign up</Link>
      </div>
    </div>
  );
};
