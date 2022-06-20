import { css } from "@emotion/css";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../App";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faCompass,
  faUser,
  faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
const navContainer = css`
  & ul {
    display: flex;
    list-style: none;
  }
  & li {
    margin-right: 35px;
  }
  & a {
    text-decoration: none;
    color: black;
  }
`;

const navBarIcons = css`
  font-size: 27px;
`;
export const Nav = () => {
  const { logOut, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogOut = async () => {
    try {
      // ispitaj ovo await sto ovdje
      await logOut();
      navigate("/");
      // kasnije dodaj state i poruku kada se izloguje user
      console.log("you are logout");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={navContainer}>
      <nav>
        <ul>
          <li>
            <Link to="/home">
              <FontAwesomeIcon icon={faHome} className={navBarIcons} />
            </Link>
          </li>
          <li>
            <Link to="/explore">
              <FontAwesomeIcon icon={faCompass} className={navBarIcons} />
            </Link>
          </li>
          <li>
            <Link to={`${user.uid}`}>
              <FontAwesomeIcon icon={faUser} className={navBarIcons} />
            </Link>
          </li>
          <input></input>
          <button onClick={handleLogOut}>
            <FontAwesomeIcon
              icon={faArrowRightFromBracket}
              className={navBarIcons}
            />
          </button>
        </ul>
      </nav>
    </div>
  );
};
