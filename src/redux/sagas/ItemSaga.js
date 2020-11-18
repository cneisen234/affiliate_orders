
import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';


function* getitemlist(action) {
  try {
    //console.log('we are about to get Students', action.type);

    const response = yield axios.get(`/itemlist`);

    yield put({
      type: "SET_ITEM",
      payload: response.data,
    });

  } catch (error) {
    console.log("Error with getting the list of items:", error);
  }
}

function* getskulist(action) {
  try {
    //console.log('we are about to get Students', action.type);

    const response = yield axios.get(`/sku`);

    yield put({
      type: "SET_SKU",
      payload: response.data,
    });
  } catch (error) {
    console.log("Error with getting the list of items:", error);
  }
}

function* getoptionlist(action) {
  try {
    //console.log('we are about to get Students', action.type);

    const response = yield axios.get(`/options`);

    yield put({
      type: "SET_OPTION",
      payload: response.data,
    });
  } catch (error) {
    console.log("Error with getting the list of items:", error);
  }
}

function* getemaillist(action) {
  try {
    //console.log('we are about to get Students', action.type);

    const response = yield axios.get(`/email`);

    yield put({
      type: "SET_EMAIL",
      payload: response.data,
    });
    
  } catch (error) {
    console.log("Error with getting the list of items:", error);
  }
}

function* gettotallist(action) {
  try {
    //console.log('we are about to get Students', action.type);

    const response = yield axios.get(`/total`);

    yield put({
      type: "SET_TOTAL",
      payload: response.data,
    });
  } catch (error) {
    console.log("Error with getting the list of items:", error);
  }
}

function* checkEmail(action) {
  try {
    //passes the incoming new student user info from the payload to the server
    console.log("this is the payload", action.payload)
    const response = yield axios.post("/checkemail", action.payload);
     yield put({
      type: "SET_SKUNUM",
      payload: response.data,
    });

  } catch (error) {
    yield put({ type: "STUDENT_REGISTRATION_FAILED" });
  }
}




function* itemSaga() {
    yield takeLatest('GET_ITEM_LIST', getitemlist);
     yield takeLatest('GET_SKU_LIST', getskulist);
      yield takeLatest('GET_OPTION_LIST', getoptionlist);
        yield takeLatest('GET_EMAIL_LIST', getemaillist);
         yield takeLatest('CHECK_EMAIL', checkEmail);
          yield takeLatest('GET_TOTAL_LIST', gettotallist);
}

export default itemSaga;