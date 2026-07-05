# Language Learning Platform

> A modern full-stack Japanese learning platform that combines dictionary search, grammar resources, and YouTube-based immersion into a single personalized learning experience.

<p align="center">

![React](https://img.shields.io/badge/React-19-149ECA?style=for-the-badge&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Caddy](https://img.shields.io/badge/Caddy-1F88C0?style=for-the-badge&logo=caddy&logoColor=white)
![License](https://img.shields.io/github/license/mapledevstack/language-learning-app?style=for-the-badge)

</p>

---

## Table of Contents

- [Overview](#overview)
- [Current Features](#current-features)
- [Feature Status](#feature-status)
- [Technology Stack](#technology-stack)
- [Architecture](#architecture)
- [Project Highlights](#project-highlights)
- [Getting Started](#getting-started)
- [Docker](#docker)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [Authentication](#authentication)
- [Deployment](#deployment)
- [Roadmap](#roadmap)
- [License](#license)

---

# Overview

Learning Japanese often requires switching between multiple websites.

A learner may use one application for dictionary lookups, another for grammar explanations, another for flashcards, and yet another for immersion through native content. Constantly moving between different tools interrupts the learning process and creates unnecessary friction.

This project aims to bring those workflows together into a single application.

The Language Learning Platform is a full-stack web application built with modern TypeScript technologies that provides dictionary search, grammar resources, YouTube subtitle analysis, and a growing collection of personalized study tools through one consistent interface.

Rather than recreating existing services, the goal is to build a personal learning hub that makes studying Japanese more efficient while serving as a production-quality software engineering project.

---

# Project Highlights

- Full-stack TypeScript application
- React 19 frontend with TanStack Router
- Express REST API
- MongoDB Atlas database
- JWT authentication with secure refresh sessions
- Email verification and password reset
- Japanese dictionary powered by self-hosted datasets
- Grammar search with categorized resources
- YouTube transcript parsing for immersion learning
- Dockerized development and production environments
- Multi-stage Docker builds
- Caddy reverse proxy configuration
- Feature-based project architecture
- Responsive interface built with Tailwind CSS and shadcn/ui

---

# Current Features

## Authentication

The authentication system is designed around secure session management using short-lived access tokens and persistent refresh sessions.

Features include:

- User registration
- Email verification
- Login and logout
- Demo account
- Password reset
- Persistent authentication
- HTTP-only cookies
- Secure session invalidation

---

## Dictionary

The dictionary is one of the core components of the platform.

Users can search Japanese vocabulary and quickly explore detailed information about each entry without leaving the application.

Current capabilities include:

- Word search
- Reading lookup
- English meanings
- JLPT information
- Kanji lookup
- Example sentences
- Search tokenization
- Fast indexed queries

The backend uses Japanese language processing tools and locally imported datasets to provide fast search performance while avoiding reliance on third-party dictionary APIs.

---

## Grammar

Grammar resources are fully integrated into the application.

Instead of searching across multiple websites, users can browse organized grammar entries directly within the platform.

Current functionality includes:

- Grammar search
- Categorized resources
- Detailed explanations
- Linked learning materials

---

## Immersion

The immersion system focuses on learning vocabulary through native YouTube content.

Users can analyze subtitles, explore unfamiliar vocabulary, and navigate directly through videos using transcript timestamps.

Current features include:

- YouTube transcript parsing
- Subtitle tokenization
- Vocabulary extraction
- Timestamp navigation
- Topic discovery

This creates a smoother workflow for studying vocabulary directly from real Japanese content.

---

## Infrastructure

The project includes a modern deployment workflow designed to minimize environment differences between development and production.

Infrastructure features include:

- Docker support
- Docker Compose
- Multi-stage builds
- Caddy reverse proxy
- Separate development and production configurations
- Environment-based configuration
- Production-ready containerization

---

# Feature Status

## Completed

- Authentication
- Email verification
- Password reset
- Demo account
- Dictionary search
- Kanji search
- Example sentences
- Grammar search
- YouTube immersion
- Docker support
- Production containerization

## In Progress

- Dashboard statistics
- Flashcard persistence
- Deck management
- Profile page

## Planned

The long-term vision for the platform includes:

- Spaced repetition scheduling
- Personalized study analytics
- Anime vocabulary mining
- Progress tracking
- Reading practice
- Additional learning tools

The project is under active development, and new features are added incrementally with a focus on maintainability and long-term scalability.

---

# Technology Stack

## Frontend

- React 19
- TypeScript
- Vite
- TanStack Router
- TanStack Query
- Tailwind CSS
- shadcn/ui
- Lucide Icons

---

## Backend

- Node.js
- Express
- TypeScript
- Zod
- JWT Authentication
- Resend

---

## Database

- MongoDB Atlas
- Mongoose

---

## Japanese Language Processing

- Kuromoji
- Wanakana
- JMdict
- Kanji datasets

---

## DevOps

- Docker
- Docker Compose
- Caddy
- Multi-stage Docker builds

---

# Architecture

The frontend communicates exclusively with the Express API through typed REST endpoints.

Business logic, authentication, dictionary processing, grammar resources, and immersion services are handled by the backend, while MongoDB stores user data and imported Japanese language datasets.

The application is containerized using Docker and served behind a Caddy reverse proxy to simplify local development and production deployment.

# Getting Started

## Prerequisites

Before running the project locally, make sure the following software is installed:

| Software | Recommended Version |
|----------|---------------------|
| Node.js | 24+ |
| npm | 11+ |
| Docker | Latest |
| Docker Compose | Latest |
| Git | Latest |

A MongoDB Atlas cluster and a Resend account are also required if you intend to use authentication and email functionality.

---

# Installation

Clone the repository.

```bash
git clone https://github.com/mapledevstack/language-learning-app.git
```

Navigate into the project.

```bash
cd language-learning-app
```

---

## Configure Environment Variables

Both the frontend and backend require their own environment files.

```text
frontend/.env
backend/.env
```

Sample environment variables are provided in each project directory.

Fill in the required values before starting the application.

---

## Running with Docker

The easiest way to start the project is through Docker Compose.

Development:

```bash
docker compose -f docker-compose.dev.yaml up --build
```

Production:

```bash
docker compose up --build
```

Docker handles:

- Frontend
- Backend
- Reverse proxy
- Networking
- Environment isolation

No additional setup is required beyond configuring the environment variables.

---

## Running Without Docker

### Backend

```bash
cd backend

npm install

npm run dev
```

---

### Frontend

```bash
cd frontend

npm install

npm run dev
```

The frontend communicates with the backend using the configured API base URL.

---

# Docker

One of the primary goals of this project is to provide a consistent development and deployment experience.

The application is fully containerized using Docker and includes separate configurations for development and production environments.

Current Docker setup includes:

- Separate frontend and backend containers
- Multi-stage production builds
- Development containers with hot reloading
- Shared Docker network
- Caddy reverse proxy
- Environment-specific Docker Compose files

The production images are optimized to reduce image size by separating the build and runtime stages.

This approach provides several advantages:

- Consistent environments across machines
- Faster onboarding for contributors
- Simpler deployments
- Smaller production images
- Cleaner dependency management

---

## Reverse Proxy

The application uses **Caddy** as a reverse proxy.

Caddy is responsible for:

- Routing requests
- Serving the frontend
- Forwarding API requests
- HTTPS support
- Simplified production configuration

Using a reverse proxy keeps the frontend and backend independent while exposing a single public entry point.

---

# Environment Variables

The repository includes sample environment files for both applications.

Some of the required variables include:

### Backend

```env
PORT=

APP_ORIGIN=

MONGO_URI=

JWT_SECRET=

JWT_REFRESH_SECRET=

RESEND_API_KEY=

EMAIL_FROM=
```

---

### Frontend

```env
VITE_API_BASE_URL=
```

Refer to the provided `.env.example` files for the complete list of required variables.

Environment files should never be committed to version control.

---

# Project Structure

The repository follows a feature-based architecture rather than organizing code by file type.

```
language-learning-app/

├── frontend/
├── backend/
├── caddy/
├── docker-compose.dev.yaml
└── docker-compose.yaml
```

---

## Frontend

The frontend is organized around application features.

```
features/

├── auth/
├── dashboard/
├── dictionary/
├── grammar/
├── immersion/
├── profile/
└── decks/
```

Each feature contains its own components, hooks, API layer, schemas, and utility functions.

This structure keeps related code together and scales more naturally than organizing files by type.

---

## Backend

The backend follows a similar feature-based organization.

```
features/

├── auth/
├── dictionary/
├── grammar/
├── immersion/
└── users/
```

Each module contains:

- Routes
- Controllers
- Services
- Schemas
- Models
- Utilities (when needed)

Business logic is intentionally isolated inside services while controllers remain responsible only for request handling.

---
# Authentication

Authentication is built around JWT-based access tokens and persistent refresh sessions.

The system is designed to balance security, user experience, and maintainability.

## Features

- User registration
- Email verification
- Secure login
- Persistent sessions
- Password reset
- Demo account
- Session invalidation
- Protected API routes

## Security Measures

Authentication includes several security practices:

- Passwords are hashed using bcrypt.
- Access and refresh tokens have separate lifetimes.
- Refresh tokens are stored as HTTP-only cookies.
- Input validation is performed using Zod.
- Protected routes require authentication middleware.
- Invalid or expired sessions are rejected automatically.
- Authentication logic is isolated from business logic.

---

# API Overview

The backend exposes a REST API consumed by the React frontend.

Endpoints are organized by feature instead of by resource type.

```
/api/v1

├── auth/
├── dictionary/
├── grammar/
├── immersion/
└── users/
```

Each feature follows a consistent architecture:

```
Routes
    ↓
Controllers
    ↓
Services
    ↓
Database
```

This separation keeps request handling independent from business logic and database access.

---

# Performance Considerations

Several design decisions were made to improve responsiveness and scalability.

Current optimizations include:

- Cached server state through TanStack Query
- Indexed MongoDB queries
- Feature-based code organization
- Lazy route loading
- Multi-stage Docker builds
- Environment-specific production builds
- Reusable UI components
- Typed request validation

As the project grows, additional optimizations such as response caching and pagination will be introduced where appropriate.

---

# Deployment

The application is designed to be deployable using containerized services.

Current deployment strategy:

| Service | Platform |
|----------|----------|
| Frontend | Vercel |
| Backend | Render |
| Database | MongoDB Atlas |
| Reverse Proxy | Caddy |
| Email | Resend |

Because each service is isolated, deployments can be updated independently without affecting the rest of the application.

---

# Roadmap

The project is actively being developed.

## Currently In Progress

- Dashboard statistics
- Flashcard persistence
- Deck management
- Profile page

## Planned Features

### Learning

- Spaced repetition scheduling
- Personalized study statistics
- Review history
- Learning streaks
- Progress visualization

### Dictionary

- Pitch accent support
- Related vocabulary
- Kanji decomposition
- Improved search ranking

### Immersion

- Anime vocabulary mining
- Frequency analysis
- Vocabulary coverage
- Automatic deck generation

### Platform

- User settings
- Improved accessibility
- Search improvements
- Performance optimizations
- Expanded testing

Future development will continue to prioritize maintainability over rapidly adding features.

---

# License

This project is licensed under the MIT License.

See the `LICENSE` file for additional information.

---

# Contact

If you have questions, suggestions, or feedback, feel free to open an issue or start a discussion on GitHub.

---

## Project Status

This project is under active development.

While the core authentication, dictionary, grammar, immersion, and infrastructure systems are functional, additional study tools and personalization features are currently being implemented.

The long-term goal is to build a comprehensive Japanese learning platform that combines vocabulary discovery, grammar reference, immersion, and personalized study into a single cohesive application.
