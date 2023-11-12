const uuid = require('uuid');
const {
  buildUser,
  buildAccessToken,
  buildRefreshToken,
} = require('../helpers/builders');
const { catchAsync, appResponse, AppError } = require('../helpers/core');
const {
  bcryptHelper,
  jwtHelper,
  sendForgotPasswordEmail,
  sendActivationEmail,
} = require('../helpers/libs');
const { userService, tokenService } = require('../services');

exports.register = catchAsync(async (req, res) => {
  const user = buildUser(req.body);
  const isEmailAvailable = await userService.isEmailAvailable(user.email);

  if (!isEmailAvailable) throw new AppError('Email is already taken', 403);

  const activationToken = uuid.v4();

  await userService.create({
    ...user,
    activationToken,
  });

  sendActivationEmail({ user, token: activationToken });

  appResponse({
    res,
    status: 201,
    message: 'User created successfully',
  });
});

exports.login = catchAsync(async (req, res) => {
  const credentials = buildUser(req.body);
  const user = await userService.getOne({
    email: credentials.email,
    active: true,
  });

  if (!user)
    throw new AppError('Invalid credentials', 401, 'INVALID_CREDENTIALS');

  const processedUser = user.get({ plain: true });

  const isPasswordValid = await bcryptHelper.compare(
    credentials.password,
    processedUser.password,
  );

  if (!isPasswordValid)
    throw new AppError('Invalid credentials', 401, 'INVALID_CREDENTIALS');

  const accessToken = await buildAccessToken(processedUser);
  const refreshToken = await buildRefreshToken(processedUser);

  await tokenService.create(refreshToken);

  delete processedUser.password;

  appResponse({
    res,
    status: 200,
    message: 'Login successful',
    body: {
      user: processedUser,
      accessToken,
      refreshToken,
    },
  });
});

exports.logout = catchAsync(async (req, res) => {
  const { refreshToken } = req.body;

  const isTokenStored = await tokenService.validate(refreshToken);
  if (!isTokenStored) throw new AppError('Not found', 404, 'NOT_FOUND');

  await tokenService.consume(refreshToken);

  appResponse({
    res,
    status: 200,
    message: 'Logout succesfully',
  });
});

exports.refreshAccessToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.body;

  const isTokenStored = await tokenService.validate(refreshToken);
  if (!isTokenStored) throw new AppError('Not found', 404, 'NOT_FOUND');

  const { sub: id, context } = jwtHelper.decode(refreshToken);

  const accessToken = await buildAccessToken({ id, ...context });

  appResponse({
    res,
    status: 200,
    body: {
      accessToken,
    },
  });
});

exports.forgotPassword = catchAsync(async (req, res) => {
  const { email } = req.body;

  const user = await userService.getOne({ email });
  if (!user) throw new AppError('Not found', 404, 'NOT_FOUND');

  const token = uuid.v4();
  await userService.update(user.id, { recoverToken: token });

  sendForgotPasswordEmail({ user, token });

  appResponse({
    res,
    status: 200,
    message: 'Token created successfully',
  });
});

exports.resetPassword = catchAsync(async (req, res) => {
  const { token } = req.query;
  const { password } = req.body;

  const user = await userService.getOne({ recoverToken: token });
  if (!user) throw new AppError('Not found', 404, 'NOT_FOUND');

  const hashedPassword = await bcryptHelper.hash(password);

  await userService.update(user.id, {
    password: hashedPassword,
    recoverToken: null,
  });

  appResponse({
    res,
    status: 200,
    message: 'Password updated successfully',
  });
});

exports.activate = catchAsync(async (req, res) => {
  const { token } = req.query;

  const user = await userService.getOne({ activationToken: token });
  if (!user) throw new AppError('Not found', 404, 'NOT_FOUND');

  await userService.update(user.id, { active: true, activationToken: null });

  appResponse({
    res,
    status: 200,
    message: 'Account activated successfully',
  });
});
