const mongoose = require("mongoose");
const Joi = require("joi");

const genreSchema = mongoose.Schema({
  name: { type: String, required: true, minlength: 5, maxlength: 50 },
});
const Genres = mongoose.model("Genre", genreSchema);
function validateGenre(genre) {
  const schema = {
    name: Joi.string().min(3).required(),
  };
  return Joi.validate(genre, schema);
}

exports.Genres = Genres;
exports.genreSchema = genreSchema;
exports.validateGenre = validateGenre;
