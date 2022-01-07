import { ArrowDropDown, Menu } from "@material-ui/icons";
import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useHistory, useLocation } from "react-router-dom";
import { AuthContext } from "../../authContext/AuthContext";
import { logout } from "../../authContext/AuthActions";
import { SearchBar } from "../searchBar/searchBar";
import { motion } from "framer-motion";
import axios from "axios";
import { navbarFadeInVariants } from "../../motionUtils";

import "./navbar.scss";

const Navbar = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [getList, setGetList] = useState([]);
  const history = useHistory();
  const { dispatch } = useContext(AuthContext);
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [showLinks, setShowLinks] = useState(false);

  useEffect(() => {
    axios
      .get("/movie", {
        headers: {
          token:
            "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
        },
      })
      .then((response) => {
        setGetList(response.data);
      });
  }, []);

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };
  return (
    <div className={isScrolled ? "navbar scrolled" : "navbar"}>
      <motion.nav
        className={`Navbar ${isScrolled && "Navbar__fixed"}`}
        variants={navbarFadeInVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
      >
        <div className="container">
          <div className="left">
            <div className="links" id={showLinks ? "hidden" : ""}>
              <Link to="/" className="link">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
                  alt=""
                />
              </Link>
              <Link to="/" className="link">
                <span>Home</span>
              </Link>
              <Link to="/series" className="link">
                <span className="navbarmainLinks">Series</span>
              </Link>
              <Link to="/movies" className="link">
                <span className="navbarmainLinks">Movies</span>
              </Link>
              <Link to="/mylist" className="link">
                <span>My List</span>
              </Link>
            </div>
            <div className="button">
              <Menu onClick={() => setShowLinks(!showLinks)}/>

            </div>
          </div>

          <div className="right">
            <div className="searchBox">
              <SearchBar />
            </div>

            <div className="dropDown">
              <img
                src="https://pbs.twimg.com/media/D8tCa48VsAA4lxn.jpg"
                alt=""
              />
              <ArrowDropDown className="icon" />
              <div className="options">
                <span onClick={() => dispatch(logout())}>Logout</span>
              </div>
            </div>
          </div>
        </div>
        {filteredResults.map((item) => {
          return <h1>{item.title}</h1>;
        })}
      </motion.nav>
    </div>
  );
};

export default Navbar;
