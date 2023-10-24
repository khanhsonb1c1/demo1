const monanController = require("../controller/monan.controller");
const { verifyAdmin } = require("../middleware/authenticate");


const router = require("express").Router();

router.post("/create",verifyAdmin, monanController.createMonan);

router.put("/update/:id",verifyAdmin, monanController.updateMonAn);

router.delete("/delete/:id",verifyAdmin, monanController.deleteMonAn);

module.exports = router;