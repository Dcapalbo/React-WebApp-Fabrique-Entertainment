const fs = require("fs");
const Film = require("../model/film");
const { validationResult } = require("express-validator");
const fileHelper = require("../util/file");

// GET => Getting all films
exports.getFilms = async (req, res) => {
  try {
    const films = await Film.find();
    res.status(200).send(films);
  } catch {
    res.status(404).json({ message: "Films was not found" });
  }
};
// POST => Adding a Film
exports.postAddFilm = async (req, res) => {
  const { title, duration, director, description, year, type } = req.body;
  const image = req.file;

  const errors = validationResult(req);
  // if there are errors
  if (!errors.isEmpty()) {
    // then return the status and the route
    res.status(422).json({
      message: "Validation errors are present",
      errors: errors.array(),
      errorMessage: errors.array()[0].msg,
    });
    return {
      film: {
        title,
        duration,
        director,
        description,
        year,
        type,
      },
      errorMessage: errors.array()[0].msg,
      validationErrors: errors.array(),
    };
  }
  // saving the data inside the db
  try {
    const existingFilm = await Film.findOne({ title });
    if (!existingFilm) {
      const film = await Film.create({
        title,
        duration,
        director,
        description,
        year,
        type,
        imageUrl: {
          data: fs.readFileSync("images/" + image.filename),
          contentType: "image/png",
        },
      });
      fileHelper.deleteFile("images/" + image.filename);
      res.status(201).send(film);
    }
    return res.status(400).json({ message: "The film exist already" });
  } catch (error) {
    console.log("Something went wrong, here the error: ", error.message);
  }
};

// POST => Editing a product
exports.postEditFilm = async (req, res) => {
  const { title, duration, director, description, year, type, _id } = req.body;
  const image = req.file;
  const imageUrl = {
    data: fs.readFileSync("images/" + image.filename),
    contentType: image.mimetype,
  };

  const update = {
    title,
    duration,
    director,
    description,
    year,
    type,
    imageUrl,
  };

  console.log(req.body);

  const errors = validationResult(req);
  // if there are errors
  if (!errors.isEmpty()) {
    return (
      res.status(422),
      {
        film: {
          title,
          duration,
          director,
          description,
          year,
          type,
          _id,
        },
        // take the first error message from the array
        errorMessage: errors.array()[0].msg,
        validationErrors: errors.array(),
      }
    );
  }
  try {
    const updatedFilm = await Film.findByIdAndUpdate(_id, update, {
      new: true,
    });
    fileHelper.deleteFile("images/" + image.filename);
    res.status(200).json(updatedFilm);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Was not possible to update the specific film." });
  }
};

// // POST => Delete a single product using the prod id and user id
exports.postDeleteFilm = async (req, res) => {
  const filmId = req.body._id;
  try {
    await Film.findByIdAndRemove(filmId);
    res.status(200).json({
      message: "The film has been deleted",
    });
    console.log("The film has been deleted");
  } catch (error) {
    res.status(500).send(error.message);
    console.log("Something went wrong while deleting a film: ", error.message);
  }
};
