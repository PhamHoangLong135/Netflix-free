import { Link, useLocation, useParams } from "react-router-dom";
import "./list.css";
import { Publish } from "@material-ui/icons";
import { useState, useEffect } from "react";
import axios from "axios";

export default function List() {
  const location = useLocation();
  const list = location.list;
  const { listId } = useParams();
  const [getList, setGetList] = useState([]);
  const [listData, setListData] = useState(null);

  useEffect(() => {
    axios.get(`/lists/find/${listId}`).then((response) => {
      setGetList(response.data);
    });
  }, [listId]);

  const handleChange = (e) => {
    const value = e.target.value;
    return setListData({
      ...listData,
      [e.target.name]: value,
    });
  };

  const updateList = () => {
    axios.put(`/lists/update/${listId}`, listData, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
  };

  console.log(getList);
  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">List</h1>
        <Link to="/newList">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <div className="productTop">
        <div className="productTopRight">
          <div className="productInfoTop">
            <span className="productName">{getList.title}</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">id:</span>
              <span className="productInfoValue">{getList._id}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">genre:</span>
              <span className="productInfoValue">{getList.genre}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">type:</span>
              <span className="productInfoValue">{getList.type}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="productBottom">
        <form className="productForm">
          <div className="productFormLeft">
            <label>List Title</label>
            <input
              type="text"
              placeholder={getList.title}
              name="title"
              onChange={handleChange}
            />
            <label>Type</label>
            <input
              type="text"
              placeholder={getList.type}
              name="type"
              onChange={handleChange}
            />
            <label>Genre</label>
            <input
              type="text"
              placeholder={getList.genre}
              name="genre"
              onChange={handleChange}
            />
          </div>
          <div className="productFormRight">
            <button className="productButton" onClick={updateList}>
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
