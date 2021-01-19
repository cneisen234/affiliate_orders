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

const viewed = (state = [], action) => {
  switch (action.type) {
    case "SET_VIEWED":
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

const skulist = (state = [], action) => {
  switch (action.type) {
    case "SET_SKUS":
      return action.payload;
    default:
      return state;
  }
};

const detailslist = (state = [], action) => {
  switch (action.type) {
    case "SET_DETAILS":
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

const detailslist1 = (state = [], action) => {
  switch (action.type) {
    case "SET_DETAILS1":
      return action.payload;
    default:
      console.log("this is reducer", action.payload);
      return state;
  }
};

const detailslist2 = (state = [], action) => {
  switch (action.type) {
    case "SET_DETAILS2":
      return action.payload;
    default:
      return state;
  }
};

const detailslist3 = (state = [], action) => {
  switch (action.type) {
    case "SET_DETAILS3":
      return action.payload;
    default:
      return state;
  }
};

const detailslist4 = (state = [], action) => {
  switch (action.type) {
    case "SET_DETAILS4":
      return action.payload;
    default:
      return state;
  }
};

const detailslist5 = (state = [], action) => {
  switch (action.type) {
    case "SET_DETAILS5":
      return action.payload;
    default:
      return state;
  }
};

const detailslist6 = (state = [], action) => {
  switch (action.type) {
    case "SET_DETAILS6":
      return action.payload;
    default:
      return state;
  }
};

const detailslist7 = (state = [], action) => {
  switch (action.type) {
    case "SET_DETAILS7":
      return action.payload;
    default:
      return state;
  }
};

const detailslist8 = (state = [], action) => {
  switch (action.type) {
    case "SET_DETAILS8":
      return action.payload;
    default:
      return state;
  }
};

const detailslist9 = (state = [], action) => {
  switch (action.type) {
    case "SET_DETAILS9":
      return action.payload;
    default:
      return state;
  }
};


export default combineReducers({
  viewed,
  itemlist,
  skunumlist,
  skulist,
  detailslist,
  emaillist,
  totallist,
  detailslist1,
  detailslist2,
  detailslist3,
  detailslist4,
  detailslist5,
  detailslist6,
  detailslist7,
  detailslist8,
  detailslist9,
});