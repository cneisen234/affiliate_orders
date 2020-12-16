
import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';


function* orderDetails1(action) {
  try {
    //passes the incoming new student user info from the payload to the server
    const response = yield axios.get("/orderdetails1", action.payload);
    console.log("this is response.data in sagas", response.data);
    yield put({
      type: "SET_DETAILS1",
      payload: response.data,
    });
  } catch (error) {
    yield put({ type: "STUDENT_REGISTRATION_FAILED" });
  }
}

function* orderDetails2(action) {
  try {
    //passes the incoming new student user info from the payload to the server
    const response = yield axios.get("/orderdetails2", action.payload);
    console.log("this is response.data in sagas", response.data);
    yield put({
      type: "SET_DETAILS2",
      payload: response.data,
    });
  } catch (error) {
    yield put({ type: "STUDENT_REGISTRATION_FAILED" });
  }
}

function* orderDetails3(action) {
  try {
    //passes the incoming new student user info from the payload to the server
    const response = yield axios.get("/orderdetails3", action.payload);
    console.log("this is response.data in sagas", response.data);
    yield put({
      type: "SET_DETAILS3",
      payload: response.data,
    });
  } catch (error) {
    yield put({ type: "STUDENT_REGISTRATION_FAILED" });
  }
}

function* orderDetails4(action) {
  try {
    //passes the incoming new student user info from the payload to the server
    const response = yield axios.get("/orderdetails4", action.payload);
    console.log("this is response.data in sagas", response.data);
    yield put({
      type: "SET_DETAILS4",
      payload: response.data,
    });
  } catch (error) {
    yield put({ type: "STUDENT_REGISTRATION_FAILED" });
  }
}

function* orderDetails5(action) {
  try {
    //passes the incoming new student user info from the payload to the server
    const response = yield axios.get("/orderdetails5", action.payload);
    console.log("this is response.data in sagas", response.data);
    yield put({
      type: "SET_DETAILS5",
      payload: response.data,
    });
  } catch (error) {
    yield put({ type: "STUDENT_REGISTRATION_FAILED" });
  }
}

function* orderDetails6(action) {
  try {
    //passes the incoming new student user info from the payload to the server
    const response = yield axios.get("/orderdetails6", action.payload);
    console.log("this is response.data in sagas", response.data);
    yield put({
      type: "SET_DETAILS6",
      payload: response.data,
    });
  } catch (error) {
    yield put({ type: "STUDENT_REGISTRATION_FAILED" });
  }
}

function* orderDetails7(action) {
  try {
    //passes the incoming new student user info from the payload to the server
    const response = yield axios.get("/orderdetails7", action.payload);
    console.log("this is response.data in sagas", response.data);
    yield put({
      type: "SET_DETAILS7",
      payload: response.data,
    });
  } catch (error) {
    yield put({ type: "STUDENT_REGISTRATION_FAILED" });
  }
}

function* orderDetails8(action) {
  try {
    //passes the incoming new student user info from the payload to the server
    const response = yield axios.get("/orderdetails8", action.payload);
    console.log("this is response.data in sagas", response.data);
    yield put({
      type: "SET_DETAILS8",
      payload: response.data,
    });
  } catch (error) {
    yield put({ type: "STUDENT_REGISTRATION_FAILED" });
  }
}

function* orderDetails9(action) {
  try {
    //passes the incoming new student user info from the payload to the server
    const response = yield axios.get("/orderdetails9", action.payload);
    console.log("this is response.data in sagas", response.data);
    yield put({
      type: "SET_DETAILS9",
      payload: response.data,
    });
  } catch (error) {
    yield put({ type: "STUDENT_REGISTRATION_FAILED" });
  }
}

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
          yield takeLatest('ORDER_DETAILS1', orderDetails1);
         yield takeLatest('ORDER_DETAILS2', orderDetails2);
         yield takeLatest('ORDER_DETAILS3', orderDetails3);
         yield takeLatest('ORDER_DETAILS4', orderDetails4);
         yield takeLatest('ORDER_DETAILS5', orderDetails5);
         yield takeLatest('ORDER_DETAILS6', orderDetails6);
         yield takeLatest('ORDER_DETAILS7', orderDetails7);
         yield takeLatest('ORDER_DETAILS8', orderDetails8);
         yield takeLatest('ORDER_DETAILS9', orderDetails9);
}

export default itemSaga;