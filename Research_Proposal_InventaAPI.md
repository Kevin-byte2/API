# RESEARCH PROPOSAL FORM

---

## Research Title

**InventaAPI: Development of an API-Based Data-as-a-Service (DaaS) Engine for Multi-Business Sales and Inventory Management Among Philippine Small and Medium Enterprises (SMEs)**

---

## Proponents

1. ___________________________
2. ___________________________
3. ___________________________

**Adviser:** ____________________
**Data Analyst:** ____________________
**Critic Reader:** ____________________

---

## Priority Area/s

**2. Social & Community Development**
- ☑ Digital Transformation *(E-governance, fintech, smart cities, digital inclusion)*

**3. Governance, Economics & Policy**
- ☑ Economics and Business *(Entrepreneurship, trade, finance, sustainable practices)*

---

## Software and Emerging Technology Domains

- ☑ **Web Applications Development** *(e-commerce, portals, dashboards, online services, collaborative platforms)*
- ☑ **Data Analytics & Visualization** *(predictive dashboards, big data tools, business intelligence, real-time monitoring)*
- ☑ **Expert Systems and Decision Support Systems / Intelligent Systems** *(knowledge-based systems, AI-driven decision support, diagnostics)*
- ☑ **Mobile Computing Systems** *(Android/iOS apps, cross-platform solutions, mobile health, mobile banking)*
- ☑ **Cybersecurity Solutions** *(authentication systems, intrusion detection, secure communication apps, digital forensics)*

---

## Background

### Technologies

InventaAPI is built on a **Node.js + Express.js** server architecture, leveraging the following core technologies and libraries:

| Layer | Technology |
|---|---|
| Runtime | Node.js (ES Modules / `type: "module"`) |
| Web Framework | Express.js v4.21 |
| Authentication | JSON Web Tokens (JWT) via `jsonwebtoken` + `bcryptjs` for password hashing |
| Security Hardening | `helmet` (secure HTTP headers: XSS, MIME-sniffing, clickjacking prevention) |
| Rate Limiting | `express-rate-limit` (150 requests per 15-minute window per IP) |
| CORS Policy | `cors` middleware (configurable for approved origins) |
| Data Persistence | Flat-file JSON database (`data.json`) with an in-memory `LocalDatabase` class |
| External Access | `x-api-key` header-based API Key authentication for DaaS B2B consumers |
| Developer Portal | Vanilla HTML/CSS/JavaScript developer documentation served statically |
| Deployment | Railway.app (configured via `railway.toml`), cloud-hosted |
| Compliance | Philippine Data Privacy Act (DPA) of 2012 / GDPR-aligned access controls |

The system exposes a RESTful API divided into two access tiers:
1. **Internal API** (`/api/*`) — secured with JWT Bearer tokens and Role-Based Access Control (RBAC), used by the front-end cashier/admin application (ASM system).
2. **DaaS Layer** (`/daas/*`) — secured with externally issued API Keys, designed for third-party B2B consumers (suppliers, partner businesses, external web stores, ERP systems).

---

### Target Users

The system serves two distinct user groups:

**Primary Users (Internal — ASM Front-End):**
- **Administrators** — manage product inventory, approve/reject product acquisition recommendations, and view sales analytics dashboards.
- **Cashiers** — perform point-of-sale (POS) transactions, scan barcodes, process sales with discount computation, and flag new/unknown products via the recommendation system.

**Secondary Users (External — DaaS API Consumers):**
- **B2B Partner Businesses** — suppliers, retail partners, and external stores that subscribe to InventaAPI to access live product catalogs and aggregate sales analytics for their own systems (ERP, websites, procurement tools).
- **Developers & System Integrators** — technical professionals who integrate the DaaS endpoints into custom applications using any language (Python, JavaScript, PHP, Java, etc.).

**Target Business Types Supported:**
- Hardware stores (structural steel, plumbing, construction materials)
- Pharmacies / drugstores (prescription and over-the-counter medicines)
- Grocery / SME retail stores (FMCG, condiments, food products)

---

### Existing Studies/Software

Several existing systems address portions of the problem space:

