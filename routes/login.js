
const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const AuthMiddleware =require("../helpers/authMidlewar")

//login
router.post(
    "/",
    [body("email").isEmail(), body("password").notEmpty()],
    (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).send({ errors: errors.array() });
      } else
        User.findOne({ email: req.body.email }).then((user) => {
          if (!user) {
            return res
              .status(400)
              .send({ errors: [{ msg: "You must register before" }] });
          } else {
            bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
              if (err) {
                throw err.message;
              } else if (!isMatch) {
                return res
                  .status(400)
                  .send({ errors: [{ msg: "wrong password" }] });
              } else {
                let payload = { userId: user._id };
                jwt.sign(payload, "123", (err, token) => {
                  if (err) {
                    throw err.message;
                  } else {
                    return res.status(200).send({ token });
                  }
                });
              }
            });
          }
        });
    }
  );

//get user
router.get("/", AuthMiddleware, (req, res) => {
    User.findById(req.userId)
      .select("-password -__v")
      .then((user) => res.status(200).send(user))
      .catch((err) => {
        res.send(500).send({ msg: "Server Errors" });
      });
  });

  module.exports = router;
