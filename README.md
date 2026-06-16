# 🏏 Cricketbook

A full-stack web application to manage cricket players and their batting positions. Built with React, Node.js, Express, and MongoDB.

> 🎓 Inspired by the [Full Stack Open](https://fullstackopen.com) course by the University of Helsinki.

## Features

- 📋 View all cricket players and their batting positions
- ➕ Add new players
- ✏️ Update a player's batting position
- 🗑️ Delete players
- 🔍 Search players by name
- ✅ Success and error notifications

## Tech Stack

**Frontend:**
- React
- Axios

**Backend:**
- Node.js
- Express.js
- MongoDB + Mongoose
- Morgan (logging)
- dotenv

## Project Structure

```
cricketbook/
├── cricketbook/          # React frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── Services.js
│   │   │   ├── Displayscreenmessage.jsx
│   │   │   └── Errormessagescreen.jsx
│   │   ├── App.jsx
│   │   └── index.css
│   └── package.json
├── index.js              # Express backend
├── mongo.js              # Mongoose model
├── .env.example
├── .gitignore
└── package.json
```

## Getting Started

### Prerequisites
- Node.js installed
- MongoDB account (MongoDB Atlas)

### Installation

1. **Clone the repo:**
```bash
git clone https://github.com/arnavworkandofficial12-cloud/cricketbook.git
cd cricketbook
```

2. **Setup backend:**
```bash
npm install
```

3. **Create `.env` file** (see `.env.example`):
```
PORT=3001
MONGODB_URI=your_mongodb_connection_string
```

4. **Start the backend:**
```bash
node index.js
```

5. **Setup and start frontend:**
```bash
cd cricketbook
npm install
npm start
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/players` | Get all players |
| GET | `/api/players/:id` | Get player by ID |
| POST | `/api/players` | Add new player |
| PUT | `/api/players/:id` | Update batting position |
| DELETE | `/api/players/:id` | Delete player |

## Environment Variables

Create a `.env` file in the root folder:

```
PORT=3001
MONGODB_URI=your_mongodb_connection_string_here
```

## Inspiration

This project was built as part of learning full-stack web development, inspired by the **[Full Stack Open](https://fullstackopen.com)** course by the University of Helsinki. The phonebook project from the course was adapted into a cricket-themed player management app.

## Author

**arnavworkandofficial12-cloud**  
[GitHub Profile](https://github.com/arnavworkandofficial12-cloud)