1. **QuickBooks POS / SAP Business One** — Enterprise-grade inventory and sales systems. However, these are cost-prohibitive for Philippine SMEs, require significant IT infrastructure, and do not expose data programmatically to third parties.
2. **HashMicro / Odoo ERP** — Comprehensive ERP platforms available in the Philippines. These are generalist platforms not tailored to the multi-business-type SME context, and lack a DaaS monetization model.
3. **Loyverse POS** — Cloud POS widely used by small retailers in the Philippines. Offers basic inventory, but provides no external API access for B2B data sharing.
4. **Philippine Government's Go Negosyo Platform** — Provides MSE support resources but lacks technological integration with SME operational systems.
5. **Academic Studies on SME Digitalization (DOST-PCIEERD, 2022–2024)** — Multiple studies confirm that over 70% of Philippine SMEs still rely on manual (paper-based or spreadsheet) inventory tracking, creating significant data loss risk and operational inefficiency.

---

### Current Gap or Market Landscape

Despite the proliferation of POS and inventory systems, a critical gap exists in the Philippine SME technology landscape:

- **No standardized data exchange layer exists** between SME operational systems and their supply chain partners, B2B buyers, or government reporting bodies.
- Existing systems are **siloed** — data generated during sales and inventory operations cannot be consumed by external systems without manual exports, creating delays and inaccuracies.
- Philippine SMEs operating **multiple business types** (e.g., a combined hardware-grocery store) are poorly served by single-vertical software, requiring them to run separate systems.
- The **DaaS (Data-as-a-Service) monetization model** — where a business's operational data becomes a revenue-generating asset — is largely absent from the Philippine SME technology ecosystem, despite its global traction.
- Existing solutions do not implement **Philippine DPA 2012-compliant** role-based data access controls suitable for SME use cases.

InventaAPI directly addresses this gap by providing a **multi-business-type, API-native, DPA-compliant platform** that enables SMEs to operate their daily sales and inventory while simultaneously monetizing their data through a controlled DaaS subscription model.

---

## Problem Statement

1. Philippine Small and Medium Enterprises (SMEs) operating across multiple business types — including hardware, pharmacy, and grocery retail — lack a unified, digitalized sales and inventory management system that can handle multi-category product data within a single platform, resulting in fragmented record-keeping, inventory discrepancies, and missed sales opportunities.

2. The absence of a standardized, secure, and programmatic data-sharing interface between Philippine SMEs and their B2B partners (suppliers, distributors, and affiliated retail systems) forces businesses to rely on time-consuming manual data exports and informal communication, which increases the risk of data inaccuracies, stock-outs, and supply chain disruptions.

3. Existing POS and inventory systems deployed in Philippine SME environments do not implement a Data-as-a-Service (DaaS) model with proper role-based authentication, API key subscription management, and compliance with the Philippine Data Privacy Act (DPA) of 2012, leaving business-critical data inadequately protected and commercially unmonetized.

---

## General Objectives

This study aims to **design, develop, and deploy InventaAPI** — a security-hardened, API-Based Data-as-a-Service (DaaS) Engine for multi-business sales and inventory management — that enables Philippine SMEs to digitalize their operations and expose their inventory and sales data to authorized B2B subscribers through a controlled, compliant, and commercially viable API platform.

---

## Specific Objectives

1. To design and implement a **multi-business-type product catalog management system** that supports hardware, pharmacy, and grocery product classifications with barcode-based lookup, product variants (size, capacity, brand), and stock tracking within a unified API backend.

2. To develop a **Role-Based Access Control (RBAC) authentication system** using JSON Web Tokens (JWT) and `bcryptjs` password hashing that differentiates system access between administrator and cashier roles, ensuring that sensitive inventory and sales data are accessible only to authorized internal users.

3. To build a **DaaS integration layer** (`/daas/*`) protected by externally issued API Keys with tiered subscription plans (Starter, Professional, Enterprise), enabling B2B partner systems to access live product catalogs and aggregate sales analytics in a structured, compliance-labeled JSON format.

4. To implement an **Intelligent Product Acquisition Recommendation System** that automatically prompts cashiers and administrators to enroll unregistered products discovered during barcode scanning into the inventory, reducing unrecorded sales and supporting proactive stock management.

