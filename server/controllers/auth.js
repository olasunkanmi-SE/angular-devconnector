const { User } = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/default");
const _ = require("lodash");
const validate = require("../validation/auth");

//Sign in a User

module.exports.auth = async (req, res, next) => {
  try {
    const { error } = validate.validateUser(req.body);
    if (error) return res.status(400).json(error.details[0].message);
    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(404).json("Invalid username or password");
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!validPassword) {
      return res.status(404).json("Invalid username or password");
    }

    const payload = { _id: user._id, email: user.email };
    const token = await jwt.sign(payload, keys.jwtPrivateKey, {
      expiresIn: 3600,
    });
    res
      .status(200)
      .json({ success: true, expiresIn: 3600, token: `Bearer ${token}` });
  } catch (ex) {
    next(ex);
  }
};

module.exports.getCurrentUser = async (req, res, next) => {
  try {
    res.json(_.pick(req.user, ["_id", "firstname", "email", "avatar"]));
  } catch (ex) {
    next(ex);
  }
};
