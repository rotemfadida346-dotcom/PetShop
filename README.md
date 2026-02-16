# Pawsome - Premium Pet Nutrition eCommerce

A production-ready eCommerce platform for premium dog & cat products, built with modern web technologies and deployed on Vercel with Supabase.

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** TailwindCSS
- **Database:** Supabase (PostgreSQL) + Prisma ORM
- **Authentication:** Auth.js (NextAuth v4) with JWT
- **Payments:** Stripe (one-time + subscriptions)
- **State Management:** Zustand (persisted cart)
- **Deployment:** Vercel
- **Image Storage:** Supabase Storage (optional)

## Features

### Customer-Facing
- **Product Catalog** — Browse by pet type (Dogs/Cats) and category (Food, Treats, Litter, etc.)
- **Product Pages** — Rich detail pages with images, benefits, ingredients, FAQ, and subscription options
- **Subscribe & Save** — Delivery every 2/4/6 weeks with automatic discounts (10-15%)
- **Pet Quiz** — 5-step recommendation wizard based on pet type, age, size, and sensitivities
- **Shopping Cart** — Persistent cart with one-time and subscription items
- **Checkout** — Guest checkout via Stripe with Apple Pay / Google Pay support
- **User Accounts** — Order history, subscription management, address book, settings
- **SEO Optimized** — Structured metadata, static generation, semantic HTML

### Admin Dashboard
- **Dashboard** — Revenue, orders, products, and subscription metrics
- **Product Management** — Full product catalog with stock tracking
- **Order Management** — Filter and manage orders by status
- **Subscription Management** — Track active, paused, and cancelled subscriptions

### Technical
- **Auth** — JWT sessions with credentials + Google OAuth, role-based access (Customer / Admin)
- **Middleware** — Route protection for authenticated and admin-only routes
- **API Routes** — RESTful endpoints for products, checkout, webhooks, and auth
- **Supabase** — PostgreSQL via connection pooling (PgBouncer), direct URL for migrations
- **Type Safety** — Full TypeScript with Prisma-generated types
- **Clean Architecture** — Modular components, separated concerns, scalable folder structure

---

## Deployment Guide

### 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and create a free account
2. Click **New Project**, choose a name & region, set a database password
3. Once created, go to **Settings > Database**
4. Under **Connection string**, copy both:
   - **URI (Transaction / Pooled)** — port `6543` — this is your `DATABASE_URL`
   - **URI (Session / Direct)** — port `5432` — this is your `DIRECT_URL`
5. Replace `[YOUR-PASSWORD]` in each URI with the database password you set

**Your URLs will look like:**
```
# DATABASE_URL (pooled — for Prisma Client at runtime)
postgresql://postgres.[ref]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres?pgbouncer=true

# DIRECT_URL (direct — for Prisma Migrate / db push)
postgresql://postgres.[ref]:[password]@aws-0-[region].pooler.supabase.com:5432/postgres
```

### 2. Push the Schema to Supabase

```bash
# Generate the Prisma client
npx prisma generate

# Push the schema to your Supabase database
npx prisma db push

# (Optional) Seed with sample data
npm run db:seed

# (Optional) Open Prisma Studio to inspect data
npm run db:studio
```

### 3. Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click **Add New > Project**
3. Import your **PetShop** repository
4. Vercel auto-detects Next.js — confirm the settings:
   - **Framework:** Next.js
   - **Build Command:** `prisma generate && next build` (already in `vercel.json`)
5. Add **Environment Variables** (Settings > Environment Variables):

| Variable | Value |
|----------|-------|
| `DATABASE_URL` | Your Supabase pooled connection string (port 6543) |
| `DIRECT_URL` | Your Supabase direct connection string (port 5432) |
| `NEXTAUTH_URL` | Your Vercel deployment URL (e.g. `https://pawsome.vercel.app`) |
| `NEXTAUTH_SECRET` | Run `openssl rand -base64 32` to generate |
| `STRIPE_SECRET_KEY` | From Stripe Dashboard > Developers > API keys |
| `STRIPE_WEBHOOK_SECRET` | From Stripe Dashboard > Developers > Webhooks |
| `NEXT_PUBLIC_APP_URL` | Same as `NEXTAUTH_URL` |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | From Stripe Dashboard > Developers > API keys |
| `GOOGLE_CLIENT_ID` | (Optional) Google Cloud Console |
| `GOOGLE_CLIENT_SECRET` | (Optional) Google Cloud Console |

