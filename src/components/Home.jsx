
import React from "react";

import Pomodoro from "./Pomodoro";
import AIWord from "./AIWord";
import AmbientSounds from "./AmbientSounds";
import Goals from "./Goals";
import QuotesMini from "./QuotesMini";
import WordsMini from "./WordsMini";

/*
 * Main dashboard of Digital Space.
 *
 * Home brings together the different study tools while
 * App.jsx manages the shared room state.
 */
const Home = ({
  nickname,
  roomCode,
  words,
  setWords,
  quotes,
  setQuotes,
  theme,
  isPomodoroRunning,
  setIsPomodoroRunning,
}) => (
  <div
    className="page"
    style={{
      padding: "88px 28px 28px",
      maxWidth: 1080,
      margin: "0 auto",
    }}
  >
    {/* Greeting and current date */}
    <div style={{ marginBottom: 24 }}>
      <div
        className="hand"
        style={{
          fontSize: 32,
          color: theme.green,
        }}
      >
        Good vibes, {nickname}~ ✨
      </div>

      <p
        style={{
          fontSize: 13,
          color: theme.textMuted,
          fontWeight: 500,
        }}
      >
        {new Date().toLocaleDateString("en-US", {
          weekday: "long",
          month: "long",
          day: "numeric",
        })}
      </p>
    </div>

    {/* Focus tools */}
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 18,
        marginBottom: 18,
      }}
    >
      <Pomodoro
        theme={theme}
        isRunning={isPomodoroRunning}
        setIsRunning={setIsPomodoroRunning}
      />

      <AIWord
        onSave={async (word) => {
          try {
            // Save the word in the current room.
            const response = await fetch(
              `http://localhost:8080/api/rooms/${roomCode}/words`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  word: word.word,
                  meaning: word.meaning,
                }),
              }
            );

            if (!response.ok) {
              throw new Error("Failed to save word");
            }

            const savedWord = await response.json();

            // Add the saved database record to the local list.
            setWords((currentWords) => [
              ...currentWords,
              savedWord,
            ]);
          } catch (error) {
            console.error("Error saving AI word:", error);
          }
        }}
        theme={theme}
      />
    </div>

    {/* Study environment */}
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 18,
        marginBottom: 18,
      }}
    >
      <AmbientSounds
        theme={theme}
        isPomodoroRunning={isPomodoroRunning}
      />

      <Goals
        roomCode={roomCode}
        theme={theme}
      />
    </div>

    {/* Shared room resources */}
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 18,
      }}
    >
      <QuotesMini
        roomCode={roomCode}
        quotes={quotes}
        setQuotes={setQuotes}
        theme={theme}
      />

      <WordsMini
        roomCode={roomCode}
        words={words}
        setWords={setWords}
        theme={theme}
      />
    </div>
  </div>
);

export default Home;

