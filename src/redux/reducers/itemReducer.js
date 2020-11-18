import { combineReducers } from "redux";

const itemlist = (state = [], action) => {
  switch (action.type) {
    case "SET_ITEM":
      return action.payload;
    default:
      return state;
  }
};

const skulist = (state = [], action) => {
  switch (action.type) {
    case "SET_SKU":
      return action.payload;
    default:
      return state;
  }
};

const optionlist = (state = [], action) => {
  switch (action.type) {
    case "SET_OPTION":
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
// const progresslist = (state = [], action) => {
//   switch (action.type) {
//     case "SET_PROGRESS":
//       return action.payload;
//     default:
//       return state;
//   }
// };
// const completelist = (state = [], action) => {
//   switch (action.type) {
//     case "SET_COMPLETE":
//       return action.payload;
//     default:
//       return state;
//   }
// };


export default combineReducers({
  itemlist,
  skulist,
  optionlist,
  skunumlist,
  emaillist,
  totallist,
  // progresslist,
  // completelist,
});