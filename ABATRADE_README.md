# 🌍 AbaTrade – Cross-Border eCommerce Platform

**Version:** 4.0 (Integrated Edition)
**Date:** October 2025
**Author:** AbaTrade Product & Engineering Team

---

## 📘 Overview

**AbaTrade** is a cross-border eCommerce platform that connects verified artisans in **Aba, Nigeria**, with buyers in **Houston, TX** via a pilot B2C/B2B model.

This version (4.0) delivers a **web-based architecture** powered by:
- **Frontend:** ReactJS with Vite + TypeScript
- **Backend:** Laravel 11 (PHP 8.3)
- **Database:** MySQL / MariaDB
- **Payments:** Stripe (International) + Paystack (Nigeria)

### 🎯 Core Modules

- 🔍 **AbaTrade Inspect™** - Quality Assurance
- 💰 **Escrow Wallet System** - Secure Payments
- 🚚 **Logistics & Tracking** - Aba → Houston Shipping
- ⭐ **Ratings & Reviews** - Trust Layer

---

## 🧩 Tech Stack

| Layer | Technology |
|--------|-------------|
| **Frontend** | ReactJS (Vite + TypeScript) |
| **Backend** | Laravel 11 (PHP 8.3) |
| **Database** | MySQL / MariaDB |
| **Payments** | Stripe + Paystack |
| **State Management** | Zustand |
| **API Client** | Axios + React Query |
| **Styling** | TailwindCSS |
| **Authentication** | Laravel Sanctum |
| **File Storage** | AWS S3 / Laravel Storage |
| **Hosting** | Laravel Forge / Vercel |

---

## 📁 Project Structure

```
abatrade/
├── backend/                    # Laravel Backend
│   ├── app/
│   │   ├── Http/
│   │   │   ├── Controllers/   # API Controllers
│   │   │   └── Middleware/    # Custom Middleware
│   │   ├── Models/            # Eloquent Models
│   │   └── Services/          # Business Logic (EscrowService, etc.)
│   ├── database/
│   │   ├── migrations/        # Database Migrations
│   │   └── seeders/           # Database Seeders
│   ├── routes/
│   │   └── api.php            # API Routes
│   └── .env.example           # Environment Variables Template
│
├── frontend/                  # React Frontend
│   ├── src/
│   │   ├── components/        # Reusable Components
│   │   ├── pages/             # Page Components
│   │   ├── services/          # API Service Layer
│   │   ├── stores/            # Zustand State Stores
│   │   ├── hooks/             # Custom React Hooks
│   │   └── assets/            # Static Assets
│   ├── public/                # Public Assets
│   └── package.json           # Frontend Dependencies
│
└── README.md                  # This File
```

---

## 🚀 Getting Started

### Prerequisites

- **Backend:**
  - PHP 8.3+
  - Composer
  - MySQL 8.0+
  - Laravel 11

- **Frontend:**
  - Node.js 18+
  - npm or yarn

### 1. Backend Setup (Laravel)

```bash
# Navigate to backend directory
cd backend

# Install dependencies
composer install

# Copy environment file
cp .env.example .env

# Generate application key
php artisan key:generate

# Configure database in .env file
DB_DATABASE=abatrade
DB_USERNAME=root
DB_PASSWORD=your_password

# Run migrations
php artisan migrate

# Seed database (optional)
php artisan db:seed

# Start development server
php artisan serve
# Backend will run on http://localhost:8000
```

### 2. Frontend Setup (React)

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Configure API URL in .env
VITE_API_BASE_URL=http://localhost:8000/api/v1
VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key
VITE_PAYSTACK_PUBLIC_KEY=your_paystack_public_key

# Start development server
npm run dev
# Frontend will run on http://localhost:5173
```

### 3. Access the Application

- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:8000/api/v1

---

## 🗄️ Database Schema

### Core Tables

| Table | Description | Key Fields |
|--------|-------------|------------|
| **users** | Buyers, sellers, inspectors, admins | id, role, verified, email |
| **products** | Seller products | id, seller_id, title, price, stock_qty, verified |
| **orders** | Buyer orders | id, buyer_id, seller_id, product_id, status, tracking_no |
| **inspection_reports** | QA data | id, order_id, inspector_id, photos, notes, passed |
| **shipping_quotes** | Logistics quotes | id, order_id, weight, destination, price, tracking_id |
| **ratings** | Buyer reviews | id, order_id, score, review_text |
| **escrow_transactions** | Escrow wallet | id, order_id, amount, payment_status, released_at |

---

## 🔑 API Documentation

### Authentication

**Register User**
```http
POST /api/v1/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "password_confirmation": "password123",
  "role": "buyer"
}
```

**Login**
```http
POST /api/v1/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

