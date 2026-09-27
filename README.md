# Digital Space ✨

A cozy study app with Pomodoro timer, AI-powered word lookup, ambient sounds, goals tracker, quotes, and room-based real-time collaboration.
## Backend
The backend is implemented separately using Spring Boot: [Digital Space Backend](https://github.com/Alweena-Fatima/digital-space-backend)

## What Changed

* **Removed** all floating particle/flower elements
* **Themes now change the entire page** — background, cards, navbar, inputs, buttons, text, and other UI elements update with the selected theme
* **Split into components** — clean and maintainable file structure under `src/components/`
* **Added real-time room collaboration** using WebSocket
* **Added persistent room chat** with MySQL
* **Added chat history** so previous messages are available after refreshing
* **Added backend message cooldown** to limit chat messages to one message every 20 seconds

## Project Structure

```text
digital-space/

├── index.html
├── vite.config.js
├── package.json
│
└── src/
    ├── main.jsx              # React entry point
    ├── App.jsx               # Root: state, routing, theme injection
    ├── theme.js              # All theme token objects + getTheme()
    │
    └── components/
        ├── GlobalStyles.jsx
        ├── Navbar.jsx
        ├── AnimeGirl.jsx
        ├── Landing.jsx
        ├── Home.jsx
        ├── Pomodoro.jsx
        ├── AIWord.jsx
        ├── AmbientSounds.jsx
        ├── Goals.jsx
        ├── QuotesMini.jsx
        ├── WordsMini.jsx
        ├── Themes.jsx
        ├── Study.jsx
        ├── Library.jsx
        └── About.jsx
```

## Available Themes

| Theme   | Vibe                              |
| ------- | --------------------------------- |
| Default | Warm parchment & soft greens      |
| Rain    | Dark navy with cool blue accents  |
| Autumn  | Deep browns with amber highlights |
| Novel   | Dark wood tones with warm ivory   |
| Café    | Near-black with golden highlights |

## Setup

```bash
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

## How Theming Works

`theme.js` exports a `THEMES` object containing the complete design tokens for each theme.

`App.jsx` calls `getTheme(themeKey)` and passes the resulting `t` object to every component as a prop.

`GlobalStyles.jsx` injects a `<style>` tag using these theme tokens, allowing the entire UI to update when the theme changes.

Every component receives `t` as a prop and uses values such as `t.green`, `t.cardBg`, `t.text`, and `t.inputBg` directly in its styles.

## Real-Time Study Rooms

Study rooms use **WebSocket with STOMP** for real-time communication.

The same WebSocket connection handles:

* Member status updates
* Real-time chat messages

Chat messages are also persisted in MySQL, allowing users to load previous messages when they re-enter or refresh the room.

### Chat Flow

```text
React
   ↓
STOMP WebSocket
   ↓
Spring Boot
   ↓
MessageService
   ↓
MySQL
   ↓
WebSocket broadcast
   ↓
All users in the room
```

Chat messages are limited to **one message every 20 seconds per member**, with the restriction enforced on the backend.

## Notes

* **AI Word Lookup** uses the configured AI API through the backend/application setup. Keep API keys in environment variables and never commit secrets to Git.
* **Ambient sounds** are handled on the frontend.
* **Pomodoro** is handled on the frontend and does not require backend persistence.
* **Goals, words, quotes, and study sessions** are persisted through the backend.
* Study room collaboration currently uses room code and member identity rather than full user authentication.
