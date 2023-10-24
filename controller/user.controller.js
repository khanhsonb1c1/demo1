const jwt = require("jsonwebtoken");
const oracledb = require("oracledb");
require("dotenv").config();

const dbConfig = require("../config/connectDB.config");

const userController = {
  register: async (req, res) => {
    try {
      const { username, password } = req.body;
      console.log("0");
      // Kiểm tra xem tên đăng nhập đã tồn tại trong cơ sở dữ liệu chưa
      const connection = await oracledb.getConnection(dbConfig); // Sử dụng cấu hình kết nối từ connectDB.config
      const query = `SELECT TenDangNhap FROM Login WHERE TenDangNhap = '${username}'`;

      const result = await connection.execute(query);

      if (result.rows.length > 0) {
        console.log("ok1");
        return res.status(400).json({ message: "Tên đăng nhập đã tồn tại" });
      } else {
        console.log("ok");
      }

      // Tên đăng nhập chưa tồn tại, tiến hành tạo người dùng
      const newUser = {
        username,
        password,
        role: "2",
      };

      const accessToken = jwt.sign(newUser, process.env.SECRECT_KEY, {
        expiresIn: "1h", // Thời gian hết hạn của token (ví dụ: 1 giờ)
      });

      const refresh_token = jwt.sign(newUser, process.env.SECRECT_KEY, {
        expiresIn: "30d", // Thời gian hết hạn của token (ví dụ: 1 giờ)
      });

      console.log(refresh_token, "res");

      const options = {
        autoCommit: true, // Tự động commit thay đổi
      };

      const binds = {
        username: username,
        password: password,
        role: "2",
        refreshToken: refresh_token,
      };

      const updateQuery =
        "INSERT INTO Login (TenDangNhap, MatKhau, LoaiNguoiDung, REFRESH_TOKEN) VALUES (:username, :password, :role, :refreshToken)";

      const resultUpdate = await connection.execute(
        updateQuery,
        binds,
        options
      );

      if (resultUpdate) {
        return res.status(200).json({
          message: "Đăng ký thành công",
          access_token: accessToken,
        });
      }
    } catch (error) {
      return res.send(error);
    }
  },

  login: async (req, res) => {
    try {
    } catch (error) {
      res.send(error);
    }
  },
};

module.exports = userController;
