// *********************************************************************************
// CONNECTION.JS - THIS FILE INITIATES THE CONNECTION TO MYSQL
// *********************************************************************************

// Require mysql
var mysql = require("mysql");

// Set up our connection information
var connection = mysql.createConnection({
  host: "mydeliverymyanmar.com",
  port: "3306",
  user: "mydertxq_markk418",
  password: "Lllh91L0x4qZ",
});

// Connect to the database
connection.connect(function(err)
{
	if(err) throw err;
	console.log("Connected");

	connection.query(sql, function(err, result)
	{
		if(err) throw err;
		console.log("Result: " + result);
	});
});

// Export connection
module.exports = connection;
