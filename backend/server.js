const express = require('express');
const cors = require('cors');
var mysql = require('mysql');

require('dotenv').config();


const app = express();
const port = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());

// Connecting the Mysql dB using credentials 
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: ""
});

// Create a database ..using localhost ...
/* con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  con.query("CREATE DATABASE crm", function (err, result) {
    if (err) throw err;
    console.log("Database created");
  });
}); */


con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

const userrouter = require('./routes/users');


app.use('/users',userrouter);

app.listen(port ,() => {
    console.log(`server is running on port : ${port}`);
});