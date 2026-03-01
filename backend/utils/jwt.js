const jwt = require("jsonwebtoken");
exports.generateToken = (userId) => {
  const payload = { id: userId };

  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" });
};

exports.verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};
