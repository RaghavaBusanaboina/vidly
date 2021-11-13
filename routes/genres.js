const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const express = require("express");
const { Genres, validateGenre } = require("../models/genre");
const router = express.Router();
router.get("/", async (req, res) => {
  const genres = await Genres.find().sort("name");
  return res.send(genres);
});

router.post("/", auth, async (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let genre = new Genres({ name: req.body.name });
  genre = await genre.save();
  res.send(genre);
});

router.get("/:id", async (req, res) => {
  const genre = await Genres.findById(req.params.id);
  if (!genre)
    return res.status(404).send("For the given id there is no data available");
  res.send(genre);
});

router.put("/:id", async (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const genre = await Genres.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { new: true }
  );
  if (!genre)
    return res.status(404).send("For the given id there is no data available");
  res.send(genre);
});

router.delete("/:id", [auth, admin], async (req, res) => {
  const genre = await Genres.findByIdAndDelete(req.params.id);
  if (!genre)
    return res.status(404).send("For the given id there is no data available");
  res.send(genre);
});

module.exports = router;
