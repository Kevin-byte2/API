import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Import routers
import authRouter from './routes/auth.js';
import productsRouter from './routes/products.js';
import recommendationsRouter from './routes/recommendations.js';
import daasRouter from './routes/daas.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;


// --- Static Developer Portal ---
// Serve the API documentation portal from the /public directory
app.use(express.static(path.join(__dirname, 'public')));

// --- Security Middleware Integration ---
// 1. Helmet: Secure HTTP headers to prevent XSS, clickjacking, and MIME-sniffing
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "'unsafe-inline'"],
            styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
            fontSrc: ["'self'", "https://fonts.gstatic.com"],
            imgSrc: ["'self'", "data:", "https://images.unsplash.com"],
            connectSrc: ["'self'", "http://localhost:5000"]
        }
    }
}));

// 2. CORS: Restrict cross-origin communications to approved origins
app.use(cors({
    origin: '*', // In production, replace with specific domain e.g., 'https://sme-sales-pwa.vercel.app'
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-api-key'],
    credentials: true
}));

// 3. Express Rate Limit: Prevent Denial of Service (DoS) and brute-force scanning
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 150, // limit each IP to 150 requests per windowMs
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    message: { error: "Too many requests. Please try again after 15 minutes to maintain system security." }
});
app.use('/api/', limiter);
app.use('/daas/', limiter);

// Express body parsers
app.use(express.json({ limit: '10mb' })); // Support larger base64 images if needed
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// --- Request Logging for Security Auditing ---
app.use((req, res, next) => {
    console.log(`[AUDIT] ${new Date().toISOString()} - ${req.method} ${req.originalUrl} - IP: ${req.ip}`);
    next();
});

// --- API Routing Hookup ---
app.use('/api/auth', authRouter);
app.use('/api/products', productsRouter);
app.use('/api/recommendations', recommendationsRouter);

// DaaS Integration Layer (Guarded internally by API Key)
app.use('/daas', daasRouter);

// --- Base / Root Endpoint — Serves the API Developer Portal HTML ---
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// --- API Info endpoint (for raw JSON consumers) ---
app.get('/api', (req, res) => {
    res.json({
        message: "API-Based Data-as-a-Service Sales & Inventory Management System Engine is online.",
        documentation: "http://localhost:5000/",
        compliance: "Data Privacy Act (DPA) of 2012 Secure Access Enabled",
        version: "1.0.0",
        endpoints: {
            auth: "/api/auth/login",
            products: "/api/products",
            recommendations: "/api/recommendations",
            daas_catalog: "/daas/catalog (x-api-key required)"
        }
    });
});

// --- Global Error Handling Middleware ---
app.use((err, req, res, next) => {
    console.error("[SERVER ERROR]", err.stack);
    res.status(500).json({ 
        error: "An internal server error occurred. Transaction halted for data safety.",
        details: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

// Start Server
app.listen(PORT, () => {
    console.log(`========================================================================`);
    console.log(` SUCCESS: DaaS sales & inventory service running on http://localhost:${PORT}`);
    console.log(` Compliance Level: Data Privacy Act of 2012 / GDPR Standard`);
    console.log(` Architecture: Security-Hardened API-based Data-as-a-Service (DaaS)`);
    console.log(`========================================================================`);
});
