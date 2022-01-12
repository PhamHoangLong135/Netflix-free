import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Publish,
} from "@material-ui/icons";
import { useState, useEffect } from "react";
import { Link, useLocation, useParams, useHistory } from "react-router-dom";
import axios from "axios";
import "./user.css";

export default function User() {
  const location = useLocation();
  const user = location.user;
  const history = useHistory();
  const { userId } = useParams();
  const [userData, setUserData] = useState(null);
  const [getUser, setGetUser] = useState([]);


  useEffect(() => {
    axios.get(`/user/find/${userId}`, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    }).then((response) => {
      setGetUser(response.data);
    });
  }, []);

  const handleChange = (e) => {
    const value = e.target.value;
    return setUserData({
      ...userData,
      [e.target.name]: value,
    });
  };

  const updateUserData = () => {
    axios.put(`/user/${userId}`, userData, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
  };
  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">User</h1>
        <Link to="/newUser">
          <button className="userAddButton">Create</button>
        </Link>
      </div>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
            <img
              src="https://storage.jewheart.com/content/users/avatars/3746/avatar_3746_500.jpg?1558628223"
              alt=""
              className="userShowImg"
            />
            <div className="userShowTopTitle">
              <span className="userShowUsername">{getUser && getUser.username}</span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Account Details</span>
            <div className="userShowInfo">
              <PermIdentity className="userShowIcon" />
              <span className="userShowInfoTitle">{getUser && getUser.username}</span>
            </div>
            <span className="userShowTitle">Contact Details</span>
            <div className="userShowInfo">
              <PhoneAndroid className="userShowIcon" />
              <span className="userShowInfoTitle">+1 123 456 67</span>
            </div>
            <div className="userShowInfo">
              <MailOutline className="userShowIcon" />
              <span className="userShowInfoTitle">{getUser && getUser.email}</span>
            </div>
          </div>
        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle">Edit</span>
          <form className="userUpdateForm">
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>Username</label>
                <input
                  type="text"
                  placeholder={getUser && getUser.username}
                  className="userUpdateInput"
                  name="username"
                  onChange={handleChange}
                />
              </div>
              <div className="userUpdateItem">
                <label>Email</label>
                <input
                  type="text"
                  placeholder={getUser && getUser.email}
                  className="userUpdateInput"
                  name="email"
                  onChange={handleChange}
                />
              </div>
              <div className="userUpdateItem">
                <label>Password</label>
                <input
                  type="text"
                  placeholder={getUser && getUser.password}
                  className="userUpdateInput"
                  name="password"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="userUpdateRight">
              <button className="userUpdateButton" onClick={updateUserData}>Update</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