5. To enforce **security hardening measures** — including HTTP header protection via `helmet`, cross-origin request policies via CORS, and IP-based rate limiting (150 requests per 15-minute window) — ensuring system resilience against common web threats (XSS, CSRF, DoS attacks) and compliance with the Philippine Data Privacy Act (DPA) of 2012.

6. To deploy a **publicly accessible Developer Portal** (static HTML/CSS/JS) documenting all API endpoints, integration examples in multiple languages (cURL, JavaScript, Python, PHP), a live API tester, and a tiered pricing/subscription interface to support third-party developer onboarding.

---

## Beneficiaries

**Philippine SME Owners and Operators.**
SME business owners — particularly those running hardware stores, pharmacies, and grocery retail outlets — directly benefit from InventaAPI by gaining a centralized, digitalized platform to manage their product inventory, process sales transactions, track revenue, and control staff access through role-based permissions. The system replaces error-prone manual record-keeping with a secure, real-time API-driven backend. Additionally, through the DaaS subscription model, SME operators gain a new revenue stream by monetizing their operational data to B2B partners, transforming a cost center (IT infrastructure) into a profit-generating asset.

**Cashiers and Store Staff.**
Cashiers benefit from a streamlined, barcode-driven point-of-sale interface connected to the InventaAPI backend. The system's intelligent recommendation engine reduces friction when an unknown product barcode is scanned — instead of causing a transaction error, the system automatically logs an acquisition recommendation for administrator review, allowing the cashier to continue operations without interruption. Their involvement is as daily active users of the internal API, processing sales transactions and triggering real-time inventory deductions.

**B2B Partner Businesses and Supply Chain Stakeholders.**
Suppliers, distributors, and affiliated business systems that subscribe to the InventaAPI DaaS layer gain programmatic access to live product catalogs (pricing, stock levels, product specifications) and aggregated sales analytics (total revenue, transaction count, average order value, business segment breakdown). This enables them to automate procurement decisions, adjust supply forecasts, and integrate SME data directly into their own ERP or inventory systems — eliminating manual data exchange delays. Their involvement is as paying API Key subscribers consuming the `/daas/catalog` and `/daas/sales-feed` endpoints.

**Developers and System Integrators.**
Software developers and IT consultants who build systems for Philippine businesses benefit from InventaAPI's publicly accessible Developer Portal, which provides comprehensive API documentation, multi-language integration examples (cURL, JavaScript, Python, PHP), a live sandbox API tester, and structured JSON response schemas. Their involvement is as technical integrators who embed InventaAPI data feeds into custom applications, mobile apps, or enterprise platforms on behalf of their clients.

**Future Researchers.**
This study contributes to the growing body of knowledge on API-Based Data-as-a-Service architectures applied to Philippine SME digitalization. Future researchers may build upon this system to explore: (a) AI/ML-driven demand forecasting using the sales feed data, (b) integration of IoT barcode scanners with the recommendation engine, (c) expansion of DaaS models to government reporting bodies (BIR, DTI), (d) multi-tenant DaaS architectures serving multiple SMEs from a single platform, and (e) blockchain-backed audit trails for DPA-compliant data transactions.

---

## Scope

This study covers the **design, development, testing, and cloud deployment** of the InventaAPI system, encompassing the following components:

1. **Backend API Engine** — A Node.js/Express.js RESTful API server with five route modules: authentication (`/api/auth`), product management (`/api/products`), sales transactions (`/api/sales`), product acquisition recommendations (`/api/recommendations`), and the DaaS integration layer (`/daas`).

2. **Data Management** — A flat-file JSON local database (`data.json`) managed by a `LocalDatabase` class, supporting CRUD operations for users, products, sales transactions, and acquisition recommendations. Seed data covers three business types: hardware, pharmacy, and grocery.

3. **Security Implementation** — JWT-based authentication, `bcryptjs` password hashing, Helmet HTTP header security, CORS policy enforcement, and IP-based rate limiting (150 requests/15 minutes).

4. **DaaS Subscription Layer** — API Key generation and management (Starter: 50 req, Professional: 5,000 req, Enterprise: unlimited), a B2B subscription endpoint (`/daas/subscribe`), and protected data feeds for product catalogs and sales analytics.

5. **Intelligent Product Recommendation System** — Barcode scanning integration with automatic recommendation logging, admin approval/rejection workflows, and product promotion from recommendation to active inventory.

