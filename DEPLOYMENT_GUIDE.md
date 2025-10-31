# 🚢 AbaTrade Deployment Guide

## Production Deployment Checklist

---

## 🔧 Prerequisites

- [ ] Domain name configured (e.g., abatrade.com)
- [ ] SSL certificate (Let's Encrypt recommended)
- [ ] Production database (MySQL 8.0+)
- [ ] AWS S3 bucket for file storage
- [ ] Stripe production keys
- [ ] Paystack production keys
- [ ] Email service (SendGrid, AWS SES)
- [ ] SMS service (Twilio)

---

## 🖥️ Backend Deployment (Laravel Forge)

### Step 1: Server Setup

```bash
# Create server on Laravel Forge
# Choose: DigitalOcean, AWS, Linode, etc.
# Server size: Minimum 2GB RAM, 2 CPU cores

# Connect via SSH
ssh forge@your-server-ip
```

### Step 2: Database Configuration

```bash
# Create production database
mysql -u root -p
CREATE DATABASE abatrade CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'abatrade_user'@'localhost' IDENTIFIED BY 'secure_password';
GRANT ALL PRIVILEGES ON abatrade.* TO 'abatrade_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

### Step 3: Environment Configuration

Create `.env` file on server:

```env
APP_NAME=AbaTrade
APP_ENV=production
APP_KEY=base64:...  # Generate with php artisan key:generate
APP_DEBUG=false
APP_URL=https://api.abatrade.com

LOG_CHANNEL=stack
LOG_LEVEL=error

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=abatrade
DB_USERNAME=abatrade_user
DB_PASSWORD=your_secure_password

BROADCAST_DRIVER=redis
CACHE_DRIVER=redis
FILESYSTEM_DISK=s3
QUEUE_CONNECTION=redis
SESSION_DRIVER=redis

REDIS_HOST=127.0.0.1
REDIS_PASSWORD=null
REDIS_PORT=6379

# Email
MAIL_MAILER=smtp
MAIL_HOST=smtp.sendgrid.net
MAIL_PORT=587
MAIL_USERNAME=apikey
MAIL_PASSWORD=your_sendgrid_api_key
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS=noreply@abatrade.com
MAIL_FROM_NAME=AbaTrade

# Stripe
STRIPE_KEY=pk_live_...
STRIPE_SECRET=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Paystack
PAYSTACK_PUBLIC_KEY=pk_live_...
PAYSTACK_SECRET_KEY=sk_live_...
PAYSTACK_WEBHOOK_SECRET=...

# Twilio
TWILIO_SID=AC...
TWILIO_TOKEN=...
TWILIO_FROM=+1234567890

# SendGrid
SENDGRID_API_KEY=SG...

# Firebase
FCM_SERVER_KEY=...

# Logistics
LOGISTICS_API_URL=https://api.abatradelogistics.com/v1
LOGISTICS_API_KEY=...

# Frontend
FRONTEND_URL=https://abatrade.com

# AWS S3
AWS_ACCESS_KEY_ID=...
AWS_SECRET_ACCESS_KEY=...
AWS_DEFAULT_REGION=us-east-1
AWS_BUCKET=abatrade-production
AWS_USE_PATH_STYLE_ENDPOINT=false
```

### Step 4: Deployment Script

Create deployment script in Laravel Forge:

```bash
cd /home/forge/api.abatrade.com
git pull origin main

composer install --no-dev --optimize-autoloader

php artisan migrate --force
php artisan config:cache
php artisan route:cache
php artisan view:cache

php artisan queue:restart

npm install
npm run build

# Reload PHP-FPM
echo "" | sudo -S service php8.3-fpm reload
```

### Step 5: Queue Workers

Setup supervisor for queue workers:

```ini
[program:abatrade-worker]
process_name=%(program_name)s_%(process_num)02d
command=php /home/forge/api.abatrade.com/artisan queue:work redis --sleep=3 --tries=3 --max-time=3600
autostart=true
autorestart=true
stopasgroup=true
killasgroup=true
user=forge
numprocs=2
redirect_stderr=true
stdout_logfile=/home/forge/api.abatrade.com/storage/logs/worker.log
stopwaitsecs=3600
```

### Step 6: Scheduled Tasks (Cron)

Add to crontab:

```bash
* * * * * cd /home/forge/api.abatrade.com && php artisan schedule:run >> /dev/null 2>&1
```

In `app/Console/Kernel.php`:

```php
protected function schedule(Schedule $schedule)
{
    // Sync logistics tracking every 4 hours
    $schedule->call(function () {
        Http::post(config('app.url') . '/api/v1/shipments/sync');
    })->everyFourHours();

    // Auto-release escrow after 7 days
    $schedule->command('escrow:auto-release')->daily();

    // Send daily reports
    $schedule->command('reports:daily')->dailyAt('09:00');
}
```

---

## 🌐 Frontend Deployment (Vercel)

### Step 1: Connect Repository

1. Go to [Vercel Dashboard](https://vercel.com)
2. Click "Import Project"
3. Connect your GitHub repository
4. Select the repository root (or `frontend/` if monorepo)

### Step 2: Build Configuration

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "installCommand": "npm install",
  "framework": "vite"
}
```

### Step 3: Environment Variables

Add in Vercel dashboard:

```env
VITE_API_BASE_URL=https://api.abatrade.com/api/v1
VITE_STRIPE_PUBLIC_KEY=pk_live_...
VITE_PAYSTACK_PUBLIC_KEY=pk_live_...
VITE_APP_NAME=AbaTrade
VITE_APP_ENV=production
```

### Step 4: Custom Domain

1. Add custom domain in Vercel
2. Update DNS records:
   - Type: A
   - Name: @
   - Value: 76.76.21.21

   - Type: CNAME
   - Name: www
   - Value: cname.vercel-dns.com

### Step 5: Deploy

```bash
# Automatic deployment on git push
git push origin main

# Or manual deployment
vercel --prod
```

---

## 🔒 Security Hardening

### Backend

1. **Enable HTTPS Only**
```php
// app/Providers/AppServiceProvider.php
if ($this->app->environment('production')) {
    URL::forceScheme('https');
}
```

2. **Rate Limiting**
```php
// routes/api.php
Route::middleware(['throttle:60,1'])->group(function () {
    // API routes
});
```

3. **CORS Configuration**
```php
// config/cors.php
'allowed_origins' => [
    'https://abatrade.com',
    'https://www.abatrade.com',
],
```

4. **Security Headers**
```php
// app/Http/Middleware/SecurityHeaders.php
public function handle($request, Closure $next)
{
    $response = $next($request);

    $response->headers->set('X-Frame-Options', 'SAMEORIGIN');
    $response->headers->set('X-Content-Type-Options', 'nosniff');
    $response->headers->set('X-XSS-Protection', '1; mode=block');

    return $response;
}
```

### Frontend

1. **Environment Variables**
   - Never expose API keys in frontend code
   - Use VITE_ prefix for public variables only

2. **Content Security Policy**
```html
<!-- index.html -->
<meta http-equiv="Content-Security-Policy"
      content="default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';">
```

---

## 📊 Monitoring & Logging

### Backend Logging

```php
// config/logging.php
'channels' => [
    'production' => [
        'driver' => 'daily',
        'path' => storage_path('logs/laravel.log'),
        'level' => 'error',
        'days' => 14,
    ],
],
```

### Error Tracking

Use services like:
- Sentry (recommended)
- Bugsnag
- Rollbar

```bash
composer require sentry/sentry-laravel
php artisan sentry:publish --dsn=your-dsn
```

### Performance Monitoring

- Laravel Telescope (development)
- New Relic (production)
- DataDog

---

## 🔄 Database Backups

### Automated Backups

```bash
# Install backup package
composer require spatie/laravel-backup

# Configure in config/backup.php
php artisan backup:run

# Schedule daily backups
$schedule->command('backup:clean')->daily()->at('01:00');
$schedule->command('backup:run')->daily()->at('02:00');
```

---

## 🧪 Pre-Deployment Testing

```bash
# Backend tests
cd backend
php artisan test

# Frontend tests
cd frontend
npm run test

# Build test
npm run build

# Lighthouse CI (performance)
npx lhci autorun
```

---

## 📈 Post-Deployment Checklist

- [ ] Verify all API endpoints are accessible
- [ ] Test authentication flow
- [ ] Test payment processing (use test mode first)
- [ ] Verify email notifications are sent
- [ ] Test file uploads to S3
- [ ] Check SSL certificate is active
- [ ] Verify CORS settings
- [ ] Test webhook endpoints (Stripe, Paystack)
- [ ] Monitor error logs
- [ ] Set up uptime monitoring (UptimeRobot, Pingdom)

---

## 🚨 Rollback Procedure

```bash
# On Laravel Forge
cd /home/forge/api.abatrade.com
git log --oneline  # Find commit hash
git reset --hard <commit-hash>
composer install --no-dev
php artisan migrate:rollback
php artisan cache:clear
```

---

## 📞 Support Contacts

- **DevOps:** devops@abatrade.com
- **Emergency:** +1-XXX-XXX-XXXX

---

**Deployment Date:** _______________
**Deployed By:** _______________
**Version:** 4.0
