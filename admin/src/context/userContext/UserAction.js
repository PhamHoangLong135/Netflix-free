export const getUserStart = () => ({
    type: "GET_USER_START",
  });

  export const getUserSuccess = (users) => ({
    type: "GET_USER_SUCCESS",
    payload: users,
  });


  export const deleteUserStart = () => ({
    type: "DELETE_USER_START",
  });

  export const deleteUserSuccess = (id) => ({
    type: "DELETE_USER_SUCCESS",
    payload: id,
  });