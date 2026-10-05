// backend/utils/apiResponse.js
// Standardizes success and error payloads across backend contracts
const sendSuccess = (res, statusCode = 200, data = null, message = null) => {
  const response = { success: true };
  if (data !== null) response.data = data;
  if (message !== null) response.message = message;
  return res.status(statusCode).json(response);
};

const sendError = (res, statusCode = 400, message = 'An error occurred') => {
  return res.status(statusCode).json({
    success: false,
    message: message
  });
};

module.exports = { sendSuccess, sendError };