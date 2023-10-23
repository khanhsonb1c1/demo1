const userController = require("../controller/user.controller");
// const { verifyAdmin } = require("../middleware/authenticate");


const router = require("express").Router();

router.post("/register", userController.register);

module.exports = router;