const jwt = require("jsonwebtoken");


const newUser = {
    username: 'admin',
    role: 1
}

const accessToken = jwt.sign(newUser, "123456", {
    expiresIn: "1h", // Thời gian hết hạn của token (ví dụ: 1 giờ)
  });

  const refresh_token = jwt.sign(newUser, "123456", {
    expiresIn: "30d", // Thời gian hết hạn của token (ví dụ: 1 giờ)
  });


  console.log(accessToken)
  console.log(refresh_token)