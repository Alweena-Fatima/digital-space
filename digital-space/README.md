# Digital Space ✨

A cozy study app with Pomodoro timer, AI word lookup, ambient sounds, goals tracker, and room-based chat.

## What Changed

- **Removed** all floating particle/flower elements
- **Themes now change the entire page** — background, cards, navbar, inputs, buttons, text all update
- **Split into components** — clean file structure under `src/components/`

## Project Structure

```
digital-space/
├── index.html
├── vite.config.js
├── package.json
└── src/
    ├── main.jsx          # React entry point
    ├── App.jsx           # Root: state, routing, theme injection
    ├── theme.js          # All 5 theme token objects + getTheme()
    └── components/
        ├── GlobalStyles.jsx   # CSS-in-JS styles driven by theme tokens
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

| Theme    | Vibe                              |
|----------|-----------------------------------|
| Default  | Warm parchment & soft greens      |
| Rain     | Dark navy with cool blue accents  |
| Autumn   | Deep browns with amber highlights |
| Novel    | Dark wood tones with warm ivory   |
| Café     | Near-black with golden highlights |

## Setup

```bash
npm install
npm run dev
```

Open http://localhost:5173 in your browser.

## How Theming Works

`theme.js` exports a `THEMES` object with 5 complete token sets.  
`App.jsx` calls `getTheme(themeKey)` and passes the resulting `t` object to every component as a prop.  
`GlobalStyles.jsx` injects a `<style>` tag using those tokens — so changing the theme re-renders all CSS instantly.

Every component receives `t` as a prop and uses `t.green`, `t.cardBg`, `t.text`, etc. directly in inline styles.

## Notes

- The AI Word lookup uses the Anthropic API — make sure you're running this in an environment where the API key is injected (e.g., Claude Artifacts, or add your own key to a proxy)
- Ambient sounds are UI-only (no actual audio files bundled)
- Study room chat is local/mock only (no WebSocket backend)
