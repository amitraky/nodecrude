const express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const Movie = mongoose.model("Movie");

router.get("/", (req, res) => {
  res.render("movie/addOrEdit", {
    viewTitle: "Insert Movie",
  });
});

router.post("/", (req, res) => {
  if (req.body._id == "") insertRecord(req, res);
  else updateRecord(req, res);
});

function insertRecord(req, res) {
  var movie = new Movie();
  movie.name = req.body.fullName;
  movie.year = req.body.email;
  
  movie.save((err, doc) => {
    if (!err) res.redirect("movie/list");
    else {
      if (err.name == "ValidationError") {
        handleValidationError(err, req.body);
        res.render("movie/addOrEdit", {
          viewTitle: "Insert Movie",
          movie: req.body,
        });
      } else console.log("Error during record insertion : " + err);
    }
  });
}

function updateRecord(req, res) {
  Movie.findOneAndUpdate(
    { _id: req.body._id },
    req.body,
    { new: true },
    (err, doc) => {
      if (!err) {
        res.redirect("movie/list");
      } else {
        if (err.name == "ValidationError") {
          handleValidationError(err, req.body);
          res.render("movie/addOrEdit", {
            viewTitle: "Update Movie",
            movie: req.body,
          });
        } else console.log("Error during record update : " + err);
      }
    }
  );
}

router.get("/list", (req, res) => {
  Movie.find((err, docs) => {
    if (!err) {
      res.render("movie/list", {
        list: docs,
      });
    } else {
      console.log("Error in retrieving movie list :" + err);
    }
  });
});

router.get("/data", (req, res) => {
  var start = Number(req.query.start);
  var len = Number(req.query.length);

  Movie.find((err, docs) => {
    res.send({ draw: 1, recordsTotal: 15, recordsFiltered: 15, data: docs });

    res.end();
  })
    .skip(start)
    .limit(len);

  console.log(start, len);
});

function handleValidationError(err, body) {
  for (field in err.errors) {
    switch (err.errors[field].path) {
      case "fullName":
        body["fullNameError"] = err.errors[field].message;
        break;
      case "email":
        body["emailError"] = err.errors[field].message;
        break;
      default:
        break;
    }
  }
}

router.get("/:id", (req, res) => {
  Movie.findById(req.params.id, (err, doc) => {
    if (!err) {
      res.render("movie/addOrEdit", {
        viewTitle: "Update Movie",
        movie: doc,
      });
    }
  });
});

router.get("/delete/:id", (req, res) => {
  Movie.findByIdAndRemove(req.params.id, (err, doc) => {
    if (!err) {
      res.redirect("/movie/list");
    } else {
      console.log("Error in movie delete :" + err);
    }
  });
});

module.exports = router;
