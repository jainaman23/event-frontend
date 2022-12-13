import * as actionTypes from './actions';

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.IS_LOGGED_IN:
      return {
        ...state,
        isLogin: action.payload.login,
      };
    case actionTypes.ADD_USER_DATA:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
