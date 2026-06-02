import express from 'express';
import { db } from '../database/db.js';
import { authenticateToken, requireRole } from '../middleware/auth.js';

const router = express.Router();

// Retrieve all product acquisition recommendations (Requires admin)
router.get('/', authenticateToken, requireRole(['admin']), (req, res) => {
    try {
        const recommendations = db.getRecommendations();
        res.json({ recommendations });
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch recommendations: " + err.message });
    }
});

// Create new product acquisition recommendation (Cashiers and Admins can log this)
router.post('/', authenticateToken, (req, res) => {
    const { barcode, suggestedName, businessType, size, capacity, variations } = req.body;

    if (!barcode) {
        return res.status(400).json({ error: "Barcode is required to submit a recommendation." });
    }

    try {
        // Check if barcode is already a registered product
        const existing = db.getProductByBarcode(barcode);
        if (existing) {
            return res.status(400).json({ error: "Product already registered in database.", product: existing });
        }

        // Check if recommendation for this barcode already exists and is pending
        const existingReco = db.getRecommendations().find(r => r.barcode === barcode && r.status === 'pending');
        if (existingReco) {
            return res.json({ 
                message: "A pending acquisition recommendation already exists for this barcode.", 
                recommendation: existingReco 
            });
        }

        const newReco = db.addRecommendation({
            barcode,
            suggestedName: suggestedName || `New Scanned Item (${barcode})`,
            businessType: businessType || "general",
            size: size || "N/A",
            capacity: capacity || "N/A",
            variations: variations || {},
            submittedBy: req.user.name
        });

        res.status(201).json({
            message: "Acquisition recommendation logged. Admin has been notified.",
            recommendation: newReco
        });
    } catch (err) {
        res.status(500).json({ error: "Failed to submit recommendation: " + err.message });
    }
});

// Admin approves a recommendation, which promotes it to the active product inventory
router.post('/:id/approve', authenticateToken, requireRole(['admin']), (req, res) => {
    const { id } = req.params;
    const { price, stock, category, name } = req.body;

    if (price === undefined || stock === undefined) {
        return res.status(400).json({ error: "Price and stock details are required to approve and enroll a product." });
    }

    try {
        const recommendations = db.getRecommendations();
        const recoIdx = recommendations.findIndex(r => r.id === id);

        if (recoIdx === -1) {
            return res.status(404).json({ error: "Recommendation not found." });
        }

        const reco = recommendations[recoIdx];
        if (reco.status !== 'pending') {
            return res.status(400).json({ error: `Recommendation already ${reco.status}.` });
        }

        // Add to active products database
        const newProduct = db.addProduct({
            barcode: reco.barcode,
            name: name || reco.suggestedName,
            category: category || "General",
            businessType: reco.businessType,
            price: parseFloat(price),
            stock: parseInt(stock),
            image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=300&auto=format&fit=crop", // placeholder image
            size: reco.size,
            capacity: reco.capacity,
            variations: reco.variations
        });

        // Mark recommendation as approved
        recommendations[recoIdx].status = 'approved';
        recommendations[recoIdx].resolvedProduct = newProduct.id;
        db.save();

        res.json({
            message: "Recommendation approved. Product successfully registered in inventory.",
            product: newProduct
        });
    } catch (err) {
        res.status(500).json({ error: "Failed to approve recommendation: " + err.message });
    }
});

// Admin rejects/ignores a recommendation
router.post('/:id/ignore', authenticateToken, requireRole(['admin']), (req, res) => {
    const { id } = req.params;
    try {
        const recommendations = db.getRecommendations();
        const recoIdx = recommendations.findIndex(r => r.id === id);

        if (recoIdx === -1) {
            return res.status(404).json({ error: "Recommendation not found." });
        }

        recommendations[recoIdx].status = 'ignored';
        db.save();

        res.json({
            message: "Recommendation ignored successfully."
        });
    } catch (err) {
        res.status(500).json({ error: "Failed to ignore recommendation: " + err.message });
    }
});

export default router;
