const initialState = {
  complaints: [],
  activeCompliants: [],
  newCompliants: [],
  solvedCompliants: [],
  allCompliants: [],
  allCompliantsCount: 0,
  newCompliantsCount: 0,
  activeCompliantsCount: 0,
  solvedCompliantsCount: 0,
  activeCheck: false,
  newCheck: false,
  solvedCheck: false,
  loading: false,
  error: false,
  editCompliant: {},
};
const compliantReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOADING":
      return { ...state, loading: true };
    case "ALL":
      let activeCheck = false;
      let solvedCheck = false;
      let newCheck = false;
      if (action.name == "active") {
        activeCheck = true;
      } else if (action.name == "new") {
        newCheck = true;
      } else {
        solvedCheck = true;
      }
      return {
        ...state,
        allCompliants: action.all,
        newCompliants: action.new,
        activeCompliants: action.active,
        solvedCompliants: action.solved,
        allCompliantsCount: action.allCount,
        activeCompliantsCount: action.activeCount,
        solvedCompliantsCount: action.solvedCount,
        newCompliantsCount: action.newCount,
        loading: false,
        activeCheck,
        newCheck,
        solvedCheck,
      };
    case "ADD_COMPLIANT":
      let allcompliants = [...state.allCompliants];
      allcompliants.push(action.compliant);
      let newcompliants = [...state.newCompliants];
      newcompliants.push(action.compliant);
      return {
        ...state,
        allCompliants: allcompliants,
        newCompliants: newcompliants,
        allCompliantsCount: state.allCompliantsCount + 1,
        newCompliantsCount: state.newCompliantsCount + 1,
        loading: false,
      };
    case "EDIT_COMPLIANT":
      return { ...state, editCompliant: action.editCompliant };
    case "UPDATE_COMPLIANT":
      let allupdatedcompliants = [...state.allCompliants];
      let activeupdatedcompliants = [...state.activeCompliants];
      let solvedupdatedcompliants = [...state.solvedCompliants];
      let newupdatedcompliants = [...state.newCompliants];
      allupdatedcompliants = allupdatedcompliants.map((compliant) => {
        if (compliant._id == action.compliant._id) {
          compliant.status = action.compliant.status;
        }
        return compliant;
      });
      newupdatedcompliants = allupdatedcompliants.filter((c) => {
        return c.status == "NEW";
      });
      activeupdatedcompliants = allupdatedcompliants.filter((c) => {
        return c.status == "ACTIVE";
      });
      solvedupdatedcompliants = allupdatedcompliants.filter((c) => {
        return c.status == "SOLVED";
      });
      return {
        ...state,
        allCompliants: allupdatedcompliants,
        activeCompliants: activeupdatedcompliants,
        solvedCompliants: solvedupdatedcompliants,
        newCompliants: newupdatedcompliants,
        activeCompliantsCount: activeupdatedcompliants.length,
        solvedCompliantsCount: solvedupdatedcompliants.length,
        newCompliantsCount: newupdatedcompliants.length,
        loading: false,
      };
    default:
      return state;
  }
};

export default compliantReducer;
