import React from "react";

import Pomodoro from "./Pomodoro";
import AIWord from "./AIWord";
import AmbientSounds from "./AmbientSounds";
import Goals from "./Goals";
import QuotesMini from "./QuotesMini";
import WordsMini from "./WordsMini";


/*
  HOME COMPONENT

  Home receives some data/functions from App.jsx.

  These are called PROPS.

  Props allow App.jsx to share information with Home.jsx
  and with the smaller components inside Home.
*/
const Home = ({

  // The nickname of the person who joined the room.
  // Example: "Alweena"
  nick,

  // The code of the room the user joined.
  // Example: "B2AA8F"
  roomCode,

  // Array containing saved words.
  // Example:
  // [
  //   { word: "Ephemeral", meaning: "Lasting for a short time" }
  // ]
  words,

  // Function used to update the words array.
  // We use this when a new word is saved.
  setWords,

  // Array containing saved quotes.
  quotes,

  // Function used to update the quotes array.
  setQuotes,

  // "t" contains the current theme's colors/styles.
  // For example: t.green, t.textMuted, t.pageBg, etc.
  t,

  // "run" tells us whether the Pomodoro is currently running.
  // true  -> Pomodoro is running
  // false -> Pomodoro is stopped
  run,

  // Function used to change the Pomodoro running state.
  // Example:
  // setRun(true)  -> start Pomodoro
  // setRun(false) -> stop Pomodoro
  setRun

}) => (

  <div
    className="page"
    style={{
      padding: "88px 28px 28px",
      maxWidth: 1080,
      margin: "0 auto"
    }}
  >

    {/* 
      GREETING SECTION: We use "nick" here because App.jsx gave the user's nickname to Home. */}
    <div style={{ marginBottom: 24 }}>

      <div className="hand"
        style={{
          fontSize: 32,
          color: t.green
        }} >
        Good vibes, {nick}~ ✨
      </div>

      {/* Shows today's date."t" is used here for the muted text color. */}
      <p
        style={{
          fontSize: 13,
          color: t.textMuted,
          fontWeight: 500
        }}
      >
        {new Date().toLocaleDateString("en-US", {
          weekday: "long",
          month: "long",
          day: "numeric"
        })}
      </p>

    </div>


    {/* 
      FIRST ROW: Left  -> Pomodoro
      Right -> AI Word
    */}
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 18,
        marginBottom: 18
      }}
    >

      {/*
        POMODORO

        We pass "run" and "setRun" to Pomodoro.

        Why?

        Because the Pomodoro component needs to know
        whether the timer is running and needs a way
        to change that state.

        run     -> current value
        setRun  -> function to change the value
      */}
      <Pomodoro t={t} run={run} setRun={setRun} />


      {/*
        AI WORD
        When the user saves a word, AIWord calls onSave().
        The new word "w" is added to our words array.
        Example:
        Old:
        words = [word1, word2]

        User saves word3

        New:
        words = [word1, word2, word3]
      */}
      <AIWord onSave={(w) => setWords((ws) => [...ws, w])} t={t} />

    </div>


    {/* 
      SECOND ROW

      Left  -> Ambient Sounds
      Right -> Goals
    */}
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 18,
        marginBottom: 18
      }}
    >

      {/*
        AMBIENT SOUNDS

        We pass "run" so AmbientSounds knows
        whether the Pomodoro is running.
        This allows us to do things like:

        Pomodoro starts
             ↓
        run = true
             ↓
        Ambient sound can start

        Pomodoro stops
             ↓
        run = false
             ↓
        Ambient sound can stop
      */}
      <AmbientSounds t={t} run={run} />


      {/*
        GOALS

        We pass roomCode because goals belong
        to a particular room.

        Backend API:

        GET
        /api/rooms/{roomCode}/goals

        POST
        /api/rooms/{roomCode}/goals
      */}
      <Goals roomCode={roomCode} t={t}/>

    </div>


    {/* 
      THIRD ROW

      Left  -> Quotes
      Right -> Saved Words
    */}
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 18
      }}
    >

      {/*
        QUOTES

        quotes     -> current list of quotes
        setQuotes  -> function to update the list
      */}
      <QuotesMini
        roomCode={roomCode}
        quotes={quotes}
        setQuotes={setQuotes}
        t={t}
      />


      {/*
        WORDS

        words     -> current list of saved words
        setWords  -> function to update the list
      */}
      <WordsMini
        roomCode={roomCode}
        words={words}
        setWords={setWords}
        t={t}
      />

    </div>

  </div>
);

export default Home;