6. **Developer Portal** — A static, publicly hosted HTML/CSS/JavaScript API documentation portal featuring endpoint references, multi-language code examples, a live API tester, pricing plans, and a subscription/payment modal interface.

7. **Cloud Deployment** — Deployment to Railway.app using a `railway.toml` configuration, with environment variable management via `.env` (PORT, JWT_SECRET).

8. The scope is **limited to the API backend and its developer portal**. The front-end ASM (Admin/Sales Management) web application that consumes the internal API is a separate companion system and is not the primary subject of this proposal.

---

## Limitation

1. **Flat-File Database Architecture** — The system uses a JSON file (`data.json`) as its persistent data store rather than a relational database (MySQL, PostgreSQL) or NoSQL database (MongoDB). This limits the system's scalability under high concurrent write loads and makes it unsuitable for production deployments with thousands of simultaneous users without a database migration.

2. **In-Memory API Key Management** — DaaS API keys generated through the `/daas/subscribe` endpoint are stored in an in-memory JavaScript `Set` object. Keys are lost upon server restart, meaning active subscriptions are not persisted between deployments without additional database integration.

3. **No Real Payment Gateway Integration** — The Developer Portal's subscription modal simulates a payment experience (GCash QR, Maya, Bank Transfer, Credit Card) for demonstration and UI/UX purposes. Actual payment processing is not implemented; API key provisioning currently relies on manual or simulated subscription flows.

4. **Single-Tenant Architecture** — The current system is designed to serve a single SME's data. It does not support multi-tenant operation where multiple distinct businesses share the same platform instance while keeping their data isolated.

5. **No Real-Time Push Notifications** — The system operates on a request/response (polling) model. It does not implement WebSockets or Server-Sent Events (SSE) for real-time push updates to DaaS subscribers when inventory changes occur.

6. **Limited Product Catalog** — The seed database contains a representative sample of products across three business types. The system does not include bulk product import functionality (CSV/Excel) or integration with external product databases (UPC/EAN registries).

7. **No Automated Testing Suite** — The current implementation does not include unit tests, integration tests, or load testing scripts, which limits formal verification of system behavior under edge cases and high traffic.

---

## Materials and Methods

*See discussion on Methodology.*

The study will follow an **Agile-Iterative Development Model** (specifically, Agile Scrum with two-week sprint cycles), chosen for its suitability to API development projects where requirements evolve iteratively based on stakeholder feedback and integration testing results.

**Development Phases:**

| Phase | Activities |
|---|---|
| Phase 1 — Requirements & Design | Stakeholder interviews with SME operators, DaaS consumer needs analysis, system architecture design, database schema planning, API contract definition |
| Phase 2 — Core API Development | Authentication module (JWT + bcrypt), Product CRUD endpoints, Sales transaction engine with stock deduction, RBAC middleware |
| Phase 3 — DaaS Layer Development | API Key middleware, `/daas/catalog` and `/daas/sales-feed` endpoints, B2B subscription endpoint with plan tiers |
| Phase 4 — Intelligent Recommendation System | Barcode lookup with unregistered product detection, recommendation CRUD, admin approval/rejection workflow |
| Phase 5 — Security Hardening | Helmet integration, CORS policy configuration, rate limiting implementation, audit logging middleware |
| Phase 6 — Developer Portal | Static HTML/CSS/JS documentation portal, multi-language code examples, live API tester, pricing UI, subscription modal |
| Phase 7 — Deployment & Testing | Railway.app cloud deployment, environment variable configuration, API endpoint functional testing, security penetration testing |
| Phase 8 — Documentation & Evaluation | Proponent documentation, user acceptance testing with SME staff and B2B partner testers, system performance evaluation |

**Tools and Materials:**

| Category | Tools |
|---|---|
| Programming Language | JavaScript (Node.js, ES Modules) |
| IDE | Visual Studio Code |
| API Testing | Postman, curl, built-in Developer Portal Live Tester |
| Version Control | Git / GitHub |
| Deployment Platform | Railway.app |
| Browser Testing | Google Chrome DevTools |
| Documentation | Markdown, HTML/CSS Developer Portal |

---

## Sustainability Plan

