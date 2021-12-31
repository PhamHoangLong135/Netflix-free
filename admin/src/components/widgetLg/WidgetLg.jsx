import { useState, useEffect } from "react";
import axios from "axios";
import "./widgetLg.css";

export default function WidgetLg() {
  const [admin, setAdmin] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await axios.get("/user?new=true", {
          headers: {
            token:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxYjhlYjNmMWUwOTFkNGRhODQ0MzdiZCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY0MDI1NjU1OSwiZXhwIjoxNjQwNjg4NTU5fQ.OINRCQrOFDC2GQoZvt9PIaehs84FnIhP5FXBsL1Bdf4",
          },
        });
        setAdmin(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUsers();
  }, []);

  console.log(admin);
  const Button = ({ type }) => {
    return <button className={"widgetLgButton " + type}>{type}</button>;
  };
  return (
    <div className="widgetLg">
      <h3 className="widgetLgTitle">Latest transactions</h3>
      <table className="widgetLgTable">
        <tbody>
          <tr className="widgetLgTr">
            <th className="widgetLgTh">Customer</th>
            <th className="widgetLgTh">Email</th>
            <th className="widgetLgTh">isAdmin</th>
            {/* <th className="widgetLgTh">Status</th> */}
          </tr>
          {admin.map((adm, index) => {
            <tr className="widgetLgTr">
              <td className="widgetLgUser">
                <img
                  src="https://images.pexels.com/photos/4172933/pexels-photo-4172933.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                  alt=""
                  className="widgetLgImg"
                />
                <span className="widgetLgName">{adm.email}</span>
              </td>
              <td className="widgetLgDate">{adm.isAdmin}</td>
              {/* <td className="widgetLgAmount">$122.00</td> */}
              <td className="widgetLgStatus">
                <Button type="setAdmin" />
              </td>
            </tr>;
          })}

          {/* <tr className="widgetLgTr">
            <td className="widgetLgUser">
              <img
                src="https://images.pexels.com/photos/4172933/pexels-photo-4172933.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                alt=""
                className="widgetLgImg"
              />
              <span className="widgetLgName">Susan Carol</span>
            </td>
            <td className="widgetLgDate">2 Jun 2021</td>
            <td className="widgetLgAmount">$122.00</td>
            <td className="widgetLgStatus">
              <Button type="setAdmin" />
            </td>
          </tr> */}
        </tbody>
      </table>
    </div>
  );
}
