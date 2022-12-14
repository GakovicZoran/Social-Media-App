import { css } from "@emotion/css";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import { Nav } from "./Nav";

const headerStyle = css`
  display: flex;
  align-items: center;
  border-bottom: 1px solid black;
  justify-content: space-between;
  background-color: rgb(224, 224, 224);
  padding: 5px 10px;

  & span {
    background-color: black;
    border-radius: 10px;
    padding: 5px 15px;
    font-size: 20px;
  }
`;

const logo = css`
  color: white;
  text-decoration: none;
`;

export const Header = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className={headerStyle}>
      <span>
        <Link to="/home" className={logo}>
          Social Media App
        </Link>
      </span>
      {user ? <Nav /> : null}
    </div>
  );
};
