import cookie from 'react-cookies';

export const setCookie = (id, data, options) => {
  cookie.save(id, data, options);
};

export const removeCookie = (id) => {
  cookie.remove(id, { path: '/' });
};

export const getCookie = (id) => {
  return cookie.load(id);
};
