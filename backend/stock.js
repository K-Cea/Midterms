const express = require("express");
const router = express.Router();

// Temporary in-memory stock data
const stock = {};

// Get current stock quantity
router.get("/:itemId", (req, res) => {
    const itemId = req.params.itemId;

    const quantity = stock[itemId] || 0;

    res.json({
        itemId: itemId,
        quantity: quantity
    });
});

// Update stock quantity
router.put("/:itemId", (req, res) => {
    const itemId = req.params.itemId;
    const { quantity } = req.body;

    if (typeof quantity !== "number" || quantity < 0) {
        return res.status(400).json({
            error: "Quantity must be a non-negative number"
        });
    }

    stock[itemId] = quantity;

    res.json({
        message: "Stock quantity updated successfully",
        itemId: itemId,
        quantity: stock[itemId]
    });
});

module.exports = router;