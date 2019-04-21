import { all, takeLatest } from "redux-saga/effects";
import fetchNews from "./fetchDittos";

function* actionWatcher() {
  yield takeLatest("FETCH_DITTO", fetchNews);
}

export default function* rootSaga() {
  yield all([actionWatcher()]);
}
