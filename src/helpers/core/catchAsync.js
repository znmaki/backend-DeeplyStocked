const catchAsync = func => (req, res, next) =>
  Promise.resolve(func(req, res, next)).catch(next);

module.exports = {
  catchAsync,
};
