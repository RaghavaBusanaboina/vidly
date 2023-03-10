const bcrypt = require("bcrypt");
const _ = require("lodash");
const express = require("express");
const { Users, validateUser } = require("../models/user");
const router = express.Router();

router.get("/", async (req, res) => {
  const users = await Users.find({}).select("-_id -password -__v");
  return res.send(users);
});

router.post("/", async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let user = await Users.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registered..!");
  user = new Users(_.pick(req.body, ["name", "email", "password"]));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();
  const token = user.generateAuthToken();

  return res
    .header("x-auth-token", token)
    .send(_.pick(user, ["name", "email"]));
});

module.exports = router;
