const headers = process.env.NODE_ENV === 'production' && {
  'X-CSRF-Token': (document.getElementsByName('csrf-token')[0] as any).content,
};

const credentials = process.env.NODE_ENV === 'production' && ('same-origin' as RequestCredentials);

const FETCH_OPTIONS = {
  ...headers,
  ...(credentials ? { credentials } : null),
};

const handleFetchError = (res) => {
  if (!res.ok) {
    return res.json().then((data) => {
      throw data.errors;
    });
  }
};

const injectNamespace = (actionType: string, namespace?: string, delimiter: string = '::' ) => {
  const prefix = namespace ? `${namespace}${delimiter}` : '';
  return `${prefix}${actionType}`;
};

const encodeQString = (params) => {
  const queryString = Object.keys(params).map((key) => (
    `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
  )).join('&');
  return queryString ? `?${queryString}` : '';
};

const post = (url, body) => {
  return fetch(url, {
    ...FETCH_OPTIONS, body, method: 'POST',
  }).then((res) => {
    return res.ok ? res.json() : handleFetchError(res);
  });
};

const put = (url, body) => {
  return fetch(url, {
    ...FETCH_OPTIONS, body, method: 'PUT',
  }).then((res) => {
    return res.ok ? res.json() : handleFetchError(res);
  });
};

const get = (url, params = {}) => {
  return fetch(url + encodeQString(params), {
    ...FETCH_OPTIONS, method: 'GET',
  }).then((res) => {
    return res.ok ? res.json() : handleFetchError(res);
  });
};

const destroy = (url) => {
  return fetch(url, {
    ...FETCH_OPTIONS, method: 'DELETE',
  }).then((res) => {
    return res.ok ? res.json() : handleFetchError(res);
  });
};

export { get, post, put, destroy, injectNamespace, encodeQString };
