
import React, { useState } from "react";
import AnimeGirl from "./AnimeGirl";
import { API_URL } from "../../config";
const Landing = ({ onEnter, theme }) => {
  const [nickname, setNickname] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [roomCode, setRoomCode] = useState("");
  const [mode, setMode] = useState("join");
  const [generatedRoomCode, setGeneratedRoomCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const createRoom = async () => {
    setErrorMessage("");

    try {
      const response = await fetch(
         `${API_URL}/api/rooms`,
        {
          method: "POST",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create room");
      }

      const data = await response.json();

      setGeneratedRoomCode(data.roomCode);
      setRoomCode(data.roomCode);
      setMode("create");
    } catch (error) {
      setErrorMessage(
        "Could not create room. Please try again."
      );
    }
  };

  const joinRoom = () => {
    if (!nickname.trim()) {
      return setErrorMessage(
        "Please enter a nickname ✨"
      );
    }

    if (!displayName.trim()) {
      return setErrorMessage(
        "Please enter a display name 🌸"
      );
    }

    if (!roomCode.trim()) {
      return setErrorMessage(
        "Please enter a room code 🏠"
      );
    }

    onEnter(
      nickname.trim(),
      displayName.trim(),
      roomCode.trim()
    );
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
        position: "relative",
        background: theme.pageBg,
        transition: "background 0.6s ease",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          maxWidth: 800,
          width: "100%",
          animation: "fadeUp .6s ease",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div
          className="card"
          style={{
            borderRadius: "24px 0 0 24px",
            padding: "44px 38px",
            borderRight: "none",
          }}
        >
          <div
            className="hand"
            style={{
              fontSize: 40,
              color: theme.accent,
              lineHeight: 1.05,
              marginBottom: 3,
            }}
          >
            Welcome to
          </div>

          <div
            className="hand"
            style={{
              fontSize: 34,
              color: theme.green,
              marginBottom: 5,
            }}
          >
            Digital Space ✨
          </div>

          <p
            style={{
              fontSize: 12,
              color: theme.textMuted,
              marginBottom: 28,
              fontWeight: 500,
              lineHeight: 1.6,
            }}
          >
            Your cozy corner for deep focus & calm study
            sessions~
          </p>

          <div style={{ marginBottom: 14 }}>
            <div className="lbl">Your Nickname</div>

            <input
              className="inp"
              placeholder="e.g. cozybunny ☁️"
              value={nickname}
              onChange={(event) => {
                setNickname(event.target.value);
                setErrorMessage("");
              }}
            />
          </div>

          <div style={{ marginBottom: 14 }}>
            <div className="lbl">Display Name</div>

            <input
              className="inp"
              placeholder="e.g. Alweena 🌸"
              value={displayName}
              onChange={(event) => {
                setDisplayName(event.target.value);
                setErrorMessage("");
              }}
            />
          </div>

          <div
            style={{
              marginBottom:
                mode === "create" && generatedRoomCode
                  ? 10
                  : 20,
            }}
          >
            <div className="lbl">Room Code</div>

            <input
              className="inp"
              placeholder="Enter room code..."
              value={roomCode}
              onChange={(event) => {
                setRoomCode(event.target.value);
                setErrorMessage("");
              }}
              onKeyDown={(event) =>
                event.key === "Enter" && joinRoom()
              }
            />
          </div>

          {mode === "create" && generatedRoomCode && (
            <div
              style={{
                background: theme.green + "12",
                border: `1.5px dashed ${theme.green}`,
                borderRadius: 12,
                padding: "10px 14px",
                marginBottom: 14,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <span
                style={{
                  fontSize: 13,
                  color: theme.green,
                  fontWeight: 700,
                }}
              >
                🏠 Code:{" "}
                <strong>{generatedRoomCode}</strong>
              </span>

              <button
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontSize: 15,
                }}
                onClick={() =>
                  navigator.clipboard?.writeText(
                    generatedRoomCode
                  )
                }
              >
                📋
              </button>
            </div>
          )}

          {errorMessage && (
            <div
              style={{
                color: theme.accent,
                fontSize: 12,
                marginBottom: 10,
                fontWeight: 700,
              }}
            >
              ⚠️ {errorMessage}
            </div>
          )}

          <button
            className="btn-g"
            style={{
              width: "100%",
              marginBottom: 10,
            }}
            onClick={joinRoom}
          >
            Join Room ✨
          </button>

          <button
            className="btn-o"
            style={{ width: "100%" }}
            onClick={createRoom}
          >
            + Create New Room
          </button>

          <p
            style={{
              fontSize: 11,
              color: theme.textMuted,
              textAlign: "center",
              marginTop: 18,
            }}
          >
            🌿 No account needed · Just vibe & study
          </p>
        </div>

        <div
          style={{
            background: theme.bgLight,
            borderRadius: "0 24px 24px 0",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "36px 28px",
            border: `1.5px solid ${theme.navBorder}`,
            borderLeft: "none",
            position: "relative",
            overflow: "hidden",
            transition: "background 0.4s ease",
          }}
        >
          <AnimeGirl size={150} />

          <div
            className="hand"
            style={{
              fontSize: 22,
              color: theme.green,
              marginTop: 14,
              textAlign: "center",
            }}
          >
            Ready to focus? 📚
          </div>

          <p
            style={{
              fontSize: 12,
              color: theme.textMuted,
              textAlign: "center",
              marginTop: 7,
              lineHeight: 1.7,
            }}
          >
            Join a cozy study room
            <br />
            and achieve your daily goals~
          </p>

          {[
            "🍵 Pomodoro Timer",
            "🎵 Ambient Sounds",
            "📖 Word Library",
          ].map((feature) => (
            <div
              key={feature}
              style={{
                background: theme.cardBg,
                border: `1px solid ${theme.inputBorder}`,
                borderRadius: 50,
                padding: "5px 13px",
                fontSize: 11,
                color: theme.textLight,
                fontWeight: 600,
                marginTop: 5,
              }}
            >
              {feature}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Landing;
