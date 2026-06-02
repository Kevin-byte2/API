import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret';
const DAAS_API_KEY = process.env.DAAS_API_KEY || 'daas_fallback_key';

// Keep track of active registered keys dynamically in memory
export const activeApiKeys = new Set([DAAS_API_KEY]);

// JWT authentication guard
export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: "Access token missing. Security verification failed." });
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ error: "Invalid or expired token. Authentication failed." });
        }
        req.user = user;
        next();
    });
};

// Role-based access control (RBAC) authorization helper
export const requireRole = (allowedRoles) => {
    return (req, res, next) => {
        if (!req.user || !allowedRoles.includes(req.user.role)) {
            return res.status(403).json({ 
                error: `Unauthorized. Requires one of the following privileges: ${allowedRoles.join(', ')}` 
            });
        }
        next();
    };
};

// DaaS Integration API Key guard for third-party consumers
export const authenticateApiKey = (req, res, next) => {
    const apiKey = req.headers['x-api-key'] || req.query.apiKey;

    if (!apiKey) {
        return res.status(401).json({ error: "Unauthorized DaaS Access. Integration API Key missing." });
    }

    if (!activeApiKeys.has(apiKey)) {
        return res.status(403).json({ error: "Security validation failed. Invalid DaaS API Key." });
    }

    next();
};
