import { bindActionCreators, combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import imagesReducerFactory, { actionCreatorsFactory as imagesACF } from './reducers/images';
import tagsReducerFactory, { actionCreatorsFactory as tagsACF } from './reducers/tags';
import recordsReducer, { actionCreators as recordsActionCreators } from './reducers/records';
import userReducer, { userActionCreators } from './reducers/user';


const reducers = {
  adminImages: imagesReducerFactory('ADMIN'),
  images: imagesReducerFactory(),
  allTags: tagsReducerFactory('ALL'),
  records: recordsReducer,
  user: userReducer,
};

const store = createStore(combineReducers(reducers), applyMiddleware(thunk));

const actionCreators = {
  adminImages: bindActionCreators(imagesACF('ADMIN'), store.dispatch),
  images: bindActionCreators(imagesACF(), store.dispatch),
  allTags: bindActionCreators(tagsACF('ALL'), store.dispatch),
  records: bindActionCreators(recordsActionCreators, store.dispatch),
  user: bindActionCreators(userActionCreators, store.dispatch),
};

(window as any).store = store;

export { actionCreators };
export default store;
