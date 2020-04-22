import { bindActionCreators, combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import imagesReducerFactory, { actionCreatorsFactory as imagesACF } from './reducers/images';
import tagsReducerFactory, { actionCreatorsFactory as tagsACF } from './reducers/tags';
import recordsReducer, { actionCreators as recordsActionCreators } from './reducers/records';
import userReducer, { userActionCreators } from './reducers/user';


const reducers = {
  adminImages: imagesReducerFactory('ADMIN'),
  images: imagesReducerFactory(),
  randomImages: imagesReducerFactory('RANDOM'),
  allTags: tagsReducerFactory('ALL'),
  records: recordsReducer,
  user: userReducer,
  lastAction: (state = null, action) => action,
};

const store = createStore(combineReducers(reducers), applyMiddleware(thunk));
// const unsubscribe = store.subscribe(() => console.log(store.getState().lastAction));

const actionCreators = {
  adminImages: bindActionCreators(imagesACF('ADMIN'), store.dispatch),
  images: bindActionCreators(imagesACF(), store.dispatch),
  randomImages: bindActionCreators(imagesACF('RANDOM'), store.dispatch),
  allTags: bindActionCreators(tagsACF('ALL'), store.dispatch),
  records: bindActionCreators(recordsActionCreators, store.dispatch),
  user: bindActionCreators(userActionCreators, store.dispatch),
};

export { actionCreators };
export default store;
