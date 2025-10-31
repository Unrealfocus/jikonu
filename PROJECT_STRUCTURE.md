# 📁 AbaTrade Project Structure

## Complete Directory Structure

```
abatrade/
│
├── backend/                                # Laravel Backend API
│   │
│   ├── app/
│   │   ├── Http/
│   │   │   ├── Controllers/
│   │   │   │   ├── AuthController.php     # Authentication (login, register)
│   │   │   │   ├── ProductController.php  # Product CRUD
│   │   │   │   ├── OrderController.php    # Order management
│   │   │   │   ├── InspectionController.php # Inspection reports
│   │   │   │   ├── EscrowController.php   # Escrow & payments
│   │   │   │   ├── ShippingController.php # Shipping & tracking
│   │   │   │   ├── RatingController.php   # Reviews & ratings
│   │   │   │   ├── UserController.php     # User profile
│   │   │   │   └── AdminController.php    # Admin operations
│   │   │   │
│   │   │   └── Middleware/
│   │   │       └── RoleMiddleware.php     # Role-based access control
│   │   │
│   │   ├── Models/
│   │   │   ├── User.php                   # User model
│   │   │   ├── Product.php                # Product model
│   │   │   ├── Order.php                  # Order model
│   │   │   ├── InspectionReport.php       # Inspection model
│   │   │   ├── EscrowTransaction.php      # Escrow model
│   │   │   ├── ShippingQuote.php          # Shipping model
│   │   │   └── Rating.php                 # Rating model
│   │   │
│   │   └── Services/
│   │       └── EscrowService.php          # Escrow business logic
│   │
│   ├── database/
│   │   ├── migrations/
│   │   │   ├── 2024_01_01_000001_create_users_table.php
│   │   │   ├── 2024_01_01_000002_create_products_table.php
│   │   │   ├── 2024_01_01_000003_create_orders_table.php
│   │   │   ├── 2024_01_01_000004_create_inspection_reports_table.php
│   │   │   ├── 2024_01_01_000005_create_escrow_transactions_table.php
│   │   │   ├── 2024_01_01_000006_create_shipping_quotes_table.php
│   │   │   └── 2024_01_01_000007_create_ratings_table.php
│   │   │
│   │   └── seeders/
│   │       └── DatabaseSeeder.php
│   │
│   ├── routes/
│   │   └── api.php                        # All API routes
│   │
│   ├── config/
│   │   ├── cors.php                       # CORS configuration
│   │   └── services.php                   # Third-party services config
│   │
│   ├── .env.example                       # Environment template
│   └── composer.json                      # PHP dependencies
│
│
├── frontend/                               # React Frontend
│   │
│   ├── src/
│   │   │
│   │   ├── components/                    # Reusable Components
│   │   │   ├── Layout.tsx                # Main layout wrapper
│   │   │   ├── Header.tsx                # Navigation header
│   │   │   ├── Footer.tsx                # Footer component
│   │   │   └── ProtectedRoute.tsx        # Route protection HOC
│   │   │
│   │   ├── pages/                        # Page Components
│   │   │   ├── Home.tsx                  # Landing page
│   │   │   ├── Products.tsx              # Product listing
│   │   │   ├── ProductDetail.tsx         # Single product view
│   │   │   ├── Dashboard.tsx             # User dashboard
│   │   │   │
│   │   │   ├── auth/
│   │   │   │   ├── Login.tsx             # Login page
│   │   │   │   └── Register.tsx          # Registration page
│   │   │   │
│   │   │   ├── buyer/
│   │   │   │   └── Orders.tsx            # Buyer order history
│   │   │   │
│   │   │   ├── seller/
│   │   │   │   ├── Dashboard.tsx         # Seller dashboard
│   │   │   │   └── Products.tsx          # Seller product management
│   │   │   │
│   │   │   ├── inspector/
│   │   │   │   └── Dashboard.tsx         # Inspector dashboard
│   │   │   │
│   │   │   └── admin/
│   │   │       └── Dashboard.tsx         # Admin dashboard
│   │   │
│   │   ├── services/                     # API Services
│   │   │   └── api.ts                    # Axios setup + API methods
│   │   │
│   │   ├── stores/                       # Zustand State Management
│   │   │   └── authStore.ts              # Authentication state
│   │   │
│   │   ├── hooks/                        # Custom React Hooks
│   │   │   └── (to be created)
│   │   │
│   │   ├── utils/                        # Utility Functions
│   │   │   └── (to be created)
│   │   │
│   │   ├── assets/                       # Static Assets
│   │   │   ├── images/
│   │   │   └── styles/
│   │   │       └── index.css             # Global styles + Tailwind
│   │   │
│   │   ├── App.tsx                       # Main app component
│   │   └── main.tsx                      # Entry point
│   │
│   ├── public/                           # Public static files
│   │   └── vite.svg
│   │
│   ├── index.html                        # HTML template
│   ├── package.json                      # Node dependencies
│   ├── vite.config.ts                    # Vite configuration
│   ├── tsconfig.json                     # TypeScript config
│   ├── tailwind.config.js                # Tailwind config
│   ├── postcss.config.js                 # PostCSS config
│   └── .env.example                      # Frontend env template
│
│
├── ABATRADE_README.md                    # Main documentation
├── PROJECT_STRUCTURE.md                  # This file
└── .gitignore                            # Git ignore rules
```

