# Payment test app

![IMG_8566.jpg](./src/assets/images/capture.png)

## Features backend

- ⚡️ NestJs version 10 (last version)

- 💾 MongoDb database integration with Mongoose 

- 🛒 Nest Bull for manage queues

- 💥 Redis integration 

- 💳 Passport authentication

## Features Frontend

- ⚡️ Angular version 18 (last version)

- 💾 Custom stores using signals 

- 🎨 Angular Material components customized

- 💅🏻 Custom layout design

- ⌛ Real time integration using socket.io integration for Angular


## Preview

- [Demo](https://payment-app.vercel.app)

#### Download

- [Download from GitHub](https://github.com/MrDeivi/payment_app_test)

## Try it now!

> Requires Node >=20.0.0

### Clone to local

```bash
git clone https://github.com/MrDeivi/payments-app-nestjs

cd payments-app-nestjs

pnpm i # If you don't have pnpm installed, run: npm install -g pnpm

```

## Checklist

Backend Requirements (NodeJS)

1. Project configuration:
   - ✅ Use Express.js or any other NodeJS framework for the server.
   - ✅ Use a NoSQL database (MongoDB).
   - ✅ Configure Mongoose to interact with MongoDB.

2. Authentication and Authorisation:
   - ✅ Implement user authentication with JWT.
   - ✅ Protect routes or queries with middleware to ensure that only authenticated users can access them.
   - ✅ Implement user roles (administrator and standard user) with different permissions.

3. RESTful API or Graphql API:
   - ✅ Endpoints or Queries/Mutations for user management (registration, login, obtaining user data, assigning roles).
   - ✅ Endpoints or Queries/Mutations for payment management:
   - ✅ Create a new payment request.
   - ✅ Get all payment requests from a user.
   - ✅ Update the status of a payment request (administrators only).

4. Data Structure:
   - ✅ User
   - ✅ Payment Request (where you record method, status, amount, or other property you deem useful)
   - ✅ Balance (should be deducted when creating a payment request).

5. Advanced Functionalities:
   - ✅ Implement WebSockets to notify the user in real time when a payment is made.

## Usage

### Development

Run http://localhost:3001

```bash
pnpm start
```

### Build

To build the App, run

```bash
pnpm build
```

And you will see the generated file in `dist` that ready to be served.
