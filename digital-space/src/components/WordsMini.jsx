import React, { useState } from "react";

const WordsMini = ({ words, setWords, t }) => {
  const [w, setW] = useState("");
  const [m, setM] = useState("");

  const add = () => {
    if (!w.trim()) return;
    setWords((ws) => [
      ...ws,
      { id: Date.now(), word: w, meaning: m || "Look it up~", emoji: "📖", category: "vocabulary", example: "" },
    ]);
    setW("");
    setM("");
  };

  return (
    <div className="card" style={{ padding: 22 }}>
      <div className="hand" style={{ fontSize: 22, color: t.green, marginBottom: 3 }}>
        📝 Vocabulary
      </div>
      <p style={{ fontSize: 11, color: t.textMuted, marginBottom: 12 }}>Build your word collection</p>

      <div style={{ display: "flex", gap: 7, marginBottom: 7 }}>
        <input
          className="inp"
          placeholder="Word..."
          value={w}
          onChange={(e) => setW(e.target.value)}
          style={{ flex: 1, fontSize: 13 }}
        />
      </div>

      <div style={{ display: "flex", gap: 7, marginBottom: 12 }}>
        <input
          className="inp"
          placeholder="Meaning..."
          value={m}
          onChange={(e) => setM(e.target.value)}
          style={{ flex: 1, fontSize: 13 }}
        />
        <button className="btn-g" style={{ padding: "10px 13px", fontSize: 14 }} onClick={add}>+</button>
      </div>

      <div style={{ maxHeight: 170, overflowY: "auto" }}>
        {words.slice(-4).reverse().map((w2) => (
          <div key={w2.id} className="wcard">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontWeight: 700, fontSize: 14, color: t.green }}>
                {w2.emoji} {w2.word}
              </span>
              <button
                onClick={() => setWords((ws) => ws.filter((x) => x.id !== w2.id))}
                style={{ background: "none", border: "none", cursor: "pointer", color: t.textMuted }}
              >
                ×
              </button>
            </div>
            <p style={{ fontSize: 12, color: t.textLight, marginTop: 3 }}>{w2.meaning}</p>
          </div>
        ))}
        {words.length === 0 && (
          <div style={{ textAlign: "center", padding: 16, color: t.textMuted, fontSize: 12 }}>
            ✨ Save words from Word Magic above~
          </div>
        )}
      </div>
    </div>
  );
};

export default WordsMini;
