import "./sidebar.css";
import {
  LineStyle,
  PermIdentity,
  PlayCircleOutline,
  List,
  AddToQueue,
  QueuePlayNext,
  HomeOutlined,
} from "@material-ui/icons";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { logout } from "../../context/authContext/AuthActions";
import { AuthContext } from "../../context/authContext/AuthContext";

export default function Sidebar() {
  const { dispatch } = useContext(AuthContext);
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <Link to="/" className="link">
              <li className="sidebarListItem active">
                <LineStyle className="sidebarIcon" />
                Home
              </li>
            </Link>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Quick Menu</h3>
          <ul className="sidebarList">
            <Link to="/users" className="link">
              <li className="sidebarListItem">
                <PermIdentity className="sidebarIcon" />
                Users
              </li>
            </Link>
            <Link to="/movies" className="link">
              <li className="sidebarListItem">
                <PlayCircleOutline className="sidebarIcon" />
                Movies
              </li>
            </Link>
            <Link to="/lists" className="link">
              <li className="sidebarListItem">
                <List className="sidebarIcon" />
                Lists
              </li>
            </Link>
            <Link to="/newMovie" className="link">
              <li className="sidebarListItem">
                <AddToQueue className="sidebarIcon" />
                Add Movie
              </li>
            </Link>
            <Link to="/newList" className="link">
              <li className="sidebarListItem">
                <QueuePlayNext className="sidebarIcon" />
                Add List
              </li>
            </Link>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Setting</h3>
          <ul className="sidebarList">
            <Link to="/login" className="link">
              <li className="sidebarListItem">
                <HomeOutlined
                  className="sidebarIcon"
                />
                <span onClick={() => dispatch(logout())}>Logout</span>
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
}
