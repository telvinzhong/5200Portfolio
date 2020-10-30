var express = require("express");
var router = express.Router();

const myDB = require("../db/myDB.js");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/education", async (req, res, next) => {
  try {
    const educName = req.query.educName || "";

    const education = await myDB.getEducation(educName);
    const numEducation = await myDB.getNumberOfEduc();

    res.render("education", {
      education: education,
      educName: educName,
      numEducation: numEducation
    });
  } catch (err) {
    next(err);
  }
});

router.post("/education/create", async (req, res, next) => {
  try {
    const educ = req.body;
    console.log("create education", educ);

    const educId = await myDB.insertEduc(educ);
    console.log("inserted id", educId);

    res.redirect("/education");
  } catch (err) {
    next(err);
  }
});

// router.get("/education/getnumberofeduc", async (req, res, next) => {
//   try {
//     // const educName = req.query.educName || "";

//     const education = await myDB.getNumberOfEduc();

//     res.render("education", {
//       education: education,
//       // educName: educName,
//     });
//   } catch (err) {
//     next(err);
//   }
// });

module.exports = router;
