export const resError = (message, data) => ({
  success: false,
  message,
  data
});

export const resSuccess = (data) => ({
  success: true,
  data
});