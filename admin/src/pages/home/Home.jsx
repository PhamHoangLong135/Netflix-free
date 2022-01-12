import Chart from "../../components/chart/Chart";
import "./home.css";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import { useMemo, useState, useEffect } from "react";
import axios from "axios";

export default function Home() {
  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );

  const [userStats, setUserStats] = useState([]);

  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await axios.get("/user/stats", {
          header: {
            token:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxYjhlYjNmMWUwOTFkNGRhODQ0MzdiZCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY0MDUwNzA0MCwiZXhwIjoxNjQwOTM5MDQwfQ.-bzHmFuNMNlhVQ3xkpI3WZ73gvAG5fwco7UKi8dfBO4",
          },
        });
        const statsList = res.data.sort(function (a, b) {
          return a._id - b._id;
        });
        statsList.map((item) =>
          setUserStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], "New User": item.total },
          ])
        );
      } catch (err) {
        console.log(err);
      }
    };
    getStats();
  }, [MONTHS]);
  console.log(userStats);
  return (
    <div className="home">
      <Chart data={userStats} title="User Analytics" grid dataKey="New User" />
      <div className="homeWidgets">
        <WidgetSm />
      </div>
    </div>
  );
}
