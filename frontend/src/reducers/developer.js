const initialState = {
  developers: [],
};
const developerReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_DEVELOPERS":
      return { ...state, developers: action.developers };
    case "ADD_DEVELOPER":
      let developers = [...state.developers];
      developers.push(action.developer);
      return { ...state, developers: developers };
    case "REMOVE_DEVELOPER":
      let updateddevelopers = [...state.developers];
      updateddevelopers = updateddevelopers.filter((developer) => {
        return developer._id != action.dId;
      });
      return { ...state, developers: updateddevelopers };
    default:
      return state;
  }
};

export default developerReducer;
