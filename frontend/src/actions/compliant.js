import axios from "axios";
export const getAllCompliants = (user, name) => async (dispatch) => {
  try {
    dispatch({ type: "LOADING" });
    const all = await axios.get(`/getAllCompliantsFor${user}`, {
      headers: {
        token: localStorage.getItem("token"),
      },
    });
    const newCompliants = all.data.filter((c) => {
      return c.status == "NEW";
    });
    const activeCompliants = all.data.filter((c) => {
      return c.status == "ACTIVE";
    });
    const solvedCompliants = all.data.filter((c) => {
      return c.status == "SOLVED";
    });
    dispatch({
      type: "ALL",
      solved: solvedCompliants,
      active: activeCompliants,
      new: newCompliants,
      all: all.data,
      allCount: all.data.length,
      activeCount: activeCompliants.length,
      newCount: newCompliants.length,
      solvedCount: solvedCompliants.length,
      name: name,
    });
  } catch (e) {
    dispatch({ type: "ERROR" });
  }
};

export const addCompliant = (details) => async (dispatch) => {
  try {
    dispatch({ type: "LOADING" });
    const res = await axios.post("/addCompliant", details, {
      headers: {
        token: localStorage.getItem("token"),
      },
    });
    const compliant = res.data;
    console.log(compliant);
    dispatch({ type: "ADD_COMPLIANT", compliant });
    dispatch({ type: "MODEL_CLOSE" });
  } catch (e) {
    console.log(e);
    dispatch({ type: "MODEL_CLOSE" });
    dispatch({ type: "ERROR" });
  }
};

export const updateCompliantByAdmin = (developerId, compliantId) => async (
  dispatch
) => {
  console.log(localStorage.getItem("token"));
  try {
    const res = await axios.put(
      `/updateCompliantByAdmin/${compliantId}/${developerId}`,
      {},
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
    const compliant = res.data;
    console.log(compliant);
    dispatch({ type: "UPDATE_COMPLIANT", compliant });
  } catch (e) {
    console.log("HELLO ERROR", e.response.data);
    // console.log(e.response.data);
    dispatch({ type: "ERROR" });
  }
};

export const updateCompliantByDeveloper = (compliantId, desc) => async (
  dispatch
) => {
  console.log(localStorage.getItem("token"));
  try {
    const res = await axios.put(
      `/updateCompliantByDeveloper/${compliantId}`,
      { desc },
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
    const compliant = res.data;
    console.log(compliant);
    dispatch({ type: "UPDATE_COMPLIANT", compliant });
    dispatch({ type: "MODEL_CLOSE" });
  } catch (e) {
    console.log(e.response.data);
    // console.log(e.response.data);
    dispatch({ type: "ERROR" });
  }
};

export const editCompliant = (c) => (dispatch) => {
  dispatch({ type: "EDIT_COMPLIANT", editCompliant: c });
  dispatch({ type: "MODEL_OPEN" });
};
