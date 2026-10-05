

// [VAL-BE-03] 404 Not Found Handler for unmatched routes or missing resources
const notFoundHandler = (req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Not Found - Route ${req.originalUrl} does not exist`
  });
};

module.exports = { notFoundHandler };