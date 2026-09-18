export const resError = (message) => ({
  success: false,
  message
});

export const resSuccess = (data) => ({
  success: true,
  data
});