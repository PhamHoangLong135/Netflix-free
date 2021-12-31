import React from 'react';
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const Search = ({ noResult, hasResult }) => {
    const location = useLocation();
    const [getList, setGetList] = useState([]);
    const search = new URLSearchParams(location.search).get("q");

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


      const getMovie = getList.filter((filter) => {
          return Object.values(filter)
          .join("")
          .toLowerCase()
          .includes(search.toLowerCase());
      });
      
    //   console.log(search);

      console.log(getMovie);
    // console.log(location)
        return (
            <div>
                
            </div>
        );
}

export default Search;