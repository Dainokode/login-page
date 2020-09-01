
const express = require('express'),
 app = express(),
 port = 3000,
 mongoose = require("mongoose");

let bodyParser = require("body-parser");

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.set('useFindAndModify', false);

// Mongoose config
mongoose.connect('mongodb://localhost/blogDB', { useNewUrlParser: true, useUnifiedTopology: true });

app.get('/', (req, res) => {
 res.send('Hello World!')
})

app.get("/secret", (req, res) => {
 res.render("secret")
})

app.listen(port, () => {
 console.log(`Example app listening at http://localhost:${port}`)
})