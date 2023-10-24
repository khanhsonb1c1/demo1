const jwt = require("jsonwebtoken");
require("dotenv").config();
// const dbConfig = require("../config/connectDB.config");
// const oracledb = require("oracledb");

const middlewareAuth = {
  //? verifyToken

  verifyAdmin: (req, res, next) => {
    const token = req.headers.token;

    if (!token) {
      return res.status(401).json({ error: "Token is missing" });
    }

    jwt.verify(token, process.env.SECRET_KEY, (error, decoded) => {
      if (error) {
        return res.status(403).json({ error: "Token is not valid" });
      }

      if (decoded.role === "1") {
        // Người dùng có quyền truy cập
        next();
      } else {
        // Người dùng không có quyền truy cập
        return res.status(403).json({ error: "Access denied" });
      }
    });
  },
};

module.exports = middlewareAuth;
