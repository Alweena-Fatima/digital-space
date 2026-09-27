
import React, { useState, useRef, useEffect } from "react";

const AMBIENT_SOUNDS = [
  { id: "rain", label: "Rain", emoji: "🌧️" },
  { id: "fire", label: "Fireplace", emoji: "🔥" },
  { id: "cafe", label: "Café", emoji: "☕" },
  { id: "type", label: "Typing", emoji: "⌨️" },
  { id: "cat", label: "Cat Purr", emoji: "🐱" },
  { id: "forest", label: "Forest", emoji: "🌲" },
];

const SOUND_FILES = {
  rain: "././sound/rain.mp3",
  fire: "././sound/fire.mp3",
  cafe: "././sound/cafe.mp3",
  type: "././sound/typing.mp3",
  cat: "././sound/cat.mp3",
  forest: "././sound/forest.mp3",
};

const AmbientSounds = ({
  theme,
  isPomodoroRunning,
}) => {
  const [activeSound, setActiveSound] = useState(null);
  const [volume, setVolume] = useState(60);

  const audioRef = useRef(null);

  const handleSoundSelect = (soundId) => {
    const nextActiveSound =
      activeSound === soundId ? null : soundId;

    setActiveSound(nextActiveSound);
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }

    if (!isPomodoroRunning || !activeSound) {
      return;
    }

    const audio = new Audio(
      SOUND_FILES[activeSound]
    );

    audio.loop = true;
    audio.volume = volume / 100;

    audio.play();

    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, [isPomodoroRunning, activeSound]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  return (
    <div
      className="card"
      style={{
        padding: 22,
      }}
    >
      <div
        className="hand"
        style={{
          fontSize: 22,
          color: theme.green,
          marginBottom: 3,
        }}
      >
        🎵 Ambient Sounds
      </div>

      <p
        style={{
          fontSize: 11,
          color: theme.textMuted,
          marginBottom: 14,
        }}
      >
        Set the perfect atmosphere
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 7,
          marginBottom: 18,
        }}
      >
        {AMBIENT_SOUNDS.map((sound) => (
          <button
            key={sound.id}
            className={`snd-btn ${
              activeSound === sound.id ? "on" : ""
            }`}
            onClick={() =>
              handleSoundSelect(sound.id)
            }
          >
            <span style={{ fontSize: 20 }}>
              {sound.emoji}
            </span>

            <span>{sound.label}</span>

            {activeSound === sound.id && (
              <span
                style={{
                  fontSize: 8,
                  color: theme.green,
                }}
              >
                PLAYING
              </span>
            )}
          </button>
        ))}
      </div>

      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 7,
          }}
        >
          <span
            style={{
              fontSize: 12,
              color: theme.textLight,
              fontWeight: 600,
            }}
          >
            🔊 Volume
          </span>

          <span
            style={{
              fontSize: 11,
              color: theme.textMuted,
              fontWeight: 700,
            }}
          >
            {volume}%
          </span>
        </div>

        <input
          type="range"
          min="0"
          max="100"
          value={volume}
          onChange={(event) =>
            setVolume(Number(event.target.value))
          }
        />
      </div>

      {activeSound && (
        <div
          style={{
            marginTop: 12,
            padding: "9px 13px",
            background: theme.badge,
            borderRadius: 10,
            fontSize: 12,
            color: theme.green,
            fontWeight: 600,
            border: `1px solid ${theme.green}22`,
            display: "flex",
            alignItems: "center",
            gap: 5,
          }}
        >
          🎶 Now playing:{" "}
          {
            AMBIENT_SOUNDS.find(
              (sound) => sound.id === activeSound
            )?.label
          }
        </div>
      )}
    </div>
  );
};

export default AmbientSounds;

