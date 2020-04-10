import { get, post, injectNamespace } from './utils';
import { actionTypes as recordsActionTypes } from './records';


const actionTypes = {
  FETCH: 'TAGS::FETCH',
  CREATE: 'TAGS::CREATE',
  UPDATE: 'TAGS::UPDATE',
  DELETE: 'TAGS::DELETE',
  ERROR: 'TAGS::ERROR',
  REQUEST: 'TAGS::REQUEST',
  CLEAN: 'TAGS::CLEAN',
};

const asyncBase = {
  created: null,
  updated: null,
  deleted: null,
  error: null,
  loading: null,
};

const initialState = { ...asyncBase, data: [] };

const tagsReducerFactory = (namespace?: string) => (state = initialState, action) => {
  switch (action.type) {
    case injectNamespace(actionTypes.FETCH, namespace):
      return { ...asyncBase, data: action.data.map((tag) => tag.id) };
    case injectNamespace(actionTypes.CREATE, namespace):
      return { ...asyncBase, data: [...state.data, action.data.id], created: action.data };
    case injectNamespace(actionTypes.UPDATE, namespace):
      return { ...asyncBase, data: state.data, updated: action.data };
    case injectNamespace(actionTypes.DELETE, namespace):
      return { ...asyncBase, data: [/* data minus id */], deleted: action.data };
    case injectNamespace(actionTypes.REQUEST, namespace):
      return { ...asyncBase, data: state.data, loading: true };
    case injectNamespace(actionTypes.ERROR, namespace):
      return { ...asyncBase, data: state.data, error: action.error };
    case injectNamespace(actionTypes.CLEAN, namespace):
      return initialState;
    default:
      return state;
  }
};

const actionCreatorsFactory = (namespace?: string) => ({
  create: (formData) => (dispatch) => {
    dispatch({ type: injectNamespace(actionTypes.REQUEST, namespace) });
    post(
      '/api/tags', formData,
    ).then((data) => {
      dispatch({ type: recordsActionTypes.MERGE_RECORD, recordType: 'tags', data });
      dispatch({ type: injectNamespace(actionTypes.CREATE, namespace), data });
    }).catch((err) => {
      dispatch({ type: injectNamespace(actionTypes.ERROR, namespace), error: err });
    });
  },
  index: () => (dispatch) => {
    dispatch({ type: injectNamespace(actionTypes.REQUEST, namespace) });
    get(
      '/api/tags',
    ).then((data) => {
      dispatch({ type: recordsActionTypes.MERGE_RECORDS, recordType: 'tags', data });
      dispatch({ type: injectNamespace(actionTypes.FETCH, namespace), data });
    }).catch((err) => {
      dispatch({ type: injectNamespace(actionTypes.ERROR, namespace), error: err });
    });
  },
  clean: () => ({ type: injectNamespace(actionTypes.CLEAN, namespace) }),
});


export { actionCreatorsFactory };
export default tagsReducerFactory;
