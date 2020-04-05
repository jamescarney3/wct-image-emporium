
const actionTypes = {
  SIGN_IN: 'SIGN_IN',
  SIGN_OUT: 'SIGN_OUT',
};

// hydrating this from the rails server - weird pattern but we can probably
// spin less since we're only ever doing cookie auth... writing stuff to the
// DOM is ugly, so sue me
const initialState = {
  signedIn: !!(window as any).wctAuthenticated,
};

// at least we're cleaning up after ourselves
delete (window as any).wctAuthenticated;

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
