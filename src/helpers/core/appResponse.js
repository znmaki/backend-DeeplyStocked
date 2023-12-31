const appResponse = ({
  res,
  code = 200,
  status = true,
  message,
  body,
  options,
}) => {
  res.status(code).json({
    status,
    message,
    body,
    options,
  });
};

module.exports = { appResponse };
