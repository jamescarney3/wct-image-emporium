import { bindActionCreators, combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import user, { userActionCreators } from './reducers/user';


const store = createStore(combineReducers({ user }), applyMiddleware(thunk));

const actionCreators = {
  user: bindActionCreators(userActionCreators, store.dispatch),
};

export { actionCreators };
export default store;
