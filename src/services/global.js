export const randomColor = () => `#${Math.floor(Math.random() * 16777215).toString(16)}`;

export function parseJwt(token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join(''),
  );

  return JSON.parse(jsonPayload);
}

export const isObjectEmpty = (obj = {}) => Object.keys(obj).length === 0;

export const formattedAmount = (amt, { locale = 'en-IN', currency = 'INR' }) =>
  new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(amt);

export const isAdmin = (user) => {
  if (!isObjectEmpty(user)) {
    return (
      user.role.role === 'Admin' && !Object.prototype.hasOwnProperty.call(user.role, 'permissions')
    );
  }
  return false;
};

export const isAuthorized = (permissions, path) => {
  return Object.prototype.hasOwnProperty.call(permissions, path);
};

export const extractPermissions = (store) => {
  return store?.user?.role?.permissions ?? {};
};

export const getPermission = (user) => (route) => {
  const access = user?.role?.permissions ?? {};

  return {
    isAuthorizedToRead: isAdmin(user) || Boolean(access?.[route]?.['read']),
    isAuthorizedToWrite: isAdmin(user) || Boolean(access?.[route]?.['write']),
    isAuthorizedToUpdate: isAdmin(user) || Boolean(access?.[route]?.['update']),
    isAuthorizedToDelete: isAdmin(user) || Boolean(access?.[route]?.['delete']),
  };
};

export const getFormError = (errors = {}) => {
  const requiredValues = Object.keys(errors).filter((itm) => errors[itm].type === 'required');
  if (requiredValues.length > 0) {
    return `${
      requiredValues.length > 1
        ? `${requiredValues.join(', ')} are required`
        : `${requiredValues.join(',')} is required`
    }`;
  }
};

export const getJobPostStatus = (status = {}) => {
  const { validTill } = status;
  return new Date(validTill).getTime() > new Date().getTime() ? 'Active' : 'Expired';
};

export const handleCopyLink = (text) => {
  navigator.clipboard.writeText(text);
};

export const percentCompleted = (progressEvent) =>
  Math.round((progressEvent.loaded * 100) / progressEvent.total);

export const getSingularPlular = (item, text) => {
  return item > 1 ? `${item} ${text}s` : `${item} ${text}`;
};
