import axios from "axios";

export const getDevelopers = () => async (dispatch) => {
  try {
    const res = await axios.get("/getAllDevelopers", {
      headers: {
        token: localStorage.getItem("token"),
      },
    });
    const developers = res.data;
    dispatch({ type: "GET_DEVELOPERS", developers });
  } catch (e) {
    dispatch({ type: "ERROR" });
  }
};

export const addDeveloper = (details) => async (dispatch) => {
  try {
    const res = await axios.post("/addDeveloper", details, {
      headers: {
        token: localStorage.getItem("token"),
      },
    });
    console.log(res.data);
    dispatch({ type: "ADD_DEVELOPER", developer: res.data });
    dispatch({ type: "MODEL_CLOSE" });
  } catch (e) {
    console.log("ERROR OCCURED", e);
    dispatch({ type: "ERROR" });
  }
};

export const removeDeveloper = (dId) => async (dispatch) => {
  const res = await axios.delete(`/deleteDeveloper/${dId}`, {
    headers: {
      token: localStorage.getItem("token"),
    },
  });
  const deletedDeveloper = res.data;
  console.log(deletedDeveloper);
  dispatch({
    type: "REMOVE_DEVELOPER",
    dId: deletedDeveloper.removedDeveloper._id,
  });
};
