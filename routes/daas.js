import express from 'express';
import { db } from '../database/db.js';
import { authenticateApiKey, activeApiKeys } from '../middleware/auth.js';

const router = express.Router();

// DaaS Health Check
router.get('/health', (req, res) => {
    res.json({
        status: "operational",
        service: "Mobile Computing Sales & Inventory DaaS Engine",
        timestamp: new Date().toISOString(),
        version: "1.0.0"
    });
});

// DaaS Product Catalog Endpoint (Guarded by API Key)
// Designed for third-party consumers (B2B integrations, suppliers, external web stores)
router.get('/catalog', authenticateApiKey, (req, res) => {
    const { businessType } = req.query;
    try {
        const products = db.getProducts(businessType);
        
        // Return highly structured, clean data perfect for integration consumers
        const formattedProducts = products.map(p => ({
            sku: p.id,
            barcode: p.barcode,
            name: p.name,
            classification: p.category,
            pricing: {
                retail: p.price,
                currency: "PHP"
            },
            inventory: {
                availableStock: p.stock,
                status: p.stock > 10 ? "IN_STOCK" : p.stock > 0 ? "LOW_STOCK" : "OUT_OF_STOCK"
            },
            specifications: {
                size: p.size,
                capacity: p.capacity,
                variations: p.variations
            },
            media: {
                thumbnailUrl: p.image
            }
        }));

        res.json({
            meta: {
                count: formattedProducts.length,
                businessSegment: businessType || "all_multi_business",
                compliance: "DPA 2012 Secure Access",
                disclaimer: "Confidential Data-as-a-Service access. Unauthorized sharing is prohibited."
            },
            catalog: formattedProducts
        });
    } catch (err) {
        res.status(500).json({ error: "DaaS query failure: " + err.message });
    }
});

// DaaS General Sales Analytics (Guarded by API Key)
router.get('/sales-feed', authenticateApiKey, (req, res) => {
    try {
        const sales = db.getSales();
        
        // Sum total metrics safely
        const totals = sales.reduce((acc, curr) => {
            acc.revenue += curr.totalAmount;
            acc.transactions += 1;
            return acc;
        }, { revenue: 0, transactions: 0 });

        res.json({
            meta: {
                aggregatePeriod: "all_time",
                syncTimestamp: new Date().toISOString()
            },
            summary: {
                totalRevenue: totals.revenue,
                totalTransactions: totals.transactions,
                averageOrderValue: totals.transactions > 0 ? (totals.revenue / totals.transactions) : 0
            },
            salesFeed: sales.map(s => ({
                transactionId: s.id,
                time: s.timestamp,
                amount: s.totalAmount,
                discount: s.discountApplied,
                segment: s.businessType
            }))
        });
    } catch (err) {
        res.status(500).json({ error: "DaaS sales feed extraction failure: " + err.message });
    }
});

// B2B Dynamic Key Generation / Subscription Endpoint
router.post('/subscribe', (req, res) => {
    const { email, plan, businessType } = req.body;
    
    if (!email) {
        return res.status(400).json({ error: "Email address is required to subscribe." });
    }
    
    // Generate a secure, recognizable key for the client
    const cleanEmail = email.replace(/[^a-zA-Z0-9]/g, '').slice(0, 10);
    const randomHash = Math.random().toString(36).substring(2, 8);
    const newKey = `daas_sme_${plan || 'starter'}_${cleanEmail}_${randomHash}`;
    
    // Register the key in the active keys Set
    activeApiKeys.add(newKey);
    
    console.log(`[SUBSCRIPTION] Registered new API key: ${newKey} for ${email} (${plan || 'starter'} - ${businessType || 'hardware'})`);
    
    res.json({
        success: true,
        message: "Subscription registered successfully.",
        apiKey: newKey,
        email: email,
        plan: plan || "starter",
        businessType: businessType || "hardware",
        quotaLimit: plan === 'professional' ? 5000 : plan === 'enterprise' ? 'unlimited' : 50
    });
});

export default router;
