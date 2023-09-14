const { Router } = require("express");
const { handleGet, handleCreate, handleGetOne } = require("./expenseHandler");

const router = Router();

router.get("/", handleGet);
router.get("/:id", handleGetOne);
router.post("/", handleCreate);

module.exports = router;
