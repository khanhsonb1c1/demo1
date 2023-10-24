const express = require("express");
// const cryptojs = require('crypto-js');
// const crypto = require('crypto');
const cors = require("cors");
const bodyParser = require("body-parser");
// const { log } = require('console');

const app = express();
const PORT = 5000;

app.use(express.json()); // Middleware để phân tích dữ liệu JSON từ request body

// Sử dụng body-parser để đọc dữ liệu từ request body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


const oracledb = require("oracledb");
const dbConfig = require("./config/connectDB.config");

const userRoute = require("./routes/user.route");
const monanRoute = require("./routes/monan.route")

app.use(
  cors({
    origin: "http://localhost:3001",
    credentials: true,
  })
);

// Đăng nhập, đăng ký, lấy lại mật khẩu
app.use("/user", userRoute);

// Món ăn
app.use("/monan", monanRoute);



app.listen(5000, () => {
  console.log(`Listen to port ${PORT}`);
});
