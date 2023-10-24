const dbConfig = require("../config/connectDB.config");

const oracledb = require("oracledb");

const monanController = {
  getMonAn: async (req, res) => {
    try {
      const connection = await oracledb.getConnection(dbConfig);

      const result = await connection.execute("SELECT * FROM MonAn");
      const jsonData = result.rows.map((row) => {
        return {
          id: row[0],
          name: row[1],
          description: row[2],
          price: row[3],
          image: row[4],
        };
      });
      return res.json(jsonData);
    } catch (error) {
      res.send(error);
    }
  },


  createMonan: async (req, res) => {
    try {
      // Kết nối đến cơ sở dữ liệu
      const connection = await oracledb.getConnection(dbConfig);

      const { TenMonAn, MoTa, Gia, AnhMonAn } = req.body;

      // Thực hiện truy vấn để tạo mới bản ghi trong bảng MonAn
      const sql = `INSERT INTO MonAn (TenMonAn, MoTa, Gia, AnhMonAn) VALUES (:TenMonAn, :MoTa, :Gia, :AnhMonAn)`;

      const bindVars = {
        TenMonAn,
        MoTa,
        Gia,
        AnhMonAn,
        // outId: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT },
      };

      await connection.execute(sql, bindVars, { autoCommit: true });

      return res.json({
        status: "Success",
      });
    } catch (error) {
      // Xử lý lỗi nếu có
      res.send(error);
    }
  },

  updateMonAn: async () => {},

  deleteMonAn: async () => {},
};

module.exports = monanController;
