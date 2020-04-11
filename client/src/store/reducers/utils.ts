
const CSRF_TOKEN = (document.getElementsByName('csrf-token')[0] as any).content;

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

const post = (url, body) => {
  return fetch(url, {
    body,
    credentials: 'same-origin',
    headers: { 'X-CSRF-Token': CSRF_TOKEN },
    method: 'POST',
  }).then((res) => {
    return res.ok ? res.json() : handleFetchError(res);
  });
};

const get = (url) => {
  return fetch(url, {
    credentials: 'same-origin',
    headers: { 'X-CSRF-Token': CSRF_TOKEN },
    method: 'GET',
  }).then((res) => {
    (window as any).res = res;
    return res.ok ? res.json() : handleFetchError(res);
  });
};

export { get, post, injectNamespace };
