import React, { useState } from "react";
import AnimeGirl from "./AnimeGirl";

const Landing = ({ onEnter, t }) => {
  const [nick, setNick] = useState("");
  const [code, setCode] = useState("");
  const [mode, setMode] = useState("join");
  const [genCode, setGenCode] = useState("");
  const [err, setErr] = useState("");

  const generate = () => {
    const c = "DS-" + Math.random().toString(36).substr(2, 4).toUpperCase();
    setGenCode(c);
    setCode(c);
    setMode("create");
  };

  const join = () => {
    if (!nick.trim()) return setErr("Please enter a nickname ✨");
    if (!code.trim()) return setErr("Please enter a room code 🏠");
    onEnter(nick.trim(), code.trim());
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
        background: t.pageBg,
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
        {/* Form Side */}
        <div
          className="card"
          style={{
            borderRadius: "24px 0 0 24px",
            padding: "44px 38px",
            borderRight: "none",
          }}
        >
          <div className="hand" style={{ fontSize: 40, color: t.accent, lineHeight: 1.05, marginBottom: 3 }}>
            Welcome to
          </div>
          <div className="hand" style={{ fontSize: 34, color: t.green, marginBottom: 5 }}>
            Digital Space ✨
          </div>
          <p style={{ fontSize: 12, color: t.textMuted, marginBottom: 28, fontWeight: 500, lineHeight: 1.6 }}>
            Your cozy corner for deep focus & calm study sessions~
          </p>

          <div style={{ marginBottom: 14 }}>
            <div className="lbl">Your Nickname</div>
            <input
              className="inp"
              placeholder="e.g. cozybunny ☁️"
              value={nick}
              onChange={(e) => { setNick(e.target.value); setErr(""); }}
            />
          </div>

          <div style={{ marginBottom: mode === "create" && genCode ? 10 : 20 }}>
            <div className="lbl">Room Code</div>
            <input
              className="inp"
              placeholder="Enter room code..."
              value={code}
              onChange={(e) => { setCode(e.target.value); setErr(""); }}
              onKeyDown={(e) => e.key === "Enter" && join()}
            />
          </div>

          {mode === "create" && genCode && (
            <div
              style={{
                background: t.green + "12",
                border: `1.5px dashed ${t.green}`,
                borderRadius: 12,
                padding: "10px 14px",
                marginBottom: 14,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <span style={{ fontSize: 13, color: t.green, fontWeight: 700 }}>
                🏠 Code: <strong>{genCode}</strong>
              </span>
              <button
                style={{ background: "none", border: "none", cursor: "pointer", fontSize: 15 }}
                onClick={() => navigator.clipboard?.writeText(genCode)}
              >
                📋
              </button>
            </div>
          )}

          {err && (
            <div style={{ color: t.accent, fontSize: 12, marginBottom: 10, fontWeight: 700 }}>
              ⚠️ {err}
            </div>
          )}

          <button className="btn-g" style={{ width: "100%", marginBottom: 10 }} onClick={join}>
            Join Room ✨
          </button>
          <button className="btn-o" style={{ width: "100%" }} onClick={generate}>
            + Create New Room
          </button>
          <p style={{ fontSize: 11, color: t.textMuted, textAlign: "center", marginTop: 18 }}>
            🌿 No account needed · Just vibe & study
          </p>
        </div>

        {/* Character Side */}
        <div
          style={{
            background: t.bgLight,
            borderRadius: "0 24px 24px 0",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "36px 28px",
            border: `1.5px solid ${t.navBorder}`,
            borderLeft: "none",
            position: "relative",
            overflow: "hidden",
            transition: "background 0.4s ease",
          }}
        >
          <AnimeGirl size={150} />
          <div className="hand" style={{ fontSize: 22, color: t.green, marginTop: 14, textAlign: "center" }}>
            Ready to focus? 📚
          </div>
          <p style={{ fontSize: 12, color: t.textMuted, textAlign: "center", marginTop: 7, lineHeight: 1.7 }}>
            Join a cozy study room<br />and achieve your daily goals~
          </p>
          {["🍵 Pomodoro Timer", "🎵 Ambient Sounds", "📖 Word Library"].map((f, i) => (
            <div
              key={i}
              style={{
                background: t.cardBg,
                border: `1px solid ${t.inputBorder}`,
                borderRadius: 50,
                padding: "5px 13px",
                fontSize: 11,
                color: t.textLight,
                fontWeight: 600,
                marginTop: 5,
              }}
            >
              {f}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Landing;
