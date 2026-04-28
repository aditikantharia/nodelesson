// ejs --> light weight template engine
// ejs --> you can write dynamic html with help of ejs

const { error } = require("console");
const express = require("express");
const app = express();
const fs = require("fs");

// if you want to read frontend data then you have to must add below two lines:
app.use(express.json()); // --> read data from body (read all json type data)
app.use(express.urlencoded({ extended: true }));
// --> read form data only

// setup ejs
app.set("view engine", "ejs");
// if you want to use ejs engine that create views folder

// ========= Task File Generater ========
app.get("/", (req, res) => {
  fs.readdir("./tasks", (e, files) => {
    if (e) throw error;
    res.render("index", { data: files });
  });
});

// method post --> data --> res.body
// method get --> data --> res.params

// create file (post)
app.post("/create", (req, res) => {
  //   console.log(req);
  //   res.send(req.body);

  let data = `Title : ${req.body.title}\nDetails:${req.body.details}`;

  // create file
  fs.writeFile(
    `./tasks/${req.body.title.split(" ").join("-")}.txt`,
    data,
    (e) => {
      if (e) throw error;
    },
  );

  res.redirect("/");
});

// open file


// edit file



app.listen(3000, () => {
  console.log("sever is running 🏃");
});