### Target Platforms
- **Primary Platform:** Web Application (RESTful API, cloud-hosted)
- **Developer Portal:** Web (accessible via any modern browser)
- **Consumer Compatibility:** Any platform capable of HTTP requests — Android, iOS, Web, Desktop, ERP systems, server-side scripts
- **Operating System Independence:** The API is OS-agnostic; Railway.app hosts on Linux containers

**Development Cost Estimate:**
- Hardware (developer workstations): ₱0 (existing equipment)
- Software licenses: ₱0 (all open-source tools — Node.js, Express, VS Code)
- Domain name (`inventaapi.ph`): ₱1,500–₱2,000/year
- SSL Certificate: ₱0 (Railway.app provides free TLS/SSL)

### Deployment Requirements (Railway.app)
- **Server Configuration:** Railway.app Hobby Plan — shared container with auto-scaling
- **Memory:** Minimum 512 MB RAM (adequate for flat-file JSON operations)
- **CPU:** Shared vCPU (burstable)
- **Storage:** 1 GB (sufficient for JSON flat-file persistence)
- **Estimated Monthly Cost:** ₱280–₱560/month (Railway.app Hobby, USD $5–$10/month)
- **Estimated Annual Cost:** ₱3,360–₱6,720/year
- **Scaling Path:** Upgrade to Railway.app Pro (USD $20/month) or migrate to a VPS (DigitalOcean Droplet) with PostgreSQL for production-grade multi-tenant operation

### Budget Requirements

| Item | Estimated Cost |
|---|---|
| Cloud Hosting (Railway, 12 months) | ₱6,720 |
| Domain Name (1 year) | ₱2,000 |
| Developer Training / Onboarding Materials | ₱5,000 |
| SME User Acceptance Testing (incentives) | ₱3,000 |
| Postman API Testing Tools (Team Plan) | ₱0 (free tier) |
| Documentation & Report Printing | ₱2,000 |
| Contingency (10%) | ₱1,872 |
| **TOTAL ESTIMATED BUDGET** | **₱20,592** |

**Maintenance Activities:**
- Monthly dependency audits (`npm audit`) for security vulnerability patches
- Quarterly review of API key subscriber logs and rate limit adjustments
- Bi-annual database migration planning (flat-file → relational DB as user base grows)
- Annual renewal of domain and hosting subscriptions

---

## Timeline of Activities

**Development Model: Agile Scrum (8 Sprints × 2 Weeks = 16 Weeks / ~4 Months)**

| Week | Sprint | Activities |
|---|---|---|
| 1–2 | Sprint 1 | Requirements gathering, stakeholder interviews, system architecture design, database schema, API contract specification |
| 3–4 | Sprint 2 | Authentication module (JWT, bcrypt), user CRUD, RBAC middleware, environment configuration |
| 5–6 | Sprint 3 | Product management endpoints (CRUD, barcode lookup, multi-business filtering), database integration |
| 7–8 | Sprint 4 | Sales transaction engine (stock deduction, discount handling, cashier/admin roles), sales analytics endpoint |
| 9–10 | Sprint 5 | DaaS integration layer (API Key middleware, `/daas/catalog`, `/daas/sales-feed`, subscription endpoint with plan tiers) |
| 11–12 | Sprint 6 | Intelligent Product Acquisition Recommendation System (scanner hook, recommendation CRUD, admin approve/ignore workflow) |
| 13–14 | Sprint 7 | Security hardening (Helmet, CORS, rate limiting, audit logging), Developer Portal (HTML/CSS/JS, live tester, pricing modal) |
| 15–16 | Sprint 8 | Cloud deployment (Railway.app), integration testing, user acceptance testing, documentation, final report |

### Gantt Chart

