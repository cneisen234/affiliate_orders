
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
     console.log("this is response.data in sagas", response.data)
     yield put({
      type: "SET_SKUNUM",
      payload: response.data,
    });

  } catch (error) {
    yield put({ type: "STUDENT_REGISTRATION_FAILED" });
  }
}

function* orderDetails(action) {
  try {
    //passes the incoming new student user info from the payload to the server
    console.log("this is the payload", action.payload);
    const response = yield axios.post("/orderdetails", action.payload);
    console.log("this is response.data in sagas", response.data)
    yield put({
      type: "SET_DETAILS",
      payload: response.data,
    })
  
    
  } catch (error) {
    yield put({ type: "STUDENT_REGISTRATION_FAILED" });
  }
}

function* deleteItemRange(action) {
  try {
    console.log("we are about to delete everything from 1 year ago", action.payload);
    yield axios.delete(`/deleteitemrange`);

    yield put({ type: "GET_ITEM_LIST" });
    yield put({ type: "GET_EMAIL_LIST" });
  
  } catch (error) {
    console.log("Error with adding a new item:", error);
  }
}

function* deleteSkuRange(action) {
  try {
    console.log(
      "we are about to delete everything from 1 year ago",
      action.payload
    );
    yield axios.delete(`/deleteskurange`);

    yield put({ type: "GET_TOTAL_LIST" });
  } catch (error) {
    console.log("Error with adding a new item:", error);
  }
}




function* itemSaga() {
    yield takeLatest('GET_ITEM_LIST', getitemlist);
        yield takeLatest('GET_EMAIL_LIST', getemaillist);
         yield takeLatest('CHECK_EMAIL', checkEmail);
         yield takeLatest('ORDER_DETAILS', orderDetails);
          yield takeLatest('GET_TOTAL_LIST', gettotallist);
          yield takeLatest('DELETE_ITEM_RANGE', deleteItemRange);
          yield takeLatest('DELETE_SKU_RANGE', deleteSkuRange);
}

export default itemSaga;