export const errorMessage = (message) => {
  return sendNotification({ message, type: 'error' });
};

export const successMessage = (message) => {
  return sendNotification({ message, type: 'success' });
};

export const sendNotification = (data) => {
  document.dispatchEvent(new CustomEvent('siteNotification', { detail: data }));
};
