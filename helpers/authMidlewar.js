const jwt = require("jsonwebtoken");

module.exports = AuthMiddleware = (req, res, next) => {
  let token = req.header("auth-token");
  if (!token) {
    return res.status(404).send({ msg: "You are not authorized" });
  } else {
    jwt.verify(token, "123", (err, payload) => {
      if (err) {
        throw err.message;
      } else {
        req.userId = payload.userId;
        next();
      }
    });
  }
};