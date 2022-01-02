import { ArrowDropDown} from "@material-ui/icons";
import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useHistory, useLocation } from "react-router-dom";
import { AuthContext } from "../../authContext/AuthContext";
import { logout } from "../../authContext/AuthActions";
import { SearchBar } from "../searchBar/searchBar";
import axios from "axios";
import "./navbar.scss";

const Navbar = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [getList, setGetList] = useState([]);
  const history = useHistory();
  const { dispatch } = useContext(AuthContext);
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");

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
      <div className="container">
        <div className="left">
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

          {/* <Link to="/latest" className="link">
            <span>New and Popular</span>
          </Link> */}
          <Link to="/mylist" className="link">
          <span>My List</span>
          </Link>
        </div>

        <div className="right">
          <div className="searchBox">
            <SearchBar />
          </div>

          <div className="info">
            <Link to="/profile">
              <img
                src="https://pbs.twimg.com/media/D8tCa48VsAA4lxn.jpg"
                alt=""
              />
            </Link>
          </div>

          <div className="dropDown">
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
    </div>
  );
};

export default Navbar;
