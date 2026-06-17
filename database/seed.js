/**
 * ============================================================
 *  INVENTAAPI FIRESTORE SEED SCRIPT
 *  Run: node database/seed.js
 *
 *  Features:
 *  - Clears existing products in Firestore.
 *  - Seeds 2 authorized user accounts: admin and developer.
 *  - Seeds 36 products with name, description, category, size,
 *    capacity, variations, image, and supplierInfo.
 *  - Expiring products have expirationDate, others have null.
 * ============================================================
 */

import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getFirestore, FieldValue } from 'firebase-admin/firestore';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';

dotenv.config();

// ─── Firebase Init ────────────────────────────────────────────────────────────
if (!getApps().length) {
    initializeApp({
        credential: cert({
            projectId:   process.env.FIREBASE_PROJECT_ID,
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
            privateKey:  process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        }),
    });
}

const firestore = getFirestore();

// ─── Seed Data ────────────────────────────────────────────────────────────────

const USERS = [
    {
        id: 'u_admin',
        username: 'admin',
        // Password: admin123
        passwordHash: await bcrypt.hash('admin123', 10),
        role: 'admin',
        name: 'Lead System Administrator',
    },
    {
        id: 'u_developer',
        username: 'developer',
        // Password: developer123
        passwordHash: await bcrypt.hash('developer123', 10),
        role: 'developer',
        name: 'SME App Builder / Software Developer',
    },
];

