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


app.listen(app.get("port"), () => {
    console.log(app.get("port"), `port server on...`);
  });
  