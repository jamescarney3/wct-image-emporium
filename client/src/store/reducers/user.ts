import { get, destroy } from './utils';

const actionTypes = {
  FETCH: 'USER::FETCH',
  SIGN_IN: 'USER::SIGN_IN',
  SIGN_OUT: 'USER::SIGN_OUT',
  ERROR: 'USER::ERROR',
  CLEAR: 'USER::CLEAR',
};

const asyncBase = {
  error: null,
  pending: false,
};
// hydrating this from the rails server - weird pattern but we can probably
// spin less since we're only ever doing cookie auth... writing stuff to the
// DOM is ugly, so sue me
const initialState = {
  ...asyncBase,
  data: null,
  signedIn: !!(window as any).wctAuthenticated,
  pending: !(window as any).wctAuthenticated,
};

// at least we're clearing up after ourselves
delete (window as any).wctAuthenticated;

const userReducer = (state = initialState, action): {} => {
  switch (action.type) {
    case actionTypes.FETCH:
      return { ...state, ...asyncBase, pending: true };
    case actionTypes.ERROR:
      return { ...state, ...asyncBase, error: action.error };
    case actionTypes.SIGN_IN:
      return { ...state, ...asyncBase, signedIn: true, data: action.data };
    case actionTypes.SIGN_OUT:
      return { ...state, ...asyncBase, signedIn: false, data: null };
    case actionTypes.CLEAR:
      return { ...state, ...asyncBase };
    default:
      return state;
  }
};

const userActionCreators = {
  // signIn: there is no signIn, you're never signing in asychronously because
  // rails pre-hydrates the wctAuthenticated window prop on initialize, either
  // from the twitter auth callback or from your session token on initial req
  signOut: () => (dispatch) => {
    destroy(
      '/auth/sessions',
    ).then((res) => {
      dispatch({ type: actionTypes.SIGN_OUT });
    }).catch((err) => {
      dispatch({ type: actionTypes.ERROR, error: err });
    });
  },
  fetch: () => (dispatch) => {
    get(
      '/auth/sessions',
    ).then((res) => {
      if (res.id) {
        dispatch({ type: actionTypes.SIGN_IN, data: res });
      } else {
        dispatch({ type: actionTypes.CLEAR });
      }
    }).catch((err) => {
      dispatch({ type: actionTypes.ERROR, error: err });
    });
  },
};

export { userActionCreators };
export default userReducer;
