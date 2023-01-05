const fs = require("fs");
const Contact = require("../model/contact");
const { validationResult } = require("express-validator");
const fileHelper = require("../util/file");
const { log } = require("console");

// GET => Getting all contacts
exports.getContacts = (req, res) => {
  Contact.find()
    .then((contacts) => {
      // response from the server with the render method and passing an object
      res.status(200).json(contacts);
    })
    // catching errors
    .catch((error) => {
      res.status(500).json({
        message: "Something went wrong with the contacts fetching",
      });
      console.log(
        "Something went wrong with the contacts fetching: ",
        error.message
      );
    });
};

// POST => Adding a Contact
exports.postAddContact = async (req, res) => {
  const { name, surname, role, bio, email, phoneNumber } = req.body;
  const image = req.file;

  const errors = validationResult(req);

  // if there are errors
  if (!errors.isEmpty()) {
    console.log("POST adding contacts errors: ", errors.array());
    res.status(422).json({
      message: "There was a problem with the validation process",
      errorMessage: errors.array()[0].msg,
      validationErrors: errors.array(),
    });
    // then return the status and the route
    return {
      //   hasError: true,
      contact: {
        name,
        surname,
        role,
        bio,
        email,
        phoneNumber,
      },
      errorMessage: errors.array()[0].msg,
      validationErrors: errors.array(),
    };
  }
  try {
    const existingContact = await Contact.findOne({ name });
    if (!existingContact) {
      const contact = await Contact.create({
        name,
        surname,
        role,
        bio,
        email,
        phoneNumber,
        imageUrl: {
          data: fs.readFileSync("images/" + image.filename),
          contentType: "image/png",
        },
      });
      fileHelper.deleteFile("images/" + image.filename);
      res.status(201).send(contact);
    }
    return res.status(400).json({ message: "The contact exist already" });
  } catch (error) {
    console.log("Something went wrong, here the error: ", error.message);
  }
};

// POST => Editing a contact
exports.postEditContact = async (req, res) => {
  const { name, surname, role, bio, email, phoneNumber, _id } = req.body;
  const image = req.file;
  const imageUrl = {
    data: fs.readFileSync("images/" + image.filename),
    contentType: image.mimetype,
  };

  const update = {
    name,
    surname,
    role,
    bio,
    email,
    phoneNumber,
    imageUrl,
  };

  const errors = validationResult(req);
  // if there are errors
  if (!errors.isEmpty()) {
    console.log("POST adding contacts errors: ", errors.array());
    res.status(422).json({
      message: "There was a problem with the validation process",
      errorMessage: errors.array()[0].msg,
      validationErrors: errors.array(),
    });
    return {
      contact: {
        name,
        surname,
        role,
        bio,
        email,
        phoneNumber,
        _id,
      },
      // take the first error message from the array
      errorMessage: errors.array()[0].msg,
      validationErrors: errors.array(),
    };
  }
  try {
    const updatedContact = await Contact.findByIdAndUpdate(_id, update, {
      new: true,
    });
    fileHelper.deleteFile("images/" + image.filename);
    res.status(200).json(updatedContact);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Was not possible to update the specific contact." });
  }
};

// // POST => Delete a single contact
exports.postDeleteContact = async (req, res) => {
  const contactId = req.body._id;
  try {
    await Contact.findByIdAndRemove(contactId);
    res.status(200).json({
      message: "The contact has been deleted",
    });
    console.log("The contact has been deleted");
  } catch (error) {
    res.status(500).send(error.message);
    console.log(
      "Something went wrong while deleting a contact: ",
      error.message
    );
  }
};
