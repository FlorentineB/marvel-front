import "./Header.css";
import { Link } from "react-router-dom";
import logo from "../static/logo.svg";
import { FaSearch } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const Header = ({
  handleConnect,
  token,
  setSearchComics,
  setSearchCharacters,
}) => {
  const onClick = (event) => {
    handleConnect(null);
  };
  const [search, setSearch] = useState("");

  const { pathname } = useLocation();

  useEffect(() => {
    setSearchCharacters("");
    setSearchComics("");
    setSearch("");
  }, [pathname, setSearchCharacters, setSearchComics, setSearch]);

  const showSearchBar = pathname === "/" || pathname === "/comics";

  const handleChange = (event) => {
    setSearch(event.target.value);
    console.log(event.target.value);
    if (pathname === "/") {
      setSearchCharacters(event.target.value);
    }
    if (pathname === "/comics") {
      setSearchComics(event.target.value);
    }
  };

  return (
    <>
      <div className="header-wrapper">
        {!token ? (
          <div className="header-buttons">
            <Link to="/signin">
              <button>Signin</button>
            </Link>
            <div>|</div>
            <Link to="/join">
              <button>Join</button>
            </Link>
          </div>
        ) : (
          <button className="disconnect-button" onClick={onClick}>
            Disconnect
          </button>
        )}
        <div className="header-img-wrapper">
          <img src={logo} alt="logo" width="130px" />
        </div>
        {showSearchBar && (
          <div className="search">
            <input
              onChange={handleChange}
              value={search}
              className="searchBar"
              type="text"
              placeholder="Rechercher un personnage"
            />
            <FaSearch className="search-bar-icon" color="#bbb" />
          </div>
        )}
      </div>
      <ul className="header-subsection">
        <li>
          <Link className="subsection-margin" to="/">
            Characters
          </Link>
        </li>
        <li>
          <Link className="subsection-margin" to="/comics">
            Comics
          </Link>
        </li>
        {token && (
          <li>
            <Link className="subsection-margin" to="/favourites">
              Favourites
            </Link>
          </li>
        )}
      </ul>
    </>
  );
};

export default Header;
