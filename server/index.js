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

app.post("/chekusername", (req, res) => {
  const { username } = req.body;
  const sqlQuery = "SELECT * FROM user WHERE username = ?";
  pool.query(sqlQuery, [username], (err, result) => {
    if (err) {
      console.error("DB에서 중복 확인 중 오류", err);
      return res.status(500).json({
        success : false,
        message : "ID 중복 확인 중 오류가 발생하였습니다.",
        error : err.message
      })
    }

    if (result.length > 0) {
      return res.status(200).json({
        success : false,
        message : "이미 등록된 ID입니다.",
      });
    } 
    else {
      return res.status(200).json({
        success : true,
        message : "사용 가능한 ID입니다."
      })
    }
  });
});

app.post("/userregister", (req, res) => {
  const { username, nickname, password, email } = req.body;
  const hashedPassword = bcrypt.hash(password, 10);

  const sqlQuery = "INSERT INTO user (userid, username, nickname, password, email) VALUES (null, ?, ?, ?, ?)";

  pool.query(sqlQuery, [username, nickname, hashedPassword, email], (err, result) => {
    if(err) {
      console.error("Error inserting into database", err);
    }
    else {
      res.status(200).send("Data upload and data base upadated");
    };
  })
})


app.listen(app.get("port"), () => {
    console.log(app.get("port"), `port server on...`);
});
  