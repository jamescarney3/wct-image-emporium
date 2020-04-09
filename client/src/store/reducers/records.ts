
const actionTypes = {
  MERGE_RECORD: 'RECORDS::MERGE_ENTITY',
  MERGE_RECORDS: 'RECORDS::MERGE_ENTITIES',
};

const initialState = {
  images: {},
  tags: {},
};

const recordsReducer = (state = initialState, action) => {
  const { recordType, data } = action;
  switch (action.type) {

    case actionTypes.MERGE_RECORDS:
      const records = data.reduce((acc, el) => {
        return { ...acc, [el.id]: el };
      }, {});
      return { ...state, [recordType]: { ...state[recordType], ...records } };

    case actionTypes.MERGE_RECORD:
      return { ...state, [recordType]: { ...state[recordType], [data.id]: data }};

    default:
      return state;
  }
};

const actionCreators = {
  mergeRecord: (recordType, data) => ({ type: actionTypes.MERGE_RECORD, recordType, data }),
  mergeRecords: (recordType, data) => ({ type: actionTypes.MERGE_RECORDS, recordType, data }),
};

export { actionTypes, actionCreators };
export default recordsReducer;