const PRODUCTS = [

    // ══════════════════════════════════════════════════════════════════════
    // HARDWARE STORE  (businessType: "hardware") - Non-expiring (expirationDate: null)
    // ══════════════════════════════════════════════════════════════════════

    // ── Structural Steel ──
    {
        barcode: '4800000000010',
        name: 'Deformed Steel Bar 10mm',
        description: 'High-strength Grade 33 deformed steel bar commonly used for residential concrete reinforcement, slabs, and columns. Rust-resistant and complies with ASTM A615 standard.',
        category: 'Structural Steel',
        businessType: 'hardware',
        price: 175.00,
        stock: 200,
        image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=400&auto=format&fit=crop',
        size: '10mm x 6m',
        capacity: 'Grade 33 Strength',
        variations: { brand: 'Pag-asa Steel', grade: 'Grade 33', finish: 'Deformed' },
        expirationDate: null,
        supplierInfo: {
            name: 'Pag-asa Steel Works, Inc.',
            contact: 'sales@pagasasteel.com | +63 (2) 8631-1823'
        }
    },
    {
        barcode: '4800000000027',
        name: 'Deformed Steel Bar 12mm',
        description: 'Grade 40 deformed steel bar for medium to heavy-load structural applications. Ideal for beams, footings, and columns requiring higher tensile strength.',
        category: 'Structural Steel',
        businessType: 'hardware',
        price: 245.00,
        stock: 120,
        image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=400&auto=format&fit=crop',
        size: '12mm x 6m',
        capacity: 'Grade 40 Strength',
        variations: { brand: 'Pag-asa Steel', grade: 'Grade 40', finish: 'Deformed' },
        expirationDate: null,
        supplierInfo: {
            name: 'Pag-asa Steel Works, Inc.',
            contact: 'sales@pagasasteel.com | +63 (2) 8631-1823'
        }
    },
    {
        barcode: '4800000000034',
        name: 'Deformed Steel Bar 16mm',
        description: 'Heavy-duty Grade 60 deformed steel bar designed for commercial and industrial structural use. Excellent bond strength with concrete.',
        category: 'Structural Steel',
        businessType: 'hardware',
        price: 430.00,
        stock: 80,
        image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=400&auto=format&fit=crop',
        size: '16mm x 6m',
        capacity: 'Grade 60 Strength',
        variations: { brand: 'SteelAsia', grade: 'Grade 60', finish: 'Deformed' },
        expirationDate: null,
        supplierInfo: {
            name: 'SteelAsia Manufacturing Corporation',
            contact: 'marketing@steelasia.com | +63 (2) 8856-5555'
        }
    },
    {
        barcode: '4800000000041',
        name: 'G.I. Flat Bar 1/8" x 1"',
        description: 'Galvanized iron flat bar used for fabricating gates, grills, furniture frames, and braces. Rust-resistant with a smooth finish.',
        category: 'Structural Steel',
        businessType: 'hardware',
        price: 95.00,
        stock: 150,
        image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=400&auto=format&fit=crop',
        size: '1/8" x 1" x 20ft',
        capacity: 'Galvanized Finish',
        variations: { brand: 'Generic', type: 'Flat Bar', material: 'Galvanized Iron' },
        expirationDate: null,
        supplierInfo: {
            name: 'Manila Steel Distributors Inc.',
            contact: 'orders@manilasteel.com | +63 (2) 8731-9000'
        }
    },

    // ── Cement & Aggregates ──
    {
        barcode: '4800000000058',
        name: 'Eagle Cement Portland Bag',
        description: 'Type 1 Ordinary Portland Cement (OPC) for general construction use including footings, walls, floors, and plastering. 40 kg per bag.',
        category: 'Cement & Aggregates',
        businessType: 'hardware',
        price: 285.00,
        stock: 300,
        image: 'https://images.unsplash.com/photo-1590889301220-9b1a3771b7c0?q=80&w=400&auto=format&fit=crop',
        size: '40 kg/bag',
        capacity: 'Type 1 OPC',
        variations: { brand: 'Eagle Cement', type: 'Portland Type 1', packaging: 'Paper Bag' },
        expirationDate: null,
        supplierInfo: {
            name: 'Eagle Cement Corporation',
            contact: 'distributors@eaglecement.com.ph | +63 (2) 8786-9000'
        }
    },
    {
        barcode: '4800000000065',
        name: 'Holcim Masonry Cement',
        description: 'Specially formulated masonry cement for brick laying, block laying, and plastering. Provides superior bond and workability.',
        category: 'Cement & Aggregates',
        businessType: 'hardware',
        price: 295.00,
        stock: 250,
        image: 'https://images.unsplash.com/photo-1590889301220-9b1a3771b7c0?q=80&w=400&auto=format&fit=crop',
        size: '40 kg/bag',
        capacity: 'Type M Masonry',
        variations: { brand: 'Holcim', type: 'Masonry Cement', packaging: 'Paper Bag' },
        expirationDate: null,
        supplierInfo: {
            name: 'Holcim Philippines Inc.',
            contact: 'customercare@holcim.com | +63 (2) 8581-1500'
        }
    },

    // ── Plumbing ──
    {
        barcode: '4800000000072',
        name: 'Emerald PVC Pressure Pipe 1/2"',
        description: 'PVC pressure pipe for potable water supply systems. Rated for water distribution inside residential and commercial buildings. Easy to cut and solvent-cement joint.',
        category: 'Plumbing',
        businessType: 'hardware',
        price: 95.00,
        stock: 120,
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=400&auto=format&fit=crop',
        size: '1/2" x 10ft',
        capacity: 'PN 16 Pressure Rating',
        variations: { brand: 'Emerald', color: 'White', type: 'Pressure Pipe' },
        expirationDate: null,
        supplierInfo: {
            name: 'Emerald Vinyl Corporation',
            contact: 'sales@emerald.com.ph | +63 (2) 8440-2300'
        }
    },
    {
        barcode: '4800000000089',
        name: 'Emerald PVC Sanitary Pipe 3"',
        description: 'PVC sanitary pipe for drain, waste, and vent (DWV) systems. Resistant to chemicals and corrosion. Suitable for household sewage systems.',
        category: 'Plumbing',
        businessType: 'hardware',
        price: 380.00,
        stock: 85,
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=400&auto=format&fit=crop',
        size: '3" x 10ft',
        capacity: 'Sanitary Class 150',
        variations: { brand: 'Emerald', color: 'Blue', type: 'Sanitary Pipe' },
        expirationDate: null,
        supplierInfo: {
            name: 'Emerald Vinyl Corporation',
            contact: 'sales@emerald.com.ph | +63 (2) 8440-2300'
        }
    },
    {
        barcode: '4800000000096',
        name: 'Ball Valve Brass 1/2"',
        description: 'Full-bore brass ball valve for on/off water control. Quarter-turn operation with lever handle. Suitable for both hot and cold water lines.',
        category: 'Plumbing',
        businessType: 'hardware',
        price: 185.00,
        stock: 60,
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=400&auto=format&fit=crop',
        size: '1/2" (DN15)',
        capacity: 'PN 20 Rated',
        variations: { brand: 'Generic', material: 'Brass', type: 'Ball Valve' },
        expirationDate: null,
        supplierInfo: {
            name: 'Federal Hardware Philippines',
            contact: 'support@federalhardware.com | +63 (2) 8253-1200'
        }
    },

    // ── Electrical ──
    {
        barcode: '4800000000102',
        name: 'THHN Wire 3.5mm² Yellow/Green',
        description: 'Thermoplastic High Heat-resistant Nylon-coated (THHN) copper wire. Used for building wiring in conduits. Complies with PEC and IEC 60227 standards.',
        category: 'Electrical',
        businessType: 'hardware',
        price: 12.50,
        stock: 1000,
        image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=400&auto=format&fit=crop',
        size: '3.5mm² / #12 AWG',
        capacity: 'Per Meter (Sold per meter)',
        variations: { brand: 'Phelps Dodge', color: 'Yellow/Green (Ground)', type: 'THHN Stranded' },
        expirationDate: null,
        supplierInfo: {
            name: 'Phelps Dodge Philippines Energy Products Corporation',
            contact: 'customer.service@phelpsdodge.com.ph | +63 (2) 8813-8000'
        }
    },
    {
        barcode: '4800000000119',
        name: 'THHN Wire 5.5mm² Black',
        description: 'Heavy-gauge THHN copper wire for main circuits, panels, and high-load appliances. 75°C temperature rating. Sold per meter.',
        category: 'Electrical',
        businessType: 'hardware',
        price: 22.00,
        stock: 800,
        image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=400&auto=format&fit=crop',
        size: '5.5mm² / #10 AWG',
        capacity: 'Per Meter (Sold per meter)',
        variations: { brand: 'Phelps Dodge', color: 'Black (Hot/Live)', type: 'THHN Stranded' },
        expirationDate: null,
        supplierInfo: {
            name: 'Phelps Dodge Philippines Energy Products Corporation',
            contact: 'customer.service@phelpsdodge.com.ph | +63 (2) 8813-8000'
        }
    },
    {
        barcode: '4800000000126',
        name: 'Circuit Breaker 20A Single Pole',
        description: 'Single-pole molded case circuit breaker (MCCB) for residential and light commercial panel boards. Provides overload and short-circuit protection.',
        category: 'Electrical',
        businessType: 'hardware',
        price: 320.00,
        stock: 45,
        image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=400&auto=format&fit=crop',
        size: '20 Amperes',
        capacity: 'Single Pole, 240V AC',
        variations: { brand: 'Schneider Electric', type: 'MCCB', amperage: '20A' },
        expirationDate: null,
        supplierInfo: {
            name: 'Schneider Electric Philippines',
            contact: 'distributors.ph@se.com | +63 (2) 8982-8000'
        }
    },

    // ── Paint & Finishing ──
    {
        barcode: '4800000000133',
        name: 'Davies Masonry Putty White 1L',
        description: 'Acrylic-based masonry putty for filling hairline cracks, pinholes, and surface imperfections on concrete walls before painting. Sands to a smooth finish.',
        category: 'Paint & Finishing',
        businessType: 'hardware',
        price: 185.00,
        stock: 75,
        image: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?q=80&w=400&auto=format&fit=crop',
        size: '1 Liter',
        capacity: '10-12 sqm/liter coverage',
        variations: { brand: 'Davies', color: 'White', finish: 'Matte Putty' },
        expirationDate: null,
        supplierInfo: {
            name: 'Davies Paints Philippines, Inc.',
            contact: 'orders@daviespaints.com.ph | +63 (2) 8570-7000'
        }
    },
    {
        barcode: '4800000000140',
        name: 'Boysen Permacoat Flat White 4L',
        description: 'Interior latex paint with excellent hiding power and washability. Low VOC formula, safe for indoor use. Suitable for concrete, masonry, and drywall surfaces.',
        category: 'Paint & Finishing',
        businessType: 'hardware',
        price: 620.00,
        stock: 40,
        image: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?q=80&w=400&auto=format&fit=crop',
        size: '4 Liters (1 Gallon)',
        capacity: '35-40 sqm/gallon coverage',
        variations: { brand: 'Boysen', color: 'Flat White', finish: 'Matte / Flat' },
        expirationDate: null,
        supplierInfo: {
            name: 'Pacific Paint (Boysen) Philippines, Inc.',
            contact: 'info@boysen.com.ph | +63 (2) 8364-3500'
        }
    },
    {
        barcode: '4800000000157',
        name: 'Davies Roofguard Red Oxide 4L',
        description: 'Oil-based roof paint formulated for galvanized iron (GI) sheets and metal roofs. Prevents rust, peeling, and water damage. Provides long-lasting protection.',
        category: 'Paint & Finishing',
        businessType: 'hardware',
        price: 850.00,
        stock: 30,
        image: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?q=80&w=400&auto=format&fit=crop',
        size: '4 Liters (1 Gallon)',
        capacity: '25-30 sqm/gallon coverage',
        variations: { brand: 'Davies', color: 'Red Oxide', finish: 'Gloss / Semi-gloss' },
        expirationDate: null,
        supplierInfo: {
            name: 'Davies Paints Philippines, Inc.',
            contact: 'orders@daviespaints.com.ph | +63 (2) 8570-7000'
        }
    },

    // ── Tools ──
    {
        barcode: '4800000000164',
        name: 'Stanley Claw Hammer 16oz',
        description: 'Classic drop-forged steel claw hammer with fiberglass handle for reduced vibration. Anti-slip grip. Suitable for framing, nailing, and demolition work.',
        category: 'Tools',
        businessType: 'hardware',
        price: 450.00,
        stock: 35,
        image: 'https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?q=80&w=400&auto=format&fit=crop',
        size: '16 oz / 11" handle',
        capacity: 'N/A',
        variations: { brand: 'Stanley', type: 'Claw Hammer', handle: 'Fiberglass' },
        expirationDate: null,
        supplierInfo: {
            name: 'Stanley Black & Decker Philippines',
            contact: 'retailers.ph@sbdinc.com | +63 (2) 8580-3300'
        }
    },
    {
        barcode: '4800000000171',
        name: 'Hakken Power Drill 13mm',
        description: 'Variable-speed reversible power drill with 13mm keyless chuck. 550W motor suitable for drilling wood, metal, and light masonry. Includes forward/reverse switch.',
        category: 'Tools',
        businessType: 'hardware',
        price: 1850.00,
        stock: 15,
        image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?q=80&w=400&auto=format&fit=crop',
        size: '13mm Chuck / 550W',
        capacity: '0-3000 RPM',
        variations: { brand: 'Hakken', type: 'Power Drill', voltage: '220V AC' },
        expirationDate: null,
        supplierInfo: {
            name: 'Hakken Tools Trading',
            contact: 'sales@hakkentools.com | +63 (2) 8443-1010'
        }
    },

    // ══════════════════════════════════════════════════════════════════════
    // GROCERY / SME RETAIL  (businessType: "grocery") - Expiring
    // ══════════════════════════════════════════════════════════════════════

    // ── Condiments & Sauces ──
    {
        barcode: '4800016552109',
        name: 'Silver Swan Soy Sauce 1L',
        description: 'Classic Filipino soy sauce made from soybeans and wheat. A kitchen staple for marinating, dipping, and cooking adobo, pancit, and other Filipino dishes.',
        category: 'Condiments',
        businessType: 'grocery',
        price: 45.00,
        stock: 150,
        image: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?q=80&w=400&auto=format&fit=crop',
        size: '1 Liter',
        capacity: 'PET Bottle',
        variations: { brand: 'Silver Swan', type: 'Regular Soy Sauce', flavor: 'Original' },
        expirationDate: '2028-06-30',
        supplierInfo: {
            name: 'NutriAsia, Inc.',
            contact: 'distribution@nutriasia.com | +63 (2) 8819-1111'
        }
    },
    {
        barcode: '4800016552116',
        name: 'Datu Puti Vinegar 1L',
        description: 'Sukang maasim (cane vinegar) made from fermented sugarcane juice. Essential for adobo, paksiw, kinilaw, and as a dipping sauce. Naturally gluten-free.',
        category: 'Condiments',
        businessType: 'grocery',
        price: 38.00,
        stock: 180,
        image: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?q=80&w=400&auto=format&fit=crop',
        size: '1 Liter',
        capacity: 'PET Bottle',
        variations: { brand: 'Datu Puti', type: 'Cane Vinegar', flavor: 'Original' },
        expirationDate: '2028-12-31',
        supplierInfo: {
            name: 'NutriAsia, Inc.',
            contact: 'distribution@nutriasia.com | +63 (2) 8819-1111'
        }
    },
    {
        barcode: '4800016552123',
        name: 'Mang Tomas Lechon Sauce Regular',
        description: 'The original all-around sauce made from liver, breadcrumbs, vinegar, and sugar. Perfect with lechon, bagnet, and grilled meats. A Filipino fiesta must-have.',
        category: 'Condiments',
        businessType: 'grocery',
        price: 35.00,
        stock: 120,
        image: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?q=80&w=400&auto=format&fit=crop',
        size: '550g',
        capacity: 'Plastic Pouch',
        variations: { brand: 'Mang Tomas', type: 'Lechon Sauce', flavor: 'Regular' },
        expirationDate: '2027-08-15',
        supplierInfo: {
            name: 'NutriAsia, Inc.',
            contact: 'distribution@nutriasia.com | +63 (2) 8819-1111'
        }
    },

    // ── Rice & Grains ──
    {
        barcode: '4800034521001',
        name: 'Harvester Premium White Rice 5kg',
        description: 'Well-milled premium white rice with minimal brokens. Fluffy and aromatic when cooked. Ideal for everyday consumption by Filipino households.',
        category: 'Rice & Grains',
        businessType: 'grocery',
        price: 280.00,
        stock: 100,
        image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?q=80&w=400&auto=format&fit=crop',
        size: '5 kg',
        capacity: 'Woven Sack',
        variations: { brand: 'Harvester', type: 'Premium White Rice', grade: 'Well-milled' },
        expirationDate: '2027-02-28',
        supplierInfo: {
            name: 'Inter-Orient Rice Grains Corporation',
            contact: 'sales@harvesterrice.com.ph | +63 (2) 8352-8888'
        }
    },
    {
        barcode: '4800034521018',
        name: 'Sinandomeng Rice 25kg',
        description: 'Premium Sinandomeng variety rice known for its long grain, slight stickiness, and distinct aroma. Preferred by many Filipino families for its great taste.',
        category: 'Rice & Grains',
        businessType: 'grocery',
        price: 1350.00,
        stock: 50,
        image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?q=80&w=400&auto=format&fit=crop',
        size: '25 kg',
        capacity: 'Woven Sack',
        variations: { brand: 'Generic', type: 'Sinandomeng Variety', grade: 'Premium' },
        expirationDate: '2027-01-31',
        supplierInfo: {
            name: 'Bulacan Rice Trading Cooperative',
            contact: 'orders@bulacanrice.org | +63 (44) 791-2300'
        }
    },

    // ── Canned Goods ──
    {
        barcode: '4800100002218',
        name: 'Argentina Corned Beef 175g',
        description: 'Ready-to-eat seasoned corned beef made from quality cuts of beef. Great for corned beef with garlic and egg (silog meals). High in protein.',
        category: 'Canned Goods',
        businessType: 'grocery',
        price: 52.00,
        stock: 200,
        image: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?q=80&w=400&auto=format&fit=crop',
        size: '175g',
        capacity: 'Pull-tab Can',
        variations: { brand: 'Argentina', type: 'Corned Beef', flavor: 'Original' },
        expirationDate: '2029-03-15',
        supplierInfo: {
            name: 'Century Pacific Food, Inc.',
            contact: 'sales.canned@centurypacific.com.ph | +63 (2) 8633-8555'
        }
    },
    {
        barcode: '4800100002225',
        name: 'Ligo Sardines in Tomato Sauce 155g',
        description: 'Tender sardines packed in tangy tomato sauce. Ready to eat or use in sinigang, rice dishes, and pasta. Rich in Omega-3 fatty acids and calcium.',
        category: 'Canned Goods',
        businessType: 'grocery',
        price: 28.00,
        stock: 300,
        image: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?q=80&w=400&auto=format&fit=crop',
        size: '155g',
        capacity: 'Tin Can',
        variations: { brand: 'Ligo', type: 'Sardines', flavor: 'Tomato Sauce' },
        expirationDate: '2029-05-20',
        supplierInfo: {
            name: 'Century Pacific Food, Inc.',
            contact: 'sales.canned@centurypacific.com.ph | +63 (2) 8633-8555'
        }
    },
    {
        barcode: '4800100002232',
        name: 'Century Tuna Hot and Spicy 155g',
        description: 'Premium quality tuna flakes in a spicy chili sauce. Great for rice, crackers, or pasta. High in protein and low in fat. A popular budget-friendly meal option.',
        category: 'Canned Goods',
        businessType: 'grocery',
        price: 42.00,
        stock: 250,
        image: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?q=80&w=400&auto=format&fit=crop',
        size: '155g',
        capacity: 'Tin Can',
        variations: { brand: 'Century Tuna', type: 'Tuna Flakes', flavor: 'Hot and Spicy' },
        expirationDate: '2029-04-10',
        supplierInfo: {
            name: 'Century Pacific Food, Inc.',
            contact: 'sales.canned@centurypacific.com.ph | +63 (2) 8633-8555'
        }
    },

    // ── Beverages ──
    {
        barcode: '4800231000010',
        name: 'Coca-Cola Mismo 295mL',
        description: 'The classic refreshing Coca-Cola cola drink in a convenient mismo (single-serve) plastic bottle. Perfect for on-the-go consumption.',
        category: 'Beverages',
        businessType: 'grocery',
        price: 18.00,
        stock: 400,
        image: 'https://images.unsplash.com/photo-1554866585-cd94860890b7?q=80&w=400&auto=format&fit=crop',
        size: '295 mL',
        capacity: 'PET Bottle',
        variations: { brand: 'Coca-Cola', type: 'Cola', flavor: 'Original', temperature: 'Room Temp' },
        expirationDate: '2026-12-15',
        supplierInfo: {
            name: 'Coca-Cola Beverages Philippines, Inc.',
            contact: 'customer.service@coca-cola.com.ph | +63 (2) 8813-2653'
        }
    },
    {
        barcode: '4800231000027',
        name: 'Absolute Distilled Water 500mL',
        description: 'Pure distilled water in a convenient 500mL bottle. Free from chlorine, bacteria, and other contaminants. Ideal for drinking, baby formula, and health-conscious consumers.',
        category: 'Beverages',
        businessType: 'grocery',
        price: 12.00,
        stock: 500,
        image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?q=80&w=400&auto=format&fit=crop',
        size: '500 mL',
        capacity: 'PET Bottle',
        variations: { brand: 'Absolute', type: 'Distilled Water', flavor: 'Unflavored' },
        expirationDate: '2027-06-10',
        supplierInfo: {
            name: 'Asia Brewery, Inc.',
            contact: 'sales@asiabrewery.com | +63 (2) 8816-3701'
        }
    },
    {
        barcode: '4800231000034',
        name: 'C2 Cool & Clean Green Tea 500mL',
        description: 'Refreshing green tea drink blended with natural lemon flavor. Contains natural antioxidants. Lightly sweetened and served in a convenient PET bottle.',
        category: 'Beverages',
        businessType: 'grocery',
        price: 22.00,
        stock: 350,
        image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?q=80&w=400&auto=format&fit=crop',
        size: '500 mL',
        capacity: 'PET Bottle',
        variations: { brand: 'C2', type: 'Green Tea', flavor: 'Lemon' },
        expirationDate: '2027-03-20',
        supplierInfo: {
            name: 'Universal Robina Corporation',
            contact: 'urc.beverages@urc.com.ph | +63 (2) 8637-2720'
        }
    },

    // ── Snacks ──
    {
        barcode: '4800800010015',
        name: 'Jack n Jill Nova Country Cheddar 78g',
        description: 'Light and crispy multigrain snack with a cheesy cheddar coating. Baked not fried. A popular baon and snack option for both kids and adults.',
        category: 'Snacks',
        businessType: 'grocery',
        price: 28.00,
        stock: 200,
        image: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?q=80&w=400&auto=format&fit=crop',
        size: '78g',
        capacity: 'Foil Bag',
        variations: { brand: 'Jack n Jill', type: 'Multigrain Snack', flavor: 'Country Cheddar' },
        expirationDate: '2026-11-30',
        supplierInfo: {
            name: 'Universal Robina Corporation',
            contact: 'urc.snacks@urc.com.ph | +63 (2) 8637-2720'
        }
    },
    {
        barcode: '4800800010022',
        name: 'Oishi Prawn Crackers Original 90g',
        description: 'Light and airy prawn-flavored crackers. A Filipino snack classic enjoyed by all ages. No artificial flavors, light and crunchy texture.',
        category: 'Snacks',
        businessType: 'grocery',
        price: 32.00,
        stock: 180,
        image: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?q=80&w=400&auto=format&fit=crop',
        size: '90g',
        capacity: 'Foil Bag',
        variations: { brand: 'Oishi', type: 'Prawn Crackers', flavor: 'Original' },
        expirationDate: '2026-12-05',
        supplierInfo: {
            name: 'Liwayway Marketing Corporation',
            contact: 'customercare@oishi.com.ph | +63 (2) 8844-8888'
        }
    },

    // ── Personal Care ──
    {
        barcode: '4800361000011',
        name: 'Safeguard Pure White Bar Soap 135g',
        description: 'Antibacterial bar soap with a clean, fresh scent. Provides 10-hour germ protection. Suitable for daily use for the whole family. Dermatologist-tested.',
        category: 'Personal Care',
        businessType: 'grocery',
        price: 42.00,
        stock: 250,
        image: 'https://images.unsplash.com/photo-1607006344380-b6775a0824a7?q=80&w=400&auto=format&fit=crop',
        size: '135g',
        capacity: 'Bar (Single)',
        variations: { brand: 'Safeguard', type: 'Bar Soap', scent: 'Pure White / Fresh' },
        expirationDate: '2029-06-10',
        supplierInfo: {
            name: 'Procter & Gamble Philippines, Inc.',
            contact: 'pg.distributors@pg.com | +63 (2) 8894-3999'
        }
    },
    {
        barcode: '4800361000028',
        name: 'Head & Shoulders Anti-Dandruff Shampoo 70mL',
        description: 'Anti-dandruff shampoo clinically proven to remove and prevent dandruff. Contains Pyrithione Zinc. Leaves hair feeling clean and smelling fresh.',
        category: 'Personal Care',
        businessType: 'grocery',
        price: 35.00,
        stock: 200,
        image: 'https://images.unsplash.com/photo-1607006344380-b6775a0824a7?q=80&w=400&auto=format&fit=crop',
        size: '70 mL (Sachet/Small Bottle)',
        capacity: 'Bottle',
        variations: { brand: 'Head & Shoulders', type: 'Shampoo', variant: 'Classic Clean' },
        expirationDate: '2029-06-10',
        supplierInfo: {
            name: 'Procter & Gamble Philippines, Inc.',
            contact: 'pg.distributors@pg.com | +63 (2) 8894-3999'
        }
    },
    {
        barcode: '4800361000035',
        name: 'Colgate Regular Toothpaste 100mL',
        description: 'Cavity-fighting fluoride toothpaste with a classic cool mint flavor. Strengthens enamel, freshens breath, and cleans teeth effectively with regular brushing.',
        category: 'Personal Care',
        businessType: 'grocery',
        price: 55.00,
        stock: 300,
        image: 'https://images.unsplash.com/photo-1607006344380-b6775a0824a7?q=80&w=400&auto=format&fit=crop',
        size: '100 mL',
        capacity: 'Tube',
        variations: { brand: 'Colgate', type: 'Toothpaste', variant: 'Regular / Cavity Protection' },
        expirationDate: '2028-06-10',
        supplierInfo: {
            name: 'Colgate-Palmolive Philippines, Inc.',
            contact: 'customercare@colpal.com | +63 (2) 8856-1000'
        }
    },

    // ── Cooking Essentials ──
    {
        barcode: '4800045231001',
        name: 'Magnolia Fresh Milk 1L',
        description: 'Fresh pasteurized whole milk from grass-fed cows. Rich in calcium and protein. Ideal for drinking, baking, making coffee, cereals, and Filipino desserts.',
        category: 'Cooking Essentials',
        businessType: 'grocery',
        price: 88.00,
        stock: 100,
        image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?q=80&w=400&auto=format&fit=crop',
        size: '1 Liter',
        capacity: 'Carton',
        variations: { brand: 'Magnolia', type: 'Fresh Milk', fat: 'Whole / Full Cream' },
        expirationDate: '2026-07-10',
        supplierInfo: {
            name: 'San Miguel Food and Beverage, Inc. (Magnolia)',
            contact: 'orders.dairy@sanmiguel.com.ph | +63 (2) 8632-2000'
        }
    },
    {
        barcode: '4800045231018',
        name: 'Minola Coconut Cooking Oil 1L',
        description: 'Pure refined coconut cooking oil extracted from fresh coconut meat. Ideal for frying, sautéing, and baking. High smoke point, cholesterol-free, trans-fat free.',
        category: 'Cooking Essentials',
        businessType: 'grocery',
        price: 95.00,
        stock: 150,
        image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?q=80&w=400&auto=format&fit=crop',
        size: '1 Liter',
        capacity: 'PET Bottle',
        variations: { brand: 'Minola', type: 'Coconut Oil', grade: 'Refined' },
        expirationDate: '2027-06-10',
        supplierInfo: {
            name: 'San Pablo Manufacturing Corporation (Minola)',
            contact: 'sales.minola@spmc.com.ph | +63 (2) 8892-4000'
        }
    },
    {
        barcode: '4800045231025',
        name: 'UFC Banana Ketchup Original 320g',
        description: 'Filipino-style banana-based ketchup with a sweet, tangy flavor. A universal condiment for hotdogs, burgers, eggs, and fried foods. Made with real banana.',
        category: 'Cooking Essentials',
        businessType: 'grocery',
        price: 48.00,
        stock: 175,
        image: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?q=80&w=400&auto=format&fit=crop',
        size: '320g',
        capacity: 'Squeeze Bottle',
        variations: { brand: 'UFC', type: 'Banana Ketchup', flavor: 'Original' },
        expirationDate: '2027-09-10',
        supplierInfo: {
            name: 'NutriAsia, Inc.',
            contact: 'distribution@nutriasia.com | +63 (2) 8819-1111'
        }
    },
];

