import { put } from "redux-saga/effects";
import pokeAPI from "../apis/pokeAPI";

export default function* fetchNews() {
  const response = yield pokeAPI.get("/pokemon/ditto");
  yield put({ type: "FETCH_DITTO_SUCCESS", payload: response.data });
}
