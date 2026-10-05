const db = require("../config/db");

// Get current stock quantity
const getStockQuantity = async (itemId) => {
    const [rows] = await db.query(
        "SELECT quantity FROM inventory WHERE id = ?",
        [itemId]
    );

    return rows[0];
};

// Update stock quantity
const updateStockQuantity = async (itemId, quantity) => {
    const [result] = await db.query(
        "UPDATE inventory SET quantity = ? WHERE id = ?",
        [quantity, itemId]
    );

    return result;
};


// Add stock quantity
const stockIn = async (itemId, quantity) => {
    const [result] = await db.query(
        "UPDATE inventory SET quantity = quantity + ? WHERE id = ?",
        [quantity, itemId]
    );

    return result;
};

// Remove stock only if enough stock is available
const stockOut = async (itemId, quantity) => {
    const [result] = await db.query(
        `UPDATE inventory
         SET quantity = quantity - ?
         WHERE id = ? AND quantity >= ?`,
        [quantity, itemId, quantity]
    );

    return result;
};



module.exports = {
    getStockQuantity,
    updateStockQuantity,
    stockIn,
    stockOut
};