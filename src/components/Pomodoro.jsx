
import React, { useState, useEffect, useRef } from "react";

const MODES = {
  focus: 25 * 60,
  break: 5 * 60,
};

const Pomodoro = ({
  theme,
  isRunning,
  setIsRunning,
}) => {
  const [mode, setMode] = useState("focus");
  const [secondsRemaining, setSecondsRemaining] = useState(
    MODES.focus
  );
  const [completedSessions, setCompletedSessions] = useState(0);

  const timerRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setSecondsRemaining((currentSeconds) => {
          if (currentSeconds <= 1) {
            clearInterval(timerRef.current);
            setIsRunning(false);

            if (mode === "focus") {
              setCompletedSessions(
                (currentSessions) => currentSessions + 1
              );
            }

            return 0;
          }

          return currentSeconds - 1;
        });
      }, 1000);
    }

    return () => clearInterval(timerRef.current);
  }, [isRunning, mode, setIsRunning]);

  const switchMode = (newMode) => {
    setMode(newMode);
    setSecondsRemaining(MODES[newMode]);
    setIsRunning(false);
    clearInterval(timerRef.current);
  };

  const resetTimer = () => {
    setSecondsRemaining(MODES[mode]);
    setIsRunning(false);
    clearInterval(timerRef.current);
  };

  const totalSeconds = MODES[mode];
  const progress = (totalSeconds - secondsRemaining) / totalSeconds;

  const radius = 56;
  const circumference = 2 * Math.PI * radius;

  const minutes = String(
    Math.floor(secondsRemaining / 60)
  ).padStart(2, "0");

  const seconds = String(
    secondsRemaining % 60
  ).padStart(2, "0");

  const startSound = new Audio("/sound/pomostart.wav");
  startSound.volume = 0.4;

  const resetSound = new Audio("/sound/reset.wav");

  return (
    <div
      className="card"
      style={{
        padding: 22,
        height: "100%",
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
        🍅 Pomodoro
      </div>

      <p
        style={{
          fontSize: 11,
          color: theme.textMuted,
          marginBottom: 14,
        }}
      >
        Stay focused, take breaks
      </p>

      <div
        style={{
          display: "flex",
          gap: 6,
          marginBottom: 18,
        }}
      >
        {["focus", "break"].map((timerMode) => (
          <button
            key={timerMode}
            onClick={() => {
              switchMode(timerMode);
              startSound.play();
            }}
            style={{
              flex: 1,
              padding: 8,
              borderRadius: 50,
              border: "none",
              cursor: "pointer",
              background:
                mode === timerMode
                  ? theme.green
                  : theme.bgLight,
              color:
                mode === timerMode
                  ? "white"
                  : theme.textLight,
              fontFamily: "'Nunito', sans-serif",
              fontWeight: 700,
              fontSize: 12,
              transition: "all .2s",
            }}
          >
            {timerMode === "focus"
              ? "🎯 Focus"
              : "☕ Break"}
          </button>
        ))}
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: 18,
        }}
      >
        <div
          style={{
            position: "relative",
            width: 130,
            height: 130,
          }}
        >
          <svg
            width="130"
            height="130"
            style={{
              transform: "rotate(-90deg)",
            }}
          >
            <circle
              cx="65"
              cy="65"
              r={radius}
              fill="none"
              stroke={theme.bgDark}
              strokeWidth="8"
            />

            <circle
              cx="65"
              cy="65"
              r={radius}
              fill="none"
              stroke={
                mode === "focus"
                  ? theme.green
                  : theme.accent
              }
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={
                circumference * (1 - progress)
              }
              className="timer-r"
            />
          </svg>

          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              className="hand"
              style={{
                fontSize: 30,
                color: theme.text,
                lineHeight: 1,
              }}
            >
              {minutes}:{seconds}
            </div>

            <div
              style={{
                fontSize: 10,
                color: theme.textMuted,
                fontWeight: 700,
                marginTop: 2,
              }}
            >
              {mode === "focus" ? "FOCUS" : "BREAK"}
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          gap: 8,
          justifyContent: "center",
          marginBottom: 14,
        }}
      >
        <button
          className="btn-g"
          style={{
            padding: "10px 18px",
            fontSize: 13,
          }}
          onClick={() => {
            setIsRunning((currentState) => !currentState);
            startSound.play();
          }}
        >
          {isRunning ? "⏸ Pause" : "▶ Start"}
        </button>

        <button
          className="btn-o"
          style={{
            padding: "10px 14px",
            fontSize: 13,
          }}
          onClick={() => {
            resetTimer();
            resetSound.play();
          }}
        >
          ↺ Reset
        </button>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 5,
          alignItems: "center",
        }}
      >
        {Array.from({ length: 4 }, (_, index) => (
          <div
            key={index}
            style={{
              width: 11,
              height: 11,
              borderRadius: "50%",
              background:
                index < completedSessions % 4
                  ? theme.green
                  : theme.bgDark,
              transition: "all .3s",
            }}
          />
        ))}

        <span
          style={{
            fontSize: 11,
            color: theme.textMuted,
            fontWeight: 600,
            marginLeft: 4,
          }}
        >
          {completedSessions} sessions
        </span>
      </div>
    </div>
  );
};

export default Pomodoro;