6. Click **Deploy**

### 4. Configure Stripe Webhooks

1. In Stripe Dashboard, go to **Developers > Webhooks**
2. Click **Add endpoint**
3. Set the URL to `https://your-domain.vercel.app/api/webhooks/stripe`
4. Select events: `checkout.session.completed`, `customer.subscription.*`, `invoice.*`
5. Copy the webhook signing secret to your `STRIPE_WEBHOOK_SECRET` env var in Vercel

### 5. (Optional) Supabase Storage for Images

1. In Supabase Dashboard, go to **Storage**
2. Create a bucket called `product-images` (set it to **Public**)
3. Upload product images there
4. Images are accessible at: `https://[project-ref].supabase.co/storage/v1/object/public/product-images/[filename]`

---

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   │   ├── auth/          # NextAuth + registration
│   │   ├── checkout/      # Stripe checkout session
│   │   ├── products/      # Product endpoints
│   │   └── webhooks/      # Stripe webhooks
│   ├── about/             # About page
│   ├── account/           # User account pages
│   │   ├── orders/
│   │   ├── subscriptions/
│   │   ├── addresses/
│   │   └── settings/
│   ├── admin/             # Admin dashboard
│   │   ├── products/
│   │   ├── orders/
│   │   └── subscriptions/
│   ├── auth/              # Sign in / Sign up
│   ├── cart/              # Shopping cart
│   ├── checkout/          # Checkout + success
│   ├── product/[slug]/    # Product detail (SSG)
│   ├── quiz/              # Pet quiz wizard
│   └── shop/              # Shop with filters
├── components/            # React components
│   ├── auth/              # Auth forms
│   ├── cart/              # Cart UI
│   ├── checkout/          # Checkout form
│   ├── layout/            # Header, Footer
│   ├── product/           # Cards, grid, details
│   ├── quiz/              # Quiz flow
│   ├── shop/              # Filters
│   └── ui/                # Button, Badge, Input, etc.
├── lib/                   # Utilities and config
│   ├── auth.ts            # NextAuth config
│   ├── constants.ts       # App constants
│   ├── mock-data.ts       # Dev data (10 products)
│   ├── prisma.ts          # Prisma client singleton
│   ├── stripe.ts          # Stripe server client
│   ├── supabase.ts        # Supabase helpers
│   ├── types.ts           # TypeScript types
│   └── utils.ts           # Formatting, helpers
├── store/                 # Zustand stores
│   └── cart.ts            # Cart state (localStorage)
└── middleware.ts           # Auth route protection
```

## Local Development

```bash
# Install dependencies
npm install

# Copy env file and fill in your values
cp .env.example .env

# Generate Prisma client
npx prisma generate

# Push schema to database
npx prisma db push

# Seed sample data
npm run db:seed

# Start dev server
npm run dev
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run db:generate` | Generate Prisma client |
| `npm run db:push` | Push schema to database |
| `npm run db:migrate` | Run Prisma migrations |
| `npm run db:seed` | Seed database with sample data |
| `npm run db:studio` | Open Prisma Studio |

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | Yes | Supabase pooled connection (port 6543, `?pgbouncer=true`) |
| `DIRECT_URL` | Yes | Supabase direct connection (port 5432) |
| `NEXTAUTH_URL` | Yes | App URL |
| `NEXTAUTH_SECRET` | Yes | JWT signing secret |
| `STRIPE_SECRET_KEY` | Yes | Stripe secret key |
| `STRIPE_WEBHOOK_SECRET` | Yes | Stripe webhook signing secret |
| `NEXT_PUBLIC_APP_URL` | Yes | Public app URL |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Yes | Stripe publishable key |
| `GOOGLE_CLIENT_ID` | No | Google OAuth |
| `GOOGLE_CLIENT_SECRET` | No | Google OAuth |
| `NEXT_PUBLIC_SUPABASE_URL` | No | For Supabase Storage |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | No | For Supabase Storage |

## License

MIT
