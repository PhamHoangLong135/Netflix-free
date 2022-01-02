const router = require("express").Router();
const List = require("../models/List");
const verify = require("../verifyToken");

//CREATE

router.post("/", verify, async (req, res) => {
  if (req.user.isAdmin) {
    const newList = new List(req.body);
    try {
      const savedList = await newList.save();
      res.status(201).json(savedList);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not allowed!");
  }
});

// add a new movie to current listRoute
router.post("/:id", async (req, res) => {
  try {
    const save = await List.findOneAndUpdate(
      { _id: req.params.id },
      { $push: { content: req.body } }
    );
    res.status(201).json(save);
  } catch (err) {
    res.status(500).json(err);
  }
});
//DELETE

router.delete("/:id", verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      await List.findByIdAndDelete(req.params.id);
      res.status(201).json("The list has been delete...");
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not allowed!");
  }
});
//delete movie from list

router.post("/moDelete/:id", async (req, res) => {
  try {
    const idMovie = req.body;
    await List.findOneAndUpdate(
      { _id: req.params.id },
      {
        $pull: {
          content: { $in: idMovie },
        },
      },
      { multi: true }
    );
    res.status(201).json("deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});

// update list item
router.put("/update/:id", verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const updateList = await List.findByIdAndUpdate(
        { _id: req.params.id },
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(updateList);
    } catch (err) {
      res.status(500).json(err);
    }
  }else {
    res.status(403).json("Token invalid");
  }
});
//GET
router.get("/find/:id", async (req, res) => {
  try {
    const list = await List.findById(req.params.id);
    res.status(200).json(list);
  } catch (err) {
    res.status(500).json(err);
  }
});
//
router.get("/", verify, async (req, res) => {
  const typeQuery = req.query.type;
  const genreQuery = req.query.genre;
  let list = [];
  try {
    if (typeQuery) {
      if (genreQuery) {
        list = await List.aggregate([
          { $sample: { size: 10 } },
          { $match: { type: typeQuery, genre: genreQuery } },
        ]);
      } else {
        list = await List.aggregate([
          { $sample: { size: 10 } },
          { $match: { type: typeQuery } },
        ]);
      }
    } else {
      list = await List.aggregate([{ $sample: { size: 10 } }]);
    }
    res.status(200).json(list);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
