const { validationResult } = require("express-validator");
const User = require("../model/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// POST => Adding a User
exports.postAddUser = async (req, res) => {
  const { name, email, password } = req.body;
  const errors = validationResult(req);

  // if there are errors
  if (!errors.isEmpty()) {
    console.log("POST adding users errors: ", errors.array());
    res.status(422).send("input users it's invalid");
    // then return the status and the route
    return {
      //   hasError: true,
      user: {
        name,
        email,
        password,
      },
      errorMessage: errors.array()[0].msg,
      validationErrors: errors.array(),
    };
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "The user has been already registered",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    res.status(201).json({
      message: "The user has been created",
      user,
    });
  } catch (err) {
    res.status(409).json({
      message: err.message,
    });
  }
};
// POST => Login in the User
exports.postLoginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      res.status(404).json({
        message: "The User doesn't exist",
      });
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordValid) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }
    const token = jwt.sign(
      {
        email: existingUser.email,
        userId: existingUser._id,
      },
      "secret1992_25_03",
      { expiresIn: "15m" }
    );
    return res.status(200).json({
      result: existingUser,
      token,
      userId: existingUser._id,
    });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};
