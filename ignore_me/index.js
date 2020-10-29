const express = require("express");
const sqlite3 = require("sqlite3").verbose();

const app = express();
const port = 3000;

var router = express.Router();

const myDB = require("../db/myDB.js");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/person", async (req, res, next) => {
    const page = req.query.page || 1;
    console.log("/person", page);
  try {
    const people = await myDB.getPeople(page);

    res.render("People", {
      people: people
    });
  } catch (err) {
    next(err);
  }
});

app.listen(port, () => {
    console.log(`Listening on http:localhost:${port}`);
})