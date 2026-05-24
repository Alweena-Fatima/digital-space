import React, { useState } from "react";

const SNDS = [
  { id: "rain", l: "Rain", e: "🌧️" },
  { id: "fire", l: "Fireplace", e: "🔥" },
  { id: "cafe", l: "Café", e: "☕" },
  { id: "type", l: "Typing", e: "⌨️" },
  { id: "cat", l: "Cat Purr", e: "🐱" },
  { id: "forest", l: "Forest", e: "🌲" },
];

const AmbientSounds = ({ t }) => {
  const [active, setActive] = useState(null);
  const [vol, setVol] = useState(60);

  return (
    <div className="card" style={{ padding: 22 }}>
      <div className="hand" style={{ fontSize: 22, color: t.green, marginBottom: 3 }}>
        🎵 Ambient Sounds
      </div>
      <p style={{ fontSize: 11, color: t.textMuted, marginBottom: 14 }}>Set the perfect atmosphere</p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 7, marginBottom: 18 }}>
        {SNDS.map((s) => (
          <button
            key={s.id}
            className={`snd-btn ${active === s.id ? "on" : ""}`}
            onClick={() => setActive(active === s.id ? null : s.id)}
          >
            <span style={{ fontSize: 20 }}>{s.e}</span>
            <span>{s.l}</span>
            {active === s.id && <span style={{ fontSize: 8, color: t.green }}>PLAYING</span>}
          </button>
        ))}
      </div>

      <div>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 7 }}>
          <span style={{ fontSize: 12, color: t.textLight, fontWeight: 600 }}>🔊 Volume</span>
          <span style={{ fontSize: 11, color: t.textMuted, fontWeight: 700 }}>{vol}%</span>
        </div>
        <input
          type="range"
          min="0" max="100"
          value={vol}
          onChange={(e) => setVol(+e.target.value)}
          style={{ background: `linear-gradient(to right,${t.green} ${vol}%,${t.bgDark} ${vol}%)` }}
        />
      </div>

      {active && (
        <div
          style={{
            marginTop: 12,
            padding: "9px 13px",
            background: t.badge,
            borderRadius: 10,
            fontSize: 12,
            color: t.green,
            fontWeight: 600,
            border: `1px solid ${t.green}22`,
            display: "flex",
            alignItems: "center",
            gap: 5,
          }}
        >
          <span style={{ animation: "breathe 1.5s ease infinite", display: "inline-block" }}>🎶</span>
          Now playing: {SNDS.find((s) => s.id === active)?.l}
        </div>
      )}
    </div>
  );
};

export default AmbientSounds;
