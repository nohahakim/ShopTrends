# Advanced React & Keystone.js E-Commerce Project

This project is a full-stack e-commerce application built with **React**, **Next.js**, **Keystone.js**, **GraphQL**, and various supporting libraries. It demonstrates modern best practices for building a full-stack JavaScript application, including authentication, role-based access control, testing, and more.

## Table of Contents

- [Advanced React \& Keystone.js E-Commerce Project](#advanced-react--keystonejs-e-commerce-project)
  - [Table of Contents](#table-of-contents)
  - [Overview](#overview)
  - [Features](#features)
  - [Tech Stack](#tech-stack)
  - [Getting Started](#getting-started)
    - [Installation](#installation)
    - [Environment Variables](#environment-variables)
    - [Scripts](#scripts)
  - [Folder Structure](#folder-structure)
  - [Key Functionalities](#key-functionalities)
    - [Authentication \& Authorization](#authentication--authorization)
    - [GraphQL API](#graphql-api)
    - [Shopping Cart \& Orders](#shopping-cart--orders)
    - [Roles \& Permissions](#roles--permissions)
  - [Testing](#testing)
  - [Useful Commands](#useful-commands)

---

## Overview

This repository covers an **Advanced React** and **Keystone.js** application that implements:

- A **Next.js** frontend for a seamless React development experience (including SSR/SSG).
- A **Keystone.js** backend with a **GraphQL** API, powerful Admin UI, and a **MongoDB** (or any supported DB) datastore.
- **Styled Components** for CSS-in-JS styling.
- **Stripe** integration for processing payments securely.
- **Apollo Client** for managing GraphQL data on the frontend.
- **Jest** and **React Testing Library** for comprehensive testing (including queries, mutations, and user interactions).

You can follow the code and lessons to learn how to build a scalable e-commerce solution from scratch.

---

## Features

- **User Registration & Authentication**  
  Sign up, sign in, sign out, and password reset flows using Keystone auth.

- **Role-Based Permissions & Access Control**  
  Fine-grained roles and permissions to control access to data (e.g., products, orders, users, etc.).

- **Product Management**  
  Create, update, and delete products with images using a Cloudinary integration (optional).

- **Shopping Cart & Orders**  
  Add products to a cart, manage cart items, and process orders with Stripe payments.

- **Pagination & Searching**  
  Easily paginate through large data sets and search for products, orders, or users.

- **Responsive Styling**  
  Built with Styled Components, ensuring a responsive and modern UI.

- **Comprehensive Testing**  
  Integration tests (frontend & backend), snapshot testing, user-event testing, and GraphQL mocking.

---

## Tech Stack

1. **Frontend**

   - **React** & **Next.js** for the UI and server-side rendering.
   - **Apollo Client** for GraphQL queries and mutations.
   - **Styled Components** for CSS-in-JS.

2. **Backend**

   - **Keystone.js** for CMS-like functionality, GraphQL API, and Admin UI.
   - **MongoDB** (or another supported database) for data storage.
   - **Stripe** (payment gateway) for secure transactions.
   - **Cloudinary** (optional) for image uploads and transformations.

3. **Testing**
   - **Jest** as the JavaScript test runner.
   - **React Testing Library** for component testing and user-event simulations.
   - **Apollo MockedProvider** for mocking GraphQL queries and mutations in tests.

---

## Getting Started

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/advanced-react-keystone.git
   cd advanced-react-keystone
   ```

2. **Install dependencies** (frontend & backend):

   ```bash
   # For the backend
   cd backend
   npm install

   # For the frontend
   cd ../frontend
   npm install
   ```

3. **Set up MongoDB**

   - Use MongoDB Atlas or local MongoDB installation.
   - Update your connection string in the backend `.env` file.

4. **Set up Cloudinary** (if you plan on image uploads)

   - Create a Cloudinary account and add your credentials to the backend `.env` file.

5. **Configure Stripe**
   - [Sign up for Stripe](https://stripe.com) (test mode).
   - Set your Stripe keys in both `.env` (backend) and `.env.local` (frontend).

### Environment Variables

Create **.env** files in both `backend` and `frontend` with keys like:

<details>
<summary>Backend .env example</summary>

```
DATABASE_URL="mongodb+srv://<user>:<password>@cluster.mongodb.net/sickfits?retryWrites=true&w=majority"
COOKIE_SECRET="some-very-secret-string"
FRONTEND_URL="http://localhost:3000"
STRIPE_SECRET="sk_test_xxx"
CLOUDINARY_CLOUD_NAME="xxx"
CLOUDINARY_KEY="xxx"
CLOUDINARY_SECRET="xxx"
```

</details>

<details>
<summary>Frontend .env.local example</summary>

```
NEXT_PUBLIC_STRIPE_KEY="pk_test_xxx"
```

</details>

### Scripts

From the project root:

- **`npm run dev`**  
  Runs both frontend and backend in development mode (use concurrently or separate terminals).
- **`npm run dev:backend`**  
  Only runs the backend in dev mode.
- **`npm run dev:frontend`**  
  Only runs the frontend in dev mode.
- **`npm run test`**  
  Runs all tests using Jest.
- **`npm run build`**  
  Builds your production-ready application.

---

## Folder Structure

```
advanced-react-keystone/
├── backend/
│   ├── keystone.ts           // Keystone configuration
│   ├── schemas/              // Keystone lists (User, Product, Order, etc.)
│   ├── mutations/            // Custom GraphQL mutations
│   ├── .env                  // Environment variables for the backend
│   └── package.json
├── frontend/
│   ├── pages/
│   ├── components/
│   ├── lib/
│   ├── .env.local            // Environment variables for the frontend
│   └── package.json
├── __tests__/                // Global test directory (optional)
├── README.md
└── package.json
```

---

## Key Functionalities

### Authentication & Authorization

- **Sign Up, Sign In, Sign Out**  
  Using Keystone’s authentication API and custom components on the frontend.
- **Role-Based Access Control**  
  Keystone roles and custom permission fields (canManageProducts, canManageUsers, etc.).

### GraphQL API

- **Keystone.js** automatically generates a GraphQL API based on your schemas.
- **Apollo Client** manages GraphQL data on the frontend.
- **Custom Mutations** (e.g., checkout, addToCart) handle complex logic in a single request.

### Shopping Cart & Orders

- **Cart Items**: Add, remove, and update items in a user’s cart.
- **Order & OrderItem**: Store final purchase data, preserving product info at the time of purchase.
- **Stripe Integration**: Securely process payments using `PaymentIntents`.

### Roles & Permissions

- **Roles**: Admin, Editor, etc., grouping multiple permissions.
- **Permission Fields**: canManageProducts, canManageCart, canManageOrders, etc.
- **Dynamic Access Controls**: Limit data fetches based on user roles and ownership.

---

## Testing

We use **Jest** and **React Testing Library** to ensure our app is robust:

- **Unit & Integration Tests**  
  Test everything from utility functions to complex form interactions.
- **Mocks & Providers**  
  Use `@apollo/client/testing`’s `MockedProvider` to simulate GraphQL responses.
- **User-Event Tests**  
  Rely on `@testing-library/user-event` for simulating real user input (typing, clicking).
- **Snapshot Testing**  
  Keep track of major UI changes using Jest’s snapshot feature (used sparingly).

Example test command:

```bash
cd backend
npm run test
# or from the project root if you set up a root-level script
npm run test
```

---

## Useful Commands

- **`npm run dev`**: Start both frontend and backend in development mode.
- **`npm run build`**: Create a production-ready build.
- **`npm run test`**: Run the entire test suite.
- **`npm run dev:backend`**, **`npm run dev:frontend`**: Start either service in isolation.

---
