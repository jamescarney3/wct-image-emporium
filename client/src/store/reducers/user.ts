
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
  // signIn: there is no signIn, you're never signing in asychronously because
  // rails pre-hydrates the wctAuthenticated window prop on initialize, either
  // from the twitter auth callback or from your session token on initial req
  signOut: () => (dispatch) => {
    fetch('/auth/sessions', {
      credentials: 'same-origin',
      headers: { // lol this sucks, make a service
        'Content-Type': 'application/json',
        'X-CSRF-Token': (document.getElementsByName('csrf-token')[0] as any).content,
      },
      method: 'DELETE',
    }).then((res) => {
      dispatch({ type: actionTypes.SIGN_OUT });
    }).catch((err) => {
      alert('oopsie');
    });
  },
};

export { userActionCreators };
export default userReducer;
