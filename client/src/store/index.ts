import { bindActionCreators, combineReducers, createStore } from 'redux';

import user, { userActionCreators } from './reducers/user';


const store = createStore(combineReducers({ user }));

const actionCreators = {
  user: bindActionCreators(userActionCreators, store.dispatch),
};

export { actionCreators };
export default store;
