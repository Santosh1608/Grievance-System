const initialState = {
  user: JSON.parse(localStorage.getItem("user")),
  token: localStorage.getItem("token"),
  isLoading: false,
  isError: false,
};
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOADING":
      return { ...state, isLoading: true };
    case "SIGNUP":
    case "LOGIN":
      localStorage.setItem("token", action.details.token);
      localStorage.setItem("user", JSON.stringify(action.details.user));
      return { ...state, ...action.details, isLoading: false };
    case "UPDATE_PROFILE":
      localStorage.setItem("user", JSON.stringify(action.details.user));
      return { ...state, ...action.details, isLoading: false };
    case "ERROR":
      return { ...state, isError: true, isLoading: false };
    case "LOGOUT":
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      return { ...state, user: null, token: null };
    default:
      return state;
  }
};

export default authReducer;
