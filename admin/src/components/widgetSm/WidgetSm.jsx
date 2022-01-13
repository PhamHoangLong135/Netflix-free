import "./widgetSm.css";
import { Visibility } from "@material-ui/icons";
import { useEffect, useState } from "react";
import axios from "axios";

export default function WidgetSm() {
  const [newUsers, setNewUsers] = useState([]);


  useEffect(() => {
    const getNewUsers = async () => {
      try {
        const res = await axios.get("/user?new=true", {
          headers: {
            token:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxYjhlYjNmMWUwOTFkNGRhODQ0MzdiZCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY0MjA2MjkzNSwiZXhwIjoxNjQyNDk0OTM1fQ.gRZyVlCEddDUBXE8jn4k9PwtxKdlK4sZPbsH_OJexRM",
          },
        });
        setNewUsers(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getNewUsers();
  }, []);

  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Join Members</span>
      <ul className="widgetSmList">
        {newUsers.map((user, index) => (
          <li key= {index} className="widgetSmListItem hide">
            <img 
              src={
                user.profilePic ||
                "https://storage.jewheart.com/content/users/avatars/3746/avatar_3746_500.jpg?1558628223"
              }
              alt=""
              className="widgetSmImg"
            />
            <div className="widgetSmUser">
              <span className="widgetSmUsername">{user.username}</span>
            </div>
            <div className="widgetSmAdmin">
              <span className="widgetSmAdmin">{user.isAdmin === true ? `Admin` : `Not admin`}</span>
            </div>
            <button className="widgetSmButton" >
              <Visibility className="widgetSmIcon" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
