import React, { createContext, useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';

import { useStore } from '~/context/store';

// MOVE THIS!!
interface ITag {
  id: number,
  value: string,
  label: string,
}

interface ISearchParams {
  'f[tags]': string,
  'limit': number,
}

const initialState = {
  dataParams: {},
  serverParams: new URLSearchParams(),
  ready: false,
  setParam: Function.prototype,
  unsetParam: Function.prototype,
};

const SearchParamsContext = createContext(initialState);

const SearchParamsProvider = (props) => {
  const { pathname, search } = useLocation();
  const routerHistory = useHistory();
  const [records] = useStore('records');
  const [dataParams, setDataParams] = useState(initialState.dataParams);
  const [serverParams, setServerParams] = useState(initialState.serverParams);

  const clientToDataParam = (v, k) => {
    switch (k) {
      case 'f[tags]':
        return v.split(' ');
      default:
        return v;
    }
  };

  const dataToClientParam = (v, k) => {
    switch (k) {
      case 'f[tags]':
        return v.join('+');
      default:
        return v;
    }
  };

  const clientToServerParam = (v, k) => {
    switch (k) {
      case 'f[tags]':
        return v.split(' ').map((value) => {
          const target = Object.values(records.tags).find((tag: ITag) => tag.value === value);
          return target && (target as ITag).id;
        }).filter((id) => !!id).join(' ');
      default:
        return v;
    }
  };

  useEffect(() => {
    const newDataParams = {};
    new URLSearchParams(search).forEach((v, k) => {
      newDataParams[k] = clientToDataParam(v, k);
    });
    setDataParams(newDataParams);
  }, []);

  useEffect(() => {
    const newServerParams = new URLSearchParams();
    new URLSearchParams(search).forEach((v, k) => {
      newServerParams.append(k, clientToServerParam(v, k));
    });
    setServerParams(newServerParams);
  }, [search, records.tags]);

  const generateSearchString = (params) => {
    return Object.keys(params).reduce((acc, key, idx) => {
      return `${acc}${!!idx ? '&' : ''}${key}=${dataToClientParam(params[key], key)}`;
    }, '');
  };

  const setParam = (k, v) => {
    const newParams = { ...dataParams, [k]: v };
    setDataParams(newParams);
    routerHistory.push({ pathname, search: generateSearchString(newParams) });
  };

  const unsetParam = (k) => {
    const newParams = Object.keys(dataParams).reduce((newParams, key) => {
      return key === k ? newParams : { ...newParams, [key]: dataParams[key] };
    }, {});
    setDataParams(newParams);
    routerHistory.push({ pathname, search: generateSearchString(newParams) });
  };

  const ready = !!Object.values(records.tags).length;

  const value = { dataParams, serverParams, ready, setParam, unsetParam };

  return (
    <SearchParamsContext.Provider value={value}>
      {props.children}
    </SearchParamsContext.Provider>
  );
};

export default SearchParamsContext;
export { SearchParamsProvider };
