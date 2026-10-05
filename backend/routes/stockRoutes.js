const express = require("express");
const router = express.Router();

const {
    getStock,
    updateStock
} = require("../controllers/stockController");

// Get current stock quantity
router.get("/:itemId", getStock);

// Update stock quantity
router.put("/:itemId", updateStock);

module.exports = router;