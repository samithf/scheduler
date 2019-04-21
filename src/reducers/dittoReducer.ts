const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case "FETCH_DITTO_SUCCESS":
      return action.payload;
    default:
      return state;
  }
};
