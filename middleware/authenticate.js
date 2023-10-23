const jwt = require("jsonwebtoken");
require("dotenv").config();
const dbConfig = require("../config/connectDB.config");
const oracledb = require("oracledb");

const middlewareAuth = {
  //? verifyToken

  verifyToken: (req, res, next) => {
    const token = req.headers?.token;
    if (token) {
      const accessToken = token;
      jwt.verify(accessToken, process.env.SECRECT_KEY, (error, decoded) => {
        if (error) {
          res.status(403).json("Token is not valid");
        }
        req.user = decoded;
        console.log(user);
        next();
      });
    } else {
      res.status(401).json("You're not authenticated");
    }
  },

  verifyAdmin: (req, res, next) => {
    middlewareAuth.verifyToken(req, res, () => {
      // viết kiểm tra là admin ở đây
      const username = req.user.username; // Lấy tên đăng nhập từ token

      // Truy vấn cơ sở dữ liệu để kiểm tra quyền người dùng
      oracledb.getConnection(dbConfig, (err, connection) => {
        if (err) {
          console.error(err.message);
          res.status(500).json("Lỗi cơ sở dữ liệu");
          return;
        }

        // Truy vấn cơ sở dữ liệu để lấy quyền người dùng
        const query =
          "SELECT LoaiNguoiDung FROM Login WHERE TenDangNhap = :username";
        connection.execute(query, [username], (err, result) => {
          connection.close();
          if (err) {
            console.error(err.message);
            res.status(500).json("Lỗi cơ sở dữ liệu");
            return;
          }

          if (result.rows.length === 0) {
            res.status(401).json("Người dùng không tồn tại");
          } else {
            const userRole = result.rows[0][0];
            if (userRole === "1") {
              req.userRole = userRole;
              next();
            } else {
              res.status(403).json("Không có quyền truy cập");
            }
          }
        });
      });
    });
  },
};

module.exports = middlewareAuth;
