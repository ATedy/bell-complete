# Full-Stack Interview - Product Catalog

This project is a small full-stack product catalog built with a **React + Vite + MUI** frontend and a **NestJS** backend in a pnpm monorepo.

The implementation focuses on the core interview requirements: displaying products, filtering by type, and managing a wishlist through backend API endpoints.

## Running the Project

Prerequisites:

- Node.js 18 or newer
- pnpm 9 or newer

Install dependencies and start both apps:

```bash
pnpm install
pnpm dev
```

The frontend runs at `http://localhost:5173`.
The backend API runs at `http://localhost:3000/api`.

Useful commands:

```bash
pnpm test
pnpm build
pnpm lint
```

## What Was Implemented

The frontend now displays the product catalog in a responsive Material UI grid. Each product card shows the product image, name, type, price, and wishlist action.

Products can be filtered by type using a dropdown. The available product types are loaded from the backend so the UI is not hard-coded to the current product data.

Wishlist functionality is implemented end to end:

- Products can be added to the wishlist.
- Products already in the wishlist show a saved state.
- Products can be removed from the wishlist.
- The app bar shows the current wishlist count.
- API errors are surfaced to the user with Material UI alerts.

## API Endpoints

The backend exposes the following endpoints under `/api`:

- `GET /store-name` returns the store name.
- `GET /products` returns all products.
- `GET /products?type=<type>` returns products filtered by type.
- `GET /products/types` returns the available product types.
- `GET /wishlist` returns the current wishlist.
- `POST /wishlist/:productId` adds a product to the wishlist.
- `DELETE /wishlist/:productId` removes a product from the wishlist.

The wishlist is stored in memory using a `Map`. This keeps the implementation appropriate for the scope of the task while still allowing duplicate prevention and clear add/remove behaviour.

## Implementation Notes

The backend keeps routing thin in the controller and moves business logic into services:

- `ProductService` reads the static product data, returns product types, and supports lookup/filtering.
- `WishlistService` owns wishlist state, validates missing products, prevents duplicates, and handles removal.
- NestJS exceptions are used for invalid states such as missing products or duplicate wishlist items.

The frontend is split into a page, reusable product list/card components, and a small API client. React state is kept local because the app is simple and does not need external state management.

Tests were added around the backend services/controllers, frontend API client, and product UI components to cover the main behaviour.

## AI Assistance

I used Cursor AI during the task for code suggestions, debugging support, and explanations while working with NestJS. I have not used NestJS commercially before, so I used Cursor to help understand framework patterns such as controllers, services, dependency injection, decorators, and testing structure.

I reviewed and adapted the suggestions before applying them so the implementation matched the challenge requirements and remained understandable to me.

## Project Structure

```text
apps/
  backend/
    src/
      app-service/          Store name controller/service
      product-service/      Product data, filtering, and type lookup
      wishlist-service/     In-memory wishlist management
      data/products.json    Product seed data
  frontend/
    src/
      api/                  Fetch wrapper for backend endpoints
      components/           Product list and card components
      pages/                Main app page
```