import React, { useState, useEffect, createContext } from 'react';
import { useLocation, useHistory } from 'react-router-dom';

import { useStore, useAccessors } from '~/context/store';


interface ITag {
  id: number,
  value: string,
  label: string,
}

// url query value => data value transformer
const clientToDataParam = (v, k) => {
  switch (k) {
    case 'f[tags]':
      return v.split(' ');
    default:
      return v;
  }
};

// data value => url query value transformer
const dataToClientParam = (v, k) => {
  switch (k) {
    case 'f[tags]':
      return v.join('+');
    default:
      return v;
  }
};

const initialState = {
  dataParams: ({} as any),
  serverParams: null,
  mergeServerParams: Function.prototype,
  setParam: Function.prototype,
  setParams: Function.prototype,
  unsetParam: Function.prototype,
  unsetParams: Function.prototype,
};

const SearchParamsContext = createContext(initialState);

const SearchParamsProvider = (props) => {
  // listen to all tags store and get its methods, use store accessors
  const [allTags] = useStore('allTags');
  const { tagsCollection } = useAccessors();

  // listen to router state, get history object to update location
  const { pathname, search } = useLocation();
  const routerHistory = useHistory();

  // ergonomic representation of url search params
  const [dataParams, setDataParams] = useState(initialState.dataParams);
  // server mungible representation of data params
  const [serverParams, setServerParams] = useState(null);

  // data value => API query value transformer
  const dataToAPIParam = (v, k) => {
    switch (k) {
      case 'f[tags]':
        return v.map((value) => {
          const target = tagsCollection(allTags.data).find((tag: ITag) => tag.value === value);
          return target && (target as ITag).id;
        }).filter((id) => !!id).join(' ');
      default:
        return v;
    }
  };

  // read url search, serialize & set as state whenever it changes
  useEffect(() => {
    const newDataParams = {};
    new URLSearchParams(search).forEach((v, k) => {
      newDataParams[k] = clientToDataParam(v, k);
    });
    setDataParams(newDataParams);
  }, [search]);

  // compose a new server URL search params object and set state when data params change
  useEffect(() => {
    const dataKeys = Object.keys(dataParams);
    if (dataKeys.length && allTags.fetched) {
      const newServerParams = new URLSearchParams(dataKeys.reduce((acc, el) => {
        return { ...acc, [el]: dataToAPIParam(dataParams[el], el) };
      }, {}));
      setServerParams(newServerParams);
    } else {
      setServerParams(null);
    }
  }, [dataParams, allTags.fetched]);

  // nice if the search string is human readable
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

  const setParams = (params) => {
    const newParams = { ...dataParams, ...params };
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

  const unsetParams = (keys) => {
    const newParams = Object.keys(dataParams).reduce((newParams, key) => {
      return keys.includes(key) ? newParams : { ...newParams, [key]: dataParams[key] };
    }, {});
    setDataParams(newParams);
    routerHistory.push({ pathname, search: generateSearchString(newParams) });
  };

  const mergeServerParams = (params) => {
    const mergedParams = new URLSearchParams(serverParams);
    Object.entries(params).forEach(([k, v]: [string, string]) => { mergedParams.set(k, v); });
    return mergedParams;
  };

  const value = { dataParams, serverParams, mergeServerParams, setParam, setParams, unsetParam, unsetParams };

  return (
    <SearchParamsContext.Provider value={value}>
      {props.children}
    </SearchParamsContext.Provider>
  );
};

export default SearchParamsContext;
export { SearchParamsProvider };
