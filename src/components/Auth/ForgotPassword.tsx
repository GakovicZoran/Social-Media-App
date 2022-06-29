import { SyntheticEvent, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import { css } from "@emotion/css";

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
export const ForgotPassword = () => {
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string>("");
  const { passwordReset } = useContext(AuthContext);
  const [message, setMessage] = useState<string>("");
  //////////////////// Mozda trebam isti email kao iz login tj da uzmem iz baze pa onda resetujem, sutra to rijesi
  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      // DODAJ KASNIJE LOADING I SETLOADING
      setMessage("");
      setError("");
      await passwordReset(email);
      setMessage("check you're email inbox for instructions");
    } catch {
      setError("failed to reset password");
    }
  };

  return (
    <div className={signInContainer}>
      <h2>Password Reset</h2>
      {error && <p>Email je nepostojeci!</p>}
      {message && <p>{message}</p>}

      <form onSubmit={handleSubmit}>
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

      <Link to="/">Sign In</Link>
      <div>
        Don't have an account? <Link to="/signup">Sign up</Link>
      </div>
    </div>
  );
};
