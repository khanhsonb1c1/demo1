const userController = require("../controller/user.controller");
// const { verifyAdmin } = require("../middleware/authenticate");


const router = require("express").Router();

router.post("/register", userController.register);

router.post("/login", userController.login);

module.exports = router;