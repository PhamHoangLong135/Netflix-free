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
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxYjhlYjNmMWUwOTFkNGRhODQ0MzdiZCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY0MDUwNzA0MCwiZXhwIjoxNjQwOTM5MDQwfQ.-bzHmFuNMNlhVQ3xkpI3WZ73gvAG5fwco7UKi8dfBO4",
          },
        });
        setNewUsers(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getNewUsers();
  }, []);

  // console.log( newUsers)
  // const handleChange = () => {
  //   if(newUser){

  //   }
  //   if(newUsers.isAdmin){
  //     return newUsers.isAdmin = false;
  //   }else{
  //     return newUsers.isAdmin = true;
  //   }
  // }
  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Join Members</span>
      <ul className="widgetSmList">
        {newUsers.map((user, index) => (
          <li key= {index} className="widgetSmListItem hide">
            <img 
              src={
                user.profilePic ||
                "https://vnn-imgs-a1.vgcloud.vn/image1.ictnews.vn/_Files/2020/03/17/trend-avatar-1.jpg"
              }
              alt=""
              className="widgetSmImg"
            />
            <div className="widgetSmUser">
              <span className="widgetSmUsername">{user.username}</span>
            </div>
            <div className="widgetSmAdmin">
              <span className="widgetSmAdmin">{user.isAdmin === true ? `admin` : `Not admin`}</span>
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
