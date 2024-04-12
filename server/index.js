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
    cb(null, "server/images/");
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
  const filePath = `http://localhost:8000/${req.file.path.replace(/\\/g, "/")
  .replace("images/", "")
  .replace("server/", "")}`
  console.log(filePath);
  const columns = [
    "novelid",
    "title",
    "category",
    "description",
    "writer",
    "platform",
    "thumbnail"
  ];
  const values = [ title, category, description, writer, platform, filePath ];

  const sqlQuery = `INSERT INTO novel.novel (${columns.join(", ")}) VALUES (null, ${Array(values.length).fill("?").join(", ")});`;

  pool.query(sqlQuery, values, (err, result) => {
    if(err) {
      console.error("Error inserting into database", err);
    }
    else {
      res.status(200).send("Files and text data upload and data base upadated");
    };
  });
})

app.get("/avgrate", (req, res) => {
  const sqlQuery = "SELECT nv.novelid, nv.title, AVG(NOVEL.review.rate) AS avgrate FROM NOVEL.review INNER JOIN NOVEL.novel AS NV ON NOVEL.review.novelid = nv.novelid GROUP BY nv.novelid";
  pool.query(sqlQuery, (err, result) => {
    res.send(result);
  });
})


app.get("/user", (req, res) => {
  const sqlQuery = "SELECT * FROM user";
  pool.query(sqlQuery, (err, result) => {
    res.send(result);
  })
})


app.listen(app.get("port"), () => {
    console.log(app.get("port"), `port server on...`);
});
  