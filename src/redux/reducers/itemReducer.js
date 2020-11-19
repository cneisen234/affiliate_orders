import { combineReducers } from "redux";

const itemlist = (state = [], action) => {
  switch (action.type) {
    case "SET_ITEM":
      return action.payload;
    default:
      return state;
  }
};

const totallist = (state = [], action) => {
  switch (action.type) {
    case "SET_TOTAL":
      return action.payload;
    default:
      return state;
  }
};
const skunumlist = (state = [], action) => {
  switch (action.type) {
    case "SET_SKUNUM":
      return action.payload;
    default:
      return state;
  }
};
const emaillist = (state = [], action) => {
  switch (action.type) {
    case "SET_EMAIL":
      return action.payload;
    default:
      return state;
  }
};


export default combineReducers({
  itemlist,
  skunumlist,
  emaillist,
  totallist,
});