const { validationResult } = require("express-validator");
const nodemailer = require("nodemailer");
const User = require("../model/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// POST => create User
exports.createUser = async (req, res) => {
  const { name, email, password } = req.body;
  const errors = validationResult(req);

  // if there are errors
  // Send a response with the status and a json
  if (!errors.isEmpty()) {
    console.log("POST adding users errors: ", errors.array());
    res.status(422).json({
      user: {
        name,
        email,
        password,
      },
      message: "Validation errors are present",
      errorMessage: errors.array()[0].msg,
      validationErrors: errors.array(),
    });
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
exports.loginUser = async (req, res) => {
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
      { expiresIn: "6h" }
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

//PUT => forgot password
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(400).json({
        message: "The user with this email does not exist",
      });
    }

    const token = jwt.sign({ _id: existingUser._id }, "secret2017_05_03", {
      expiresIn: "20m",
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "capalbodomenico@gmail.com",
        pass: "ppaiaabgepyqlcov",
      },
    });

    const automaticEmailData = {
      from: "capalbodomenico@gmail.com",
      to: email,
      subject: "Fabrique entertainment link per il reset della password",
      html: `
            <h2>Per favore clicca sul link qui sotto per resettare la tua password</h2>
            <a href="http://localhost:3000/reset-password">${token}</a>
        `,
    };

    await User.updateOne({ resetLink: token });
    transporter.sendMail(automaticEmailData, (err, info) => {
      if (err) {
        console.log("Here my reset password error: ", err);
        return;
      }
      return res.status(201).json({
        message:
          "The link for the password reset has been sent: " + info.response,
      });
    });
  } catch (error) {
    return res
      .status(403)
      .json({ message: "Was not possible to reset the password" });
  }
};

//PUT => reset password
exports.resetPassword = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(400).json({
        message: "The user with this email does not exist",
      });
    }

    const token = jwt.sign({ _id: existingUser._id }, "secret2017_05_03", {
      expiresIn: "20m",
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "capalbodomenico@gmail.com",
        pass: "ppaiaabgepyqlcov",
      },
    });

    const automaticEmailData = {
      from: "capalbodomenico@gmail.com",
      to: email,
      subject: "Fabrique entertainment link per il reset della password",
      html: `
            <h2>Per favore clicca sul link qui sotto per resettare la tua password</h2>
            <a href="http://localhost:3000/reset-password">${token}</a>
        `,
    };

    await User.updateOne({ resetLink: token });
    transporter.sendMail(automaticEmailData, (err, info) => {
      if (err) {
        console.log("Here my reset password error: ", err);
        return;
      }
      return res.status(201).json({
        message:
          "The link for the password reset has been sent: " + info.response,
      });
    });
  } catch (error) {
    return res
      .status(403)
      .json({ message: "Was not possible to reset the password" });
  }
};
