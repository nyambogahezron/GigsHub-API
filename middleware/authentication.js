const CustomError = require("../errors");
const { attachCookiesToResponse, isTokenValid } = require("../utils");

const authenticateUser = async (req, res, next) => {
  const { accessToken } = req.signedCookies;

  try {
    if (accessToken) {
      const payload = isTokenValid(accessToken);
      req.user = payload.user;
      return next();
    }
    const payload = isTokenValid(accessToken);

    if (!payload) {
      throw new CustomError.UnauthenticatedError("Authentication Invalid");
    }

    attachCookiesToResponse({
      res,
      user: payload.user,
    });

    req.user = payload.user;
    next();
  } catch (error) {
    throw new CustomError.UnauthenticatedError("Authentication Invalid");
  }
};

module.exports = {
  authenticateUser,
};
