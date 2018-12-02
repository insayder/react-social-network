const initialState = {items: [] };

export default function(state = initialState, action) {
  switch (action.type) {
    case "CREATE_TASK":
      return { ...state, items: action.payload };
    case "DELETE_TASK":
      return { ...state, items: action.payload };
    case "TOGGLE_TASK":
      return { ...state, items: action.payload };
    default:
      return state;
  }
}