# Hotel Management API

This project is a [brief description of your project].

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Directory Structure](#directory-structure)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Environment Variables](#environment-variables)
- [Technologies Used](#technologies-used)

## Introduction

Hi, this application is a backend service for managing users, rooms, and room types in a hospitality setting. It provides APIs for user authentication, user management, room management, and room type management.

## Purpose

This project provides a robust and scalable backend solution for businesses in the hospitality industry, such as hotels, resorts, or rental accommodations. It aims to streamline the management of users (such as guests and staff), rooms, and room types, allowing businesses to efficiently handle bookings, reservations, and other related operations.

## Main Features

- **User Management**: Create, authenticate, update, and delete user accounts. Differentiate between user roles (e.g., guest and administrator) for access control.
- **Room Management**: Create, update, and delete room records. Associate rooms with specific room types for categorization.
- **Room Type Management**: Define and manage various types of rooms, each with its own characteristics and specifications.
- **Authentication**: Secure user authentication using Web Tokens and hashing for password encryption.
- **Validation**: Validate user input and API requests to ensure data integrity and security.
- **Scalability**: Built using Node.js and Express.js, the application is designed to be scalable and adaptable to varying business needs and growth.

## Directory Structure

```
├── src
│   ├── controllers
│   │   ├── roomController.ts
│   │   ├── roomTypeController.ts
│   │   └── userController.ts
│   ├── middlewares
│   │   ├── validation.ts
│   │   ├── auth.ts
│   │   ├── userValidation.ts
│   │   ├── authMiddleware.ts
│   │   └── validationMiddleware.ts
│   ├── models
│   │   ├── roomModel.ts
│   │   ├── roomTypeModel.ts
│   │   └── userModel.ts
│   ├── routes
│   │   ├── roomRoutes.ts
│   │   ├── roomTypeRoutes.ts
│   │   └── userRoutes.ts
│   ├── app.ts
└── .env
```

## Installation

1. Clone the repository.
2. Navigate to the project directory.
3. Run `npm install` to install dependencies.

## Usage

1. Set up your environment variables by creating a `.env` file (refer to [.env.example](.env.example)).
2. Run `npm start` to start the server.
3. Access the API endpoints as described in the [API Endpoints](#api-endpoints) section.

## API Endpoints

### Users

- **POST /api/v1/users/create**: Create a new user.
- **POST /api/v1/users/login**: Authenticate a user.
- **GET /api/v1/users/all**: Retrieve all users.
- **GET /api/v1/users/:userId**: Retrieve user profile by ID.
- **PATCH /api/v1/users/:userId**: Update user profile.
- **DELETE /api/v1/users/:userId**: Delete user.

### Room Types

- **POST /api/v1/room-types/create**: Create a new room type.
- **GET /api/v1/room-types/all**: Retrieve all room types.
- **GET /api/v1/room-types/:id**: Retrieve a specific room type by ID.
- **PATCH /api/v1/room-types/:id**: Update a specific room type by ID.
- **DELETE /api/v1/room-types/:id**: Delete a specific room type by ID.

### Rooms

- **POST /api/v1/rooms/create**: Create a new room.
- **GET /api/v1/rooms/all**: Retrieve all rooms.
- **GET /api/v1/rooms/:id**: Retrieve a specific room by ID.
- **PATCH /api/v1/rooms/:id**: Update a specific room by ID.
- **DELETE /api/v1/rooms/:id**: Delete a specific room by ID.

## Environment Variables

Create a `.env` file in the root directory and add the following environment variables:

- `PORT`: Port number for the server.
- `MONGODB_URI`: MongoDB connection URI.
- `JWT_SECRET`: Secret key for JWT token generation.

Refer to [.env.example](.env.example) for an example.

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Tokens (JWT)
- bcrypt
- Joi
- Express Validator

## Goodbye

goodbye