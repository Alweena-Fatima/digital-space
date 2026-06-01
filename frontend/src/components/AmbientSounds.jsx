import React, { useState, useRef, useEffect } from "react";

const SNDS = [
  { id: "rain", l: "Rain", e: "🌧️" },
  { id: "fire", l: "Fireplace", e: "🔥" },
  { id: "cafe", l: "Café", e: "☕" },
  { id: "type", l: "Typing", e: "⌨️" },
  { id: "cat", l: "Cat Purr", e: "🐱" },
  { id: "forest", l: "Forest", e: "🌲" },
];

const soundMap = {
  rain: "././sound/rain.mp3",
  fire: "././sound/fire.mp3",
  cafe: "././sound/cafe.mp3",
  type: "././sound/typing.mp3",
  cat: "././sound/cat.mp3",
  forest: "././sound/forest.mp3",
};

const AmbientSounds = ({ t, run }) => {
  const [active, setActive] = useState(null);
  const [vol, setVol] = useState(60);
  const audioRef = useRef(null);

  // 🎧 play sound
  const playSound = (id) => {
    // stop previous
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }

    if (!id) return;

    const audio = new Audio(soundMap[id]);
    audio.loop = true;
    audio.volume = vol / 100;
    audio.play();

    audioRef.current = audio;
  };

  // 🔁 change sound
  const handleSelect = (id) => {
  const newActive = active === id ? null : id;
  setActive(newActive);
  };

  // ⏱️ stop when pomo not running
  useEffect(() => {
  // stop everything first
  if (audioRef.current) {
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    audioRef.current = null;
  }

  // don't play if pomo paused or no sound selected
  if (!run || !active) return;

  // create new audio
  const audio = new Audio(soundMap[active]);
  audio.loop = true;
  audio.volume = vol / 100;

  audio.play();

  audioRef.current = audio;

  return () => {
    audio.pause();
    audio.currentTime = 0;
  };
}, [run, active]);;

  // 🔊 volume update live
  useEffect(() => {
  if (audioRef.current) {
    audioRef.current.volume = vol / 100;
  }
  }, [vol]);

  return (
    <div className="card" style={{ padding: 22 }}>
      <div className="hand" style={{ fontSize: 22, color: t.green, marginBottom: 3 }}>
        🎵 Ambient Sounds
      </div>

      <p style={{ fontSize: 11, color: t.textMuted, marginBottom: 14 }}>
        Set the perfect atmosphere
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 7, marginBottom: 18 }}>
        {SNDS.map((s) => (
          <button
            key={s.id}
            className={`snd-btn ${active === s.id ? "on" : ""}`}
            onClick={() => handleSelect(s.id)}
          >
            <span style={{ fontSize: 20 }}>{s.e}</span>
            <span>{s.l}</span>
            {active === s.id && (
              <span style={{ fontSize: 8, color: t.green }}>PLAYING</span>
            )}
          </button>
        ))}
      </div>

      {/* volume */}
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 7 }}>
          <span style={{ fontSize: 12, color: t.textLight, fontWeight: 600 }}>
            🔊 Volume
          </span>
          <span style={{ fontSize: 11, color: t.textMuted, fontWeight: 700 }}>
            {vol}%
          </span>
        </div>

        <input
          type="range"
          min="0"
          max="100"
          value={vol}
          onChange={(e) => setVol(+e.target.value)}
        />
      </div>

      {/* status */}
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
          🎶 Now playing: {SNDS.find((s) => s.id === active)?.l}
        </div>
      )}
    </div>
  );
};

export default AmbientSounds;