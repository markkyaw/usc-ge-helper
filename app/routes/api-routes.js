// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================
var connection = require("../config/connection.js");
const request = require('request');
const cheerio = require('cheerio');

// List of years and GE categories
let terms = [];
let geList = ["arts", "hinq", "sana", "life", "psc", "qrea", "gpg", "gph"]


// Routes
// =============================================================
module.exports = function(app) {

  // Get all chirps
  app.get("/api/all", function (req, res) {
    connection.query("SELECT * FROM chirps", function (err, result) {
		if (err) 
		{
        	throw err;
      	}

		// Scrape the terms at classes.usc.edu
		request('https://classes.usc.edu', (error, response, html) =>
		{
			if (!error && response.statusCode == 200)
			{
				const $ = cheerio.load(html);

				let yrs = $('.term-code');

				yrs.each(function(index)
				{
					// console.log(yrs.eq(index).text().slice(-5));
					terms.push(yrs.eq(index).text().slice(-5));
				});
			}

			// Scrape the GEs of each year
			for (let i = 0; i < terms.length; ++i)
			{
				for (let j = 0; j < geList.length; ++j)
				{
					request('https://classes.usc.edu/term-' + terms[i] + '/classes/' + geList[j] + '/', (error, response, html) =>
					{
						if (!error && response.statusCode == 200)
						{
							const $ = cheerio.load(html);
				
							let cl = $('.courselink');
				
							cl.each(function(index)
							{
								console.log(cl.eq(index).text());
							});
						}
				
						console.log("Current term: " + terms[i]);
						console.log("Current GE: " + geList[j]);
						console.log("============================");
					});
				}
			}

		});

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
