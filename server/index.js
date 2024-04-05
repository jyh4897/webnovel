const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const bcrypt = require("bcrypt");

const multer = require("multer");
const path = require("path");


const app = express();

app.set("port", process.env.PORT || 8000);


app.use(express.urlencoded({ extended: false })); 
app.use(express.json()); 
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.static(path.join(__dirname + "/images")));

const pool = mysql.createPool({
  host : "127.0.0.1",
  user : "root",
  password : "1234",
  database : "novel",
  port : 3306
});


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images/");
  },
  filename: (req, file, cb) => {
    var ext = path.extname(file.originalname);
    cb(null, `${Date.now()}${ext}`);
  },
});

const upload = multer({ storage: storage });


app.get("/novel", (req, res) => {
  const sqlQuery = "SELECT * FROM novel.novel";
  pool.query(sqlQuery, (err, result) => {
    res.send(result);
  });
})

app.post("/novel", upload.single("files"), async (req, res) => {
  const { title, category, description, writer, platform } = req.body;
  const filePaths = req.files.map((file) => ({
    column : "thumbnail",
    path : file.path
  }));
  console.log(filePaths[0]);
  const columns = [
    "novelid",
    "title",
    "category",
    "description",
    "writer",
    "platform"
  ];
  const values = [ title, category, description, writer, platform ];

  filePaths.forEach((file) => {
    if (file.path) {
      const imgURL = `http://localhost:8000/${file.path}`
      console.log('imgurl',imgURL)
      columns.push(file.column);
      values.push(imgURL)
    }
  });

  const sqlQuery = `INSERT INTO novel.novel (${columns.join(", ")}) VALUES (
    null, ${Array(values.length).fill("?").join(", ")});`;

  pool.query(sqlQuery, values, (err, result) => {
    if(err) {
      console.error("Error inserting into database", err);
    }
    else {
      res.status(200).send("Files and text data upload and data base upadated");
    };
  });
})


app.listen(app.get("port"), () => {
    console.log(app.get("port"), `port server on...`);
});
  