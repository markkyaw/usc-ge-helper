// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================
var connection = require("../config/connection.js");

// List of years and GE categories
let terms = [];
let geList = ["arts", "hinq", "sana", "life", "psc", "qrea", "gpg", "gph"]


// Routes
// =============================================================
module.exports = function(app) {

  // Get all chirps
  app.get("/api/all", function (req, res) {
    connection.query("SELECT * FROM chirps", function (err, result) {
      if (err) {
        throw err;
      }

      res.json(result);
    })
  })


  // Add a chirp
  app.post("/api/new", function (req, res) {
    connection.query("INSERT INTO chirps (author, chirp, time) VALUES (?, ?, ?)", [req.body.author, req.body.body, req.body.created_at], function (err, result) {
      if (err) {
        throw err;
      }
      // if (result.changedRows === 0) {
      //   // If no rows were changed, then the ID must not exist, so 404
      //   return res.status(404).end();
      // }

      res.redirect("/api/all")
    })
  })


};
