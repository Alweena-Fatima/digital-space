import React, { useState, useEffect, useRef } from "react";

const MODES = { focus: 25 * 60, break: 5 * 60 };

const Pomodoro = ({ t }) => {
  const [mode, setMode] = useState("focus");
  const [secs, setSecs] = useState(25 * 60);
  const [run, setRun] = useState(false);
  const [sessions, setSessions] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    if (run) {
      ref.current = setInterval(() => {
        setSecs((s) => {
          if (s <= 1) {
            clearInterval(ref.current);
            setRun(false);
            if (mode === "focus") setSessions((n) => n + 1);
            return 0;
          }
          return s - 1;
        });
      }, 1000);
    }
    return () => clearInterval(ref.current);
  }, [run, mode]);

  const sw = (m) => {
    setMode(m);
    setSecs(MODES[m]);
    setRun(false);
    clearInterval(ref.current);
  };

  const reset = () => {
    setSecs(MODES[mode]);
    setRun(false);
    clearInterval(ref.current);
  };

  const total = MODES[mode];
  const prog = (total - secs) / total;
  const r = 56, circ = 2 * Math.PI * r;
  const mm = String(Math.floor(secs / 60)).padStart(2, "0");
  const ss2 = String(secs % 60).padStart(2, "0");
  const click=new Audio();
  click.src='././sound/pomostart.wav'
  click.volume=0.4;
  const resetS=new Audio();
  resetS.src='././sound/reset.wav'
  


  return (
    <div className="card" style={{ padding: 22, height: "100%" }}>
      <div className="hand" style={{ fontSize: 22, color: t.green, marginBottom: 3 }}>
        🍅 Pomodoro
      </div>
      <p style={{ fontSize: 11, color: t.textMuted, marginBottom: 14 }}>Stay focused, take breaks</p>

      <div style={{ display: "flex", gap: 6, marginBottom: 18 }}>
        {["focus", "break"].map((m) => (
          <button
            key={m}
            onClick={() => {
                sw(m)
                tabsound.play();
              }}
            
            style={{
              flex: 1, padding: 8, borderRadius: 50, border: "none", cursor: "pointer",
              background: mode === m ? t.green : t.bgLight,
              color: mode === m ? "white" : t.textLight,
              fontFamily: "'Nunito',sans-serif", fontWeight: 700, fontSize: 12,
              transition: "all .2s",
            }}
          >
            {m === "focus" ? "🎯 Focus" : "☕ Break"}
          </button>
        ))}
      </div>

      <div style={{ display: "flex", justifyContent: "center", marginBottom: 18 }}>
        <div style={{ position: "relative", width: 130, height: 130 }}>
          <svg width="130" height="130" style={{ transform: "rotate(-90deg)" }}>
            <circle cx="65" cy="65" r={r} fill="none" stroke={t.bgDark} strokeWidth="8" />
            <circle
              cx="65" cy="65" r={r} fill="none"
              stroke={mode === "focus" ? t.green : t.accent}
              strokeWidth="8" strokeLinecap="round"
              strokeDasharray={circ}
              strokeDashoffset={circ * (1 - prog)}
              className="timer-r"
            />
          </svg>
          <div
            style={{
              position: "absolute", inset: 0,
              display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center",
            }}
          >
            <div className="hand" style={{ fontSize: 30, color: t.text, lineHeight: 1 }}>
              {mm}:{ss2}
            </div>
            <div style={{ fontSize: 10, color: t.textMuted, fontWeight: 700, marginTop: 2}}>
              {mode === "focus" ? "FOCUS" : "BREAK"}
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 14 }}>
        <button className="btn-g" style={{ padding: "10px 18px", fontSize: 13 }}
          onClick={() => {setRun((r) => !r);
            click.play();
          }}>
          {run ? "⏸ Pause" : "▶ Start"}
        </button>
        <button className="btn-o" style={{ padding: "10px 14px", fontSize: 13 }} onClick={() => {
          reset();
          resetS.play();
        }}>
          ↺ Reset
        </button>
      </div>

      <div style={{ display: "flex", justifyContent: "center", gap: 5, alignItems: "center" }}>
        {Array.from({ length: 4 }, (_, i) => (
          <div
            key={i}
            style={{
              width: 11, height: 11, borderRadius: "50%",
              background: i < sessions % 4 ? t.green : t.bgDark,
              transition: "all .3s",
            }}
          />
        ))}
        <span style={{ fontSize: 11, color: t.textMuted, fontWeight: 600, marginLeft: 4 }}>
          {sessions} sessions
        </span>
      </div>
    </div>
  );
};

export default Pomodoro;
