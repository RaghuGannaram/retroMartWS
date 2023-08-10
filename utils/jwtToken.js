const sendToken = (user, statusCode, res) => {
  const token = user.getJWTToken();

  const { __v, avatar, password, ...userInfo } = user._doc;
  userInfo.avatar = avatar.url;

  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  res.status(statusCode).cookie("token", token, options).json({ ...userInfo });
};

module.exports = sendToken;
