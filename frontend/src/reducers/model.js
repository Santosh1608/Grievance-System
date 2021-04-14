const initialState = {
  isModelOpen: false,
};
const modelReducer = (state = initialState, action) => {
  switch (action.type) {
    case "MODEL_OPEN":
      return { ...state, isModelOpen: true };
    case "MODEL_CLOSE":
      return { ...state, isModelOpen: false };
    default:
      return state;
  }
};

export default modelReducer;
