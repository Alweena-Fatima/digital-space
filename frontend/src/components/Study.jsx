import React, { useState, useEffect, useRef } from "react";

const MOCK_U = [
  { id: 1, n: "moonbunny", s: "studying", a: "🐰" },
  { id: 2, n: "tealeaf", s: "reading", a: "🍵" },
  { id: 3, n: "stargazer", s: "break", a: "⭐" },
];

const MOCK_M = [
  { id: 1, u: "moonbunny", t: "hii everyone! let's get to work~ 🌸", ts: "2:30 PM" },
  { id: 2, u: "tealeaf", t: "motivation loading... 📚✨", ts: "2:31 PM" },
  { id: 3, u: "stargazer", t: "I finished my notes!! feels so good 🎉", ts: "2:45 PM" },
];

const EMOJIS = ["🌸", "✨", "💚", "☕", "📚", "🌙"];

const Study = ({ nick, roomCode, t }) => {
  const [msgs, setMsgs] = useState(MOCK_M);
  const [inp, setInp] = useState("");
  const [lastSent, setLastSent] = useState(0);
  const [cd, setCd] = useState(0);
  const chatRef = useRef(null);

  useEffect(() => {
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [msgs]);

  useEffect(() => {
    if (cd <= 0) return;
    const timer = setTimeout(() => setCd((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [cd]);

  const send = () => {
    if (!inp.trim()) return;
    const now = Date.now();
    if (now - lastSent < 30000) { setCd(Math.ceil((30000 - (now - lastSent)) / 1000)); return; }
    setMsgs((m) => [...m, {
      id: Date.now(), u: nick, t: inp,
      ts: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
    }]);
    setInp("");
    setLastSent(now);
  };

  const react = (e) => {
    const now = Date.now();
    if (now - lastSent < 30000) return;
    setMsgs((m) => [...m, {
      id: Date.now(), u: nick, t: e,
      ts: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
    }]);
    setLastSent(now);
  };

  const statusColor = { studying: t.green, reading: t.accent, break: t.textMuted };

  return (
    <div className="page" style={{ padding: "88px 28px 28px", maxWidth: 980, margin: "0 auto" }}>
      <div className="hand" style={{ fontSize: 32, color: t.green, marginBottom: 22 }}>
        Study Together 🌿
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 18 }}>
        {/* Sidebar */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div className="card" style={{ padding: 18 }}>
            <div className="hand" style={{ fontSize: 18, color: t.green, marginBottom: 10 }}>🏠 Room</div>
            <div
              style={{
                background: t.bgLight,
                borderRadius: 10,
                padding: "11px 14px",
                marginBottom: 9,
                fontWeight: 700,
                fontSize: 18,
                letterSpacing: 2,
                color: t.green,
                textAlign: "center",
                fontFamily: "'Caveat',cursive",
              }}
            >
              {roomCode}
            </div>
            <button
              className="btn-o"
              style={{ width: "100%", fontSize: 12 }}
              onClick={() => navigator.clipboard?.writeText(roomCode)}
            >
              📋 Copy Invite Code
            </button>
          </div>

          <div className="card" style={{ padding: 18 }}>
            <div className="hand" style={{ fontSize: 18, color: t.green, marginBottom: 10 }}>
              👥 Online ({MOCK_U.length + 1})
            </div>
            <div
              style={{
                display: "flex", alignItems: "center", gap: 9, padding: "7px 9px",
                borderRadius: 11, background: t.badge, marginBottom: 7,
                border: `1px solid ${t.green}28`,
              }}
            >
              <span style={{ fontSize: 18 }}>🌟</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: t.green }}>{nick} (you)</div>
                <div style={{ fontSize: 10, color: t.green, fontWeight: 600 }}>● studying</div>
              </div>
            </div>
            {MOCK_U.map((u) => (
              <div
                key={u.id}
                style={{
                  display: "flex", alignItems: "center", gap: 9,
                  padding: "7px 9px", borderRadius: 11,
                  background: t.bgLight, marginBottom: 5,
                }}
              >
                <span style={{ fontSize: 18 }}>{u.a}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: t.text }}>{u.n}</div>
                  <div style={{ fontSize: 10, color: statusColor[u.s] || t.textMuted, fontWeight: 600 }}>
                    ● {u.s}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat */}
        <div className="card" style={{ padding: 18, display: "flex", flexDirection: "column", height: 500 }}>
          <div className="hand" style={{ fontSize: 18, color: t.green, marginBottom: 3 }}>💬 Chat Room</div>
          <p style={{ fontSize: 11, color: t.textMuted, marginBottom: 12 }}>
            🕊️ Keep it peaceful · 1 message per 30 seconds
          </p>

          <div
            ref={chatRef}
            style={{
              flex: 1, overflowY: "auto",
              display: "flex", flexDirection: "column",
              gap: 10, paddingRight: 3,
            }}
          >
            {msgs.map((msg) => {
              const me = msg.u === nick;
              return (
                <div key={msg.id} style={{ display: "flex", flexDirection: "column", alignItems: me ? "flex-end" : "flex-start" }}>
                  {!me && (
                    <span style={{ fontSize: 10, color: t.textMuted, marginBottom: 3, marginLeft: 7, fontWeight: 600 }}>
                      {msg.u}
                    </span>
                  )}
                  <div className={`bubble ${me ? "me" : "them"}`}>{msg.t}</div>
                  <span style={{ fontSize: 9, color: t.textMuted, marginTop: 2, [me ? "marginRight" : "marginLeft"]: 7 }}>
                    {msg.ts}
                  </span>
                </div>
              );
            })}
          </div>

          <div style={{ display: "flex", gap: 5, padding: "8px 0 7px" }}>
            {EMOJIS.map((e) => (
              <button
                key={e}
                onClick={() => react(e)}
                style={{
                  background: t.inputBg,
                  border: `1.5px solid ${t.inputBorder}`,
                  borderRadius: 50,
                  padding: "3px 7px",
                  fontSize: 14,
                  cursor: "pointer",
                  transition: "all .2s",
                }}
                onMouseOver={(ev) => (ev.currentTarget.style.transform = "scale(1.2)")}
                onMouseOut={(ev) => (ev.currentTarget.style.transform = "scale(1)")}
              >
                {e}
              </button>
            ))}
          </div>

          <div style={{ display: "flex", gap: 7, borderTop: `1px solid ${t.inputBorder}`, paddingTop: 10 }}>
            <input
              className="inp"
              placeholder="Send a message..."
              value={inp}
              onChange={(e) => setInp(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              style={{ flex: 1, fontSize: 13 }}
              disabled={cd > 0}
            />
            <button
              className="btn-g"
              style={{ padding: "10px 14px", fontSize: 13 }}
              onClick={send}
              disabled={cd > 0}
            >
              {cd > 0 ? `${cd}s` : "Send"}
            </button>
          </div>

          {cd > 0 && (
            <p style={{ fontSize: 11, color: t.accent, textAlign: "center", marginTop: 5, fontWeight: 600 }}>
              🕊️ Wait {cd}s to keep the room peaceful~
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Study;
