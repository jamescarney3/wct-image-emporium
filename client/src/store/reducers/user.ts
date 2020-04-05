
const actionTypes = {
  SIGN_IN: 'SIGN_IN',
  SIGN_OUT: 'SIGN_OUT',
};

const initialState = {
  signedIn: false,
};

const userReducer = (state = initialState, action): {} => {
  switch (action.type) {
    case actionTypes.SIGN_IN:
      return { ...state, signedIn: true };
    case actionTypes.SIGN_OUT:
      return { ...state, signedIn: false };
    default:
      return state;
  }
};

const userActionCreators = {
  signIn: () => ({ type: actionTypes.SIGN_IN }),
  signOut: () => ({ type: actionTypes.SIGN_OUT }),
};

export { userActionCreators };
export default userReducer;
