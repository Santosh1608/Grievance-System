import axios from "axios";
export const signup = (details) => async (dispatch) => {
  try {
    dispatch({ type: "LOADING" });
    const res = await axios.post("/signup", details);
    console.log(res.data);
    dispatch({ type: "SIGNUP", details: res.data });
  } catch (e) {
    console.log("ERROR OCCURED", e);
    dispatch({ type: "ERROR" });
  }
};
export const login = (details) => async (dispatch) => {
  try {
    dispatch({ type: "LOADING" });
    const res = await axios.post("/signin", details);
    console.log(res.data);
    dispatch({ type: "LOGIN", details: res.data });
  } catch (e) {
    console.log("ERROR OCCURED", e);
    dispatch({ type: "ERROR" });
  }
};
export const updateProfile = (details, history) => async (dispatch) => {
  try {
    dispatch({ type: "LOADING" });
    const res = await axios.put("/updateProfile", details, {
      headers: {
        token: localStorage.getItem("token"),
      },
    });
    console.log(res.data);
    dispatch({ type: "UPDATE_PROFILE", details: { user: res.data } });
    history.replace("/");
  } catch (e) {
    console.log("ERROR OCCURED", e);
    dispatch({ type: "ERROR" });
  }
};

export const logout = () => {
  return {
    type: "LOGOUT",
  };
};
