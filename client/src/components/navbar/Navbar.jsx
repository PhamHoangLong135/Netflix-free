import { ArrowDropDown, Notifications, Search } from "@material-ui/icons";
import { useContext, useState, useEffect } from "react";
import "./navbar.scss";
import { Link } from "react-router-dom";
import { AuthContext } from "../../authContext/AuthContext";
import { logout } from "../../authContext/AuthActions";
import { useHistory, useLocation } from "react-router-dom";
import axios from "axios";
import { SearchBar } from "../searchBar/searchBar";


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

  //Enter no new page
  // function handleKeyDown(e) {
  //   if (e.key === "Enter") {
  //     history.push(`/search/?q=${searchInput}`);
  //   }
  // }
  const search = new URLSearchParams(location.search);
  search.set("search", searchInput);

  const searchItems = (searchInput) => {
    setSearchInput(searchInput);
    if (searchInput !== "") {
      const filteredData = getList.filter((item) => {
        return Object.values(item.title)
          .join("")
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      });
      history.push(window.location.pathname + "?" + search.toString());
      setFilteredResults(filteredData);
      console.log(filteredData);
    } else {
      setFilteredResults(getList);
      history.replace("/")
      console.log("Không tìm thấy phim");
    }
  };
  // console.log(search);
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

          <span>My List</span>
        </div>
        <div className="right">
          <div className="searchBox">
            <button className="btnSearch">
              <Search className="icon" />
            </button>
            {/* <input
              type="text"
              className="inputSearch"
              placeholder=" Type to Search..."
              // onKeyPress={(e) => handleKeyDown(e)}
              //onChange={(e) => searchItems(e.target.value)}
            /> */}
            <SearchBar />
          </div>

          <Notifications className="icon" />
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