```
ACTIVITY                        | W1 | W2 | W3 | W4 | W5 | W6 | W7 | W8 | W9 |W10 |W11 |W12 |W13 |W14 |W15 |W16 |
--------------------------------|----|----|----|----|----|----|----|----|----|----|----|----|----|----|----|----|
Requirements & Design           | ██ | ██ |    |    |    |    |    |    |    |    |    |    |    |    |    |    |
Authentication Module           |    |    | ██ | ██ |    |    |    |    |    |    |    |    |    |    |    |    |
Product Management API          |    |    |    |    | ██ | ██ |    |    |    |    |    |    |    |    |    |    |
Sales Transaction Engine        |    |    |    |    |    |    | ██ | ██ |    |    |    |    |    |    |    |    |
DaaS Integration Layer          |    |    |    |    |    |    |    |    | ██ | ██ |    |    |    |    |    |    |
Recommendation System           |    |    |    |    |    |    |    |    |    |    | ██ | ██ |    |    |    |    |
Security & Developer Portal     |    |    |    |    |    |    |    |    |    |    |    |    | ██ | ██ |    |    |
Deployment, Testing & Docs      |    |    |    |    |    |    |    |    |    |    |    |    |    |    | ██ | ██ |
```

---

## Expected Output

The primary expected output of this study is **InventaAPI** — a fully deployed, cloud-hosted, RESTful API-Based Data-as-a-Service (DaaS) Engine accessible at a public URL (e.g., `https://inventaapi.ph` or via Railway.app), comprising the following deliverables:

### 1. Core API Backend
A production-ready Node.js/Express.js server with five functional route modules:
- `/api/auth` — JWT-based login and profile endpoints for internal users
- `/api/products` — Full product CRUD with barcode lookup, multi-business-type filtering, size/capacity/variation support, and image URL management
- `/api/sales` — Transactional sales recording with real-time inventory stock deduction, discount handling, and cashier attribution
- `/api/recommendations` — Intelligent product acquisition recommendation pipeline with cashier submission, admin approval/rejection, and automatic product promotion to active inventory
- `/daas` — Externally accessible B2B data feed with structured product catalog and sales analytics, protected by API Key authentication and tiered subscription quotas

### 2. Security-Hardened Infrastructure
A fully configured security layer including: JWT + bcrypt authentication, Helmet HTTP header enforcement, CORS policy management, IP-based rate limiting (150 req/15 min), request audit logging, and Data Privacy Act (DPA) 2012-compliant access control labeling on all DaaS responses.

### 3. DaaS Subscription Platform
A functional B2B subscription system generating unique, plan-labeled API keys (`daas_sme_{plan}_{email}_{hash}`) across three tiers — Starter (50 req), Professional (5,000 req), Enterprise (unlimited) — enabling InventaAPI to serve as a commercially viable data monetization platform for participating SMEs.

### 4. Developer Portal
A polished, publicly accessible static web application (HTML/CSS/JavaScript) featuring: full API endpoint documentation, multi-language integration examples (cURL, JavaScript, Python, PHP), an interactive live API tester, a tiered pricing display, and a multi-step subscription modal simulating GCash QR, Maya, Credit Card, and bank transfer payment flows.

### 5. Cloud Deployment
A live, Railway.app-hosted deployment of the complete InventaAPI system with HTTPS/TLS encryption, environment variable management, and a health check endpoint (`/daas/health`) confirming operational status.

---

## Collaborating Agencies

This research project is being developed in collaboration with and for the benefit of **participating Philippine Small and Medium Enterprises (SMEs)** engaged in hardware retail, pharmaceutical dispensing, and grocery operations. These partner businesses serve as the primary data sources and operational context for the system, providing real-world product catalog structures, sales workflow requirements, and barcode inventory processes that informed the design of the InventaAPI backend.

Additionally, this study aligns with the digitalization advocacy of the **Department of Trade and Industry (DTI)** under its *MSME Digitalization Program* and the **Department of Information and Communications Technology (DICT)** under its *Digital Economy Framework*, both of which promote the adoption of cloud-based and API-driven technologies among Philippine MSMEs as a strategy to improve business productivity, supply chain integration, and economic competitiveness. Should the study progress to a pilot deployment phase, formal partnership or endorsement from these agencies may be sought to facilitate adoption among a broader SME base.

The study also operates within the regulatory framework established by the **National Privacy Commission (NPC)** under the *Data Privacy Act (DPA) of 2012 (Republic Act No. 10173)*, ensuring that all data access, storage, and sharing mechanisms implemented in InventaAPI are compliant with Philippine data protection law — a critical consideration given the system's role in exposing SME operational data to third-party B2B consumers through its DaaS layer.

---

*End of Research Proposal Form*
