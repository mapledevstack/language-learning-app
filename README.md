# Language Learning App

A full-stack Japanese learning platform that combines dictionary lookup, flashcard-based study, progress tracking, and immersion learning into a single experience.

The goal of the project is to provide a modern alternative to juggling multiple tools such as dictionaries, flashcard apps, and immersion resources.

---

## Features

### Authentication

- User registration and login
- Email verification
- Password reset via email
- Session management
- JWT authentication with access and refresh tokens

### Dictionary

- Search Japanese words, readings, and meanings
- English and Japanese search support
- Furigana display
- Kanji information and breakdowns
- Example sentence support

### Flashcards & Decks

- Create custom decks
- Save vocabulary directly from dictionary entries
- Study cards using spaced repetition concepts
- Track learning progress

### Immersion Learning

- Import Japanese YouTube content
- Subtitle parsing and tokenization
- Click-to-seek subtitle navigation
- Vocabulary discovery from real content

### Progress Tracking

- Study statistics
- Learning history
- Review tracking
- Session-based progress monitoring

---

## Tech Stack

### Frontend

- React 19
- TypeScript
- Vite
- TanStack Router
- TanStack Query
- Tailwind CSS
- shadcn/ui
- Lucide Icons

### Backend

- Node.js
- Express
- TypeScript
- MongoDB
- Mongoose
- Zod

### Japanese Language Processing

- Wanakana
- Kuromoji
- JMdict
- KanjiAPI datasets

---

## Project Structure

```txt
backend/
├── src/
│   ├── features/
│   ├── middleware/
│   ├── utils/
│   └── config/

frontend/
├── src/
│   ├── routes/
│   ├── features/
│   ├── components/
│   ├── hooks/
│   └── utils/
```

---

## Getting Started

### Prerequisites

- Node.js 22+
- MongoDB
- npm

### Installation

Clone the repository:

```bash
git clone https://github.com/mapledevstack/language-learning-app.git
cd language-learning-app
```

Install dependencies:

```bash
cd backend
npm install

cd ../frontend
npm install
```

### Environment Variables

Create a `.env` file inside `backend/`.

Example:

```env
PORT=3000

MONGO_URI=

JWT_SECRET=
JWT_REFRESH_SECRET=

APP_ORIGIN=http://localhost:5173

RESEND_API_KEY=
EMAIL_SENDER=
```

Use long random values for JWT secrets in production.

### Run Development Servers

Backend:

```bash
cd backend
npm run dev
```

Frontend:

```bash
cd frontend
npm run dev
```

Frontend runs on:

```txt
http://localhost:5173
```

Backend runs on:

```txt
http://localhost:3000
```

---

## Current Status

Implemented:

- Authentication system
- Session management
- Dictionary search
- Kanji lookup
- YouTube immersion viewer
- Flashcard decks
- Progress tracking foundations

Planned:

- Advanced spaced repetition scheduling
- Reading practice
- Enhanced analytics dashboard

---

## License

This project is intended for educational and portfolio purposes.
