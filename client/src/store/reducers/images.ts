import { get, post, destroy, put, injectNamespace } from './utils';
import { actionTypes as recordsActionTypes } from './records';

const actionTypes = {
  FETCH: 'IMAGES::FETCH',
  CREATE: 'IMAGES::CREATE',
  UPDATE: 'IMAGES::UPDATE',
  DELETE: 'IMAGES::DELETE',
  ERROR: 'IMAGES::ERROR',
  REQUEST: 'IMAGES::REQUEST',
  CLEAN: 'IMAGES::CLEAN',
};

const asyncBase = {
  created: null,
  updated: null,
  deleted: null,
  error: null,
  loading: null,
};

const initialState = { data: [], ...asyncBase };

const imagesReducerFactory = (namespace?: string) => (state = initialState, action): {} => {
  switch (action.type) {
    case injectNamespace(actionTypes.FETCH, namespace):
      return { ...asyncBase, data: action.data.map((image) => image.id) };
    case injectNamespace(actionTypes.CREATE, namespace):
      return { ...asyncBase, data: [...state.data, action.data.id], created: action.data };
    case injectNamespace(actionTypes.UPDATE, namespace):
      return { ...asyncBase, data: state.data, updated: action.data };
    case injectNamespace(actionTypes.DELETE, namespace):
      return { ...asyncBase, data: state.data.filter((id) => id !== action.data.id), deleted: action.data };
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
      '/api/images', formData,
    ).then((data) => {
      const { tags, ...rest } = data;
      dispatch({ type: recordsActionTypes.MERGE_RECORDS, recordType: 'tags', data: tags });
      dispatch({ type: recordsActionTypes.MERGE_RECORD, recordType: 'images', data: rest });
      dispatch({ type: injectNamespace(actionTypes.CREATE, namespace), data });
    }).catch((err) => {
      dispatch({ type: injectNamespace(actionTypes.ERROR, namespace), error: err });
    });
  },
  show: (id) => (dispatch) => {
    dispatch({ type: injectNamespace(actionTypes.REQUEST, namespace) });
    get(
      `/api/images/${id}`,
    ).then((data) => {
      const { tags, ...rest } = data;
      dispatch({ type: recordsActionTypes.MERGE_RECORDS, recordType: 'tags', data: tags });
      dispatch({ type: recordsActionTypes.MERGE_RECORD, recordType: 'images', data: rest });
      dispatch({ type: injectNamespace(actionTypes.FETCH, namespace), data: [rest] });
    }).catch((err) => {
      dispatch({ type: injectNamespace(actionTypes.ERROR, namespace), error: err });
    });
  },
  update: (id, formData) => (dispatch) => {
    dispatch({ type: injectNamespace(actionTypes.REQUEST, namespace) });
    put(
      `/api/images/${id}`, formData,
    ).then((data) => {
      const { tags, ...rest } = data;
      dispatch({ type: recordsActionTypes.MERGE_RECORDS, recordType: 'tags', data: tags });
      dispatch({ type: recordsActionTypes.MERGE_RECORD, recordType: 'images', data: rest });
      dispatch({ type: injectNamespace(actionTypes.UPDATE, namespace), data });
    }).catch((err) => {
      dispatch({ type: injectNamespace(actionTypes.ERROR, namespace), error: err });
    });
  },
  random: (id) => (dispatch) => {
    dispatch({ type: injectNamespace(actionTypes.REQUEST, namespace) });
    get(
      `/api/images/random?limit=8`,
    ).then((data) => {
      const { tags, ...rest } = data;
      dispatch({ type: recordsActionTypes.MERGE_RECORDS, recordType: 'tags', data: tags });
      dispatch({ type: recordsActionTypes.MERGE_RECORD, recordType: 'images', data: rest });
      dispatch({ type: injectNamespace(actionTypes.FETCH, namespace), data: [rest] });
    }).catch((err) => {
      dispatch({ type: injectNamespace(actionTypes.ERROR, namespace), error: err });
    });
  },
  index: (params) => (dispatch) => {
    dispatch({ type: injectNamespace(actionTypes.REQUEST, namespace) });
    get(
      '/api/images',
      params,
    ).then((data) => {
      const { images, tags } = data.reduce((acc, image) => {
        const { tags: tagRecords, ...rest } = image;
        const imageRecord = rest;
        return { images: [...acc.images, imageRecord], tags: [...acc.tags, ...tagRecords] };
      }, { images: [], tags: [] });
      dispatch({ type: recordsActionTypes.MERGE_RECORDS, recordType: 'tags', data: tags });
      dispatch({ type: recordsActionTypes.MERGE_RECORDS, recordType: 'images', data: images });
      dispatch({ type: injectNamespace(actionTypes.FETCH, namespace), data });
    }).catch((err) => {
      dispatch({ type: injectNamespace(actionTypes.ERROR, namespace), error: err });
    });
  },
  sample: (params) => (dispatch) => {
    dispatch({ type: injectNamespace(actionTypes.REQUEST, namespace) });
    get(
      '/api/images/sample', params,
    ).then((data) => {
      const { images, tags } = data.reduce((acc, image) => {
        const { tags: tagRecords, ...rest } = image;
        const imageRecord = rest;
        return { images: [...acc.images, imageRecord], tags: [...acc.tags, ...tagRecords] };
      }, { images: [], tags: [] });
      dispatch({ type: recordsActionTypes.MERGE_RECORDS, recordType: 'tags', data: tags });
      dispatch({ type: recordsActionTypes.MERGE_RECORDS, recordType: 'images', data: images });
      dispatch({ type: injectNamespace(actionTypes.FETCH, namespace), data });
    }).catch((err) => {
      dispatch({ type: injectNamespace(actionTypes.ERROR, namespace), error: err });
    });
  },
  destroy: (id) => (dispatch) => {
    dispatch({ type: injectNamespace(actionTypes.REQUEST, namespace) });
    destroy(
      `/api/images/${id}`,
    ).then((data) => {
      const { tags, ...rest } = data;
      dispatch({ type: injectNamespace(actionTypes.DELETE, namespace), data: rest });
    }).catch((err) => {
      dispatch({ type: injectNamespace(actionTypes.ERROR, namespace), error: err });
    });
  },
  clear: () => ({ type: injectNamespace(actionTypes.CLEAN, namespace) }),
});


export { actionCreatorsFactory };
export default imagesReducerFactory;