// ─── Seed Functions ────────────────────────────────────────────────────────────

async function seedUsers() {
    console.log('\n📦 Seeding users (admin and developer roles)...');
    const usersCol = firestore.collection('users');

    // 🗑️ Clear existing users collection to start fresh
    const snap = await usersCol.get();
    const deleteBatch = firestore.batch();
    snap.docs.forEach(doc => deleteBatch.delete(doc.ref));
    if (!snap.empty) {
        await deleteBatch.commit();
        console.log(`  ✅ Cleared ${snap.size} old users.`);
    }

    for (const user of USERS) {
        const docRef = usersCol.doc(user.id);
        await docRef.set({
            username:     user.username,
            passwordHash: user.passwordHash,
            role:         user.role,
            name:         user.name,
            createdAt:    FieldValue.serverTimestamp(),
        });
        console.log(`  ✅ CREATED: User '${user.username}' (${user.role})`);
    }
}

async function seedProducts() {
    const productsCol = firestore.collection('products');

    console.log('\n🗑️  Clearing existing products for clean reset...');
    const snap = await productsCol.get();
    
    // Batch delete
    const deleteBatch = firestore.batch();
    snap.docs.forEach(doc => deleteBatch.delete(doc.ref));
    if (!snap.empty) {
        await deleteBatch.commit();
        console.log(`  ✅ Cleared ${snap.size} old products.`);
    } else {
        console.log('  ✅ Product collection is already empty.');
    }

    console.log('\n📦 Seeding products with supplierInfo & expiration dates...');
    let created = 0;
    let skipped = 0;

    for (const product of PRODUCTS) {
        // Double check for duplicate name (case-insensitive)
        const nameSnap = await productsCol
            .where('nameLower', '==', product.name.toLowerCase())
            .limit(1)
            .get();
        if (!nameSnap.empty) {
            console.log(`  ⚠️  SKIP (dup name): '${product.name}'`);
            skipped++;
            continue;
        }

        // Insert product
        await productsCol.add({
            ...product,
            nameLower: product.name.toLowerCase(),
            createdAt: FieldValue.serverTimestamp(),
            updatedAt: FieldValue.serverTimestamp(),
        });
        console.log(`  ✅ CREATED: [${product.businessType.toUpperCase()}] '${product.name}'`);
        created++;
    }

    console.log(`\n  📊 Summary: ${created} products created, ${skipped} skipped (duplicates).`);
}

async function clearOldSales() {
    console.log('\n🗑️  Clearing legacy sales collection to align with PIM scope...');
    const salesCol = firestore.collection('sales');
    const snap = await salesCol.get();

    if (!snap.empty) {
        const deleteBatch = firestore.batch();
        snap.docs.forEach(doc => deleteBatch.delete(doc.ref));
        await deleteBatch.commit();
        console.log(`  ✅ Deleted ${snap.size} legacy sales transaction logs.`);
    } else {
        console.log('  ✅ No legacy sales logs found.');
    }
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
    console.log('==========================================================');
    console.log('  🔥 FIRESTORE SEED SCRIPT (THESIS PIM ALIGNMENT)');
    console.log('  Project:', process.env.FIREBASE_PROJECT_ID);
    console.log('==========================================================');

    try {
        await seedUsers();
        await seedProducts();
        await clearOldSales();
        console.log('\n✅ Seeding complete! Check your Firebase Console.');
        console.log('==========================================================\n');
    } catch (err) {
        console.error('\n❌ Seeding failed:', err.message);
        process.exit(1);
    }

    process.exit(0);
}

main();
