const csrfToken = (() => {
  const tag = document.querySelector('[name=\'csrf-token\']');
  if (!tag) { return null; }
  return (tag as any).content;
})();

const headers = (() => {
  if (process.env.NODE_ENV !== 'production') { return null; }
  return ({
    'X-CSRF-Token': csrfToken,
  });
})();

const FETCH_OPTIONS = ({
  ...(headers ? { headers } : null),
} as RequestInit);

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

const constructUrl = (url, params) => {
  return params ? [url, params].join('?') : url;
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

const get = (url, params = '') => {
  return fetch(params ? [url, params].join('?') : url, {
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

export { get, post, put, destroy, injectNamespace, constructUrl };
