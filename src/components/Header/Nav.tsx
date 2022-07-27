import { css } from "@emotion/css";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faCompass,
  faUser,
  faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { IUsers } from "../Interfaces/Interfaces";

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

const searchContainer = css`
  margin-right: 35px;
  & input {
    width: 300px;
    height: 30px;
    font-size: 15px;
  }
`;

const searchList = css`
  position: absolute;
  padding: 0 5px;
  flex-direction: column;
  width: 288px;
  & a {
    color: white;
  }

  & li {
    width: 100%;
    display: flex;
    padding: 10px 0 10px 10px;
    align-items: center;
    background-color: #2c2c2ccf;
  }

  & img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
  }

  & p {
    padding-left: 10px;
  }
`;

export const Nav = () => {
  const [search, setSearch] = useState<string>("");
  const {
    logOut,
    user,
    users,
    setUsers,
    setUser,
    setFollowers,
    setFollowing,
    setBio,
  } = useContext(AuthContext);
  const navigate = useNavigate();

  const handlerSearchChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const searchUsers = users.filter((val: { userName: string }) => {
    if (search === "") return "";
    else if (val.userName.toLowerCase().includes(search.toLowerCase())) {
      return val;
    }
  });

  const handleLogOut = async () => {
    try {
      await logOut();
      navigate("/");
      setSearch("");
      setUsers([]);
      setUser({});
      setBio({});
      setFollowers([]);
      setFollowing([]);
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
          <div className={searchContainer}>
            <input
              value={search}
              type="text"
              onChange={handlerSearchChanges}
              placeholder="Search over many users!"
            ></input>
            <ul className={searchList}>
              {searchUsers.map(({ userName, userPhoto, id }: IUsers) => {
                return (
                  <Link key={id} to={`/${id}`}>
                    <li>
                      <img alt="Loading.." src={userPhoto}></img>
                      <p>{userName} </p>
                    </li>
                  </Link>
                );
              })}
            </ul>
          </div>

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
