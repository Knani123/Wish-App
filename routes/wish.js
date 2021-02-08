const express = require("express");
const router = express.Router();
const AuthMiddleware = require("../helpers/authMidlewar");
const { body, validationResult } = require("express-validator");
const Wish = require("../models/Wish");

//create Wish
router.post(
  "/",
  [AuthMiddleware,
    [
      body("name", "Name is empty! ").notEmpty().isLength({ min: 2, max: 20 }),
    ]],

  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    } else {
      Wish.find({ name: req.body.name })
        .then((wish) => {
          if (wish.length) {
            return res.status(400).send({
              errors: [
                {
                  msg: "Name existe",
                },
              ],
            });
          } else {
            let newWish = new Wish({
              ...req.body,
              owner: req.userId,
            });
            newWish
              .save()
              .then((data) => res.status(200).send(data))
              .catch((err) => console.log(err.message));
          }
        })
        .catch((err) => res.status(400).send(err));
    }
  }
);

//get user wishs
router.get("/", AuthMiddleware, (req, res) => {
    Wish.find({ owner: req.userId })
      .then((wishs) => res.send(wishs))
      .catch((err) => console.log(err.message));
  });

module.exports = router;
