import { USER_LIST } from '../actions/actionTypes';
import { put, takeEvery } from "redux-saga/effects";
import { setUserList } from '../actions/apiAction';
import axios from 'axios';

function* getUserList() {
    let data = yield axios.get(`https://reqres.in/api/users`);
    data = yield data.data;
    console.log("SAGA => ", data)
    yield put(setUserList(data))
}

function* SagaData() {
    yield takeEvery(USER_LIST, getUserList);
}

export default SagaData;
