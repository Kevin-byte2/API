import express from 'express';
import { db } from '../database/db.js';
import { authenticateToken, requireRole } from '../middleware/auth.js';

const router = express.Router();

// Retrieve all sales transactions (Admin role protected)
router.get('/', authenticateToken, requireRole(['admin']), (req, res) => {
    try {
        const sales = db.getSales();
        res.json({ sales });
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch sales: " + err.message });
    }
});

// Create new sales transaction (Accessible by Admin and Cashier)
router.post('/', authenticateToken, requireRole(['admin', 'cashier']), (req, res) => {
    const { items, totalAmount, discountApplied, cashierName, businessType } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0 || totalAmount === undefined) {
        return res.status(400).json({ error: "Invalid transaction payload. Items list and total are required." });
    }

    try {
        // Validate stock before recording
        for (const item of items) {
            const product = db.getProductById(item.productId);
            if (!product) {
                return res.status(404).json({ error: `Product ID ${item.productId} not found.` });
            }
            if (product.stock < item.quantity) {
                return res.status(400).json({ 
                    error: `Insufficient stock for product '${product.name}'. Available: ${product.stock}, Requested: ${item.quantity}` 
                });
            }
        }

        const newSale = db.addSale({
            items,
            totalAmount: parseFloat(totalAmount),
            discountApplied: discountApplied || 0,
            cashierName: cashierName || req.user.name,
            businessType: businessType || 'retail'
        });

        res.status(201).json({
            message: "Transaction completed successfully.",
            sale: newSale
        });
    } catch (err) {
        res.status(500).json({ error: "Failed to record transaction: " + err.message });
    }
});

export default router;
