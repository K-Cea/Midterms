const express = require("express");
const router = express.Router();

const {
    getStock,
    updateStock
} = require("../controllers/stockController");

router.get("/:itemId", getStock);

router.put("/:itemId", updateStock);

router.post("/:itemId/in", addStock);

module.exports = router;