### Products

**Get All Products**
```http
GET /api/v1/products?page=1&search=bags&category=fashion
```

**Get Single Product**
```http
GET /api/v1/products/{id}
```

**Create Product (Seller)**
```http
POST /api/v1/products
Authorization: Bearer {token}
Content-Type: multipart/form-data

{
  "title": "Handcrafted Leather Bag",
  "description": "Premium leather bag made in Aba",
  "price": 150.00,
  "stock_qty": 50,
  "category": "fashion",
  "images": [file1, file2]
}
```

### Orders

**Create Order**
```http
POST /api/v1/orders
Authorization: Bearer {token}

{
  "product_id": 1,
  "quantity": 2,
  "shipping_address": "123 Main St",
  "shipping_city": "Houston",
  "shipping_zip": "77001",
  "shipping_country": "USA",
  "payment_method": "stripe",
  "request_inspection": true
}
```

**Get My Orders**
```http
GET /api/v1/orders
Authorization: Bearer {token}
```

---

## 👥 User Roles & Permissions

| Role | Permissions |
|------|-------------|
| **Buyer** | Browse products, place orders, pay, review |
| **Seller** | Upload/manage products, view orders |
| **Inspector** | Submit inspection reports, upload QA photos |
| **Admin** | CRUD operations, escrow control, disputes |
| **Logistics** | Update tracking data, manage shipments |

---

## 🔒 Security Features

- ✅ Laravel Sanctum authentication
- ✅ HTTPS enforced
- ✅ Role-based access control
- ✅ Stripe/Paystack PCI-DSS compliance
- ✅ SQL injection protection (Eloquent ORM)
- ✅ XSS protection
- ✅ CSRF protection
- ✅ Rate limiting on API routes
- ✅ Encrypted sensitive data

---

## 🔔 Notifications

| User | Events | Channel |
|------|---------|----------|
| Buyer | Order confirmation, inspection, tracking | Email, SMS |
| Seller | New order, payment release | Email |
| Admin | Disputes, overdue inspections | Email |
| Inspector | New inspection assignment | Email |

---

## 📈 KPIs & Metrics

| Metric | Target |
|--------|--------|
| Seller verification turnaround | ≤ 72 hrs |
| Inspection turnaround | ≤ 48 hrs |
| Escrow release delay | ≤ 24 hrs |
| Tracking sync accuracy | ≥ 99% |
| Platform uptime | ≥ 99.9% |
| Dispute rate | ≤ 2% |

---

## 🛣️ Operational Pipeline (Aba → Houston)

```
1. Buyer places order → Escrow hold
2. Inspector verifies product → QA report
3. Shipment label generated → Consolidated
4. Export tracking → Customs clearance
5. Delivery confirmed → Escrow release
6. Buyer reviews → Rating published
```

---

## 🧪 Testing

### Backend Tests

```bash
cd backend
php artisan test
```

### Frontend Tests

```bash
cd frontend
npm run test
```

---

## 🚢 Deployment

### Backend Deployment (Laravel Forge)

1. Connect your repository
2. Configure environment variables
3. Set deployment script
4. Enable SSL certificate
5. Configure database

### Frontend Deployment (Vercel)

1. Connect GitHub repository
2. Set build command: `npm run build`
3. Set output directory: `dist`
4. Configure environment variables
5. Deploy

---

## 🧰 Troubleshooting

### Common Issues

**Backend - Database Connection Error**
```bash
# Check .env database credentials
php artisan config:cache
php artisan migrate:fresh
```

**Frontend - API Connection Error**
```bash
# Check VITE_API_BASE_URL in .env
# Ensure backend is running on http://localhost:8000
```

**CORS Issues**
```php
// backend/config/cors.php
'allowed_origins' => ['http://localhost:5173'],
```

---

## 📞 Support

For issues or questions:
- Email: support@abatrade.com
- GitHub Issues: [Create Issue](https://github.com/abatrade/abatrade-web/issues)

---

## 📜 License

MIT License - See LICENSE file for details

---

## 🎯 Future Roadmap

- [ ] Multi-carrier shipping (UPS, DHL, FedEx)
- [ ] AI-based product verification
- [ ] Seller performance dashboards
- [ ] Mobile app (React Native)
- [ ] Tokenized escrow payouts
- [ ] Customs declaration API
- [ ] Multi-language support
- [ ] Advanced analytics dashboard

---

**Built with ❤️ by the AbaTrade Team**