---

## 📂 File Descriptions

### Backend (Laravel)

#### Controllers
- **AuthController.php**: User authentication (register, login, logout, password reset)
- **ProductController.php**: Product CRUD, search, filtering by category/seller
- **OrderController.php**: Order creation, status updates, delivery confirmation
- **InspectionController.php**: Inspection report submission, photo uploads
- **EscrowController.php**: Payment processing, webhook handlers (Stripe/Paystack)
- **ShippingController.php**: Shipping quotes, tracking, logistics API sync
- **RatingController.php**: Product/seller reviews and ratings
- **UserController.php**: User profile management, photo upload
- **AdminController.php**: Admin operations (user/product verification, disputes, analytics)

#### Models
Each model represents a database table with relationships:
- **User**: Has many products, orders, reviews
- **Product**: Belongs to seller, has many orders, ratings
- **Order**: Belongs to buyer/seller/product, has one inspection, escrow, shipping
- **InspectionReport**: Belongs to order, inspector
- **EscrowTransaction**: Belongs to order
- **ShippingQuote**: Belongs to order
- **Rating**: Belongs to order, buyer, seller, product

#### Services
- **EscrowService.php**: Handles payment initiation, webhook processing, refunds, releases

#### Migrations
Database schema definitions for all tables with proper indexes and foreign keys.

---

### Frontend (React)

#### Components
- **Layout.tsx**: Provides consistent header/footer across pages
- **Header.tsx**: Navigation, user menu, authentication links
- **Footer.tsx**: Footer with links and branding
- **ProtectedRoute.tsx**: HOC for role-based route protection

#### Pages
Organized by user role:
- **Public**: Home, Products, ProductDetail, Login, Register
- **Buyer**: Orders, Reviews
- **Seller**: Dashboard, Product Management
- **Inspector**: Inspection Dashboard
- **Admin**: Analytics, User Management, Disputes

#### Services
- **api.ts**: Centralized API client with interceptors, typed API methods

#### Stores
- **authStore.ts**: Zustand store for authentication state (user, token, login/logout)

---

## 🔄 Data Flow

### Authentication Flow
```
1. User submits credentials → Frontend (Login.tsx)
2. authAPI.login() → Backend (AuthController)
3. Laravel validates → Returns user + token
4. Frontend stores in Zustand + localStorage
5. Token sent in all subsequent requests (api.ts interceptor)
```

### Order Creation Flow
```
1. Buyer selects product → ProductDetail.tsx
2. ordersAPI.create() → Backend (OrderController)
3. EscrowService.initiatePayment() → Stripe/Paystack
4. Payment confirmed → Webhook → EscrowController
5. Order status updated → Notification sent
6. Inspector assigned (if requested)
```

### Inspection Flow
```
1. Inspector receives assignment
2. Uploads photos + report → InspectionController
3. Report marked complete → Order status updated
4. Escrow status → ready_to_ship
5. Buyer notified
```

---

## 🚀 Adding New Features

### Backend (Laravel)

1. **Create Migration**
```bash
php artisan make:migration create_table_name
```

2. **Create Model**
```bash
php artisan make:model ModelName
```

3. **Create Controller**
```bash
php artisan make:controller ControllerName
```

4. **Add Routes** in `routes/api.php`

### Frontend (React)

1. **Create Component** in `src/components/`
2. **Create Page** in `src/pages/`
3. **Add API Method** in `src/services/api.ts`
4. **Add Route** in `src/App.tsx`

---

## 📦 Dependencies

### Backend
- Laravel 11
- Laravel Sanctum (Auth)
- Stripe PHP SDK
- Guzzle HTTP Client

### Frontend
- React 18
- React Router DOM
- Axios
- Zustand (State Management)
- React Query (Server State)
- React Hook Form (Forms)
- Tailwind CSS (Styling)
- Lucide React (Icons)

---

## 🔐 Environment Variables

### Backend (.env)
```env
APP_URL=http://localhost:8000
DB_DATABASE=abatrade
STRIPE_SECRET=sk_test_...
PAYSTACK_SECRET_KEY=sk_test_...
LOGISTICS_API_KEY=...
AWS_ACCESS_KEY_ID=...
```

### Frontend (.env)
```env
VITE_API_BASE_URL=http://localhost:8000/api/v1
VITE_STRIPE_PUBLIC_KEY=pk_test_...
VITE_PAYSTACK_PUBLIC_KEY=pk_test_...
```

---

**Last Updated:** October 2025
