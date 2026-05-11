const jwt = require('jsonwebtoken');

const signAccess = (payload) =>
  jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '15m'
  });

const signRefresh = (payload) =>
  jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
    expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d'
  });

const verifyRefresh = (token) =>
  jwt.verify(token, process.env.JWT_REFRESH_SECRET);

const issueTokens = (user) => {
  const payload = { id: user.id, type: user.type, role: user.role };
  return {
    accessToken:  signAccess(payload),
    refreshToken: signRefresh(payload),
    user
  };
};

module.exports = { signAccess, signRefresh, verifyRefresh, issueTokens };
