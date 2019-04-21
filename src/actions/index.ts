import pokeAPI from "../apis/pokeAPI";

// redux-thunk way
// export const fetchDittos = () => async dispatch => {
//     const response = await pokeAPI.get('/pokemon/ditto');
//     dispatch({ type: 'FETCH_DITTO', payload: response.data });
// };

// redux-saga way for async calls
export const fetchNews = () => ({
  type: "FETCH_DITTO"
});
