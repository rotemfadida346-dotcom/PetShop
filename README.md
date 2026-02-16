# Pawsome - Premium Pet Nutrition eCommerce

A production-ready eCommerce platform for premium dog & cat products, built with modern web technologies.

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** TailwindCSS
- **Database:** PostgreSQL + Prisma ORM
- **Authentication:** Auth.js (NextAuth v4)
- **Payments:** Stripe (one-time + subscriptions)
- **State Management:** Zustand
- **Deployment:** Vercel

## Features

### Customer-Facing
- **Product Catalog** — Browse by pet type (Dogs/Cats) and category (Food, Treats, Litter, etc.)
- **Product Pages** — Rich detail pages with images, benefits, ingredients, FAQ, and subscription options
- **Subscribe & Save** — Delivery every 2/4/6 weeks with automatic discounts (10-15%)
- **Pet Quiz** — 5-step recommendation wizard based on pet type, age, size, and sensitivities
- **Shopping Cart** — Persistent cart with one-time and subscription items
- **Checkout** — Guest checkout via Stripe with Apple Pay/Google Pay support
- **User Accounts** — Order history, subscription management, address book, settings
- **SEO Optimized** — Structured metadata, static generation, semantic HTML

### Admin Dashboard
- **Dashboard** — Revenue, orders, products, and subscription metrics
- **Product Management** — View and manage full product catalog with stock tracking
- **Order Management** — Filter and manage orders by status
- **Subscription Management** — Track active, paused, and cancelled subscriptions

### Technical
- **Auth** — JWT sessions with credentials + Google OAuth, role-based access (Customer/Admin)
- **Middleware** — Route protection for authenticated and admin routes
- **API Routes** — RESTful endpoints for products, checkout, webhooks, and auth
- **Type Safety** — Full TypeScript with Prisma-generated types
- **Clean Architecture** — Modular components, separated concerns, scalable folder structure

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── (api)/             # API routes
│   │   ├── auth/          # NextAuth + registration
│   │   ├── checkout/      # Stripe checkout
│   │   ├── products/      # Product CRUD
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
│   ├── product/[slug]/    # Product detail pages
│   ├── quiz/              # Pet quiz
│   └── shop/              # Shop with filters
├── components/            # React components
│   ├── auth/              # Auth forms
│   ├── cart/              # Cart components
│   ├── checkout/          # Checkout form
│   ├── layout/            # Header, Footer
│   ├── product/           # Product cards, grid, details
│   ├── quiz/              # Quiz flow
│   ├── shop/              # Shop filters
│   └── ui/                # Reusable UI (Button, Badge, Input, etc.)
├── lib/                   # Utilities and config
│   ├── auth.ts            # NextAuth configuration
│   ├── constants.ts       # App constants
│   ├── mock-data.ts       # Development data
│   ├── prisma.ts          # Prisma client singleton
│   ├── stripe.ts          # Stripe client
│   ├── types.ts           # TypeScript types
│   └── utils.ts           # Helper functions
├── store/                 # Zustand stores
│   └── cart.ts            # Cart state management
└── middleware.ts           # Auth middleware
```

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database
- Stripe account (for payments)

### Installation

```bash
# Clone the repository
git clone <repo-url>
cd pawsome

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your database URL, Stripe keys, etc.

# Generate Prisma client
npx prisma generate

# Push schema to database
npx prisma db push

# Seed the database (optional)
npm run db:seed

# Start development server
npm run dev
```

### Environment Variables

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | PostgreSQL connection string |
| `NEXTAUTH_URL` | App URL (http://localhost:3000) |
| `NEXTAUTH_SECRET` | Random secret for JWT signing |
| `STRIPE_SECRET_KEY` | Stripe secret key |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook signing secret |
| `NEXT_PUBLIC_APP_URL` | Public app URL |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID (optional) |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret (optional) |

### Deploy to Vercel

1. Push to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

The `vercel.json` and `postinstall` script handle Prisma generation automatically.

## Development

```bash
npm run dev          # Start dev server
npm run build        # Production build
npm run lint         # Run ESLint
npm run db:studio    # Open Prisma Studio
npm run db:seed      # Seed database
```

## License

MIT
