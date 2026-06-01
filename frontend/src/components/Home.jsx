import React from "react";
import Pomodoro from "./Pomodoro";
import AIWord from "./AIWord";
import AmbientSounds from "./AmbientSounds";
import Goals from "./Goals";
import QuotesMini from "./QuotesMini";
import WordsMini from "./WordsMini";

const Home = ({ nick, words, setWords, quotes, setQuotes, t ,run, setRun}) => (
  <div className="page" style={{ padding: "88px 28px 28px", maxWidth: 1080, margin: "0 auto" }}>
    <div style={{ marginBottom: 24 }}>
      <div className="hand" style={{ fontSize: 32, color: t.green }}>
        Good vibes, {nick}~ ✨
      </div>
      <p style={{ fontSize: 13, color: t.textMuted, fontWeight: 500 }}>
        {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
      </p>
    </div>
    {/* get the pomo start status to pass in Ambient sound file to stop or start playing sound only when the pomo is on */}
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, marginBottom: 18 }}>
      <Pomodoro t={t} run={run} setRun={setRun}/>
      <AIWord onSave={(w) => setWords((ws) => [...ws, w])} t={t} />
    </div>

    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, marginBottom: 18 }}>
      <AmbientSounds t={t} run={run} />
      <Goals t={t} />
    </div>

    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
      <QuotesMini quotes={quotes} setQuotes={setQuotes} t={t} />
      <WordsMini words={words} setWords={setWords} t={t} />
    </div>
  </div>
);

export default Home;
