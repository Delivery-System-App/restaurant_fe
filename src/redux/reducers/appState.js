import { actions } from "../actions";

const initState = {
  loggedIn: false,
  heading: process.env.REACT_APP_NAME,
  theme: "light",
};

function appState(state = initState, action) {
  switch (action.type) {
    case actions.CHANGE_HEADING:
      return { ...state, heading: action.data };
    case actions.CHANGE_THEME:
      return { ...state, theme: action.data };
    default:
      return state;
  }
}

export default appState;
