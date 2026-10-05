const stockModel = require("../models/stockModel");

// Get stock quantity
const getStock = async (req, res) => {
    try {
        const { itemId } = req.params;

        const stock = await stockModel.getStockQuantity(itemId);

        if (!stock) {
            return res.status(404).json({
                error: "Item not found"
            });
        }

        res.status(200).json({
            itemId: itemId,
            quantity: stock.quantity
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Failed to retrieve stock quantity"
        });
    }
};

// Update stock quantity
const updateStock = async (req, res) => {
    try {
        const { itemId } = req.params;
        const { quantity } = req.body;

        // Validate quantity
        if (typeof quantity !== "number" || quantity < 0) {
            return res.status(400).json({
                error: "Quantity must be a non-negative number"
            });
        }

        const result = await stockModel.updateStockQuantity(
            itemId,
            quantity
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                error: "Item not found"
            });
        }

        res.status(200).json({
            message: "Stock quantity updated successfully",
            itemId: itemId,
            quantity: quantity
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Failed to update stock quantity"
        });
    }
};


// Stock in
const addStock = async (req, res) => {
    try {
        const { itemId } = req.params;
        const { quantity } = req.body;

        if (typeof quantity !== "number" || quantity <= 0) {
            return res.status(400).json({
                error: "Quantity must be greater than 0"
            });
        }

        const result = await stockModel.stockIn(itemId, quantity);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                error: "Item not found"
            });
        }

        const updatedStock =
            await stockModel.getStockQuantity(itemId);

        res.status(200).json({
            message: "Stock added successfully",
            itemId: itemId,
            quantityAdded: quantity,
            currentStock: updatedStock.quantity
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Failed to add stock"
        });
    }
};

module.exports = {
    getStock,
    updateStock,
    addStock
};