import { removeCookie, getCookie } from './storage';

const ACCESS_TOKEN_KEY = 'token';

export function getAccessToken() {
  const ACCESS_TOKEN = getCookie(ACCESS_TOKEN_KEY);
  return ACCESS_TOKEN;
}

export function checkIfLoggedIn() {
  return getAccessToken() ? true : false;
}

export function logout() {
  removeCookie(ACCESS_TOKEN_KEY);
  window.location.reload();
  return null;
}

export function getServerHeaders(context) {
  const config = {};
  config['Authorization'] = `Bearer ${context.req.cookies[ACCESS_TOKEN_KEY]}`;

  return config;
}

const authServices = {
  getAccessToken,
  checkIfLoggedIn,
  logout,
};

export default authServices;
