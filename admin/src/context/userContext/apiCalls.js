import axios from "axios";
import { deleteUserStart, deleteUserSuccess, getUserStart, getUserSuccess } from "./UserAction";

export const getUsers = async (dispatch) => {
  dispatch(getUserStart());
  try {
    const res = await axios.get("/user?new=true", {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(getUserSuccess(res.data));
  } catch (err) {
    console.log(err);
  }
};


export const deleteUser = async (id, dispatch) => {
    dispatch(deleteUserStart());
    try{
        await axios.delete("/user/" + id, {
            headers: {
                token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
              },
        })
        dispatch(deleteUserSuccess(id));
    }catch(err){
        console.log(err)
    }
}
