const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const bcrypt = require("bcrypt");

const multer = require("multer");
const path = require("path");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");


const app = express();

app.set("port", process.env.PORT || 8000);


app.use(express.urlencoded({ extended: false })); 
app.use(express.json()); 
app.use(cors({ origin: "http://localhost:3000", credentials: true, optionsSuccessStatus: 200,}));
app.use(express.static(path.join(__dirname + "/images")));
app.use(cookieParser());

const pool = mysql.createPool({
  host : "127.0.0.1",
  user : "root",
  password : "1234",
  database : "novel",
  port : 3306
});

const secretkey = "ThisIsSecretkey@4897!";
const refreshSecretkey = "ThisIsRefreshSecretkey@4897!"

const accessExpiresIn = '30m';
const refreshExpiresIn = '7d';

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

app.post("/checkusername", (req, res) => {
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

app.post("/userregister", async (req, res) => {
  const { username, nickname, password, email } = req.body;
  
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const sqlQuery = "INSERT INTO user (userid, username, nickname, password, email) VALUES (null, ?, ?, ?, ?)";

    pool.query(sqlQuery, [username, nickname, hashedPassword, email], (err, result) => {
      if(err) {
        console.error("Error inserting into database", err);
      }
      else {
        res.status(200).send("Data upload and data base upadated");
      };
    })
  }
  catch (error) {
    console.error("회원가입 중 오류:", error);
    return res.status(500).json({
      success: false,
      message: "내부 서버 오류",
      details: error.message,
    });
  }
})

app.post("/login", (req, res) => {
  const { id, password } = req.body;
  const sqlQuery = "SELECT * FROM user WHERE username = ?"

  pool.query(sqlQuery, [id], async (err, result) => {
    if(err) {
      return res.status(500).json({ message : 'Internal server error'});
    }

    if (result.length > 0) {
      const user = result[0];
      const checkPassword = await bcrypt.compare(password, user.password)
      if (checkPassword) {
        const accessToken = jwt.sign({ id : id }, secretkey, { expiresIn : accessExpiresIn });
        const refreshToken = jwt.sign({ id : id}, refreshSecretkey, { expiresIn : refreshExpiresIn})
        return res.json({ accessToken, refreshToken })
      }
      else {
        return res.status(401).json({ message : 'Invalid Password'});
      }
    }
    else {
      return res.status(400).json({ message : 'User not found '});
    }
  });
});

app.post("/refresh", (req, res) => {
  const { refreshToken } = req.body;

  jwt.verify(refreshToken, refreshSecretkey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message : 'Invalid refreshToken' });
    }

    const accessToken = jwt.sign({ id: decoded.id }, secretkey, { expiresIn : accessExpiresIn });
    res.json({ accessToken });
  })
})


app.listen(app.get("port"), () => {
    console.log(app.get("port"), `port server on...`);
});
  