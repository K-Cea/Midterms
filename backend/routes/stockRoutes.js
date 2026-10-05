const express = require("express");
const router = express.Router();

const {
    getStock,
    updateStock,
    addStock,
    removeStock,
    checkLowStock
} = require("../controllers/stockController");

// Ticket 1
router.get("/:itemId", getStock);
router.put("/:itemId", updateStock);

// Ticket 2
router.post("/:itemId/in", addStock);

// Ticket 3 + 4
router.post("/:itemId/out", removeStock);

// Ticket 5
router.get("/:itemId/low-stock", checkLowStock);

module.exports = router;